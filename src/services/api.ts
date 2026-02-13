import { invoke } from '@tauri-apps/api/core';
import type { ApiResponse } from '../types';

/**
 * API 服务基类
 */
export class ApiService {
  /**
   * 调用 Tauri 后端命令
   */
  protected async invokeCommand<T>(
    command: string,
    args?: Record<string, unknown>
  ): Promise<ApiResponse<T>> {
    try {
      const data = await invoke<T>(command, args);
      return { success: true, data };
    } catch (error) {
      console.error(`Command "${command}" failed:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 发送 HTTP 请求（使用 Tauri HTTP 插件）
   */
  protected async fetch<T>(
    url: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Request failed',
          code: response.status,
        };
      }

      return { success: true, data };
    } catch (error) {
      console.error(`Fetch to "${url}" failed:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }
}

/**
 * 聊天服务
 */
export class ChatService extends ApiService {
  /**
   * 发送消息
   */
  async sendMessage(conversationId: string, content: string) {
    return this.invokeCommand('send_message', { conversationId, content });
  }

  /**
   * 获取会话历史
   */
  async getConversations() {
    return this.invokeCommand('get_conversations');
  }

  /**
   * 创建新会话
   */
  async createConversation(title: string) {
    return this.invokeCommand('create_conversation', { title });
  }

  /**
   * 删除会话
   */
  async deleteConversation(id: string) {
    return this.invokeCommand('delete_conversation', { id });
  }
}

/**
 * 设置服务
 */
export class SettingsService extends ApiService {
  /**
   * 获取用户设置
   */
  async getSettings() {
    return this.invokeCommand('get_settings');
  }

  /**
   * 更新用户设置
   */
  async updateSettings(settings: unknown) {
    return this.invokeCommand('update_settings', { settings });
  }

  /**
   * 导出数据
   */
  async exportData() {
    return this.invokeCommand('export_data');
  }

  /**
   * 导入数据
   */
  async importData(filePath: string) {
    return this.invokeCommand('import_data', { filePath });
  }
}

// 导出服务实例
export const chatService = new ChatService();
export const settingsService = new SettingsService();
