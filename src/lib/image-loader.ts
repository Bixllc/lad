import type { ImageLoaderProps } from "next/image";

// Maps next/image requests to the pre-built WebP files from scripts/optimize-images.mjs.
// `src` is an image name like "fleet-bmw-5".
export default function imageLoader({ src, width }: ImageLoaderProps) {
  return `/img/${src}-${width}.webp`;
}
