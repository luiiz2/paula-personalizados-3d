import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { commercialChannels } from '@/data/commercial';
import { ChannelGrid } from './ChannelGrid';

describe('ChannelGrid', () => {
  it('renders the four approved destinations as secure links', () => {
    render(<ChannelGrid />);

    expect(screen.getAllByRole('link')).toHaveLength(4);

    for (const channel of commercialChannels) {
      const link = screen.getByRole('link', { name: new RegExp(channel.label, 'i') });
      expect(link).toHaveAttribute('href', channel.href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    }
  });
});
