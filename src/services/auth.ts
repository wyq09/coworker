/**
 * 认证服务
 * 处理登录、注册、登出等认证相关操作
 */

import { invoke } from '@tauri-apps/api/core';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '@/types/auth';

const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

/**
 * 登录
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await invoke<AuthResponse>('auth_login', {
      email: credentials.email,
      password: credentials.password,
      rememberMe: credentials.rememberMe || false,
    });

    // 保存认证信息
    if (response) {
      await saveAuthData(response);
    }

    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Login failed');
  }
}

/**
 * 注册
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const response = await invoke<AuthResponse>('auth_register', {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (response) {
      await saveAuthData(response);
    }

    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Registration failed');
  }
}

/**
 * 登出
 */
export async function logout(): Promise<void> {
  try {
    await invoke('auth_logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // 无论服务器端是否成功，都清除本地数据
    await clearAuthData();
  }
}

/**
 * 刷新 token
 */
export async function refreshToken(): Promise<AuthResponse | null> {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await invoke<AuthResponse>('auth_refresh_token', {
      refreshToken,
    });

    if (response) {
      await saveAuthData(response);
    }

    return response;
  } catch (error) {
    await clearAuthData();
    return null;
  }
}

/**
 * 保存认证数据
 */
async function saveAuthData(response: AuthResponse): Promise<void> {
  localStorage.setItem(AUTH_TOKEN_KEY, response.token);
  localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(response.user));
}

/**
 * 清除认证数据
 */
async function clearAuthData(): Promise<void> {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * 获取当前 token
 */
export function getToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * 获取当前用户
 */
export function getCurrentUser(): User | null {
  const userData = localStorage.getItem(USER_KEY);
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * 检查是否已认证
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * Mock API 用于开发测试
 * TODO: 替换为真实的 Tauri 命令调用
 */
export const mockAuthService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.email === 'error@test.com') {
      throw new Error('Invalid credentials');
    }

    const mockUser: User = {
      id: 'user-1',
      name: 'Test User',
      email: credentials.email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
      createdAt: new Date().toISOString(),
    };

    const response: AuthResponse = {
      user: mockUser,
      token: 'mock-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      expiresIn: 3600,
    };

    await saveAuthData(response);
    return response;
  },

  async logout(): Promise<void> {
    await clearAuthData();
  },

  getCurrentUser,
  isAuthenticated,
  getToken,
};
