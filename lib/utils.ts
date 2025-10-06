import { API_URL } from "@/config/env";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkCurrentRouter(pathname: string, currentPath: string) {
  return pathname === currentPath;
}

export const mergeLinkThumbnail = (path: string) => {
  const rs = API_URL + "uploads/thumbnails/" + path;
  return rs;
};
