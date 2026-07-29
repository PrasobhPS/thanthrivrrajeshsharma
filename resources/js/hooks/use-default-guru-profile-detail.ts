import { useQuery } from "@tanstack/react-query";
import {
  fetchDefaultGuruProfileDetail,
  type GuruProfileDetailPayload,
} from "@/lib/site-api";

const FALLBACK: GuruProfileDetailPayload = {
  id: 0,
  title: null,
  eyebrow: null,
  title_line_1: null,
  title_line_2: null,
  authority_label: null,
  authority_quote: null,
  verification_badge_label: null,
  verification_grade: null,
  tradition_seal_text: null,
  bio_lead: null,
  bio_description: null,
  stat_one_label: null,
  stat_one_value: null,
  stat_one_sublabel: null,
  stat_two_label: null,
  stat_two_value: null,
  stat_two_sublabel: null,
  consultation_status_text: null,
  is_default: false,
};

export function useDefaultGuruProfileDetail() {
  const { data } = useQuery({
    queryKey: ["guru-profile-detail-default"],
    queryFn: fetchDefaultGuruProfileDetail,
    staleTime: 60_000,
  });

  return data ?? FALLBACK;
}

export function pickProfileText(
  apiValue: string | null | undefined,
  fallback: string,
): string {
  const trimmed = apiValue?.trim();
  return trimmed ? trimmed : fallback;
}

export function splitVerificationGrade(grade: string | null | undefined): string[] {
  if (!grade?.trim()) {
    return [];
  }

  return grade
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
