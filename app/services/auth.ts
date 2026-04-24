import { api } from '../plugins/axios';
import type { AuthResponse, User } from '../types/api';

/**
 * Authentication Service
 */
export const AuthService = {
  async login(credentials: Record<string, string>): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get<User>('/auth/profile');
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }
};
