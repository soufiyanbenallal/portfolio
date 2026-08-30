import { useOnboarding } from '../useOnboarding';
import { ProgressHeader } from './shared/ProgressHeader';
import { StepTransition } from './shared/StepTransition';
import { Step1Initializing } from './steps/Step1Initializing';
import { Step2RevenueFoundation } from './steps/Step2RevenueFoundation';
import { Step3DefaultConfiguration } from './steps/Step3DefaultConfiguration';
import { Step4AddTools } from './steps/Step4AddTools';
import { Step5SequentialSetup } from './steps/Step5SequentialSetup';
import { Step6ShopifyValidation } from './steps/Step6ShopifyValidation';
import { Step7Celebration } from './steps/Step7Celebration';
import styles from './OnboardingFlow.module.css';

export type OnboardingFlowPropsType = {
  /** Called when the merchant taps the final CTA. Wire this to your router. */
  onGoToDashboard?: () => void;
  /** Called from the "Exit setup" link in the header, if provided. */
  onExit?: () => void;
  /** Optional — lets a host app offer to replay the flow (demo/QA convenience). */
  onRestart?: () => void;
};

export function OnboardingFlow({
  onGoToDashboard,
  onExit,
  onRestart,
}: OnboardingFlowPropsType) {
  const { state, dispatch, stepIndex, totalSteps } = useOnboarding();

  const renderStep = () => {
    switch (state.currentStep) {
      case 'initializing':
        return <Step1Initializing state={state} dispatch={dispatch} />;
      case 'revenue-foundation':
        return <Step2RevenueFoundation state={state} dispatch={dispatch} />;
      case 'default-configuration':
        return <Step3DefaultConfiguration state={state} dispatch={dispatch} />;
      case 'add-tools':
        return <Step4AddTools state={state} dispatch={dispatch} />;
      case 'sequential-setup':
        return <Step5SequentialSetup state={state} dispatch={dispatch} />;
      case 'shopify-validation':
        return <Step6ShopifyValidation state={state} dispatch={dispatch} />;
      case 'celebration':
        return (
          <Step7Celebration
            state={state}
            dispatch={dispatch}
            onGoToDashboard={onGoToDashboard}
            onRestart={onRestart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <s-page>
      <ProgressHeader
        step={state.currentStep}
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        onBack={() => dispatch({ type: 'GO_BACK' })}
        onExit={onExit}
      />
      <StepTransition stepKey={`${state.currentStep}-${state.queueIndex}`}>
        {renderStep()}
      </StepTransition>
    </s-page>
  );
}
