export const CONTACT_PHONE = "+918547884351";
export const CONTACT_PLACE = "Vakathanam, Kottayam";

export function whatsappDigits(phone = CONTACT_PHONE): string {
  return phone.replace(/\D/g, "");
}

export function buildWhatsAppUrl(message?: string, phone = CONTACT_PHONE): string {
  const url = new URL(`https://wa.me/${whatsappDigits(phone)}`);
  const text = message?.trim();

  if (text) {
    url.searchParams.set("text", text);
  }

  return url.toString();
}

export type WhatsAppEnquiryDetails = {
  greeting: string;
  nameLabel: string;
  phoneLabel: string;
  serviceLabel: string;
  dateLabel: string;
  name?: string;
  phone?: string;
  service?: string;
  date?: string;
  note?: string;
};

export function composeWhatsAppEnquiryMessage(details: WhatsAppEnquiryDetails): string {
  const lines = [details.greeting.trim(), ""];

  if (details.name?.trim()) {
    lines.push(`${details.nameLabel}: ${details.name.trim()}`);
  }

  if (details.phone?.trim()) {
    lines.push(`${details.phoneLabel}: ${details.phone.trim()}`);
  }

  if (details.service?.trim()) {
    lines.push(`${details.serviceLabel}: ${details.service.trim()}`);
  }

  if (details.date?.trim()) {
    lines.push(`${details.dateLabel}: ${details.date.trim()}`);
  }

  if (details.note?.trim()) {
    lines.push("", details.note.trim());
  }

  return lines.join("\n").trim();
}
