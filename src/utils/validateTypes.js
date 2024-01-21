/** * Checks if the value is an object.
 * @param {unknown} value
 * @returns {value is object}
 */
function isObject(value) {
  return value !== null && typeof value === "object";
}

/**
 * Checks if the value is a string or a String object.
 * @param {unknown} value
 * @returns {value is string}
 */
function isString(value) {
  return typeof value === "string" || value instanceof String;
}

exports.isObject = isObject;
exports.isString = isString;
