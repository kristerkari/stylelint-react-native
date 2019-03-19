# style-property-no-unknown

Disallow unknown React Native styling properties.

This rule is meant to be used when styling with React Native's built-in styling ([StyleSheet](https://facebook.github.io/react-native/docs/stylesheet)), or with tools that use React Native's default styling.

```js
StyleSheet.create({
  text: {
    heigth: "100%"
  }
});
/** ↑
 * These properties */
```

This rule considers properties defined in [React Native](https://github.com/vhpoet/react-native-styling-cheat-sheet) to be known.

This rule ignores variables (`$sass`, `@less`, `--custom-property`).

## Options

### `true`

The following patterns are considered violations:

```js
StyleSheet.create({
  text: {
    wordWrap: "break-word"
  }
});
```

```js
StyleSheet.create({
  text: {
    colr: "blue"
  }
});
```

```js
StyleSheet.create({
  text: {
    myProperty: 1
  }
});
```

```js
StyleSheet.create({
  text: {
    boxShadow: "1px 2px 3px red"
  }
});
```

The following patterns are _not_ considered violations:

```js
StyleSheet.create({
  text: {
    color: "green"
  }
});
```

```js
StyleSheet.create({
  text: {
    alignSelf: "center"
  }
});
```

```js
StyleSheet.create({
  text: {
    elevation: 6
  }
});
```

## Optional secondary options

### `ignoreProperties: ["/regex/", "string"]`

Given:

```js
["/^my-/", "custom"];
```

The following patterns are _not_ considered violations:

```js
StyleSheet.create({
  text: {
    myProperty: 10
  }
});
```

```js
StyleSheet.create({
  text: {
    myOtherProperty: 10
  }
});
```

```js
StyleSheet.create({
  text: {
    custom: 10
  }
});
```
