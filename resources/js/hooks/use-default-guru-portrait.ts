import { useQuery } from "@tanstack/react-query";
import fallbackPortrait from "@/assets/guru-portrait.jpg";
import { fetchDefaultGuruPortrait } from "@/lib/site-api";

const DEFAULT_ALT = "Thanthri V R Rajesh Sharmma";

export function useDefaultGuruPortrait() {
  const { data } = useQuery({
    queryKey: ["guru-portrait-default"],
    queryFn: fetchDefaultGuruPortrait,
    staleTime: 60_000,
  });

  return {
    src: data?.image_url ?? fallbackPortrait,
    alt: data?.alt_text?.trim() || DEFAULT_ALT,
  };
}
