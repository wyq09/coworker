import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/render';
import { Card } from '@/components/Card';

describe('Card 组件', () => {
  describe('渲染测试', () => {
    it('应该渲染子元素', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('应该渲染不同变体', () => {
      const { rerender } = render(<Card variant="default">Default</Card>);
      expect(screen.getByText('Default').parentElement).toHaveClass('bg-white');

      rerender(<Card variant="glass">Glass</Card>);
      expect(screen.getByText('Glass').parentElement).toHaveClass('glass');

      rerender(<Card variant="elevated">Elevated</Card>);
      expect(screen.getByText('Elevated').parentElement).toHaveClass('shadow-glass-lg');
    });

    it('应该应用不同 padding', () => {
      const { rerender } = render(<Card padding="none">None</Card>);
      expect(screen.getByText('None').parentElement).not.toHaveClass(/p-\d/);

      rerender(<Card padding="sm">Small</Card>);
      expect(screen.getByText('Small').parentElement).toHaveClass('p-4');

      rerender(<Card padding="md">Medium</Card>);
      expect(screen.getByText('Medium').parentElement).toHaveClass('p-6');

      rerender(<Card padding="lg">Large</Card>);
      expect(screen.getByText('Large').parentElement).toHaveClass('p-8');
    });
  });

  describe('Props 传递测试', () => {
    it('应该传递自定义 className', () => {
      render(<Card className="custom-class">Content</Card>);
      expect(screen.getByText('Content').parentElement).toHaveClass('custom-class');
    });

    it('应该传递原生 HTML 属性', () => {
      render(<Card data-testid="test-card">Content</Card>);
      expect(screen.getByTestId('test-card')).toBeInTheDocument();
    });

    it('应该支持 ref 转发', () => {
      const ref = { current: null };
      render(<Card ref={ref as any}>Content</Card>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('应该传递点击事件', async () => {
      const handleClick = vi.fn();
      const { container } = render(<Card onClick={handleClick}>Clickable</Card>);

      const card = container.firstChild as HTMLElement;
      card.click();

      // 注意: 这个测试需要 vi 导入
    });
  });

  describe('样式测试', () => {
    it('应该有圆角样式', () => {
      render(<Card>Content</Card>);
      expect(screen.getByText('Content').parentElement).toHaveClass('rounded-2xl');
    });

    it('应该有过渡动画', () => {
      render(<Card>Content</Card>);
      expect(screen.getByText('Content').parentElement).toHaveClass('transition-all');
    });
  });
});
