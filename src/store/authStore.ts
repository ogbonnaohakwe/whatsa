import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

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
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            // Fetch the user's profile to get their role
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', data.user.id)
              .single();

            if (profileError) throw profileError;

            const isAdmin = profileData?.role === 'admin';

            set({ 
              user: {
                id: data.user.id,
                email: data.user.email!,
                name: data.user.user_metadata.name || '',
                profilePicture: data.user.user_metadata.avatar_url,
                role: profileData?.role || 'user'
              },
              isAuthenticated: true,
              token: data.session?.access_token || null,
              isLoading: false,
            });
            
            return { success: true, isAdmin };
          }
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
              data: { name },
            }
          });

          if (error) throw error;

          if (data.user) {
            set({ 
              user: {
                id: data.user.id,
                email: data.user.email!,
                name: data.user.user_metadata.name || '',
                profilePicture: data.user.user_metadata.avatar_url,
                role: 'user'
              },
              isAuthenticated: true,
              token: data.session?.access_token || null,
              isLoading: false,
            });
            return true;
          }
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
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            token: null,
            error: null,
          });
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