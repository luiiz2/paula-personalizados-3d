import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
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
