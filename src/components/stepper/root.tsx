import type { ComponentProps } from 'react';
import React from 'react';
import { StepperProvider } from './provider';

type StepperRootProps = ComponentProps<'div'> & {
  onStepChange?: () => void;
  initialStep?: number;
};

const StepperRoot: React.FC<StepperRootProps> = ({ onStepChange, initialStep, ...props }) => {
  return (
    <StepperProvider onStepChange={onStepChange} initialStep={initialStep}>
      <div {...props} />
    </StepperProvider>
  );
};

StepperRoot.displayName = 'Stepper.Root';
export { StepperRoot };
