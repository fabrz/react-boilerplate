/**
 * Set the App locale
 * @param {String} locale The locale as a String.
 * @return {Object}       Action data
 */
export function setLocale(locale) {
  return {
    locale,
    type: 'SET_LOCALE',
  };
}
