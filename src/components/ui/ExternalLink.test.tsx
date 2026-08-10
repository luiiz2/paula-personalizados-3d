import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExternalLink } from './ExternalLink';

describe('ExternalLink', () => {
  it('uses a secure native link without replacing its destination', () => {
    render(<ExternalLink href="https://example.com">Exemplo</ExternalLink>);

    const link = screen.getByRole('link', { name: /exemplo/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
  });

  it('prevents navigation when no destination is configured', () => {
    render(<ExternalLink href="">Indisponível</ExternalLink>);

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    screen.getByText('Indisponível').closest('a')?.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });
});
