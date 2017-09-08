import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import itLocaleData from 'react-intl/locale-data/it';

import { DEFAULT_LOCALE } from './constants';
import enTranslationMessages from './translations/en.json';
import itTranslationMessages from './translations/it.json';

addLocaleData(enLocaleData);
addLocaleData(itLocaleData);

export const appLocales = [
  'en',
  'it',
];

/**
 * Format the strings to translate
 * @param  {String} locale   The locale as a String.
 * @param  {JSON}   messages The strings as JSON.
 * @return {Object}          The mapped strings as Object.
 */
export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};

  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key];

    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const messages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  it: formatTranslationMessages('it', itTranslationMessages),
};
