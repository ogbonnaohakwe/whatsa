import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export const useSupabase = () => {
  const { user, setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we have a stored user
    if (user) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const success = await useAuthStore.getState().register(name, email, password);
      return { success, data: success ? { user: { email, user_metadata: { name } } } : null };
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign up');
      return { success: false, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { success } = await useAuthStore.getState().login(email, password);
      return { success, data: success ? { user: { email } } : null };
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign in');
      return { success: false, error };
    }
  };

  const signOut = async () => {
    try {
      await useAuthStore.getState().logout();
      return { success: true };
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign out');
      return { success: false, error };
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    user,
    loading,
  };
};