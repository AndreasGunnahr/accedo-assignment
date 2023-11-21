import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { videos } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildVideoLinks = (title: string) =>
  `/watch/${title.replace(/\s/g, "-")}`;

export const getPlaylistFromStorage = () =>
  JSON.parse(localStorage.getItem("playlist")!) as typeof videos;

export const setPlaylistToStorage = (playlist: typeof videos) =>
  localStorage.setItem("playlist", JSON.stringify(playlist));
