import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
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
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            // Get user profile from database
            const { data: userData, error } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            if (error) {
              console.error('Failed to load user profile:', error);
              // Clear invalid session
              await supabase.auth.signOut();
              return;
            }
            
            const user: User = {
              id: userData.id,
              email: userData.email,
              name: userData.name,
              profilePicture: userData.profile_picture || undefined,
              role: userData.role || 'user'
            };
            
            set({ 
              user,
              isAuthenticated: true,
              token: session.access_token,
            });
          }
        } catch (error) {
          console.error('Auth initialization failed:', error);
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            set({ 
              isLoading: false, 
              error: error.message
            });
            return { success: false, isAdmin: false };
          }

          if (data.user) {
            // Get user profile from database
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('*')
              .eq('id', data.user.id)
              .single();
              
            if (userError) {
              set({ 
                isLoading: false, 
                error: 'Failed to load user profile'
              });
              return { success: false, isAdmin: false };
            }
            
            const user: User = {
              id: userData.id,
              email: userData.email,
              name: userData.name,
              profilePicture: userData.profile_picture || undefined,
              role: userData.role || 'user'
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
          
          set({ 
            isLoading: false, 
            error: 'Invalid credentials. Please check your email and password.' 
          });
          return { success: false, isAdmin: false };
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
            set({ 
              isLoading: false, 
              error: error.message
            });
            return false;
          }

          if (data.user) {
            // Create user profile in database
            const { error: profileError } = await supabase
              .from('users')
              .insert({
                id: data.user.id,
                name,
                email,
                role: 'user',
                whatsapp_connected: false,
              });
              
            if (profileError) {
              set({ 
                isLoading: false, 
                error: 'Failed to create user profile'
              });
              return false;
            }

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
          
          set({ 
            isLoading: false, 
            error: 'Registration failed. Please try again.' 
          });
          return false;
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
          await supabase.auth.signOut();
          
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