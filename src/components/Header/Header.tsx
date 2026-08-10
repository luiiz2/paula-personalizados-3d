/**
 * Header — Minimalista, sticky, scroll effect (PRD §17–20)
 * Desktop: Logo + Menu + Dropdown "Onde comprar" + "Fale conosco"
 * Mobile: Logo + Hambúrguer + Full-screen menu
 */
import { useState, useEffect, useRef } from 'react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { cn, lockBodyScroll } from '@/lib/utils';
import { Menu, X, ShoppingBag, MessageSquare, ChevronDown, Store } from 'lucide-react';
import { links, hasLink, openExternal } from '@/data/links';

const navItems = [
  { label: 'Início', href: '#hero' },
  { label: 'Personalizados', href: '#produtos' },
  { label: 'Nosso trabalho', href: '#galeria' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
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

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Close dropdown with Escape and restore focus to its trigger.
  useEffect(() => {
    if (!dropdownOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setDropdownOpen(false);
      dropdownButtonRef.current?.focus();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dropdownOpen]);

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
            : 'border-b border-white/10 bg-ink/20 backdrop-blur-sm'
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
              className={cn('h-8 w-8 transition-colors', scrolled ? 'text-ink' : 'text-white')}
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
              scrolled ? 'text-ink' : 'text-white',
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
                      scrolled ? 'text-ink/80 hover:text-pink' : 'text-white/80 hover:text-white',
                    )}
                    onClick={closeMobile}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Ações: Onde comprar + Fale conosco */}
            <div className="flex items-center gap-3 ml-4">
              {/* Dropdown Onde comprar */}
              <div className="relative" ref={dropdownRef}>
                <button
                  ref={dropdownButtonRef}
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm font-sans font-medium transition-colors rounded-xl backdrop-blur border',
                    scrolled
                      ? 'text-ink/80 hover:text-pink bg-white/50 border-ink/5'
                      : 'text-white/85 hover:text-white bg-white/10 border-white/20',
                  )}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  aria-label="Onde comprar"
                >
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  Onde comprar
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform', dropdownOpen && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white border border-ink/5 shadow-[0_20px_50px_-12px_rgb(23_23_23/0.15)] py-2 animate-in fade-in-0 zoom-in-95 duration-200 ease-soft"
                  >
                    {hasLink('shopee') && (
                      <button
                        onClick={() => openExternal(links.shopee)}
                        className="w-full px-4 py-2 text-left text-sm font-sans text-ink/80 hover:text-pink hover:bg-pink-soft/30 transition-colors flex items-center gap-2"
                      >
                        <ShoppingBag className="h-4 w-4 text-pink" aria-hidden="true" />
                        Shopee
                        <svg className="ml-auto h-3 w-3 text-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>
                    )}
                    {hasLink('mercadoLivre') && (
                      <button
                        onClick={() => openExternal(links.mercadoLivre)}
                        className="w-full px-4 py-2 text-left text-sm font-sans text-ink/80 hover:text-pink hover:bg-pink-soft/30 transition-colors flex items-center gap-2"
                      >
                        <Store className="h-4 w-4 text-pink" aria-hidden="true" />
                        Mercado Livre
                        <svg className="ml-auto h-3 w-3 text-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Fale conosco — WhatsApp */}
              {hasLink('whatsapp') && (
                <AnimatedButton
                  variant="primary"
                  size="sm"
                  className="hidden sm:flex"
                  onClick={() => openExternal(links.whatsapp)}
                >
                  Fale conosco
                </AnimatedButton>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={mobileToggleRef}
            type="button"
            className={cn(
              'lg:hidden p-2 rounded-xl backdrop-blur border transition-colors',
              scrolled ? 'bg-white/50 border-ink/5' : 'bg-white/10 border-white/20',
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen
              ? <X className={cn('h-6 w-6', scrolled ? 'text-ink' : 'text-white')} />
              : <Menu className={cn('h-6 w-6', scrolled ? 'text-ink' : 'text-white')} />}
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

              {/* Divisor */}
              <div className="my-6 border-t border-ink/5" role="separator" />

              {/* Ações mobile */}
              <div className="space-y-3">
                {/* Onde comprar */}
                <details className="group">
                  <summary className="flex items-center justify-between px-4 py-3 text-lg font-sans font-medium text-ink/80 hover:text-pink cursor-pointer list-none">
                    <span className="flex items-center gap-3">
                      <ShoppingBag className="h-6 w-6 text-pink" aria-hidden="true" />
                      Onde comprar
                    </span>
                    <ChevronDown className="h-5 w-5 text-ink/50 group-open:rotate-180 transition-transform" aria-hidden="true" />
                  </summary>
                  <div className="px-4 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                    {hasLink('shopee') && (
                      <ExternalLink
                        href={links.shopee}
                        className="flex items-center gap-3 px-4 py-3 text-base font-sans text-ink/80 hover:text-pink hover:bg-pink-soft/30 rounded-xl transition-colors"
                      >
                        <ShoppingBag className="h-5 w-5 text-pink" aria-hidden="true" />
                        Shopee
                      </ExternalLink>
                    )}
                    {hasLink('mercadoLivre') && (
                      <ExternalLink
                        href={links.mercadoLivre}
                        className="flex items-center gap-3 px-4 py-3 text-base font-sans text-ink/80 hover:text-pink hover:bg-pink-soft/30 rounded-xl transition-colors"
                      >
                        <Store className="h-5 w-5 text-pink" aria-hidden="true" />
                        Mercado Livre
                      </ExternalLink>
                    )}
                  </div>
                </details>

                {/* Redes sociais */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {hasLink('instagram') && (
                    <ExternalLink
                      href={links.instagram}
                      className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-ink/10 text-ink/80 hover:text-pink hover:border-pink/30 transition-colors font-sans font-medium"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      Instagram
                    </ExternalLink>
                  )}
                  {hasLink('whatsapp') && (
                    <AnimatedButton
                      variant="primary"
                      className="flex-1 min-w-[140px]"
                      onClick={() => openExternal(links.whatsapp)}
                    >
                      <MessageSquare className="h-5 w-5" aria-hidden="true" />
                      WhatsApp
                    </AnimatedButton>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
