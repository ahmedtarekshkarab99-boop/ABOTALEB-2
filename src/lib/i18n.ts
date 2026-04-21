import ar from '../locales/ar.json';

const translations = { ar };

export function t(key: string): string {
  const keys = key.split('.');
  let value: any = translations.ar;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}

export function useTranslation() {
  return { t };
}
