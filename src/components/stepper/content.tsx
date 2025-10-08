import type { ComponentProps } from 'react';
import React, { useEffect } from 'react';
import { useStepper } from './provider';

export interface StepperContentProps extends ComponentProps<'div'> {
  children: React.ReactElement[];
}

const StepperContent: React.FC<StepperContentProps> = ({ children, ...props }) => {
  const { defineTotalSteps, currentStep } = useStepper();

  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    defineTotalSteps(childrenArray.length);
  }, [childrenArray.length, defineTotalSteps]);

  const currentChild = childrenArray[currentStep - 1];

  return <div {...props}>{currentChild}</div>;
};

StepperContent.displayName = 'Stepper.Content';
export { StepperContent };
