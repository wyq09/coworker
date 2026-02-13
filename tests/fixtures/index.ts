/**
 * 测试 Fixtures
 * 提供预定义的测试数据
 */

// 用户 Fixtures
export const userFixtures = {
  empty: () => ({}),

  // 基础用户
  basic: (overrides = {}) => ({
    id: 'user-1',
    name: 'Test User',
    email: 'test@example.com',
    avatar: null,
    bio: '',
    isOnline: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    ...overrides,
  }),

  // 在线用户
  online: (overrides = {}) => userFixtures.basic({ isOnline: true, ...overrides }),

  // 离线用户
  offline: (overrides = {}) => userFixtures.basic({ isOnline: false, ...overrides }),

  // 管理员用户
  admin: (overrides = {}) =>
    userFixtures.basic({
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      ...overrides,
    }),

  // 带头像的用户
  withAvatar: (overrides = {}) =>
    userFixtures.basic({
      avatar: 'https://example.com/avatar.jpg',
      ...overrides,
    }),

  // 多个用户
  many: (count: number, overrides = {}) =>
    Array.from({ length: count }, (_, i) =>
      userFixtures.basic({
        id: `user-${i + 1}`,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        ...overrides,
      })
    ),
};

// 工作区 Fixtures
export const workspaceFixtures = {
  empty: () => ({}),

  basic: (overrides = {}) => ({
    id: 'workspace-1',
    name: 'Test Workspace',
    description: 'A test workspace',
    slug: 'test-workspace',
    ownerId: 'user-1',
    settings: {
      isPublic: false,
      allowGuestAccess: false,
    },
    memberCount: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    ...overrides,
  }),

  // 公开工作区
  public: (overrides = {}) =>
    workspaceFixtures.basic({
      settings: { isPublic: true, allowGuestAccess: true },
      ...overrides,
    }),

  // 私有工作区
  private: (overrides = {}) =>
    workspaceFixtures.basic({
      settings: { isPublic: false, allowGuestAccess: false },
      ...overrides,
    }),

  // 多个工作区
  many: (count: number, overrides = {}) =>
    Array.from({ length: count }, (_, i) =>
      workspaceFixtures.basic({
        id: `workspace-${i + 1}`,
        name: `Workspace ${i + 1}`,
        slug: `workspace-${i + 1}`,
        ...overrides,
      })
    ),
};

// 会议 Fixtures
export const meetingFixtures = {
  empty: () => ({}),

  basic: (overrides = {}) => ({
    id: 'meeting-1',
    title: 'Test Meeting',
    description: 'A test meeting',
    workspaceId: 'workspace-1',
    createdBy: 'user-1',
    startTime: new Date().toISOString(),
    duration: 60,
    maxParticipants: 10,
    participantCount: 1,
    status: 'scheduled',
    recordingEnabled: false,
    chatEnabled: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    ...overrides,
  }),

  // 进行中的会议
  inProgress: (overrides = {}) =>
    meetingFixtures.basic({
      status: 'in_progress',
      ...overrides,
    }),

  // 已结束的会议
  ended: (overrides = {}) =>
    meetingFixtures.basic({
      status: 'ended',
      ...overrides,
    }),

  // 有多个参与者的会议
  withParticipants: (count: number, overrides = {}) =>
    meetingFixtures.basic({
      participantCount: count,
      participants: Array.from({ length: count }, (_, i) => ({
        userId: `user-${i + 1}`,
        joinedAt: new Date().toISOString(),
      })),
      ...overrides,
    }),
};

// 消息 Fixtures
export const messageFixtures = {
  empty: () => ({}),

  basic: (overrides = {}) => ({
    id: 'message-1',
    content: 'Test message',
    senderId: 'user-1',
    workspaceId: 'workspace-1',
    meetingId: null,
    replyTo: null,
    reactions: [],
    attachments: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    ...overrides,
  }),

  // 带附件的消息
  withAttachment: (overrides = {}) =>
    messageFixtures.basic({
      attachments: [
        {
          id: 'attachment-1',
          name: 'document.pdf',
          type: 'application/pdf',
          size: 102400,
          url: 'https://example.com/document.pdf',
        },
      ],
      ...overrides,
    }),

  // 带回复的消息
  withReply: (overrides = {}) =>
    messageFixtures.basic({
      replyTo: {
        id: 'message-0',
        content: 'Original message',
        senderId: 'user-2',
      },
      ...overrides,
    }),

  // 多条消息
  many: (count: number, overrides = {}) =>
    Array.from({ length: count }, (_, i) =>
      messageFixtures.basic({
        id: `message-${i + 1}`,
        content: `Message ${i + 1}`,
        createdAt: new Date(Date.now() + i * 1000).toISOString(),
        ...overrides,
      })
    ),
};

// 通知 Fixtures
export const notificationFixtures = {
  empty: () => ({}),

  basic: (overrides = {}) => ({
    id: 'notification-1',
    type: 'info',
    title: 'Test Notification',
    body: 'This is a test notification',
    data: {},
    read: false,
    createdAt: '2024-01-01T00:00:00Z',
    ...overrides,
  }),

  unread: (overrides = {}) => notificationFixtures.basic({ read: false, ...overrides }),

  read: (overrides = {}) => notificationFixtures.basic({ read: true, ...overrides }),

  // 多条通知
  many: (count: number, overrides = {}) =>
    Array.from({ length: count }, (_, i) =>
      notificationFixtures.basic({
        id: `notification-${i + 1}`,
        title: `Notification ${i + 1}`,
        ...overrides,
      })
    ),
};

// 导出所有 fixtures
export const fixtures = {
  user: userFixtures,
  workspace: workspaceFixtures,
  meeting: meetingFixtures,
  message: messageFixtures,
  notification: notificationFixtures,
};

// 默认导出
export default fixtures;
