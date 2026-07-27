import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import {
  fetchServices,
  InquirySubmitError,
  submitInquiry,
} from "@/lib/site-api";

type ConsultationEnquiryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SERVICE_OTHER = "other";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  serviceChoice: "",
  otherService: "",
  requestedDate: "",
  message: "",
};

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function ConsultationEnquiryModal({ open, onOpenChange }: ConsultationEnquiryModalProps) {
  const { t } = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;

  const [form, setForm] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: 120_000,
    enabled: open,
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const handleClose = () => {
      onOpenChangeRef.current(false);
    };

    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setForm(emptyForm);
      setFieldErrors({});
      setFormError(null);
      setSuccessMessage(null);
      setSubmitting(false);
    }
  }, [open]);

  const requestClose = () => {
    dialogRef.current?.close();
  };

  const setField = (key: keyof typeof emptyForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});
    setSuccessMessage(null);
    setSubmitting(true);

    const payload: Parameters<typeof submitInquiry>[0] = {
      name: form.name.trim(),
      phone: form.phone.trim(),
    };

    if (form.email.trim()) {
      payload.email = form.email.trim();
    }
    if (form.requestedDate) {
      payload.requested_date = form.requestedDate;
    }
    if (form.message.trim()) {
      payload.message = form.message.trim();
    }

    if (form.serviceChoice === SERVICE_OTHER) {
      payload.requested_service = form.otherService.trim();
    } else if (form.serviceChoice) {
      payload.service_id = Number(form.serviceChoice);
    }

    try {
      const result = await submitInquiry(payload);
      setSuccessMessage(result.message || t("consultation.success"));
      setForm(emptyForm);
    } catch (error) {
      if (error instanceof InquirySubmitError) {
        const mapped: Record<string, string> = {};
        for (const [key, messages] of Object.entries(error.fieldErrors)) {
          if (messages[0]) {
            mapped[key] = messages[0];
          }
        }
        setFieldErrors(mapped);
        setFormError(error.message);
      } else {
        setFormError(t("consultation.errorGeneric"));
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (typeof document === "undefined") {
    return null;
  }

  const inputClass =
    "w-full rounded-lg border border-[#1a1a1a]/15 bg-white px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition focus:border-gold focus:ring-1 focus:ring-gold/40";

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby="consultation-dialog-title"
      className="fixed inset-0 z-[9998] m-0 h-dvh w-full max-h-none max-w-none border-0 bg-transparent p-0 backdrop:bg-black/85"
    >
      <div
        className="flex h-full min-h-0 w-full items-start justify-center overflow-y-auto p-4 pt-24 sm:items-center sm:p-6 sm:pt-6"
        onPointerDown={(event) => {
          if (event.target === event.currentTarget) {
            requestClose();
          }
        }}
      >
        <div
          className="relative my-auto w-full max-w-lg shrink-0 overflow-hidden rounded-2xl bg-[#fdfcf6] text-[#1a1a1a] shadow-2xl ring-1 ring-[#1a1a1a]/10"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={requestClose}
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1a1a]/5 text-[#1a1a1a]/70 transition hover:bg-[#1a1a1a]/10"
            aria-label={t("common.close")}
          >
            <X className="h-4 w-4" />
          </button>

          <div className="border-b border-[#1a1a1a]/8 px-6 pb-5 pt-8 pr-14">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gold">{t("nav.consultation")}</p>
            <h2 id="consultation-dialog-title" className="mt-2 font-serif text-2xl leading-tight tracking-tight">
              {t("consultation.title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#1a1a1a]/55">{t("consultation.subtitle")}</p>
          </div>

          {successMessage ? (
            <div className="px-6 py-10">
              <p className="text-center font-serif text-base leading-relaxed text-[#1a1a1a]/80">{successMessage}</p>
              <button
                type="button"
                onClick={requestClose}
                className="mt-8 w-full rounded-full bg-[#1a1a1a] py-3.5 text-[10px] font-black uppercase tracking-widest text-[#fdfcf6] transition hover:bg-gold hover:text-[#1a1a1a]"
              >
                {t("common.close")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6">
              <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">{t("consultation.requiredHint")}</p>

              <div className="space-y-1.5">
                <label htmlFor="consult-name" className="text-xs font-semibold uppercase tracking-wide text-[#1a1a1a]/70">
                  {t("consultation.name")} *
                </label>
                <input
                  id="consult-name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder={t("consultation.namePlaceholder")}
                  className={inputClass}
                />
                {fieldErrors.name ? <p className="text-xs text-red-600">{fieldErrors.name}</p> : null}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="consult-phone" className="text-xs font-semibold uppercase tracking-wide text-[#1a1a1a]/70">
                  {t("consultation.phone")} *
                </label>
                <input
                  id="consult-phone"
                  required
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder={t("consultation.phonePlaceholder")}
                  className={inputClass}
                />
                {fieldErrors.phone ? <p className="text-xs text-red-600">{fieldErrors.phone}</p> : null}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="consult-email" className="text-xs font-semibold uppercase tracking-wide text-[#1a1a1a]/70">
                  {t("consultation.email")}
                </label>
                <input
                  id="consult-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder={t("consultation.emailPlaceholder")}
                  className={inputClass}
                />
                {fieldErrors.email ? <p className="text-xs text-red-600">{fieldErrors.email}</p> : null}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="consult-service" className="text-xs font-semibold uppercase tracking-wide text-[#1a1a1a]/70">
                  {t("consultation.service")} *
                </label>
                <select
                  id="consult-service"
                  required
                  value={form.serviceChoice}
                  onChange={(e) => setField("serviceChoice", e.target.value)}
                  className={inputClass}
                >
                  <option value="">{t("consultation.servicePlaceholder")}</option>
                  {(services ?? []).map((service) => (
                    <option key={service.id} value={String(service.id)}>
                      {service.name}
                    </option>
                  ))}
                  <option value={SERVICE_OTHER}>{t("consultation.serviceOther")}</option>
                </select>
                {fieldErrors.service_id || fieldErrors.requested_service ? (
                  <p className="text-xs text-red-600">
                    {fieldErrors.service_id ?? fieldErrors.requested_service}
                  </p>
                ) : null}
              </div>

              {form.serviceChoice === SERVICE_OTHER ? (
                <div className="space-y-1.5">
                  <label
                    htmlFor="consult-other-service"
                    className="text-xs font-semibold uppercase tracking-wide text-[#1a1a1a]/70"
                  >
                    {t("consultation.otherService")} *
                  </label>
                  <input
                    id="consult-other-service"
                    required
                    value={form.otherService}
                    onChange={(e) => setField("otherService", e.target.value)}
                    placeholder={t("consultation.otherServicePlaceholder")}
                    className={inputClass}
                  />
                </div>
              ) : null}

              <div className="space-y-1.5">
                <label htmlFor="consult-date" className="text-xs font-semibold uppercase tracking-wide text-[#1a1a1a]/70">
                  {t("consultation.preferredDate")}
                </label>
                <input
                  id="consult-date"
                  type="date"
                  min={todayIsoDate()}
                  value={form.requestedDate}
                  onChange={(e) => setField("requestedDate", e.target.value)}
                  className={inputClass}
                />
                {fieldErrors.requested_date ? (
                  <p className="text-xs text-red-600">{fieldErrors.requested_date}</p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="consult-message" className="text-xs font-semibold uppercase tracking-wide text-[#1a1a1a]/70">
                  {t("consultation.message")}
                </label>
                <textarea
                  id="consult-message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                  placeholder={t("consultation.messagePlaceholder")}
                  className={`${inputClass} resize-none`}
                />
                {fieldErrors.message ? <p className="text-xs text-red-600">{fieldErrors.message}</p> : null}
              </div>

              {formError ? <p className="text-sm text-red-600">{formError}</p> : null}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-[#1a1a1a] py-3.5 text-[10px] font-black uppercase tracking-widest text-[#fdfcf6] transition hover:bg-gold hover:text-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? t("consultation.submitting") : t("consultation.submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
