import { type StepperContextProps, useStepper } from './provider';

export interface StepperConsumerProps {
  children: (context: StepperContextProps) => React.ReactNode;
}

const StepperConsumer: React.FC<StepperConsumerProps> = ({ children }) => {
  const context = useStepper();

  if (typeof children !== 'function') {
    throw new Error('Stepper.Consumer must be used with a function as a child (render prop).');
  }

  return children(context);
};

StepperConsumer.displayName = 'Stepper.Consumer';
export { StepperConsumer };
