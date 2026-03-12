import { createContext } from 'react';

export type UiDictionary = Record<string, string>;

export const LocaleContext = createContext<string | null>(null);
export const DictionaryContext = createContext<UiDictionary | null>(null);
