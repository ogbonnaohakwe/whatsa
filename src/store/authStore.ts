import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
}

// Demo user accounts
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
  },
  {
    id: '3',
    email: 'business@whatsapp-autoresponder.com',
    password: 'business123',
    name: 'Business Owner',
    role: 'user',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check demo users
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
            
            toast.success(`Welcome back, ${demoUser.name}!`);
            return { success: true, isAdmin };
          } else {
            // For non-demo accounts, show available demo accounts
            set({ 
              isLoading: false, 
              error: 'Invalid credentials. Please use one of the demo accounts above.' 
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
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Check if email already exists in demo users
          const existingUser = demoUsers.find(u => u.email === email);
          if (existingUser) {
            set({ 
              isLoading: false, 
              error: 'Email already exists. Please use the login form with demo credentials.' 
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
          
          toast.success(`Welcome to WhatsApp Autoresponder, ${name}!`);
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