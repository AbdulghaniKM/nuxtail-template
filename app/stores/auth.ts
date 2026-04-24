import { defineStore } from 'pinia';
import { AuthService } from '../services/auth';
import type { User } from '../types/api';

/**
 * Auth Store
 * Handles user state and authentication lifecycle.
 */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    async login(credentials: Record<string, string>) {
      this.loading = true;
      try {
        const { user, token } = await AuthService.login(credentials);
        this.user = user;
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('auth-token', token);
        }
      } finally {
        this.loading = false;
      }
    },

    async fetchProfile() {
      try {
        this.user = await AuthService.getProfile();
      } catch (error) {
        this.user = null;
      }
    },

    logout() {
      this.user = null;
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('auth-token');
      }
    }
  }
});
