
/**
 * Read file as text
 * @param {File} file a target file got from input element
 * @returns {Promise<string>} text string read from file
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
 * @returns {Promise<string>} data URL string from file
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

/**
 * Generate text file based on given text and download to client
 * @param {string} filename file name with extension
 * @param {string} text content string to be input in the file
 */
export const generateAndDownloadTextFile = (filename, text) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
