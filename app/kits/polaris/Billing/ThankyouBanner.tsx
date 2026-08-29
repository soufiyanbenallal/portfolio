import { useNavigate } from "react-router";

export type ThankyouBannerPropsType = {
  planHandle?: string | null;
  newPlan?: string | null;
  exploreFeaturesUrl?: string | null;
};

// Compatibility alias
export type ThankyouBannerProps = ThankyouBannerPropsType;

export const ThankyouBanner = ({
  planHandle,
  exploreFeaturesUrl,
}: ThankyouBannerPropsType): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-card rounded-2xl border border-border space-y-4 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-foreground">🎉 Congratulations!</h2>
        <p className="text-xs text-muted-foreground">
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
        <div className="text-xs text-muted-foreground bg-muted/60 p-2 rounded-lg border border-border/60">
          Plan confirmation reference: <code className="font-mono">{planHandle}</code>
        </div>
      )}
    </div>
  );
};

export default ThankyouBanner;
