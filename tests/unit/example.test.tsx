import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from './utils/render';
import userEvent from '@testing-library/user-event';
import { invoke } from '@tauri-apps/api/core';
import React from 'react';

/**
 * 示例测试文件
 * 删除此文件后，开始编写实际的测试
 */

describe('测试环境配置验证', () => {
  it('Vitest 应该正常工作', () => {
    expect(1 + 1).toBe(2);
  });

  it('Testing Library 断言应该可用', () => {
    const div = document.createElement('div');
    div.innerHTML = '<button>Click me</button>';
    document.body.appendChild(div);

    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Click me');

    document.body.removeChild(div);
  });

  it('Tauri API Mock 应该可用', async () => {
    const mockInvoke = vi.mocked(invoke);
    mockInvoke.mockResolvedValueOnce({ success: true });

    const result = await invoke('some_command');
    expect(result).toEqual({ success: true });
    expect(mockInvoke).toHaveBeenCalledWith('some_command');
  });

  it('用户事件应该正常工作', async () => {
    render(<button onClick={() => console.log('clicked')}>Click me</button>);

    const button = screen.getByRole('button');
    const user = userEvent.setup();

    await user.click(button);
    // 在实际测试中，检查点击后的状态变化
  });
});

describe('React 组件测试示例', () => {
  it('应该渲染组件', () => {
    const TestComponent = () => <div>Hello, World!</div>;
    render(<TestComponent />);

    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  it('应该处理用户输入', async () => {
    const TestComponent = () => (
      <form>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Enter email" />
      </form>
    );

    render(<TestComponent />);
    const user = userEvent.setup();

    const input = screen.getByLabelText('Email');
    await user.type(input, 'test@example.com');

    expect(input).toHaveValue('test@example.com');
  });

  it('应该处理异步状态', async () => {
    const TestComponent = () => {
      const [data, setData] = React.useState<string>('');

      React.useEffect(() => {
        setTimeout(() => setData('Loaded!'), 100);
      }, []);

      return <div>{data || 'Loading...'}</div>;
    };

    render(<TestComponent />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Loaded!')).toBeInTheDocument();
    });
  });
});
