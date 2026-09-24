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
 * - Folder batches: add filenames to commercialManifests.ts (music / photography paths).
 * - Filtering: assign one or more tags[] per item; register new tag ids in commercialTags.ts.
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
  /** Used for section filter pills; items can have multiple tags. */
  tags: CommercialTagId[];
  client?: string;
}

export const commercialAsset = (...pathSegments: string[]): string =>
  `/commercial/${pathSegments.map((segment) => encodeURIComponent(segment)).join("/")}`;

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
    image: commercialAsset(...pathSegments),
    ...overrides,
  };
};

const designWorks: CommercialWork[] = [
  {
    id: "annual-report-2020",
    title: "Annual Report 2020",
    medium: "Print layout",
    tags: ["design"],
    tools: ["InDesign", "Photoshop"],
    date: "2020",
    image: commercialAsset("Annual-Report-2020-Final.png"),
  },
  {
    id: "bond-street-website",
    title: "Bond Street Website Design",
    medium: "Web design",
    tags: ["design"],
    tools: ["Photoshop", "Figma"],
    date: "2020",
    image: commercialAsset("Bond Street Website Design.png"),
  },
  {
    id: "coffee-menu",
    title: "Coffee Menu",
    medium: "Menu design",
    tags: ["design"],
    tools: ["InDesign", "Photoshop"],
    date: "2019",
    image: commercialAsset("Coffee-Menu.jpg"),
  },
  {
    id: "rusty-rockers-display",
    title: "Double Display — Rusty Rockers",
    medium: "Event display",
    tags: ["design"],
    tools: ["Photoshop", "InDesign"],
    date: "2022",
    image: commercialAsset("Double-Display-Rusty-Rockers.jpg"),
  },
  {
    id: "mitchell-johnson-exhibit",
    title: "Exhibit Poster",
    medium: "Poster design",
    tags: ["design"],
    client: "Mitchell Johnson",
    tools: ["Photoshop", "InDesign"],
    date: "2021",
    image: commercialAsset("Mitchell_Johnson_Exhibit-Poster-JPEG.jpg"),
  },
  {
    id: "misty-harlowe-tour-2023",
    title: "Omeo Single Tour 2023",
    medium: "Tour poster",
    tags: ["design"],
    client: "Misty Harlowe",
    tools: ["Photoshop"],
    date: "2023",
    image: commercialAsset("Misty-Harlowe-September-OmeoSingleTour2023_Final1.jpg"),
  },
  {
    id: "misty-harlowe-poster",
    title: "Misty Harlowe — Final Poster",
    medium: "Poster design",
    tags: ["design"],
    client: "Misty Harlowe",
    tools: ["Photoshop"],
    date: "2023",
    image: commercialAsset("Misty-Harlowe-Final-Poster-(touch-Up).jpg"),
  },
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
