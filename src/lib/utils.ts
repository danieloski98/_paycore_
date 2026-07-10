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