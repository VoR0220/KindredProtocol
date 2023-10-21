import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getRandomImageUrl() {
  const photos = [
    "photo-1491528323818-fdd1faba62cc",
    "photo-1527980965255-d3b416303d12",
    "photo-1438761681033-6461ffad8d80",
    "photo-1580489944761-15a19d654956",
    "photo-1566492031773-4f4e44671857"
  ];
  const baseUrl = "https://images.unsplash.com/";

  // Randomly pick a photo from the array
  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];

  return `${baseUrl}${randomPhoto}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`;
}
