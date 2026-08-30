import { useCallback, useState } from "react";
import { useFetcher } from "react-router";
import { Toast } from "~/commons/utils/toast";
import { choices } from "./FeedbackContent/choicesFeedbacks";
import { URLs } from "../config/configAppUrls";
import { outlinedStarSVG, filledStarSVG } from "./FeedbackContent/StarsSvgsIcon";
import { useCommonsT } from "~/commons/providers";

type SubmitResponseType = {
  success: boolean;
  ticket?: any;
  error?: string;
};

export type GiveFeedBacksPropsType = {
  onHide: () => void;
};

export const GiveFeedBacks = ({ onHide }: GiveFeedBacksPropsType): JSX.Element => {
  const ct = useCommonsT();
  const fetcher = useFetcher<SubmitResponseType>();

  const [selectedReason, setSelectedReason] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [otherFeedback, setOtherFeedback] = useState("");

  const loading = fetcher.state !== "idle";
  const emojis = ["😡", "😞", "😐", "😊", "😍"];

  const handleChoiceChange = useCallback((value: string) => {
    setSelectedReason((prev) =>
      prev.includes(value) ? prev.filter((reason) => reason !== value) : [...prev, value]
    );
  }, []);

  const handleSubmit = useCallback(
    (submittedRating: number) => {
      const reasons =
        selectedReason.length > 0 ? selectedReason.map((r) => `"${r}"`).join(", ") : "";
      const descriptionParts = [
        `Rating: ${submittedRating}/5`,
        reasons ? `Reasons: ${reasons}` : "",
        otherFeedback ? `Additional feedback: ${otherFeedback}` : "",
      ].filter(Boolean);

      const data = new FormData();
      data.set("title", `Feedback — ${submittedRating}/5 stars`);
      data.set("description", descriptionParts.join("\n"));
      data.set("type", "question");
      data.set("images", JSON.stringify([]));

      fetcher.submit(data, {
        method: "POST",
        action: "/api/support/tickets",
      });

      try {
        if (typeof window !== "undefined" && (window as any).Tawk_API?.addEvent) {
          (window as any).Tawk_API.addEvent("Leave-Review", {
            rating: submittedRating,
            message: otherFeedback || "",
            reason: reasons,
          });
        }
      } catch {}

      onHide();
      Toast(ct("commons.feedback.thanks") || "Thank you for your feedback!");
    },
    [selectedReason, otherFeedback, fetcher, onHide, ct]
  );

  const handleRating = useCallback(
    (value: number) => {
      setRating(value);
      if (value >= 4) {
        handleSubmit(value);
        window.open(`${URLs.prizify}#modal-show=WriteReviewModal`, "_blank");
      }
    },
    [handleSubmit]
  );

  return (
    <div className="space-y-5 p-5 text-center">
      <h3 className="text-foreground text-base font-bold">
        {ct("commons.feedback.share") || "Share your feedback"}
      </h3>

      {/* Star ratings */}
      <div className="flex cursor-pointer items-center justify-center gap-2">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              type="button"
              key={index}
              onClick={() => handleRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
              className="p-1 text-amber-400 transition-transform hover:scale-110"
            >
              {starValue <= (hover || rating) ? filledStarSVG : outlinedStarSVG}
            </button>
          );
        })}
      </div>

      <div className="flex h-8 items-center justify-center text-2xl">
        {hover > 0 ? emojis[hover - 1] : rating > 0 ? emojis[rating - 1] : ""}
      </div>

      {rating > 0 && rating < 4 && (
        <div className="border-border space-y-4 border-t pt-4 text-left">
          <h4 className="text-foreground text-xs font-bold">
            {ct("commons.feedback.tell_more") || "Tell us what we can improve"}
          </h4>

          <div className="space-y-2">
            {choices.map((choice) => (
              <label
                key={choice.value}
                className="flex cursor-pointer items-center gap-2 text-xs font-medium"
              >
                <input
                  type="checkbox"
                  checked={selectedReason.includes(choice.value)}
                  onChange={() => handleChoiceChange(choice.value)}
                  className="border-border rounded"
                />
                <span>{choice.label}</span>
              </label>
            ))}
          </div>

          <textarea
            value={otherFeedback}
            onChange={(e) => setOtherFeedback(e.target.value)}
            placeholder={ct("commons.feedback.placeholder") || "Any additional feedback..."}
            rows={3}
            className="border-border bg-background text-foreground focus:ring-primary w-full rounded-lg border p-3 text-xs focus:ring-1 focus:outline-none"
          />

          <div className="flex justify-end pt-2">
            <s-button variant="primary" loading={loading} onClick={() => handleSubmit(rating)}>
              {ct("commons.feedback.send") || "Send Feedback"}
            </s-button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiveFeedBacks;
