import { createContext, useContext } from "react";

export type ConsultationEnquiryContextValue = {
  openEnquiry: () => void;
};

export const ConsultationEnquiryContext =
  createContext<ConsultationEnquiryContextValue | null>(null);

export function useConsultationEnquiry() {
  const ctx = useContext(ConsultationEnquiryContext);
  if (!ctx) {
    throw new Error("useConsultationEnquiry must be used within ConsultationEnquiryProvider");
  }
  return ctx;
}
