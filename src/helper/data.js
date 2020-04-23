import { JWK } from 'node-jose';
/**
 * Convert any string to ArrayBuffer
 * @param {string} str input string
 * @returns an array buffer
 */
const str2ab = (str) => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i += 1) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

/**
 * Convert from ArrayBuffer to binary string
 * @param {ArrayBuffer} buf a given array buffer
 * @returns {string} binary string
 */
const ab2str = (buf) => String.fromCharCode.apply(null, new Uint8Array(buf));

/**
 * Decode base64 string to binary data
 * @param {string} data Base64-encoded string
 * @returns {ArrayBuffer} the decoded binary data
 */
export const getArrayBufferFromBase64 = (data) => {
  const dataBinaryString = atob(data);
  return str2ab(dataBinaryString);
};

/**
 * Encode ArrayBuffer to base64 string
 * @param {ArrayBuffer} data a given array buffer
 * @returns {string} base64 encoded string
 */
export const getBase64FromArrayBuffer = (data) => {
  const dataBinaryString = ab2str(data);
  return btoa(dataBinaryString);
};

/**
 * Decode PEM data into binary data
 * @param {string} pemData PEM-encoded string
 * @returns {ArrayBuffer} the binary data extracted from PEM data
 */
export const getContentFromPEM = (pemData) => {
  // Remove line breaks and header & footer of PEM file format
  const contentBase64 = pemData.replace(/\r?\n|\r/g, '').replace(/-+(BEGIN|END) ?[^-]+?-+/g, '');
  return getArrayBufferFromBase64(contentBase64);
};

/**
 * Convert PEM-encoded keys to JSON Web Key format
 * @param {string} pemData key string in PEM-encoded format.
 * @returns {Object} an object of result JWK key
 */
export const keyPEMToJWK = async (pemData) => {
  const key = await JWK.asKey(pemData, 'pem');
  return key.toJSON(true);
};
