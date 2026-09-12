import type { ReactNode } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppLinkProps = {
  message?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
};

export function WhatsAppLink({ message, className, children, ariaLabel, onClick }: WhatsAppLinkProps) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
