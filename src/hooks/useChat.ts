/**
 * 聊天 Hook
 * 管理聊天状态和消息
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { Message, Conversation } from '@/types';
import { mockChatService } from '@/services/chat';

interface UseChatOptions {
  conversationId?: string;
}

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedContent, setStreamedContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 清理函数
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
      status: 'sending',
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    setStreamedContent('');
    setIsStreaming(true);

    try {
      // 模拟流式响应
      abortControllerRef.current = new AbortController();

      let fullResponse = '';

      await mockChatService.streamMessage(
        { message: content, conversationId: options.conversationId },
        (chunk) => {
          fullResponse += chunk;
          setStreamedContent(fullResponse);
        }
      );

      // 添加 AI 消息
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fullResponse,
        timestamp: Date.now(),
        status: 'sent',
      };

      setMessages(prev => [...prev, aiMessage]);

      // 更新用户消息状态为已发送
      setMessages(prev => prev.map(msg =>
        msg.id === userMessage.id ? { ...msg, status: 'sent' as const } : msg
      ));

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);

      // 更新用户消息状态为失败
      setMessages(prev => prev.map(msg =>
        msg.id === userMessage.id ? { ...msg, status: 'failed' as const } : msg
      ));
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      setStreamedContent('');
    }
  }, [isLoading, options.conversationId]);

  const retryMessage = useCallback(async (messageId: string) => {
    const messageToRetry = messages.find(m => m.id === messageId);
    if (!messageToRetry || messageToRetry.role !== 'user') return;

    // 删除失败的消息和后续的 AI 消息
    setMessages(prev => {
      const index = prev.findIndex(m => m.id === messageId);
      return prev.slice(0, index);
    });

    // 重新发送
    await sendMessage(messageToRetry.content);
  }, [messages, sendMessage]);

  const deleteMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const regenerateLastResponse = useCallback(async () => {
    const lastAiMessageIndex = [...messages]
      .reverse()
      .findIndex(m => m.role === 'assistant');

    if (lastAiMessageIndex === -1) return;

    // 删除最后的 AI 消息
    const actualIndex = messages.length - 1 - lastAiMessageIndex;
    const userMessage = messages[actualIndex - 1];

    if (userMessage && userMessage.role === 'user') {
      setMessages(prev => prev.slice(0, actualIndex));
      await sendMessage(userMessage.content);
    }
  }, [messages, sendMessage]);

  return {
    messages,
    isLoading,
    isStreaming,
    streamedContent,
    error,
    sendMessage,
    retryMessage,
    deleteMessage,
    clearChat,
    regenerateLastResponse,
  };
}

/**
 * 对话列表 Hook
 */
export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadConversations = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await mockChatService.getConversations();
      setConversations(data);
    } catch (err) {
      console.error('Failed to load conversations:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createConversation = useCallback(async (title?: string) => {
    try {
      const newConversation = await mockChatService.createConversation(title);
      setConversations(prev => [newConversation, ...prev]);
      return newConversation;
    } catch (err) {
      console.error('Failed to create conversation:', err);
      throw err;
    }
  }, []);

  const deleteConversation = useCallback(async (conversationId: string) => {
    try {
      await mockChatService.deleteConversation(conversationId);
      setConversations(prev => prev.filter(c => c.id !== conversationId));
    } catch (err) {
      console.error('Failed to delete conversation:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return {
    conversations,
    isLoading,
    loadConversations,
    createConversation,
    deleteConversation,
  };
}
