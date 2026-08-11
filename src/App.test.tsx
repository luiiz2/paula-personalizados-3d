import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('commercial landing page', () => {
  it('assembles the approved short conversion journey', () => {
    render(<App />);

    const heroHeading = screen.getByRole('heading', { level: 1 });
    const artisanHeading = screen.getByRole('heading', {
      level: 2,
      name: /feito à mão\. feito pra durar\./i,
    });
    const transformationHeading = screen.getByRole('heading', {
      level: 2,
      name: /da sua foto para o 3d/i,
    });
    const categoriesHeading = screen.getByRole('heading', {
      level: 2,
      name: /nossas categorias/i,
    });

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(heroHeading.compareDocumentPosition(artisanHeading)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(artisanHeading.compareDocumentPosition(transformationHeading)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(transformationHeading.compareDocumentPosition(categoriesHeading)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    const channelsHeading = screen.getByRole('heading', {
      level: 2,
      name: /onde você nos encontra/i,
    });
    const closingHeading = screen.getByRole('heading', {
      level: 2,
      name: /feito para quem importa/i,
    });
    const closingChapter = channelsHeading.closest<HTMLElement>('.commercial-closing-chapter');
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');

    expect(channelsHeading).toBeVisible();
    expect(closingHeading).toBeVisible();
    expect(closingChapter).toContainElement(closingHeading);
    expect(main).toContainElement(closingChapter);
    expect(main).not.toContainElement(footer);
    expect(screen.getByRole('link', { name: /ir para o conteúdo principal/i })).toHaveAttribute(
      'href',
      '#main-content',
    );
  });
});
