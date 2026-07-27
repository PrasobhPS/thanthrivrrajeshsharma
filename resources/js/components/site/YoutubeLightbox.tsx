import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type YoutubeLightboxProps = {
  open: boolean;
  youtubeId: string | null;
  title: string;
  onClose: () => void;
  closeLabel: string;
};

export function YoutubeLightbox({
  open,
  youtubeId,
  title,
  onClose,
  closeLabel,
}: YoutubeLightboxProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !youtubeId || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        aria-label={closeLabel}
      />
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-white/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white ring-1 ring-white/20 transition hover:bg-black hover:ring-gold/50"
          aria-label={closeLabel}
        >
          <X className="h-5 w-5" />
        </button>
        <div className="aspect-video w-full bg-black">
          <iframe
            key={youtubeId}
            title={title}
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
