/**
 * Public JSON API helpers for the marketing site (Laravel backend).
 */

export type GalleryPhotoPayload = {
  id: number;
  title: string;
  alt_text: string | null;
  category: string | null;
  image_url: string;
};

export type YantraPayload = {
  id: number;
  name: string;
  details: string | null;
  image_url: string;
};

export type ServicePayload = {
  id: number;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  image_url: string | null;
  rate: string | number;
  duration: string | null;
};

export type YoutubeVideoPayload = {
  id: number;
  title: string;
  youtube_id: string;
  tag: string | null;
  channel_label: string | null;
  meta_line: string | null;
  thumbnail_url: string;
  watch_url: string;
};

type ApiListResponse<T> = {
  data: T;
  error: unknown;
  meta: { total?: number };
};

function apiUrl(path: string): string {
  const base = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (!base) {
    throw new Error("VITE_API_BASE_URL is not configured");
  }
  const root = base.replace(/\/$/, "");
  const rel = path.replace(/^\//, "");
  return `${root}/${rel}`;
}

async function readList<T>(path: string): Promise<T[]> {
  const res = await fetch(apiUrl(path));
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  const body = (await res.json()) as ApiListResponse<T[]>;
  return body.data ?? [];
}

export function fetchGalleryPhotos(): Promise<GalleryPhotoPayload[]> {
  return readList<GalleryPhotoPayload>("gallery");
}

export function fetchYantras(): Promise<YantraPayload[]> {
  return readList<YantraPayload>("yantras");
}

export function fetchServices(): Promise<ServicePayload[]> {
  return readList<ServicePayload>("services");
}

export function fetchYoutubeVideos(): Promise<YoutubeVideoPayload[]> {
  return readList<YoutubeVideoPayload>("youtube-videos");
}
