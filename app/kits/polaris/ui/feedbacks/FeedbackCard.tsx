import { useEffect, useState } from "react";
import { useCommonsT } from "~/commons/providers";

export type FeedbackCardPropsType = {
  appUrl: string;
};

// Compatibility alias
export type FeedbackCardProps = FeedbackCardPropsType;

export const FeedbackCard = ({ appUrl }: FeedbackCardPropsType): JSX.Element | null => {
  const ct = useCommonsT();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const alreadyFeedback = !!window.localStorage.getItem(`alreadyFeedback-${appUrl}`);
      if (alreadyFeedback) {
        setSubmitted(true);
      }
    }
  }, [appUrl]);

  if (typeof window === "undefined") {
    return null;
  }

  const goodFeedback = () => {
    window.open(`${appUrl}#modal-show=WriteReviewModal`, "_blank");
    setSubmitted(true);
    window.localStorage.setItem(`alreadyFeedback-${appUrl}`, "true");
  };

  const badFeedback = () => {
    window.open("https://xco.agency/pages/maestro-feedback?rate=buy", "_blank");
    setSubmitted(true);
    window.localStorage.setItem(`alreadyFeedback-${appUrl}`, "true");
  };

  return (
    <div className="p-4 rounded-xl border border-border bg-card space-y-3">
      <h2 className="text-sm font-bold text-foreground">{ct("commons.feedback.share")}</h2>
      {submitted ? (
        <s-banner tone="success">{ct("commons.feedback.thanks")}</s-banner>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">{ct("commons.feedback.question")}</p>
          <div className="flex items-center gap-2">
            <s-button onClick={goodFeedback}>👍 {ct("commons.feedback.good")}</s-button>
            <s-button onClick={badFeedback}>👎 {ct("commons.feedback.bad")}</s-button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;
