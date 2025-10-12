import { API_URL } from "@/config/env";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkCurrentRouter(pathname: string, currentPath: string) {
  const crPathname = pathname.split("/");

  return crPathname.includes(currentPath.split("/")[1]);
}

export const mergeLinkThumbnail = (path: string) => {
  const rs = API_URL + "uploads/thumbnails/" + path;
  return rs;
};

export const splitCountry = (value?: string) => {
  if (!value) return "";
  return value.split(",");
};
