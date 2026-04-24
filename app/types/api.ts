/**
 * Core API response structure and shared models.
 */

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
