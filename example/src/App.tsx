import './App.css';
import { Stepper, useStepper } from '../../src/components/stepper';

function App() {
  return (
    <Stepper.Root className="stepper-root">
      <form>
        <Stepper.Consumer>
          {({ totalSteps, currentStep }) => (
            <div className="stepper-progress">
              {currentStep} / {totalSteps}
            </div>
          )}
        </Stepper.Consumer>

        <Stepper.Content>
          <Stepper.Item className="stepper-item">
            <p>First Step</p>
            <input type="text" placeholder="Name" />
          </Stepper.Item>

          <Stepper.Item className="stepper-item">
            <p>Second Step</p>
            <input type="text" placeholder="Address" />
          </Stepper.Item>

          <StepTree />
        </Stepper.Content>

        <div className="stepper-controllers">
          <Stepper.Prev>
            <button type="button">Prev</button>
          </Stepper.Prev>
          <Stepper.Next>
            <button type="button">Next</button>
          </Stepper.Next>

          <Stepper.Submit>
            <button type="submit">Submit</button>
          </Stepper.Submit>
        </div>
      </form>
    </Stepper.Root>
  );
}

const StepTree = () => {
  const stepper = useStepper();

  return (
    <div className="stepper-item">
      <p>Last Step {stepper.currentStep}</p>
      <input type="email" placeholder="E-mail" />
    </div>
  );
};

export default App;
