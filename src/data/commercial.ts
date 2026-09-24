import type { CommercialTagId } from "./commercialTags";
import {
  MUSIC_PHOTOGRAPHY_DIR,
  commercialPhotographyPaths,
  musicPhotographyFiles,
} from "./commercialManifests";

/**
 * Commercial portfolio data.
 *
 * - Design pieces: edit objects in designWorks below.
 * - Folder batches: add filenames to commercialManifests.ts
 * - Filtering: tags[] + commercialTags.ts
 * - Thumbnails: public/commercial/thumbs/.../*.webp (regenerate via npm run thumbs:commercial)
 */

export interface CommercialWork {
  id: string;
  title: string;
  description?: string;
  /** Optimized WebP thumbnail for the grid */
  image: string;
  /** Full-resolution original for lightbox */
  fullImage?: string;
  medium: string;
  tools: string[];
  date: string;
  tags: CommercialTagId[];
  client?: string;
}

export const commercialAsset = (...pathSegments: string[]): string =>
  `/commercial/${pathSegments.map((segment) => encodeURIComponent(segment)).join("/")}`;

/** Maps an original asset path to its WebP thumb under /commercial/thumbs/ */
export const commercialThumb = (...pathSegments: string[]): string => {
  const withWebp = [...pathSegments];
  const last = withWebp[withWebp.length - 1];
  withWebp[withWebp.length - 1] = last.replace(/\.[^.]+$/, ".webp");
  return commercialAsset("thumbs", ...withWebp);
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const titleFromFilename = (filename: string): string =>
  filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .trim();

const photoEntry = (
  pathSegments: string[],
  tags: CommercialTagId[],
  overrides?: Partial<CommercialWork>
): CommercialWork => {
  const filename = pathSegments[pathSegments.length - 1];
  const pathKey = pathSegments.join("/");
  return {
    id: overrides?.id ?? slugify(pathKey),
    title: overrides?.title ?? titleFromFilename(filename),
    medium: overrides?.medium ?? "Photography",
    tools: overrides?.tools ?? ["Lightroom", "Photoshop"],
    date: overrides?.date ?? "",
    tags,
    image: commercialThumb(...pathSegments),
    fullImage: commercialAsset(...pathSegments),
    ...overrides,
  };
};

const designEntry = (
  filename: string,
  fields: Omit<CommercialWork, "image" | "fullImage" | "id"> & { id?: string }
): CommercialWork => ({
  id: fields.id ?? slugify(filename),
  ...fields,
  image: commercialThumb(filename),
  fullImage: commercialAsset(filename),
});

const designWorks: CommercialWork[] = [
  designEntry("Annual-Report-2020-Final.png", {
    title: "Annual Report 2020",
    medium: "Print layout",
    tags: ["design"],
    tools: ["InDesign", "Photoshop"],
    date: "2020",
  }),
  designEntry("Bond Street Website Design.png", {
    title: "Bond Street Website Design",
    medium: "Web design",
    tags: ["design"],
    tools: ["Photoshop", "Figma"],
    date: "2020",
  }),
  designEntry("Coffee-Menu.jpg", {
    title: "Coffee Menu",
    medium: "Menu design",
    tags: ["design"],
    tools: ["InDesign", "Photoshop"],
    date: "2019",
  }),
  designEntry("Double-Display-Rusty-Rockers.jpg", {
    title: "Double Display — Rusty Rockers",
    medium: "Event display",
    tags: ["design"],
    tools: ["Photoshop", "InDesign"],
    date: "2022",
  }),
  designEntry("Mitchell_Johnson_Exhibit-Poster-JPEG.jpg", {
    title: "Exhibit Poster",
    medium: "Poster design",
    tags: ["design"],
    client: "Mitchell Johnson",
    tools: ["Photoshop", "InDesign"],
    date: "2021",
  }),
  designEntry("Misty-Harlowe-September-OmeoSingleTour2023_Final1.jpg", {
    title: "Omeo Single Tour 2023",
    medium: "Tour poster",
    tags: ["design"],
    client: "Misty Harlowe",
    tools: ["Photoshop"],
    date: "2023",
  }),
  designEntry("Misty-Harlowe-Final-Poster-(touch-Up).jpg", {
    title: "Misty Harlowe — Final Poster",
    medium: "Poster design",
    tags: ["design"],
    client: "Misty Harlowe",
    tools: ["Photoshop"],
    date: "2023",
  }),
];

const musicPhotographyWorks = musicPhotographyFiles.map((file) =>
  photoEntry([MUSIC_PHOTOGRAPHY_DIR, file], ["music-photography"])
);

const commercialPhotographyWorks = commercialPhotographyPaths.map((relativePath) => {
  const segments = relativePath.split("/");
  const isCostume = segments.includes("Costume");
  const tags: CommercialTagId[] = isCostume
    ? ["photography", "costume"]
    : ["photography"];
  return photoEntry(segments, tags);
});

export const commercialWorks: CommercialWork[] = [
  ...designWorks,
  ...musicPhotographyWorks,
  ...commercialPhotographyWorks,
];

export const filterCommercialWorks = (
  works: CommercialWork[],
  activeTag: CommercialTagId | "all"
): CommercialWork[] => {
  if (activeTag === "all") return works;
  return works.filter((work) => work.tags.includes(activeTag));
};
