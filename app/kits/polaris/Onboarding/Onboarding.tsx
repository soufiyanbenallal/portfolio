import { ONBOARDING_STEPS_CONFIG } from "./constants";
import { useOnboarding } from "./useOnboarding";
import { ProgressHeader } from "./components/shared/ProgressHeader";
import { StepTransition } from "./components/shared/StepTransition";
import { Step1Initializing } from "./components/steps/Step1Initializing";
import { Step2RevenueFoundation } from "./components/steps/Step2RevenueFoundation";
import { Step3DefaultConfiguration } from "./components/steps/Step3DefaultConfiguration";
import { Step4AddTools } from "./components/steps/Step4AddTools";
import { Step5ShopifyValidation } from "./components/steps/Step5ShopifyValidation";
import { Step6Celebration } from "./components/steps/Step6Celebration";
import type { OnboardingStepIdType } from "./types";

export type OnboardingPropsType = {
  /** Called when the merchant taps the final CTA. Wire this to your router. */
  onGoToDashboard?: () => void;
  /** Called from the "Exit setup" link in the header, if provided. */
  onExit?: () => void;
  /** Optional — lets a host app offer to replay the flow (demo/QA convenience). */
  onRestart?: () => void;
};

export function Onboarding({ onGoToDashboard, onExit, onRestart }: OnboardingPropsType) {
  const { state, dispatch, stepIndex } = useOnboarding();

  const renderStep = () => {
    switch (state.currentStep) {
      case "initializing":
        return <Step1Initializing state={state} dispatch={dispatch} />;
      case "revenue-foundation":
        return <Step2RevenueFoundation state={state} dispatch={dispatch} />;
      case "default-configuration":
        return <Step3DefaultConfiguration state={state} dispatch={dispatch} />;
      case "add-tools":
        return <Step4AddTools state={state} dispatch={dispatch} />;
      case "shopify-validation":
        return <Step5ShopifyValidation state={state} dispatch={dispatch} />;
      case "celebration":
        return (
          <Step6Celebration
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
        stepIndex={stepIndex}
        steps={ONBOARDING_STEPS_CONFIG}
        onGoToStep={(targetStep: OnboardingStepIdType) =>
          dispatch({ type: "GO_TO_STEP", step: targetStep })
        }
      />
      <br />
      <StepTransition stepKey={state.currentStep}>{renderStep()}</StepTransition>
    </s-page>
  );
}

export default Onboarding;
