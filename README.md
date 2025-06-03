# FormattedTokenAmount React Component

The `FormattedTokenAmount` component is an extension for `react-intl`, designed to display token amounts with specific formatting rules, especially for very small numbers. It enhances `react-intl`'s number formatting capabilities by providing a specialized component that leverages `decimal.js` for precise calculations.

## Features

- Displays token amounts with appropriate decimal places.
- Handles very small numbers (less than 0.000001) by showing them in a condensed format (e.g., 0.<sub>6</sub>1234).
- Allows customization of the wrapping HTML element.
- Allows customization of the style for the subscript part of very small numbers.

## Installation

Install the package using npm or yarn. You'll also need to ensure you have `react` and `react-intl` installed as peer dependencies.

```bash
npm install @bangbu/react-intl-formatted-token
# or
yarn add @bangbu/react-intl-formatted-token
```

Make sure your project includes `react` and `react-intl`:

```bash
npm install react react-intl
# or
yarn add react react-intl
```

## Props

| Prop       | Type                  | Default | Description                                                                                                |
|------------|-----------------------|---------|------------------------------------------------------------------------------------------------------------|
| `value`    | `number`              |         | **Required.** The numerical value of the token amount.                                                       |
| `subStyle` | `React.CSSProperties` |         | Optional. Custom CSS styles to apply to the subscript part when displaying very small numbers (e.g., `fontSize`). |
| `as`       | `React.ElementType`   | `"span"`  | Optional. The HTML element type to use as the wrapper for the formatted amount.                              |
| `notation` | `"standard" \| "scientific" \| "engineering" \| "compact"` | `"standard"` | Optional. The notation style to use for formatting the number (from `react-intl`). Defaults to `standard`. |

## Usage

Here's a concise example of how to use the `FormattedTokenAmount` component:

```tsx
import React from 'react';
import { FormattedTokenAmount } from '@bangbu/react-intl-formatted-token';
import { IntlProvider } from 'react-intl';

const MyComponent = () => {
  return (
    <IntlProvider locale="en">
      <div>
        <p>
          Small amount: <FormattedTokenAmount value={0.000000123456} />
        </p>
        <p>
          Regular amount: <FormattedTokenAmount value={123.4567} />
        </p>
        <p>
          Customized small amount: 
          <FormattedTokenAmount 
            value={0.0000000005} 
            as="div" 
            subStyle={{ color: 'blue' }} 
          />
        </p>
        <p>
          Compact notation for a large number: 
          <FormattedTokenAmount value={123456789} notation="compact" />
        </p>
      </div>
    </IntlProvider>
  );
};

export default MyComponent;
```

### Using with React Native

You can use the `as` prop to render the component with React Native's `Text` component. This is useful for ensuring consistent text styling within your React Native application.

```tsx
import React from 'react';
import { FormattedTokenAmount } from '@bangbu/react-intl-formatted-token';
import { IntlProvider } from 'react-intl';
import { Text } from 'react-native'; // Make sure to import Text from react-native

const MyReactNativeScreen = () => {
  return (
    <IntlProvider locale="en">
      {/* Other React Native components */}
      <FormattedTokenAmount 
        value={0.000000789} 
        as={Text} 
        subStyle={{ fontSize: 10 }} // Example subStyle for React Native Text
      />
      <FormattedTokenAmount 
        value={12345.6789} 
        as={Text} 
      />
      {/* Other React Native components */}
    </IntlProvider>
  );
};

export default MyReactNativeScreen;
```
