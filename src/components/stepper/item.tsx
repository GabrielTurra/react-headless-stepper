import type { ComponentProps } from 'react';

type StepperItemProps = ComponentProps<'div'>;

const StepperItem: React.FC<StepperItemProps> = ({ ...props }) => {
  return <div {...props} />;
};

StepperItem.displayName = 'Stepper.Item';
export { StepperItem };
