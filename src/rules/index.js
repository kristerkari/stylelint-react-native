import cssPropertyNoUnknown from "./css-property-no-unknown";
import stylePropertyNoUnknown from "./style-property-no-unknown";
import fontWeightNoIgnoredValues from "./font-weight-no-ignored-values";

const rules = {
  "font-weight-no-ignored-values": fontWeightNoIgnoredValues,
  "css-property-no-unknown": cssPropertyNoUnknown,
  "style-property-no-unknown": stylePropertyNoUnknown
};

module.exports = rules;
