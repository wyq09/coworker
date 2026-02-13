import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../utils/render';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/Input';

describe('Input 组件', () => {
  describe('渲染测试', () => {
    it('应该渲染输入框', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('应该显示 label', () => {
      render(<Input label="Email" />);
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('应该显示错误消息', () => {
      render(<Input error="Required field" />);
      expect(screen.getByText('Required field')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveClass('ring-2', 'ring-red-500');
    });

    it('没有 label 时不应渲染 label 元素', () => {
      render(<Input />);
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });
  });

  describe('交互测试', () => {
    it('应该能够输入文本', async () => {
      const user = userEvent.setup();
      render(<Input />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Hello World');

      expect(input).toHaveValue('Hello World');
    });

    it('应该响应 onChange 事件', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'a');

      expect(handleChange).toHaveBeenCalled();
    });

    it('应该支持清除输入', async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="text" />);

      const input = screen.getByRole('textbox');
      await user.clear(input);

      expect(input).toHaveValue('');
    });
  });

  describe('Props 传递测试', () => {
    it('应该传递 placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('应该传递 type 属性', () => {
      render(<Input type="password" />);
      expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password');
    });

    it('应该传递 name 属性', () => {
      render(<Input name="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'email');
    });

    it('应该传递 disabled 属性', () => {
      render(<Input disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('应该传递自定义 className', () => {
      render(<Input className="custom-class" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });

    it('应该支持 ref 转发', () => {
      const ref = { current: null };
      render(<Input ref={ref as any} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('可访问性测试', () => {
    it('label 应该正确关联到输入框', () => {
      render(<Input label="Email" id="email-input" />);

      const label = screen.getByText('Email');
      const input = screen.getByRole('textbox');

      expect(label).toHaveAttribute('for', 'email-input');
      expect(input).toHaveAttribute('id', 'email-input');
    });

    it('错误消息应该是可访问的', () => {
      render(<Input error="Invalid email" />);

      const errorMessage = screen.getByText('Invalid email');
      expect(errorMessage).toHaveClass('text-red-500');
    });
  });
});
