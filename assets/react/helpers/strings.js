import general from '../strings/general.json';

const strings = {};

/**
 * Get a string from the string json files
 * @param  {string}   key    The identifier for the string
 * @param  {Object}   params An object with parameters to replace inside the
 *                           string e.g. { streak: 1 }
 * @return {string|Array|null}  Either a string (normal scenario), an array if
 *                              it's a pluralization array or null if there
 *                              was no match
 */
const getString = (key, params) => {
  const keys = key.split('.');
  let value = strings;

  keys.forEach(item => {
    value = value[item] || {};

    return value;
  });

  // Parameter replacement
  if (value && (typeof (params) !== 'undefined')) {
    for (const paramKey of Object.keys(params)) {
      if (Array.isArray(value)) {
        value = value.map(item => item.replace(`:${paramKey}`, params[paramKey]));
      } else {
        value = value.replace(`:${paramKey}`, params[paramKey]);
      }
    }
  }

  return value || null;
};

/**
 * Get a string that requires pluralization
 * @param  {integer}  count  The count related to the string
 * @param  {string}   key    The identifier for the string
 * @param  {Object}   params An object with parameters to replace inside the
 *                           string e.g. { streak: 1 }
 * @return {String|null}    The pluralized string or null if it couldnt find
 *                          a matching string
 */
export const getPluralizedString = (count, key, params) => {
  const pluralizationData = getString(key, params);
  if (!Array.isArray(pluralizationData)) {
    return null;
  }
  /**
   * If the pluralization array looks like this:
   * ["times", "time", "times"]
   * Then we are matching the count argument against the index of the array.
   * If the count is bigger than our values then we just use the last value.
   */
  const index = count > (pluralizationData.length - 1) ? (pluralizationData.length - 1) : count;

  return pluralizationData[index];
};

/**
 * Set string data in the main strings object
 * @param  {string}   key   The identifier for the string data
 * @param  {Object}   value The string data
 */
export const setString = (key, value) => {
  strings[key] = value;
};

export default getString;

setString('general', general);
