import { useState } from 'react';
import { Image } from '@/components/ui/Image';
import type { CommercialImageAsset } from '@/data/commercial';
import { cn } from '@/lib/utils';

export interface CommercialImageProps {
  asset: CommercialImageAsset;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  decorative?: boolean;
}

export function CommercialImage({
  asset,
  priority = false,
  sizes,
  className,
  imageClassName,
  decorative = false,
}: CommercialImageProps) {
  const [failed, setFailed] = useState(false);
  const accessibleAlt = decorative ? '' : asset.alt;

  return (
    <div
      className={cn('commercial-image', className)}
      data-image-state={failed ? 'failed' : 'ready'}
    >
      {failed ? (
        <span
          className="commercial-image__fallback"
          role={decorative ? undefined : 'img'}
          aria-label={decorative ? undefined : asset.alt}
          aria-hidden={decorative || undefined}
        >
          {decorative ? null : 'Imagem temporariamente indisponível'}
        </span>
      ) : (
        <Image
          src={asset.src}
          alt={accessibleAlt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn('commercial-image__media', imageClassName)}
          style={{ objectPosition: asset.objectPosition }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
