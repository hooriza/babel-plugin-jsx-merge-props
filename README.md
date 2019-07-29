# babel-plugin-jsx-merge-props

[![Build Status](https://travis-ci.org/hooriza/babel-plugin-jsx-merge-props.svg?branch=master)](https://travis-ci.org/hooriza/babel-plugin-jsx-merge-props)
[![npm](https://img.shields.io/npm/v/babel-plugin-jsx-merge-props.svg)](https://www.npmjs.com/package/babel-plugin-jsx-merge-props)
![size](https://img.shields.io/bundlephobia/minzip/babel-plugin-jsx-merge-props.svg)


## Why?
It's annoying to use props that provided from multiple hooks.

```jsx
const useFirstHook = () => {
  ...

  return {
    className,
    style,
    onClick,
  };
};

const useSecondHook = () => {
  ...

  return {
    value,
    style,
    onClick,
  };
};
```

```jsx
const MyComponent = () => {
  const first = useFirstHook(...);
  const second = useSecondHook(...);

  const handleClick = useCallback(event => {
    first.onClick(event);
    second.onClick(event);
  }, [first, second]);

  return (
    <input
      type="text"
      {...first}
      {...second}
      className={[first.className, second.className].join(' ')}
      style={{ ...first.style, ...second.style }}
      onClick={handleClick}
    />
  );
}
```

Or would be better to use some package like [`merge-props`](https://github.com/andrewbranch/merge-props),
but It's still little bit bothersome.

```jsx
import mergeProps from 'merge-props';

const MyComponent = () => {
  const first = useFirstHook(...);
  const second = useSecondHook(...);

  return (
    <input
      type="text"
      {...mergeProps(first, second)}
    />
  );
}
```

You can just write like below with this plugin.

```jsx
import mergeProps from 'merge-props';

const MyComponent = () => {
  const first = useFirstHook(...);
  const second = useSecondHook(...);

  return (
    <input merge={mergeProps}
      type="text"
      {...first}
      {...second}
    />
  );
}
```

## Installation
```
npm install --save-dev babel-plugin-jsx-merge-props
```

## Usage
`.babelrc`:
```json
{
  "plugins": [ "babel-plugin-jsx-merge-props" ]
}
```
