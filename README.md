# `react-headless-stepper`

[![NPM version](https://img.shields.io/npm/v/react-headless-stepper.svg)](https://www.npmjs.com/package/react-headless-stepper)
[![License](https://img.shields.io/npm/l/react-headless-stepper.svg)](https://opensource.org/licenses/MIT)

A flexible, headless, and composable multi-step component library for React that gives you complete control over your UI.

## Features
-   **Headless & Unstyled**: Our library is unstyled by design. We don't manage your component's appearance; we just provide the functional tools you need to implement the logic exactly how you want.
-   **Full Control**: Exposes the stepper's state and actions through a consumer component and a hook, allowing for maximum flexibility.
-   **State Management Included**: Handles all the step progression logic internally.

-   **Composable**: Built with a composable API that is intuitive and easy to use.

## Installation

```bash
npm install react-headless-stepper
# or
yarn add react-headless-stepper
```

## Basic Usage

Here's a simple example to get you started.

```jsx
import React from 'react';
import { Stepper, useStepper } from 'react-headless-stepper';

function MyStepper() {
  return (
    <Stepper.Root>
      <Stepper.Consumer>
        {(context) => (
          // Consumer examples bellow
        )}
      </Stepper.Consumer>

      <Stepper.Content>
        <Stepper.Item>1</Stepper.Item>
        <Stepper.Item>2</Stepper.Item>
      </Stepper.Content>

      <Stepper.Prev>
        <button type="button">Prev</button>
      </Stepper.Prev>

      <Stepper.Next>
        <button type="button">Next</button>
      </Stepper.Next>

      <Stepper.Submit>
        <button type="submit">Submit</button>
      </Stepper.Submit>
    </Stepper.Root>
  );
}
```

## Manipulating the Stepper State

You can control the stepper's state and navigation from your components in two ways: using the `Stepper.Consumer` component or the `useStepper` hook.

Both `Stepper.Consumer` and `useStepper` give you access to the exact same set of following tools:

| Name              | Type                | Description                                                 |
| ----------------- | ------------------- | ----------------------------------------------------------- |
| `nextStep()`        | `function`          | Advances to the next step.                                  |
| `prevStep()`        | `function`          | Returns to the previous step.                               |
| `goTo()`            | `(index: number)`   | Navigates directly to a specific step by its index.         |
| `defineTotalSteps()` | `(count: number)`   | Allows you to manually set the total number of steps.       |
| `currentStep`     | `number`            | The index of the current step (starting from 1).            |
| `totalSteps`      | `number`            | The total number of steps.                                  |
| `isLastStep`      | `boolean`           | `true` if the current step is the last one.                 |
| `isFirstStep`     | `boolean`           | `true` if the current step is the first one.                |

---

### Usage Examples

#### 1. Using `Stepper.Consumer`
This component uses the Render Prop pattern. It expects a function as its children prop, which is then called with an object containing the stepper's state and actions as its arguments.

```jsx
import { Stepper } from 'react-headless-stepper';

const MyStepper = () => (
  <Stepper.Root>
    <Stepper.Consumer>
      {({ currentStep, totalSteps }) => (
        <div>
          <p>Step {currentStep} of {totalSteps}</p>
        </div>
      )}
    </Stepper.Consumer>
  </Stepper.Root>
);
```

#### 2. Using the `useStepper` Hook

```jsx
import { Stepper, useStepper } from 'react-headless-stepper';

const MyStepper = () => (
  <Stepper.Root>
    <Stepper.Content>
      <Stepper.Item>Step 1</Stepper.Item>
      <StepTwo />
    </Stepper.Content>
  </Stepper.Root>
);

const StepTwo = () => {
  const stepper = useStepper();

  return (
    <div>Step {stepper.currentStep}</div>
  )
};
```

## Controller Components

These are wrapper components that don't render any UI themselves. Instead, they conditionally render their `children` based on the stepper's current state. This gives you fine-grained control over which navigation elements are visible on each step.

You can place any component inside them, such as your custom styled `<button>`.

> All controller components behave as slots, powered by @radix-ui/react-slot.

### Stepper.Prev

A controller that renders its children on all steps **except the first one**. It is ideal for "previous" or "back" buttons.

| Prop             | Type              | Default | Description                                                                         |
| ---------------- | ----------------- | ------- | ----------------------------------------------------------------------------------- |
| `children`       | `React.ReactNode` | -       | **Required.** The element(s) to render, e.g., `<button>`.                            |
| `showInFirstStep`| `boolean`         | `false` | If set to `true`, it disables the default rule and shows the children on the first step. |

### Stepper.Next

A controller that renders its children on all steps **except the last one**. It is ideal for "next" or "continue" buttons.

| Prop             | Type              | Default | Description                                                                       |
| ---------------- | ----------------- | ------- | --------------------------------------------------------------------------------- |
| `children`       | `React.ReactNode` | -       | **Required.** The element(s) to render, e.g., `<button>`.                          |
| `showInLastStep` | `boolean`         | `false` | If set to `true`, it disables the default rule and shows the children on the last step. |


### Stepper.Submit

A controller that **only** renders its children on the **last step**. It is ideal for "submit" or "finish" buttons. This component has no override props.

| Prop       | Type              | Default | Description                                             |
| ---------- | ----------------- | ------- | ------------------------------------------------------- |
| `children` | `React.ReactNode` | -       | **Required.** The element(s) to render, e.g., `<button>`. |

## Overriding Default Components

If you need different display logic for your navigation controls, you can easily replace the original components with your own.

The pattern is to define a new component that uses the `useStepper` hook to access the stepper's state and actions. Then, you can assign your custom component to the `Stepper` object, overwriting the default implementation.

For example, let's create a custom `Stepper.Prev` button:

```jsx
import { Stepper, useStepper } from 'react-headless-stepper';

// Overwrite the default Stepper.Prev component
Stepper.Prev = () => {
  const { goToPrev, isFirstStep } = useStepper();

  // Return null if it's the first step (or add any other custom logic)
  if (isFirstStep) {
    return null;
  }

  return (
    <button type="button" onClick={goToPrev}>
      Custom Previous Button Here
    </button>
  );
};
```
You can then use it in your application just like the original:
```jsx
  <Stepper.Root>
    {/* ... */}
    <Stepper.Prev />
  </Stepper.Root>
```

## Controlling the Stepper: Initial State and Callbacks
### Stepper.Root

The `Stepper.Root` component is the main container and state provider for the entire stepper system. It manages the current step state and the total number of steps.

### Props

| Prop         | Type       | Required | Description                                                               |
| -------------- | ---------- | -------- | ------------------------------------------------------------------------- |
| `initialStep`  | `number`   | No       | Sets the initial step to be displayed when the component mounts. Defaults to `1`. |
| `onStepChange` | `function` | No       | A callback function that is executed whenever the current step changes. |

#### Usage Example

```jsx
<Stepper.Root 
  onStepChange={() => console.log('callback')} 
  initialStep={1}
>
  {/* Child components here */}
</Stepper.Root>
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

We want to make contributing to this project as easy and transparent as possible. Here's a quick guide on how you can help.

### 1. Setting Up the Development Environment

First, fork the repository and clone it to your local machine. Then, navigate to the project's root directory and install the necessary dependencies:

```bash
npm install
```

This project includes an `example` folder which serves as a testing ground for the library. To run the example project:

```bash
# Navigate to the example directory
cd example

# Install its dependencies
npm install

# Start the development server
npm run dev
```

Now you can make changes to the library's source code in the src folder, and they will be reflected in the example project.

### 2. Creating a Pull Request

We use a structured commit message format to keep our history clean and organized. This project is configured with Commitizen, Husky, and Commitlint to enforce this standard.

Instead of using `git commit`, you should use the following command:

```bash
npm run commit
```

This will launch an interactive command-line prompt that will guide you through creating a compliant commit message.

After committing your changes, push them to your fork and open a Pull Request against the main branch of the original repository.

Development Tools Used

    Husky: Runs checks automatically before you commit and push to ensure code quality and commit message format.

    Commitlint: Ensures that your commit messages follow the Conventional Commits specification.

    Commitizen: An interactive tool to help you craft commit messages that adhere to the standard.

    Biome.js: Used for code formatting and linting to ensure code quality and consistency across the project. 

By following these guidelines, you help us maintain a high-quality and easy-to-understand codebase. We look forward to your contributions!