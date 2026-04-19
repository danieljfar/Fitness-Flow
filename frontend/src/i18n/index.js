import en from './en.json';
import es from './es.json';

const dictionaries = {
  en,
  es,
};

export function getTranslator(language) {
  return function t(key) {
    return dictionaries[language]?.[key] || dictionaries.en[key] || key;
  };
}
