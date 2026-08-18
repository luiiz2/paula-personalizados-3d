import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Check, Copy, MessageCircle, Share2, X } from 'lucide-react';
import { InstagramIcon, TelegramIcon } from '@/components/ui/CustomIcons';
import { ExternalLink } from '@/components/ui/ExternalLink';

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
  url?: string;
}

const DEFAULT_TITLE = 'Paula Personalizados 3D';
const DEFAULT_TEXT = 'Conheça a Paula Personalizados 3D — Transformamos fotos, desenhos e ideias em peças 3D únicas!';
const DEFAULT_URL = 'https://paulapersonalizados3d.com.br/';

export function ShareModal({
  isOpen,
  onClose,
  title = DEFAULT_TITLE,
  text = DEFAULT_TEXT,
  url,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [instagramFeedback, setInstagramFeedback] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const shareUrl = url || (typeof window !== 'undefined' && window.location.href ? window.location.href : DEFAULT_URL);
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${shareUrl}`)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
  const instagramProfileUrl = 'https://www.instagram.com/paulapersonalizados3d';

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap / initial focus
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleInstagramClick = async (_event: MouseEvent) => {
    await handleCopyLink();
    setInstagramFeedback(true);
    setTimeout(() => setInstagramFeedback(false), 4000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="share-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="share-modal-dialog relative w-full max-w-md rounded-3xl bg-white/95 p-6 md:p-8 shadow-2xl backdrop-blur-xl border border-[#f2d4d8] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="share-modal-close absolute top-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-[#8e4a5d] hover:bg-rose-100 hover:text-[#4a383b] transition-colors focus-visible:outline-2 focus-visible:outline-[#cc5270]"
          aria-label="Fechar janela de compartilhamento"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pr-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100/70 text-[#cc5270]">
            <Share2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 id="share-modal-title" className="text-xl font-bold text-[#3d2729]">
              Compartilhar site
            </h2>
            <p className="text-xs text-[#735158]">
              Espalhe o encanto de eternizar histórias em 3D
            </p>
          </div>
        </div>

        {/* Link Copy Box */}
        <div className="mt-6">
          <label htmlFor="share-link-input" className="block text-xs font-semibold text-[#5a3a41] mb-1.5">
            Link do site
          </label>
          <div className="flex items-center gap-2 rounded-2xl bg-[#fff8f9] p-1.5 border border-[#f5d9de]">
            <input
              id="share-link-input"
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent px-3 py-1.5 text-xs text-[#4a383b] font-medium outline-none truncate"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                copied
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-[#cc5270] hover:bg-[#b84360] text-white shadow-sm'
              } focus-visible:outline-2 focus-visible:outline-[#cc5270]`}
              aria-live="polite"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Channels Grid */}
        <div className="mt-6">
          <p className="text-xs font-semibold text-[#5a3a41] mb-3">
            Compartilhar diretamente
          </p>
          <div className="grid grid-cols-3 gap-3">
            {/* WhatsApp */}
            <ExternalLink
              href={whatsappShareUrl}
              showIcon={false}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#f0faf3] p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-md border border-[#c4ebd1] text-[#1e7e34] focus-visible:outline-2 focus-visible:outline-[#25d366]"
              aria-label="Compartilhar no WhatsApp"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366] text-white shadow-sm">
                <MessageCircle className="h-5 w-5 fill-current" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold text-[#1e5a32]">WhatsApp</span>
            </ExternalLink>

            {/* Telegram */}
            <ExternalLink
              href={telegramShareUrl}
              showIcon={false}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#f0f7fc] p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-md border border-[#c8e2f7] text-[#0088cc] focus-visible:outline-2 focus-visible:outline-[#0088cc]"
              aria-label="Compartilhar no Telegram"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0088cc] text-white shadow-sm">
                <TelegramIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold text-[#145a85]">Telegram</span>
            </ExternalLink>

            {/* Instagram */}
            <ExternalLink
              href={instagramProfileUrl}
              showIcon={false}
              onClick={handleInstagramClick}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#fff2f5] p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-md border border-[#fcd5df] text-[#e1306c] focus-visible:outline-2 focus-visible:outline-[#e1306c]"
              aria-label="Compartilhar no Instagram"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-sm">
                <InstagramIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold text-[#8c234a]">Instagram</span>
            </ExternalLink>
          </div>

          {instagramFeedback && (
            <p className="mt-2 text-center text-xs font-medium text-[#b84360] animate-in fade-in duration-150" aria-live="polite">
              ✨ Link copiado! Cole no seu Story, Direct ou Bio do Instagram.
            </p>
          )}
        </div>

        {/* Native Web Share button if supported */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <div className="mt-5 border-t border-[#f7e4e7] pt-4">
            <button
              type="button"
              onClick={handleNativeShare}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-50 px-4 py-2.5 text-xs font-bold text-[#8e4a5d] hover:bg-rose-100 hover:text-[#4a383b] transition-colors focus-visible:outline-2 focus-visible:outline-[#cc5270]"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              <span>Mais opções do seu dispositivo</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
