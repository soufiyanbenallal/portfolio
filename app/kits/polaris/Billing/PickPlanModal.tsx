import { useEffect, useState } from "react";
import { useCommonsT } from "~/commons/providers";
import { PickPlan, type PlanItemType } from "./PickPlan";

export type PlanModalPropsType = {
  appName?: string;
  plans?: PlanItemType[];
  handleClose?: () => void;
  timeoutDuration?: number;
  currentPlan?: string | null;
  isForced?: boolean;
  size?: "small" | "medium" | "large" | "fullScreen";
  subtitle?: string;
  getPlanUrl?: (plan: PlanItemType) => string;
};


export const PickPlanModal = ({
  appName,
  plans,
  handleClose,
  timeoutDuration = 10000,
  currentPlan,
  isForced = false,
  subtitle: subtitleProp,
  getPlanUrl,
}: PlanModalPropsType): JSX.Element | null => {
  const ct = useCommonsT();
  const subtitle = subtitleProp ?? ct("commons.billing.subtitle_no_plan");
  const [showPickPlanModal, setShowPickPlanModal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pickPlanHidden = sessionStorage.getItem("pickPlanHidden");

    if (isForced || !pickPlanHidden || timeoutDuration === 0) {
      const timer = setTimeout(() => {
        setShowPickPlanModal(true);
      }, timeoutDuration);
      return () => clearTimeout(timer);
    }
  }, [timeoutDuration, isForced]);

  const onClose = () => {
    if (!isForced) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pickPlanHidden", "true");
      }
      handleClose?.();
      setShowPickPlanModal(false);
    }
  };

  if (!showPickPlanModal) return null;

  return (
    <s-modal id="pick-plan-modal" heading={ct("commons.billing.choose_plan")} onHide={onClose}>
      <div className="p-4 max-w-4xl max-h-[80vh] overflow-y-auto">
        <PickPlan
          appName={appName}
          plans={plans}
          handleClose={onClose}
          currentPlan={currentPlan}
          isForced={isForced}
          subtitle={subtitle}
          getPlanUrl={getPlanUrl}
        />
      </div>
    </s-modal>
  );
};

export default PickPlanModal;
