import { useCommonsT } from "~/commons/providers";

export const KlaviyoSetup = (): JSX.Element => {
  const ct = useCommonsT();
  return (
    <div className="space-y-3">
      <p className="text-foreground text-sm">{ct("commons.integ_provider.klaviyo_intro")}</p>

      <div className="bg-muted/50 border-border space-y-2 rounded-xl border p-4">
        <h4 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
          {ct("commons.integ_provider.klaviyo_how_to")}
        </h4>
        <ol className="text-foreground list-inside list-decimal space-y-1 text-sm">
          <li>
            {ct("commons.integ_provider.klaviyo_step1")}{" "}
            <a
              href="https://www.klaviyo.com/settings/account/api-keys"
              target="_blank"
              rel="noreferrer"
              className="text-primary font-medium underline"
            >
              {ct("commons.integ_provider.klaviyo_step1_link")}
            </a>
          </li>
          <li>{ct("commons.integ_provider.klaviyo_step2")}</li>
          <li>{ct("commons.integ_provider.klaviyo_step3")}</li>
          <li>{ct("commons.integ_provider.klaviyo_step4")}</li>
          <li>{ct("commons.integ_provider.klaviyo_step5")}</li>
        </ol>
      </div>

      <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
        <span>{ct("commons.integ_provider.klaviyo_important")}</span>
        <span className="text-muted-foreground">
          {ct("commons.integ_provider.klaviyo_warning")}
        </span>
      </div>
    </div>
  );
};

export default KlaviyoSetup;
