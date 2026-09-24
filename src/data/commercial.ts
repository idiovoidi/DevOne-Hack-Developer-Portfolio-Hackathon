/**
 * Commercial Work Data
 *
 * Client photography and commissioned work.
 *
 * HOW TO ADD NEW WORK:
 * 1. Add images to the public/commercial/ folder
 *    - Thumbnails: work-name-thumb.webp (< 200KB)
 *    - Full size: work-name-full.webp (< 500KB)
 *    - Use descriptive kebab-case names
 *
 * 2. Add a new object to the commercialWorks array below.
 */

export interface CommercialWork {
  id: string;
  title: string;
  description?: string;
  image: string;
  fullImage?: string;
  medium: string;
  tools: string[];
  date: string;
  category?: string;
  client?: string;
}

export const commercialWorks: CommercialWork[] = [];
