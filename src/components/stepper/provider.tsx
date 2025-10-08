import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

export interface StepperContextProps {
  nextStep(): void;
  prevStep(): void;
  goTo(index: number): void;
  defineTotalSteps(count: number): void;
  currentStep: number;
  totalSteps: number;
  isLastStep: boolean;
  isFirstStep: boolean;
}

interface StepperProviderProps {
  onStepChange?: () => void;
  initialStep?: number;
  children: React.ReactNode;
}

const StepperContext = createContext<StepperContextProps | undefined>(undefined);

export const StepperProvider: React.FC<StepperProviderProps> = ({
  initialStep = 1,
  onStepChange,
  children
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [totalSteps, setTotalSteps] = useState(0);
  const isFirstStep = currentStep === 1;
  const isLastStep = totalSteps > 0 && currentStep === totalSteps;

  const prevStepRef = useRef<number>(undefined);

  useEffect(() => {
    const previousStep = prevStepRef.current;

    if (previousStep !== undefined && previousStep !== currentStep) {
      onStepChange?.();
    }

    prevStepRef.current = currentStep;
  }, [currentStep, onStepChange]);

  const goTo = useCallback(
    (index: number) => {
      if (index > 0 && index <= totalSteps) {
        setCurrentStep(index);
      }
    },
    [totalSteps]
  );

  const nextStep = useCallback(() => {
    setCurrentStep((current) => (current < totalSteps ? current + 1 : current));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((current) => (current > 1 ? current - 1 : current));
  }, []);

  const defineTotalSteps = useCallback(
    (count: number) => {
      if (count !== totalSteps) {
        setTotalSteps(count);
      }
    },
    [totalSteps]
  );

  return (
    <StepperContext.Provider
      value={{
        currentStep,
        nextStep,
        prevStep,
        goTo,
        defineTotalSteps,
        totalSteps,
        isLastStep,
        isFirstStep
      }}>
      {children}
    </StepperContext.Provider>
  );
};

export function useStepper(): StepperContextProps {
  const context = useContext(StepperContext);

  if (context === undefined) {
    throw new Error('useStepper must be used inside a StepperProvider (Stepper.Root).');
  }

  return context;
}
