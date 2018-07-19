# font-weight-no-ignored-values

Disallow valid `font-weight` values that work on iOS, but are ignored and get mapped to `normal` or `bold` weight on Android.

```css
.a {
  font-weight: 500;
}
/**            ↑
 *             This value */
```

## Options

### `true`

The following patterns are considered violations:

```css
.a {
  font-weight: 100;
}
```

```css
.a {
  font-weight: 300;
}
```

The following patterns are _not_ considered violations:

```css
.a {
  font-weight: 400;
}
```

```css
.a {
  font-weight: 700;
}
```

```css
.a {
  font-weight: normal;
}
```

```css
.a {
  font-weight: bold;
}
```
