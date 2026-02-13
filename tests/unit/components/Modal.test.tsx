import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../utils/render';
import userEvent from '@testing-library/user-event';
import { Modal } from '@/components/Modal';

describe('Modal 组件', () => {
  const handleClose = vi.fn();

  beforeEach(() => {
    handleClose.mockClear();
  });

  afterEach(() => {
    // 清理 body 样式
    document.body.style.overflow = '';
  });

  describe('渲染测试', () => {
    it('isOpen 为 false 时不应该渲染', () => {
      render(<Modal isOpen={false} onClose={handleClose}>Content</Modal>);
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('isOpen 为 true 时应该渲染', () => {
      render(<Modal isOpen={true} onClose={handleClose}>Content</Modal>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('应该渲染标题', () => {
      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          Content
        </Modal>
      );
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('应该渲染 footer', () => {
      render(
        <Modal
          isOpen={true}
          onClose={handleClose}
          footer={<button>Cancel</button>}
        >
          Content
        </Modal>
      );
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });
  });

  describe('交互测试', () => {
    it('点击遮罩层应该关闭模态框', async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          Content
        </Modal>
      );

      const overlay = screen.getByText('Content').closest('.ios-modal-overlay');
      await user.click(overlay!);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('点击内容区域不应该关闭模态框', async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          Content
        </Modal>
      );

      const content = screen.getByText('Content').closest('.ios-modal-content');
      await user.click(content!);

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('点击关闭按钮应该关闭模态框', async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={handleClose} title="Test">
          Content
        </Modal>
      );

      const closeButton = screen.getByRole('button');
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('按 ESC 键应该关闭模态框', async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          Content
        </Modal>
      );

      await user.keyboard('{Escape}');

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Body 滚动锁定测试', () => {
    it('打开时应该锁定 body 滚动', () => {
      render(
        <Modal isOpen={true} onClose={handleClose}>
          Content
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('关闭时应该恢复 body 滚动', async () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={handleClose}>
          Content
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Modal isOpen={false} onClose={handleClose}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('');
      });
    });

    it('卸载时应该恢复 body 滚动', () => {
      const { unmount } = render(
        <Modal isOpen={true} onClose={handleClose}>
          Content
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('可访问性测试', () => {
    it('应该有正确的层级结构', () => {
      render(
        <Modal isOpen={true} onClose={handleClose} title="Test">
          Content
        </Modal>
      );

      const overlay = screen.getByText('Content').closest('.ios-modal-overlay');
      const content = screen.getByText('Content').closest('.ios-modal-content');

      expect(overlay).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });

    it('标题应该是 h2 标签', () => {
      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          Content
        </Modal>
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Test Modal');
    });
  });
});
