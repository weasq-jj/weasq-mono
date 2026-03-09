import translationsDe from '@/app/dictionaries/de';
import translationsEn from '@/app/dictionaries/en';
import { type Locale } from '@/types/globals';

export type Dictionary = Record<keyof typeof translationsDe, string>;

const dictionaries: Record<Locale, () => Dictionary> = {
  de: () => translationsDe,
  en: () => translationsEn,
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
