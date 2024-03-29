import { allProps } from "react-native-known-styling-properties";
import { utils } from "stylelint";
import {
  isCustomProperty,
  isStandardSyntaxDeclaration,
  isStandardSyntaxProperty,
  isString,
  kebabCase,
  namespace,
  optionsMatches
} from "../../utils";

export const ruleName = namespace("style-property-no-unknown");

export const messages = utils.ruleMessages(ruleName, {
  rejected: (property) => `Unexpected unknown property "${property}"`
});

const props = allProps.map(kebabCase);

export default function (actual, options) {
  return function (root, result) {
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

    root.walkDecls((decl) => {
      const prop = decl.prop;
      const value = decl.value;

      if (kebabCase(prop) === kebabCase(value)) {
        return;
      }

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
