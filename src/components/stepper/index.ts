import { StepperConsumer } from './consumer';
import { StepperContent } from './content';
import { NextStep, PrevStep, SubmitController } from './controllers';
import { StepperItem } from './item';
import { useStepper as useStepperContext } from './provider';
import { StepperRoot } from './root';

export const Stepper = {
  Root: StepperRoot,
  Content: StepperContent,
  Item: StepperItem,
  Consumer: StepperConsumer,
  Next: NextStep,
  Prev: PrevStep,
  Submit: SubmitController
};

export const useStepper = useStepperContext;
