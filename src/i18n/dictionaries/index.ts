import type { Locale } from "../config";
import { en, type Dict } from "./en";
import { ko } from "./ko";

const dictionaries: Record<Locale, Dict> = { en, ko };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}

export type { Dict };
