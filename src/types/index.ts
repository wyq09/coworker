// 应用通用类型定义

// 导出认证类型
export * from './auth';

/**
 * 消息类型
 */
export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  status?: 'sending' | 'sent' | 'failed';
}

/**
 * 聊天会话
 */
export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

/**
 * 应用主题
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  mode: ThemeMode;
  accentColor: string;
}

/**
 * 用户设置
 */
export interface UserSettings {
  theme: ThemeConfig;
  notifications: boolean;
  sound: boolean;
  language: string;
}

/**
 * API 响应类型
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: number;
}

/**
 * 状态管理类型
 */
export interface AppState {
  conversations: Conversation[];
  currentConversationId: string | null;
  settings: UserSettings;
  isLoading: boolean;
}
