import { ClassValue, clsx } from "clsx";

/**
 * Formats a number with leading zeros.
 *
 * @param {number} number - The number to format.
 * @param {number} totalDigits - The total number of digits in the formatted number.
 * @return {string} The formatted number with leading zeros.
 */
export function formatNumberWithLeadingZeros(
  number: number,
  totalDigits: number
): string {
  return String(number).padStart(totalDigits, "0");
}

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getIdFromUrl(url: string) {
  // Split the URL by the '/' character
  const parts = url.split("/");

  // Return the second-to-last element (ID)
  // Ensure the array has at least two elements to avoid errors
  return parts.length > 1 ? parts[parts.length - 2] : null;
}
export function generateRandomHexColor():string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Determines the gender rate of a Pokémon.
 *
 * @param {number | null} gender - The gender rate of the Pokémon. -1 for N/A, 0 for genderless, other values for gendered.
 * @return {string} The gender rate of the Pokémon.
 */
export function DetermineGenderRate(gender: number | null): string {
  switch (gender) {
    case -1:
      return "N/A";
    case 0:
      return "0%\u2640 100%\u2642";
    default:
      const female = Math.round((gender as number) * 1250) / 100;
      const male = 100 - female;
      return `${female}%\u2640 ${male}%\u2642`;
  }
}
