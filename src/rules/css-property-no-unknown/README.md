# css-property-no-unknown

Disallow unknown React Native CSS properties.

This rule is meant to be used with tools that allow you to write CSS when using React Native, e.g. [styled-components](https://www.styled-components.com/), [React Native CSS modules](https://github.com/kristerkari/react-native-css-modules), etc.

```css
.text {
  heigth: 100%;
}
/** ↑
 * These properties */
```

This rule considers properties supported by [css-to-react-native](https://github.com/styled-components/css-to-react-native) to be known.

This rule ignores variables (`$sass`, `@less`, `--custom-property`).

## Options

### `true`

The following patterns are considered violations:

```css
.text {
  word-wrap: break-word;
}
```

```css
.text {
  colr: blue;
}
```

```css
.text {
  my-property: 1;
}
```

```js
const Button = styled.a`
  colr: blue;
`;
```

The following patterns are _not_ considered violations:

```css
.text {
  color: green;
}
```

```css
.text {
  align-self: center;
}
```

```css
.text {
  elevation: 6;
}
```

```css
.text {
  box-shadow: 1px 2px 3px red;
}
```

```js
const Button = styled.a`
  color: green;
`;
```

## Optional secondary options

### `ignoreProperties: ["/regex/", "string"]`

Given:

```js
["/^my-/", "custom"];
```

The following patterns are _not_ considered violations:

```css
.text {
  my-property: 10px;
}
```

```css
.text {
  my-other-property: 10px;
}
```

```css
.text {
  custom: 10px;
}
```

```js
const Button = styled.a`
  my-property: 10px;
`;
```
