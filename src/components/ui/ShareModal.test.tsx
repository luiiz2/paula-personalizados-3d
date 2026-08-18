import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ShareModal } from './ShareModal';

describe('ShareModal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <ShareModal isOpen={false} onClose={onClose} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly with options for Copy, WhatsApp, Telegram, and Instagram when open', () => {
    render(<ShareModal isOpen={true} onClose={onClose} url="https://paulapersonalizados3d.com.br/" />);

    expect(
      screen.getByRole('dialog', { name: /compartilhar site/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copiar/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /compartilhar no whatsapp/i })).toHaveAttribute(
      'href',
      expect.stringContaining('whatsapp.com'),
    );
    expect(screen.getByRole('link', { name: /compartilhar no telegram/i })).toHaveAttribute(
      'href',
      expect.stringContaining('t.me/share'),
    );
    expect(screen.getByRole('link', { name: /compartilhar no instagram/i })).toHaveAttribute(
      'href',
      expect.stringContaining('instagram.com'),
    );
  });

  it('calls onClose when close button is clicked', () => {
    render(<ShareModal isOpen={true} onClose={onClose} />);

    const closeBtn = screen.getByRole('button', {
      name: /fechar janela de compartilhamento/i,
    });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    render(<ShareModal isOpen={true} onClose={onClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('copies link to clipboard when Copiar is clicked', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<ShareModal isOpen={true} onClose={onClose} url="https://paulapersonalizados3d.com.br/" />);

    const copyBtn = screen.getByRole('button', { name: /copiar/i });
    fireEvent.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalledWith('https://paulapersonalizados3d.com.br/');
    expect(await screen.findByText(/copiado!/i)).toBeInTheDocument();
  });
});
