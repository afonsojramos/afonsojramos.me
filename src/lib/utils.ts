import type { CollectionEntry } from "astro:content";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

export function readingTime(html = "") {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

export function dateRange(startDate: Date, endDate?: Date | string): string[] {
  const startMonth = startDate.toLocaleString("default", { month: "short" });
  const startYear = startDate.getFullYear().toString();

  if (!endDate) {
    return [`${startMonth} ${startYear}`, "Present"];
  }

  if (typeof endDate === "string") {
    return [`${startMonth} ${startYear}`, endDate];
  }

  const endMonth = endDate.toLocaleString("default", { month: "short" });
  const endYear = endDate.getFullYear().toString();

  return [`${startMonth} ${startYear}`, `${endMonth} ${endYear}`];
}

export function sortByDateRange(
  a: CollectionEntry<"work" | "education">,
  b: CollectionEntry<"work" | "education">,
) {
  const dateEndA = new Date(a.data.dateEnd || new Date()).valueOf();
  const dateEndB = new Date(b.data.dateEnd || new Date()).valueOf();

  if (dateEndA === dateEndB) {
    return new Date(b.data.dateStart).valueOf() - new Date(a.data.dateStart).valueOf();
  }

  return dateEndB - dateEndA;
}

export function sortByDate(
  a: CollectionEntry<"blog" | "projects">,
  b: CollectionEntry<"blog" | "projects">,
) {
  return new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf();
}
