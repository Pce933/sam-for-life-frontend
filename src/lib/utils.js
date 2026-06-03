import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function optimizeUnsplashUrl(url, width = 800) {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('images.unsplash.com') || url.includes('unsplash.com')) {
    try {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?auto=format&fit=crop&w=${width}&q=80`;
    } catch {
      return url;
    }
  }
  return url;
}
