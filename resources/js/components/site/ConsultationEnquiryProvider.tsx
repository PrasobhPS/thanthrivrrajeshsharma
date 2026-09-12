import { useCallback, useEffect, useMemo, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ApiValidationError,
  fetchServices,
  submitInquiry,
} from "@/lib/site-api";
import { buildWhatsAppUrl, composeWhatsAppEnquiryMessage } from "@/lib/whatsapp";
import { useLocale } from "@/i18n/LocaleProvider";
import { ConsultationEnquiryContext } from "@/components/site/consultation-enquiry-context";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  serviceKey: "",
  requested_date: "",
  message: "",
};

export function ConsultationEnquiryProvider({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [savedWhatsAppMessage, setSavedWhatsAppMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: 60_000,
    enabled: open,
  });

  const openEnquiry = useCallback(() => {
    setSuccessMessage(null);
    setFormError(null);
    setFieldErrors({});
    setOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setOpen(false);
    setForm(emptyForm);
    setFieldErrors({});
    setFormError(null);
    setSuccessMessage(null);
    setSavedWhatsAppMessage("");
    setSubmitting(false);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeEnquiry();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeEnquiry]);

  const selectedServiceName = useMemo(() => {
    const serviceId = form.serviceKey ? Number(form.serviceKey) : NaN;
    if (!Number.isFinite(serviceId) || serviceId <= 0) {
      return t("enquiry.generalService");
    }

    return services.find((service) => service.id === serviceId)?.name ?? t("enquiry.generalService");
  }, [form.serviceKey, services, t]);

  const whatsappMessage = useMemo(
    () =>
      composeWhatsAppEnquiryMessage({
        greeting: t("whatsapp.greeting"),
        nameLabel: t("enquiry.name"),
        phoneLabel: t("enquiry.phone"),
        serviceLabel: t("enquiry.service"),
        dateLabel: t("enquiry.date"),
        name: form.name,
        phone: form.phone,
        service: selectedServiceName,
        date: form.requested_date,
        note: form.message,
      }),
    [form.message, form.name, form.phone, form.requested_date, selectedServiceName, t],
  );

  const persistInquiry = async () => {
    const serviceId = form.serviceKey ? Number(form.serviceKey) : NaN;
    return submitInquiry({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      service_id: Number.isFinite(serviceId) && serviceId > 0 ? serviceId : undefined,
      requested_service:
        Number.isFinite(serviceId) && serviceId > 0 ? undefined : t("enquiry.generalService"),
      requested_date: form.requested_date || undefined,
      message: form.message.trim() || undefined,
    });
  };

  const onContinueWhatsApp = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!form.name.trim() || !form.phone.trim()) {
      event.preventDefault();
      setFieldErrors({
        ...(form.name.trim() ? {} : { name: [t("enquiry.validationError")] }),
        ...(form.phone.trim() ? {} : { phone: [t("enquiry.validationError")] }),
      });
      setFormError(t("enquiry.validationError"));
      return;
    }

    setFieldErrors({});
    setFormError(null);
    void persistInquiry().catch(() => {
      // WhatsApp is already opening; keep the form available if the API save fails.
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});
    setFormError(null);
    setSuccessMessage(null);
    setSubmitting(true);

    try {
      const result = await persistInquiry();

      setSavedWhatsAppMessage(whatsappMessage);
      setSuccessMessage(result.message || t("enquiry.success"));
      setForm(emptyForm);
    } catch (error) {
      if (error instanceof ApiValidationError) {
        setFieldErrors(error.fieldErrors);
        setFormError(t("enquiry.validationError"));
      } else {
        setFormError(t("enquiry.submitError"));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const value = useMemo(() => ({ openEnquiry }), [openEnquiry]);
  const fieldError = (key: string) => fieldErrors[key]?.[0];

  return (
    <ConsultationEnquiryContext.Provider value={value}>
      {children}

      {open && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
              <button
                type="button"
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
                aria-label={t("common.close")}
                onClick={closeEnquiry}
              />

              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="enquiry-dialog-title"
                className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-gold/20 bg-[#0b1224] p-6 text-[#fdfcf6] shadow-2xl"
              >
                <button
                  type="button"
                  onClick={closeEnquiry}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/80 ring-1 ring-white/15 transition hover:bg-white/10 hover:text-white"
                  aria-label={t("common.close")}
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="pr-10">
                  <h2 id="enquiry-dialog-title" className="font-serif text-2xl tracking-tight text-[#fdfcf6]">
                    {t("enquiry.title")}
                  </h2>
                  <p className="mt-2 text-sm text-[#fdfcf6]/55 font-serif">{t("enquiry.description")}</p>
                </div>

                {successMessage ? (
                  <div className="mt-6 space-y-6">
                    <p className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold font-serif">
                      {successMessage}
                    </p>
                    <a
                      href={buildWhatsAppUrl(savedWhatsAppMessage || t("whatsapp.greeting"))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white transition hover:opacity-90"
                    >
                      <MessageCircle size={16} fill="currentColor" />
                      {t("enquiry.whatsapp")}
                    </a>
                    <button
                      type="button"
                      onClick={closeEnquiry}
                      className="w-full rounded-full bg-gradient-gold px-6 py-3 text-[10px] font-black uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
                    >
                      {t("common.close")}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="enquiry-name"
                        className="text-[10px] font-black uppercase tracking-widest text-gold/80"
                      >
                        {t("enquiry.name")} *
                      </Label>
                      <Input
                        id="enquiry-name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        required
                        maxLength={120}
                        autoComplete="name"
                        className="border-white/15 bg-white/5 text-[#fdfcf6] placeholder:text-white/30"
                        placeholder={t("enquiry.namePlaceholder")}
                      />
                      {fieldError("name") ? (
                        <p className="text-xs text-red-400">{fieldError("name")}</p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="enquiry-phone"
                        className="text-[10px] font-black uppercase tracking-widest text-gold/80"
                      >
                        {t("enquiry.phone")} *
                      </Label>
                      <Input
                        id="enquiry-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        required
                        maxLength={30}
                        autoComplete="tel"
                        className="border-white/15 bg-white/5 text-[#fdfcf6] placeholder:text-white/30"
                        placeholder={t("enquiry.phonePlaceholder")}
                      />
                      {fieldError("phone") ? (
                        <p className="text-xs text-red-400">{fieldError("phone")}</p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="enquiry-email"
                        className="text-[10px] font-black uppercase tracking-widest text-gold/80"
                      >
                        {t("enquiry.email")}
                      </Label>
                      <Input
                        id="enquiry-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        maxLength={255}
                        autoComplete="email"
                        className="border-white/15 bg-white/5 text-[#fdfcf6] placeholder:text-white/30"
                        placeholder={t("enquiry.emailPlaceholder")}
                      />
                      {fieldError("email") ? (
                        <p className="text-xs text-red-400">{fieldError("email")}</p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="enquiry-service"
                        className="text-[10px] font-black uppercase tracking-widest text-gold/80"
                      >
                        {t("enquiry.service")}
                      </Label>
                      <select
                        id="enquiry-service"
                        value={form.serviceKey}
                        onChange={(e) => setForm((f) => ({ ...f, serviceKey: e.target.value }))}
                        className="flex h-9 w-full rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-[#fdfcf6] shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                      >
                        <option value="" className="bg-[#0b1224]">
                          {t("enquiry.generalService")}
                        </option>
                        {services.map((service) => (
                          <option key={service.id} value={String(service.id)} className="bg-[#0b1224]">
                            {service.name}
                          </option>
                        ))}
                      </select>
                      {fieldError("service_id") || fieldError("requested_service") ? (
                        <p className="text-xs text-red-400">
                          {fieldError("service_id") || fieldError("requested_service")}
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="enquiry-date"
                        className="text-[10px] font-black uppercase tracking-widest text-gold/80"
                      >
                        {t("enquiry.date")}
                      </Label>
                      <Input
                        id="enquiry-date"
                        type="date"
                        value={form.requested_date}
                        min={new Date().toISOString().slice(0, 10)}
                        onChange={(e) => setForm((f) => ({ ...f, requested_date: e.target.value }))}
                        className="border-white/15 bg-white/5 text-[#fdfcf6] [color-scheme:dark]"
                      />
                      {fieldError("requested_date") ? (
                        <p className="text-xs text-red-400">{fieldError("requested_date")}</p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="enquiry-message"
                        className="text-[10px] font-black uppercase tracking-widest text-gold/80"
                      >
                        {t("enquiry.message")}
                      </Label>
                      <Textarea
                        id="enquiry-message"
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        maxLength={2000}
                        rows={4}
                        className="border-white/15 bg-white/5 text-[#fdfcf6] placeholder:text-white/30"
                        placeholder={t("enquiry.messagePlaceholder")}
                      />
                      {fieldError("message") ? (
                        <p className="text-xs text-red-400">{fieldError("message")}</p>
                      ) : null}
                    </div>

                    {formError ? (
                      <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                        {formError}
                      </p>
                    ) : null}

                    <div className="space-y-3 pt-1">
                      <a
                        href={buildWhatsAppUrl(whatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onContinueWhatsApp}
                        className="flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-white transition hover:opacity-90"
                      >
                        <MessageCircle size={16} fill="currentColor" />
                        {t("enquiry.whatsapp")}
                      </a>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-full border border-gold/30 bg-transparent px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-gold transition hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {submitting ? t("enquiry.submitting") : t("enquiry.submit")}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </ConsultationEnquiryContext.Provider>
  );
}
