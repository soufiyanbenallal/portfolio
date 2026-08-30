import { useCallback, useState } from "react";
import { useFetcher } from "react-router";

type SubmitResponseType = {
  success: boolean;
  ticket?: any;
  error?: string;
};

export const RequestFeatureContent = (): JSX.Element => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fetcher = useFetcher<SubmitResponseType>();

  const submitting = fetcher.state !== "idle";
  const justSubmitted = fetcher.state === "idle" && fetcher.data?.success === true;

  const handleSubmit = useCallback(() => {
    if (!title || !description) return;

    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    data.set("type", "feature");
    data.set("images", JSON.stringify([]));

    fetcher.submit(data, {
      method: "POST",
      action: "/api/support/tickets",
    });

    setTitle("");
    setDescription("");
  }, [title, description, fetcher]);

  return (
    <div className="space-y-4 p-4">
      {justSubmitted && (
        <s-banner tone="success">
          Your request has been submitted! We&apos;ll review it soon.
        </s-banner>
      )}
      {fetcher.data?.success === false && (
        <s-banner tone="critical">
          {fetcher.data.error || "There was an error sending your request. Please try again."}
        </s-banner>
      )}

      <div className="space-y-1">
        <label className="text-foreground text-xs font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="E.g.: Bulk edit feature or Checkout issue"
          disabled={submitting}
          className="border-border bg-background text-foreground focus:ring-primary w-full rounded-lg border px-3 py-2 text-xs shadow-xs focus:ring-1 focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-foreground text-xs font-semibold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Describe the feature you'd like or the issue you're facing."
          disabled={submitting}
          className="border-border bg-background text-foreground focus:ring-primary w-full rounded-lg border p-3 text-xs shadow-xs focus:ring-1 focus:outline-none"
        />
      </div>

      <div className="flex justify-end pt-2">
        <s-button
          variant="primary"
          onClick={handleSubmit}
          loading={submitting}
          disabled={!title || !description}
        >
          Send Request
        </s-button>
      </div>
    </div>
  );
};

export default RequestFeatureContent;
