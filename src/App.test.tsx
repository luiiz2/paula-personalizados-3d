import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('commercial landing page', () => {
  it('assembles the approved short conversion journey', () => {
    render(<App />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 2, name: /da sua foto para o 3d/i })).toBeVisible();
    expect(screen.getByRole('heading', { level: 2, name: /nossas categorias/i })).toBeVisible();
    expect(screen.getByRole('heading', { level: 2, name: /onde você nos encontra/i })).toBeVisible();
    expect(screen.getByRole('heading', { level: 2, name: /muito mais que presentes/i })).toBeVisible();
    expect(screen.getByRole('link', { name: /ir para o conteúdo principal/i })).toHaveAttribute(
      'href',
      '#main-content',
    );
  });
});
