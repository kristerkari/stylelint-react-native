const validateTypes = require("./validateTypes");

/**
 * Get the index of a declaration's value
 *
 * @param {import('postcss').Declaration} decl
 * @returns {number}
 */
function declarationValueIndex(decl) {
  const raws = decl.raws;
  const prop = raws.prop;

  return [
    validateTypes.isObject(prop) && "prefix" in prop && prop.prefix,
    (validateTypes.isObject(prop) && "raw" in prop && prop.raw) || decl.prop,
    validateTypes.isObject(prop) && "suffix" in prop && prop.suffix,
    raws.between || ":",
    raws.value && "prefix" in raws.value && raws.value.prefix
  ].reduce((/** @type {number} */ count, str) => {
    if (validateTypes.isString(str)) {
      return count + str.length;
    }

    return count;
  }, 0);
}

module.exports = declarationValueIndex;
