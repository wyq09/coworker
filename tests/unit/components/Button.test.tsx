import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../utils/render';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/Button';

describe('Button 组件', () => {
  describe('渲染测试', () => {
    it('应该渲染子元素', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('应该渲染不同变体', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>);
      expect(screen.getByRole('button')).toHaveClass('gradient-bg');

      rerender(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-gray-200');

      rerender(<Button variant="glass">Glass</Button>);
      expect(screen.getByRole('button')).toHaveClass('glass');

      rerender(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-transparent');
    });

    it('应该渲染不同尺寸', () => {
      const { rerender } = render(<Button size="sm">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5', 'text-sm');

      rerender(<Button size="md">Medium</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-base');

      rerender(<Button size="lg">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-8', 'py-4', 'text-lg');
    });
  });

  describe('交互测试', () => {
    it('应该响应点击事件', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('禁用状态不应响应点击', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button disabled onClick={handleClick}>Disabled</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('加载状态不应响应点击', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button isLoading onClick={handleClick}>Loading</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('加载状态测试', () => {
    it('加载状态应显示加载指示器', () => {
      render(<Button isLoading>Loading</Button>);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByText('Loading')).not.toBeInTheDocument();
    });

    it('加载状态应显示旋转动画', () => {
      render(<Button isLoading>Loading</Button>);

      const spinner = screen.getByRole('button').querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('加载状态应禁用按钮', () => {
      render(<Button isLoading>Loading</Button>);

      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Props 传递测试', () => {
    it('应该传递自定义 className', () => {
      render(<Button className="custom-class">Button</Button>);

      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('应该传递原生 HTML 属性', () => {
      render(<Button data-testid="test-button" type="submit">Submit</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('data-testid', 'test-button');
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('应该支持 ref 转发', () => {
      const ref = { current: null };

      render(<Button ref={ref as any}>Button</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('可访问性测试', () => {
    it('禁用状态应有正确的 aria 属性', () => {
      render(<Button disabled>Disabled</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('disabled');
    });

    it('应该有正确的按钮角色', () => {
      render(<Button>Button</Button>);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
