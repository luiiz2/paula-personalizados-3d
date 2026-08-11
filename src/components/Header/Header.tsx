/**
 * Header — Minimalista, sticky, scroll effect (PRD §17–20)
 * Desktop: Logo + Menu + CTA comercial
 * Mobile: Logo + Hambúrguer + Full-screen menu
 */
import { useState, useEffect, useRef } from 'react';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { cn, lockBodyScroll } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { hasLink, links } from '@/data/links';

const navItems = [
  { label: 'Início', href: '#hero' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Categorias', href: '#categorias' },
  { label: 'Sobre', href: '#sobre' },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  // Scroll effect (PRD §19)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu body lock
  useEffect(() => {
    lockBodyScroll(mobileOpen);
    return () => lockBodyScroll(false);
  }, [mobileOpen]);

  // Keep keyboard focus inside the modal mobile menu while it is open.
  useEffect(() => {
    if (!mobileOpen) return;

    const dialog = mobileMenuRef.current;
    const mobileToggle = mobileToggleRef.current;

    const getFocusableElements = () => Array.from(
      dialog?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
      ) ?? []
    );

    const focusFrame = window.requestAnimationFrame(() => {
      getFocusableElements()[0]?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;
      const focusableElements = getFocusableElements();
      if (!focusableElements.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      mobileToggle?.focus();
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-400 ease-soft',
          scrolled
            ? 'bg-cream/80 backdrop-blur-md border-b border-ink/5 shadow-[0_2px_20px_-4px_rgb(23_23_23/0.06)]'
            : 'border-b border-pink/10 bg-cream/45 backdrop-blur-sm'
        )}
        role="banner"
      >
        <nav
          className="container-prose flex items-center justify-between h-18 md:h-20"
          aria-label="Navegação principal"
        >
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded-lg"
            aria-label="Paula Personalizados 3D - Início"
          >
            <svg
              className={cn('h-8 w-8 transition-colors', scrolled ? 'text-ink' : 'text-pink')}
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M16 2 C8 2 2 8 2 16 c0 5 3 9 7 13 4 4 9 7 14 7 5 0 10-3 14-7 4-4 7-8 7-13 C30 8 24 2 16 2 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path d="M16 10 Q12 6 10 10 Q8 14 12 16 Q10 18 16 22 Q22 18 20 16 Q24 14 22 10 Q20 6 16 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="16" cy="16" r="3" fill="currentColor" />
            </svg>
            <span className={cn(
              'font-editorial font-black text-xl md:text-2xl tracking-tight hidden sm:block transition-colors',
              scrolled ? 'text-ink' : 'text-ink/90',
            )}>
              Paula Personalizados 3D
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={cn(
                      'font-sans font-medium text-sm transition-colors link-underline',
                      scrolled ? 'text-ink/80 hover:text-pink' : 'text-ink/75 hover:text-pink',
                    )}
                    onClick={closeMobile}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {hasLink('whatsapp') && (
              <ExternalLink
                href={links.whatsapp}
                showIcon={false}
                className="commercial-button commercial-button--rose"
              >
                Criar personalizado <span aria-hidden="true">→</span>
              </ExternalLink>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={mobileToggleRef}
            type="button"
            className={cn(
              'lg:hidden p-2 rounded-xl backdrop-blur border transition-colors',
              scrolled ? 'bg-white/50 border-ink/5' : 'bg-cream/60 border-pink/20',
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen
              ? <X className="h-6 w-6 text-ink" aria-hidden="true" />
              : <Menu className="h-6 w-6 text-ink" aria-hidden="true" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="fixed inset-0 z-[60] bg-cream/98 backdrop-blur-md animate-in fade-in-0 duration-300 ease-soft lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div className="flex h-full flex-col">
            {/* Header do menu mobile */}
            <div className="flex items-center justify-between p-6 border-b border-ink/5">
              <span className="font-editorial font-black text-2xl text-ink">Menu</span>
              <button
                type="button"
                onClick={closeMobile}
                className="p-2 rounded-xl bg-ink/5 text-ink hover:bg-ink/10 transition-colors"
                aria-label="Fechar menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 py-6 px-6 overflow-y-auto" aria-label="Navegação mobile">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={closeMobile}
                      className="block px-4 py-3 text-lg font-sans font-medium text-ink/80 hover:text-pink hover:bg-pink-soft/30 rounded-xl transition-colors link-underline"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              {hasLink('whatsapp') && (
                <ExternalLink
                  href={links.whatsapp}
                  showIcon={false}
                  className="commercial-button commercial-button--rose mt-8 w-full"
                  onClick={closeMobile}
                >
                  Criar personalizado <span aria-hidden="true">→</span>
                </ExternalLink>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
