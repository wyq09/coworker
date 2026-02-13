/**
 * AI 聊天服务
 * 处理与 AI 的对话交互
 */

import { invoke } from '@tauri-apps/api/core';
import type { Message, Conversation } from '@/types';

export interface ChatRequest {
  conversationId?: string;
  message: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatResponse {
  id: string;
  content: string;
  role: 'assistant';
  timestamp: number;
  finishReason?: 'stop' | 'length' | 'content_filter';
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * 发送消息到 AI
 */
export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  try {
    // TODO: 替换为真实的 Tauri 命令调用
    const response = await invoke<ChatResponse>('chat_send_message', {
      conversationId: request.conversationId,
      message: request.message,
      model: request.model || 'gpt-4',
      temperature: request.temperature ?? 0.7,
      maxTokens: request.maxTokens ?? 2048,
    });

    return response;
  } catch (error) {
    console.error('Send message error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to send message');
  }
}

/**
 * 获取对话历史
 */
export async function getConversation(conversationId: string): Promise<Conversation> {
  try {
    const conversation = await invoke<Conversation>('chat_get_conversation', {
      conversationId,
    });
    return conversation;
  } catch (error) {
    console.error('Get conversation error:', error);
    throw new Error('Failed to load conversation');
  }
}

/**
 * 获取所有对话列表
 */
export async function getConversations(): Promise<Conversation[]> {
  try {
    const conversations = await invoke<Conversation[]>('chat_list_conversations');
    return conversations;
  } catch (error) {
    console.error('List conversations error:', error);
    return [];
  }
}

/**
 * 创建新对话
 */
export async function createConversation(title?: string): Promise<Conversation> {
  try {
    const conversation = await invoke<Conversation>('chat_create_conversation', {
      title: title || 'New Chat',
    });
    return conversation;
  } catch (error) {
    console.error('Create conversation error:', error);
    throw new Error('Failed to create conversation');
  }
}

/**
 * 删除对话
 */
export async function deleteConversation(conversationId: string): Promise<void> {
  try {
    await invoke('chat_delete_conversation', { conversationId });
  } catch (error) {
    console.error('Delete conversation error:', error);
    throw new Error('Failed to delete conversation');
  }
}

/**
 * 流式响应（SSE）
 */
export async function streamMessage(
  request: ChatRequest,
  onChunk: (chunk: string) => void,
  onComplete: (message: ChatResponse) => void,
  onError: (error: Error) => void
): Promise<() => void> {
  try {
    // TODO: 实现 SSE 流式响应
    const abortController = new AbortController();

    // 模拟流式响应
    const mockResponse = await mockStreamResponse(request, onChunk, abortController.signal);
    onComplete(mockResponse);

    return () => abortController.abort();
  } catch (error) {
    onError(error instanceof Error ? error : new Error('Stream failed'));
    return () => {};
  }
}

/**
 * Mock 流式响应
 */
async function mockStreamResponse(
  request: ChatRequest,
  onChunk: (chunk: string) => void,
  signal: AbortSignal
): Promise<ChatResponse> {
  const responseText = `This is a simulated AI response to: "${request.message}".\n\nThe actual AI integration will be implemented with the backend team's API.`;
  const words = responseText.split(' ');

  for (let i = 0; i < words.length; i++) {
    if (signal.aborted) {
      throw new Error('Stream aborted');
    }

    onChunk(words[i] + ' ');
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  return {
    id: Date.now().toString(),
    content: responseText,
    role: 'assistant',
    timestamp: Date.now(),
    finishReason: 'stop',
    usage: {
      promptTokens: request.message.length / 4,
      completionTokens: responseText.length / 4,
      totalTokens: (request.message.length + responseText.length) / 4,
    },
  };
}

/**
 * Mock AI 服务用于开发测试
 */
export const mockChatService = {
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses: string[] = [
      `I understand you said: "${request.message}". This is a mock response - the actual AI will be much more intelligent!`,
      `That's an interesting point about "${request.message}". Let me think about this...`,
      `I can help you with "${request.message}". Here's what I suggest...`,
      `Great question! Regarding "${request.message}", I think...`,
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      id: Date.now().toString(),
      content: randomResponse,
      role: 'assistant',
      timestamp: Date.now(),
      finishReason: 'stop',
      usage: {
        promptTokens: request.message.length / 4,
        completionTokens: randomResponse.length / 4,
        totalTokens: (request.message.length + randomResponse.length) / 4,
      },
    };
  },

  async streamMessage(
    request: ChatRequest,
    onChunk: (chunk: string) => void
  ): Promise<ChatResponse> {
    const responseText = `Here's my thought about "${request.message}": This is a streaming response simulation. Each word appears as it's generated. The real AI will provide much more meaningful responses.`;
    const words = responseText.split(' ');

    for (const word of words) {
      await new Promise(resolve => setTimeout(resolve, 80));
      onChunk(word + ' ');
    }

    return {
      id: Date.now().toString(),
      content: responseText,
      role: 'assistant',
      timestamp: Date.now(),
      finishReason: 'stop',
    };
  },

  getConversations: async (): Promise<Conversation[]> => {
    return [
      {
        id: '1',
        title: 'Welcome Chat',
        messages: [
          {
            id: '1-1',
            role: 'assistant',
            content: 'Hello! How can I help you today?',
            timestamp: Date.now() - 60000,
          },
        ],
        createdAt: Date.now() - 60000,
        updatedAt: Date.now(),
      },
    ];
  },

  createConversation: async (title = 'New Chat'): Promise<Conversation> => {
    return {
      id: Date.now().toString(),
      title,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  },

  deleteConversation: async (conversationId: string): Promise<void> => {
    console.log('Deleting conversation:', conversationId);
  },
};
