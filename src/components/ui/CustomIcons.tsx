/**
 * Custom icons for lucide-react missing icons
 */
import { type SVGProps } from 'react';

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function ButterflyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2 C8 2 4 6 4 10 c0 3 2 6 5 9 3 3 7 5 11 5 4 0 8-2 11-5 3-3 5-6 5-9 C20 6 16 2 12 2 Z" />
      <path d="M12 8 Q9 6 8 8 Q7 10 9 12 Q8 14 12 16 Q16 14 15 12 Q17 10 15 8 Q16 6 12 8" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}