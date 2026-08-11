import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Gallery } from './Gallery';

describe('Gallery', () => {
  it('keeps each gallery item semantic while preserving the links as links', () => {
    render(<Gallery />);

    const gallery = screen.getByRole('list', { name: /galeria de trabalhos/i });
    const items = within(gallery).getAllByRole('listitem');
    const links = within(gallery).getAllByRole('link');

    expect(items).toHaveLength(12);
    expect(links).toHaveLength(12);
    items.forEach((item) => expect(within(item).getByRole('link')).toBeVisible());
  });
});
