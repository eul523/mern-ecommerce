import { create } from 'zustand';
import api from '../api.js';
import useCartStore from './CartStore';
import { toast } from 'react-hot-toast';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/auth/login', { email, password });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (err) {
        toast.error(err.response?.data?.msg || 'Login failed');
      set({ isLoading: false });
      throw err;
    }
  },
  register: async ( email, password) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/auth/register', { email, password });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.msg || 'Registration failed');
      set({ isLoading: false });
      throw err;
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      await api.post('/auth/logout');
      useCartStore.getState().clearCart();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (err) {
        toast.error(err.response?.data?.msg || 'Logout failed');
      set({ isLoading: false });
      throw err;
    }
  },
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/auth/me');
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (err) {
      console.log("checkout",err)
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

export default useAuthStore;