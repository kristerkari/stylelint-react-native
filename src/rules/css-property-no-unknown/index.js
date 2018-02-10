import { utils } from "stylelint";
import { allCSS2RNProps } from "react-native-known-styling-properties";
import {
  kebabCase,
  namespace,
  isString,
  isCustomProperty,
  isStandardSyntaxProperty,
  isStandardSyntaxDeclaration,
  optionsMatches
} from "../../utils";

export const ruleName = namespace("css-property-no-unknown");

export const messages = utils.ruleMessages(ruleName, {
  rejected: property => `Unexpected unknown property "${property}"`
});

const props = allCSS2RNProps.map(kebabCase);

export default function(actual, options) {
  return function(root, result) {
    const validOptions = utils.validateOptions(
      result,
      ruleName,
      {
        actual
      },
      {
        actual: options,
        possible: {
          ignoreProperties: [isString]
        },
        optional: true
      }
    );

    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      const prop = decl.prop;

      if (!isStandardSyntaxProperty(prop)) {
        return;
      }

      if (!isStandardSyntaxDeclaration(decl)) {
        return;
      }

      if (isCustomProperty(prop)) {
        return;
      }

      if (optionsMatches(options, "ignoreProperties", prop)) {
        return;
      }

      if (props.indexOf(prop.toLowerCase()) !== -1) {
        return;
      }

      utils.report({
        message: messages.rejected(prop),
        node: decl,
        result,
        ruleName
      });
    });
  };
}
