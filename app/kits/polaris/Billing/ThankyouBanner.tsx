import { useNavigate } from "react-router";

export type ThankyouBannerPropsType = {
  planHandle?: string | null;
  newPlan?: string | null;
  exploreFeaturesUrl?: string | null;
};

export const ThankyouBanner = ({
  planHandle,
  exploreFeaturesUrl,
}: ThankyouBannerPropsType): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-card border-border space-y-4 rounded-2xl border p-6 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-foreground text-xl font-extrabold">🎉 Congratulations!</h2>
        <p className="text-muted-foreground text-xs">
          Welcome to the club! We are thrilled to have you onboard and excited to support your
          journey to even greater revenue success.
        </p>
      </div>

      <s-banner heading="Thank you for choosing us!" tone="info" dismissible>
        With your active subscription, you have unlocked high-converting revenue tools to scale
        average order value and boost conversion rates.
      </s-banner>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        {exploreFeaturesUrl && (
          <s-button variant="primary" onClick={() => navigate(exploreFeaturesUrl)}>
            Explore Revenue Features
          </s-button>
        )}
        <s-button variant="secondary" onClick={() => navigate("/app")}>
          Go to Dashboard
        </s-button>
      </div>

      {planHandle && (
        <div className="text-muted-foreground bg-muted/60 border-border/60 rounded-lg border p-2 text-xs">
          Plan confirmation reference: <code className="font-mono">{planHandle}</code>
        </div>
      )}
    </div>
  );
};

export default ThankyouBanner;
