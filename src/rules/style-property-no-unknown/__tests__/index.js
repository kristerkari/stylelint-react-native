import { messages, ruleName } from "..";

testRule({
  ruleName,
  config: [true],

  accept: [
    {
      code: `
      .foo {
        border-color: red;
        height: 0;
        min-width: 700px;
      }
      `,
      description: "accepts supported CSS properties"
    },
    {
      code: `
      .foo {
        elevation: 6;
        shadow-color: black;
      }
      `,
      description: "accepts React Native specific properties"
    },
    {
      code: ".foo { --bg-color: white; }",
      description: "ignore standard CSS variables"
    },
    {
      code: ".foo { *width: 100px; }",
      description: "ignore CSS hacks"
    }
  ],

  reject: [
    {
      code: ".foo { colr: blue; }",
      description: "rejects property with typo",
      message: messages.rejected("colr"),
      line: 1,
      column: 8
    },
    {
      code: ".foo { COLR: blue; }",
      description: "rejects uppercase property with typo",
      message: messages.rejected("COLR"),
      line: 1,
      column: 8
    },
    {
      code: ".foo {\n  colr: blue;\n}",
      description: "rejects property with typo when there are newlines",
      message: messages.rejected("colr"),
      line: 2,
      column: 3
    },
    {
      code: ".foo { *wdth: 100px; }",
      description: "rejects css hacks with typo",
      message: messages.rejected("wdth"),
      line: 1,
      column: 8
    },
    {
      code: `
      .foo {
        word-wrap: break-word;
      }
    `,
      description: "rejects unsupported CSS properties",
      message: messages.rejected("word-wrap"),
      line: 3,
      column: 9
    },
    {
      code: `
      .foo {
        -webkit-align-self: stretch;
      }
    `,
      description: "rejects CSS properties with vendor prefix",
      message: messages.rejected("-webkit-align-self"),
      line: 3,
      column: 9
    },
    {
      code: `
      .foo {
        border: 1px #000 solid;
        box-shadow: 1px 2px 3px red;
      }
      `,
      warnings: [
        {
          message: messages.rejected("border"),
          line: 3,
          column: 9
        },
        {
          message: messages.rejected("box-shadow"),
          line: 4,
          column: 9
        }
      ],
      description: "rejects css-to-react-native specific properties"
    }
  ]
});

testRule({
  ruleName,
  customSyntax: "@stylelint/postcss-css-in-js",
  skipBasicChecks: true,
  config: [true],

  accept: [
    {
      code: `
      StyleSheet.create({
        foo: {
          borderColor: "red",
          height: 0,
          minWidth: 700
        }
      });
      `,
      description: "accepts supported CSS properties"
    },
    {
      code: `
      StyleSheet.create({
        foo: {
          elevation: 6,
          shadowColor: "black",
          aspectRatio: 3/2
        }
      });
      `,
      description: "accepts React Native specific properties"
    },
    {
      code: `
      const styles = {
        text: {
          color: "blue"
        }
      };

      StyleSheet.create({
        styles
      });
      `,
      description: "ignores object composition (issue #18)"
    },
    {
      code: `
      const styles = {
        text: {
          color: "blue"
        }
      };

      StyleSheet.create({
        styles: styles
      });
      `,
      description: "ignores object composition (issue #18)"
    },
    {
      code: `
      const yourStyles = {
        link: {
          color: "red"
        }
      };

      const styles = {
        btn: {
          color: "green"
        }
      };

      const myStyles = {
        text: {
          color: "blue"
        }
      };

      StyleSheet.create({
        ...yourStyles,
        styles,
        myStyles
      });
      `,
      description: "ignores object composition (issue #18)"
    }
  ],

  reject: [
    {
      code: `
      StyleSheet.create({
        foo: {
          colr: "blue"
        }
      })
      `,
      description: "rejects property with typo",
      message: messages.rejected("colr"),
      line: 4,
      column: 10
    },
    {
      code: `
      StyleSheet.create({
        foo: {
          COLR: "blue"
        }
      })
      `,
      description: "rejects uppercase property with typo",
      message: messages.rejected("-c-o-l-r"),
      line: 4,
      column: 10
    },
    {
      code: `
      StyleSheet.create({
        foo: {
          wordWrap: "break-word"
        }
      })
    `,
      description: "rejects unsupported CSS properties",
      message: messages.rejected("word-wrap"),
      line: 4,
      column: 10
    },
    {
      code: `
      StyleSheet.create({
        foo: {
          border: "1px #000 solid",
          boxShadow: "1px 2px 3px red"
        }
      })
      `,
      warnings: [
        {
          message: messages.rejected("border"),
          line: 4,
          column: 10
        },
        {
          message: messages.rejected("box-shadow"),
          line: 5,
          column: 10
        }
      ],
      description: "rejects css-to-react-native specific properties"
    },
    {
      code: `
      const styles = {
        btn: {
          color: "green"
        }
      };

      StyleSheet.create({
        styles,
        foo: {
          wordWrap: "break-word"
        }
      })
    `,
      description:
        "ignores object composition and rejects unsupported CSS properties",
      message: messages.rejected("word-wrap"),
      line: 11,
      column: 10
    }
  ]
});

testRule({
  ruleName,
  customSyntax: "postcss-scss",
  config: [true],

  accept: [
    {
      code: ".foo { $bgColor: white; }",
      description: "ignore SCSS variables"
    },
    {
      code: ".foo { #{$prop}: black; }",
      description: "ignore property interpolation"
    },
    {
      code: ".foo { border: { style: solid; } }",
      description: "ignore nested properties"
    }
  ]
});

testRule({
  ruleName,
  customSyntax: "postcss-less",
  config: [true],

  accept: [
    {
      code: ".foo { @bgColor: white; }",
      description: "ignore LESS variables"
    },
    {
      code: ".foo { @{prop}: black; }",
      description: "ignore property interpolation"
    },
    {
      code: ".foo { transform+: rotate(15deg); }",
      descritpion: "Append property value with space usign +"
    },
    {
      code: ".foo { transform+_: rotate(15deg); }",
      descritpion: "Append property value with space using +_"
    }
  ]
});

testRule({
  ruleName,
  config: [
    true,
    {
      ignoreProperties: ["-moz-overflow-scrolling", "/^my-/"]
    }
  ],

  accept: [
    {
      code: ".foo { -moz-overflow-scrolling: auto; }",
      description: "Ignores with a string property"
    },
    {
      code: ".foo { my-property: 1; }",
      description: "Ignores with a regex property"
    },
    {
      code: ".foo { my-other-property: 1; }",
      description: "Ignores with a regex property"
    }
  ],

  reject: [
    {
      code: ".foo { overflow-scrolling: auto; }",
      message: messages.rejected("overflow-scrolling"),
      line: 1,
      column: 8
    },
    {
      code: ".foo { not-my-property: 1; }",
      message: messages.rejected("not-my-property"),
      line: 1,
      column: 8
    }
  ]
});
