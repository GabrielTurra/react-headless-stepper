import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps } from 'react';
import { useStepper } from './provider';

type ControllerProps = ComponentProps<'button'>;

type PrevControllerProps = ControllerProps & {
  showInFirstStep?: boolean;
};

type NextControllerProps = ControllerProps & {
  showInLastStep?: boolean;
};

const NextStep: React.FC<NextControllerProps> = ({ showInLastStep, ...props }) => {
  const { isLastStep, nextStep } = useStepper();

  if (!isLastStep || showInLastStep) {
    return <Slot {...props} onClick={nextStep} />;
  }
};

NextStep.displayName = 'Stepper.Next';
export { NextStep };

const PrevStep: React.FC<PrevControllerProps> = ({ showInFirstStep = false, ...props }) => {
  const { isFirstStep, prevStep } = useStepper();

  if (!isFirstStep || showInFirstStep) {
    return <Slot {...props} onClick={prevStep} />;
  }
};

PrevStep.displayName = 'Stepper.Prev';
export { PrevStep };

const SubmitController: React.FC<ControllerProps> = ({ ...props }) => {
  const { isLastStep } = useStepper();

  if (isLastStep) {
    return <Slot {...props} />;
  }
};

SubmitController.displayName = 'Stepper.Submit';
export { SubmitController };
