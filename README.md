# stylelint-react-native

A collection of React Native specific linting rules for [stylelint](https://github.com/stylelint/stylelint) (in a form of a plugin).

[![Build Status](https://travis-ci.org/kristerkari/stylelint-react-native.svg?branch=master)](https://travis-ci.org/kristerkari/stylelint-react-native)
[![Build status](https://ci.appveyor.com/api/projects/status/6rse3dd910c0wiwl/branch/master?svg=true)](https://ci.appveyor.com/project/kristerkari/stylelint-react-native/branch/master)

## Installation and usage

stylelint-react-native is a plugin for [stylelint](http://stylelint.io/user-guide/), so it's meant to be used with it.

**Node.js v4.2.1 or newer** is required. That's because stylelint itself [doesn't support Node.js versions below 4](https://github.com/stylelint/stylelint/blob/master/package.json#L32).

First, install stylelint-react-native (and stylelint, if you haven't done so yet) via NPM:

```
yarn add stylelint stylelint-react-native --dev
```

or

```
npm install stylelint stylelint-react-native --save-dev
```

Create the `.stylelintrc` config file (or open the existing one), add `stylelint-react-native` to the plugins array and the rules you need to the rules list. All rules from `stylelint-react-native` need to be namespaced with `react-native`.

```json
{
  "plugins": ["stylelint-react-native"],
  "rules": {
    "react-native/css-property-no-unknown": true
  }
}
```

Please refer to [stylelint docs](http://stylelint.io/user-guide/) for the detailed info on using this linter plugin.

## List of rules

### CSS- rules
