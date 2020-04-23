
/**
 * Read file as text
 * @param {File} file a target file got from input element
 * @returns {string} text string read from file
 */
export const readFileAsText = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    resolve(reader.result);
  };
  reader.onerror = () => {
    reader.abort();
    reject();
  };
  reader.readAsText(file);
});

/**
 * Read file as data URL
 * @param {file} file a target file got from input element
 * @returns {string} data URL string from file
 */
export const readFileAsDataURL = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    resolve(reader.result);
  };
  reader.onerror = () => {
    reader.abort();
    reject();
  };
  reader.readAsDataURL(file);
});
