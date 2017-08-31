/**
 * Get the resolved path to an image
 * @param  {string} imagePath The local path to the image.
 *                            This should start with './'
 * @return {string} The resolved path to the image
 */
export function getImage(imagePath) {
  const context = require.context('../../img/', true);

  return context(imagePath);
}
