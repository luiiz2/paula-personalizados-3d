import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { CommercialImage } from './CommercialImage';

const asset = {
  src: '/assets/photo_2026-08-09_20-15-54.jpg',
  alt: 'Pai e filho em uma peça personalizada',
  objectPosition: '50% 58%',
};

afterEach(cleanup);

describe('CommercialImage', () => {
  it('eagerly loads a priority image with responsive sizing', () => {
    render(<CommercialImage asset={asset} priority sizes="50vw" />);

    const image = screen.getByRole('img', { name: asset.alt });
    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).toHaveAttribute('fetchpriority', 'high');
    expect(image).toHaveAttribute('sizes', '50vw');
    expect(image).toHaveStyle({ objectPosition: '50% 58%' });
  });

  it('shows a labeled chromatic fallback when loading fails', () => {
    render(<CommercialImage asset={asset} />);
    fireEvent.error(screen.getByRole('img', { name: asset.alt }));

    expect(screen.getByRole('img', { name: asset.alt })).toHaveTextContent(
      'Imagem temporariamente indisponível',
    );
  });
});
