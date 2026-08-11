import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { links } from '@/data/links';
import { Header } from './Header';

afterEach(cleanup);

describe('Header', () => {
  it('uses the commercial anchors and general WhatsApp CTA', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Como funciona' })).toHaveAttribute(
      'href',
      '#como-funciona',
    );
    expect(screen.getByRole('link', { name: 'Categorias' })).toHaveAttribute(
      'href',
      '#categorias',
    );
    expect(screen.getByRole('link', { name: /criar personalizado/i })).toHaveAttribute(
      'href',
      links.whatsapp,
    );
  });

  it('does not render WhatsApp CTAs when the channel is unavailable', () => {
    const configuredWhatsapp = links.whatsapp;
    Object.defineProperty(links, 'whatsapp', { value: '' });

    try {
      render(<Header />);

      expect(
        screen.queryByText(/criar personalizado/i, { selector: 'a' }),
      ).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
      const dialog = screen.getByRole('dialog', { name: 'Menu de navegação' });

      expect(
        within(dialog).queryByText(/criar personalizado/i, { selector: 'a' }),
      ).not.toBeInTheDocument();
    } finally {
      Object.defineProperty(links, 'whatsapp', { value: configuredWhatsapp });
    }
  });

  it('closes the mobile dialog with Escape and restores trigger focus', async () => {
    render(<Header />);

    const trigger = screen.getByRole('button', { name: 'Abrir menu' });
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Menu de navegação' });
    expect(dialog).toBeInTheDocument();

    await waitFor(() => {
      expect(within(dialog).getByRole('button', { name: 'Fechar menu' })).toHaveFocus();
    });

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: 'Menu de navegação' })).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
  });
});
