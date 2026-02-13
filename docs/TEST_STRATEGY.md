# Coworker 桌面应用测试策略

## 概述

本文档定义了 Coworker 桌面应用（基于 React + Tauri）的全面测试策略。

## 测试金字塔

```
        /\
       /  \      E2E Tests (10%)
      /____\     - 关键用户流程
     /      \    - 跨系统集成
    /        \
   /          \  Integration Tests (30%)
  /__________\   - 组件交互
                - Tauri API 集成
              \  Unit Tests (60%)
               \   - 纯函数
                \  - 工具函数
                 \  - React 组件
```

## 1. 单元测试 (Unit Tests)

### 框架选择: Vitest

**选择理由:**
- 与 Vite 无缝集成，配置简单
- 执行速度快
- 兼容 Jest API，迁移成本低
- 原生支持 ESM
- 内置 TypeScript 支持

### 测试范围

- **工具函数**: 纯函数逻辑测试
- **React Hooks**: 自定义 Hook 行为测试
- **React 组件**: 组件渲染、props、状态测试
- **状态管理**: 状态逻辑测试
- **验证逻辑**: 表单验证、数据转换

### 工具库

- `@testing-library/react`: React 组件测试
- `@testing-library/user-event`: 用户交互模拟
- `@testing-library/jest-dom`: DOM 断言扩展
- `vitest`: 测试运行器

## 2. 组件测试 (Component Tests)

### 框架: React Testing Library + Vitest

### 测试策略

- **用户视角测试**: 关注用户看到和交互的内容
- **行为驱动**: 测试组件行为而非实现细节
- **可访问性**: 使用 a11y 断言

### 测试覆盖点

- 组件渲染正确性
- 用户交互响应
- Props 变化响应
- 边界条件处理
- 错误状态显示
- Loading 状态
- 空状态显示

## 3. 集成测试 (Integration Tests)

### 测试范围

- **Tauri 命令调用**: 前端与 Rust 后端通信
- **多组件协作**: 组件间数据流和事件传递
- **状态管理集成**: 全局状态与组件同步
- **路由集成**: 页面导航和参数传递

### Mock 策略

- Tauri API 使用 `@tauri-apps/api/mocks` 模块
- 网络请求使用 MSW (Mock Service Worker)
- 文件系统使用 Tauri 提供的 mock

## 4. E2E 测试 (End-to-End Tests)

### 框架选择: Playwright

**选择理由:**
- 官方 Tauri 集成支持 (`@tauri-apps/plugin-playwright`)
- 跨浏览器支持
- 强大的选择器引擎
- 内置等待机制
- 优秀的调试工具
- 并行执行能力

### 测试场景

#### 核心用户流程

1. **用户认证流程**
   - 登录/登出
   - 注册新用户
   - 密码重置

2. **工作区管理**
   - 创建/删除工作区
   - 切换工作区
   - 工作区设置

3. **协作功能**
   - 创建/加入会议
   - 屏幕共享
   - 聊天功能
   - 文件共享

4. **设置管理**
   - 主题切换 (iOS 26 Liquid Glass 风格)
   - 通知设置
   - 快捷键配置

5. **数据同步**
   - 本地数据持久化
   - 云同步功能

### 测试环境

- **开发环境**: 本地运行
- **CI 环境**: GitHub Actions / GitLab CI
- **测试矩阵**: macOS, Windows, Linux

## 5. 测试覆盖率目标

| 类型 | 目标覆盖率 | 说明 |
|------|-----------|------|
| Statements | 80% | 语句覆盖率 |
| Branches | 75% | 分支覆盖率 |
| Functions | 80% | 函数覆盖率 |
| Lines | 80% | 行覆盖率 |

## 6. CI/CD 集成

### GitHub Actions 工作流

```yaml
# 测试工作流
1. 单元测试 - 每次提交
2. 组件测试 - 每次 PR
3. E2E 测试 - 合并到 main 前
4. 覆盖率报告 - 每周生成
```

### 质量门禁

- PR 必须通过所有单元和组件测试
- 覆盖率不能下降
- E2E 测试必须通过才能合并到 main

## 7. 测试数据管理

### Fixtures

- 预定义测试用户
- 标准测试工作区
- Mock 文件数据
- 模拟 API 响应

### 数据清理

- 每次测试后清理
- 独立测试数据库
- 隔离的文件系统

## 8. 性能测试

### 测试指标

- 应用启动时间 < 2s
- 页面切换响应 < 100ms
- 大列表渲染性能 (>1000 项)

### 工具

- Lighthouse (性能分析)
- Playwright Performance (运行时性能)

## 9. 可访问性测试

### 标准

- WCAG 2.1 AA 级别
- 键盘导航支持
- 屏幕阅读器兼容

### 工具

- `@testing-library/jest-dom`
- `jest-axe`
- Playwright A11y 扩展

## 10. 测试文件组织

```
tests/
├── unit/                  # 单元测试
│   ├── components/        # 组件测试
│   ├── hooks/            # Hook 测试
│   ├── utils/            # 工具函数测试
│   └── __mocks__/        # Mock 数据
├── integration/          # 集成测试
│   ├── tauri-api/        # Tauri API 测试
│   └── workflows/        # 工作流测试
├── e2e/                  # E2E 测试
│   ├── auth/
│   ├── workspace/
│   └── settings/
├── fixtures/             # 测试 Fixtures
│   ├── users.ts
│   ├── workspaces.ts
│   └── index.ts
└── utils/                # 测试工具函数
    ├── render.tsx
    └── mock-tauri.ts
```

## 11. 测试命名规范

### 文件命名

- 单元测试: `*.test.ts` 或 `*.test.tsx`
- 集成测试: `*.integration.test.ts`
- E2E 测试: `*.spec.ts`

### 用例命名

```typescript
describe('ComponentName', () => {
  describe('when user clicks button', () => {
    it('should show dialog', () => {});
    it('should emit event', () => {});
  });

  describe('when data is loading', () => {
    it('should show skeleton', () => {});
  });
});
```

## 12. Mock 策略

### Tauri API Mock

```typescript
// 使用 @tauri-apps/api/mocks
import { mockIPC, clearMocks } from '@tauri-apps/api/mocks';
```

### 外部服务 Mock

```typescript
// MSW for HTTP
import { rest } from 'msw';
import { setupServer } from 'msw/node';
```

## 13. 测试最佳实践

### DO

- 测试用户行为而非实现细节
- 保持测试简单独立
- 使用描述性的测试名称
- Mock 外部依赖
- 测试边界条件

### DON'T

- 不要测试第三方库
- 不要在测试中包含真实 API 调用
- 不要编写脆弱的选择器
- 不要在单元测试中测试多个功能

## 14. 测试维护

- 定期 review 和更新测试
- 删除过时的测试
- 重构重复的测试逻辑
- 保持测试与代码同步更新

## 15. 工具链版本

- Vitest: ^2.x
- Playwright: ^1.40+
- Testing Library: ^14.x
- MSW: ^2.x
