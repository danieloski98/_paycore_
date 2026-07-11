import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SidebarItemProps } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getActiveSidebarItem(
  pathname: string,
  items: SidebarItemProps[]
): SidebarItemProps | undefined {
  return items.find((item) => pathname.startsWith(item.href));
}

export const formatMonthYear = (month: number, year: number): string => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${monthNames[month]} ${year}`;
};