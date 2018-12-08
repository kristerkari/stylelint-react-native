/**
 * Check whether a declaration is inside an :export block
 */
export function isExportBlock(node /*: Object*/) /*: boolean*/ {
  if (node.type === "rule" && node.selector && node.selector === ":export") {
    return true;
  }

  return false;
}
