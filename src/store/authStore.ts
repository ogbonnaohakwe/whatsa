import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import { databaseService } from '../services/databaseService';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; isAdmin: boolean }>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

// Demo user accounts (fallback when no database)
const demoUsers = [
  {
    id: '1',
    email: 'demo@whatsapp-autoresponder.com',
    password: 'demo123',
    name: 'Demo User',
    role: 'user',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    email: 'admin@whatsapp-autoresponder.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    profilePicture: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      isLoading: false,
      error: null,

      setUser: (user) => {
        set({ 
          user, 
          isAuthenticated: !!user,
          error: null 
        });
      },

      initializeAuth: async () => {
        if (!supabase) {
          console.log('Running in demo mode - no auth initialization needed');
          return;
        }

        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            // Get user profile from database
            try {
              const userData = await databaseService.getUserById(session.user.id);
              const user: User = {
                id: userData.id,
                email: userData.email,
                name: userData.name,
                profilePicture: userData.profile_picture || undefined,
                role: 'user' // Default role, you can extend this
              };
              
              set({ 
                user,
                isAuthenticated: true,
                token: session.access_token,
              });
            } catch (error) {
              console.error('Failed to load user profile:', error);
              // Clear invalid session
              await supabase.auth.signOut();
            }
          }
        } catch (error) {
          console.error('Auth initialization failed:', error);
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Try Supabase auth first
          if (supabase) {
            const { data, error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });

            if (error) {
              // If Supabase auth fails, fall back to demo users
              console.log('Supabase auth failed, trying demo users:', error.message);
            } else if (data.user) {
              // Get user profile from database
              const userData = await databaseService.getUserById(data.user.id);
              const user: User = {
                id: userData.id,
                email: userData.email,
                name: userData.name,
                profilePicture: userData.profile_picture || undefined,
                role: 'user' // You can extend this based on your user table
              };

              const isAdmin = user.role === 'admin';
              
              set({ 
                user,
                isAuthenticated: true,
                token: data.session?.access_token || null,
                isLoading: false,
              });
              
              toast.success(`Welcome back, ${user.name}!`);
              return { success: true, isAdmin };
            }
          }

          // Fallback to demo users
          const demoUser = demoUsers.find(u => u.email === email && u.password === password);
          
          if (demoUser) {
            const user: User = {
              id: demoUser.id,
              email: demoUser.email,
              name: demoUser.name,
              profilePicture: demoUser.profilePicture,
              role: demoUser.role
            };

            const isAdmin = demoUser.role === 'admin';
            
            set({ 
              user,
              isAuthenticated: true,
              token: `demo_token_${demoUser.id}`,
              isLoading: false,
            });
            
            toast.success(`Welcome back, ${demoUser.name}! (Demo Mode)`);
            return { success: true, isAdmin };
          } else {
            set({ 
              isLoading: false, 
              error: 'Invalid credentials. Please check your email and password.' 
            });
            return { success: false, isAdmin: false };
          }
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to login' 
          });
          return { success: false, isAdmin: false };
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Try Supabase auth first
          if (supabase) {
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
              options: {
                data: {
                  name,
                },
              },
            });

            if (error) {
              console.log('Supabase registration failed:', error.message);
            } else if (data.user) {
              // Create user profile in database
              await databaseService.createUser({
                id: data.user.id,
                name,
                email,
                whatsapp_connected: false,
              });

              const user: User = {
                id: data.user.id,
                email,
                name,
                role: 'user',
              };
              
              set({ 
                user,
                isAuthenticated: true,
                token: data.session?.access_token || null,
                isLoading: false,
              });
              
              toast.success(`Welcome to WhatsApp Autoresponder, ${name}!`);
              return true;
            }
          }

          // Fallback to demo mode
          const existingUser = demoUsers.find(u => u.email === email);
          if (existingUser) {
            set({ 
              isLoading: false, 
              error: 'Email already exists. Please use the login form.' 
            });
            return false;
          }
          
          // Create new demo user
          const newUser: User = {
            id: Date.now().toString(),
            email,
            name,
            role: 'user',
            profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
          };
          
          set({ 
            user: newUser,
            isAuthenticated: true,
            token: `demo_token_${newUser.id}`,
            isLoading: false,
          });
          
          toast.success(`Welcome to WhatsApp Autoresponder, ${name}! (Demo Mode)`);
          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to register' 
          });
          return false;
        }
      },

      logout: async () => {
        try {
          if (supabase) {
            await supabase.auth.signOut();
          }
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            token: null,
            error: null,
          });
          toast.success('Logged out successfully');
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to logout' 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
    }
  )
);