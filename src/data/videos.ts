export interface VideoEmbed {
  id: string;
  url: string;
  title?: string;
}

export const youtubeChannelUrl = "https://www.youtube.com/@idiovoidi/featured";

export const videos: VideoEmbed[] = [
  {
    id: "XZNmMa9m4jI",
    url: "https://www.youtube.com/watch?v=XZNmMa9m4jI",
    title: "Featured Video",
  },
  {
    id: "dkI2rrzEIhQ",
    url: "https://www.youtube.com/watch?v=dkI2rrzEIhQ",
    title: "Video 2",
  },
  {
    id: "nyYRJY9G-as",
    url: "https://www.youtube.com/watch?v=nyYRJY9G-as",
    title: "Video 3",
  },
];
