import type { ImageLoaderProps } from "next/image";

// Maps next/image requests to the pre-built WebP files from scripts/optimize-images.mjs.
// `src` is an image name plus content hash, like "fleet-bmw-5?v=1a2b3c4d" (see Img.tsx).
export default function imageLoader({ src, width }: ImageLoaderProps) {
  const [name, query] = src.split("?");
  return `/img/${name}-${width}.webp${query ? `?${query}` : ""}`;
}
