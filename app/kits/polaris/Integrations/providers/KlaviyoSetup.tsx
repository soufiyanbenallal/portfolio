import { useCommonsT } from "~/commons/providers";

export const KlaviyoSetup = (): JSX.Element => {
  const ct = useCommonsT();
  return (
    <div className="space-y-3">
      <p className="text-sm text-foreground">{ct("commons.integ_provider.klaviyo_intro")}</p>

      <div className="bg-muted/50 p-4 rounded-xl border border-border space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {ct("commons.integ_provider.klaviyo_how_to")}
        </h4>
        <ol className="list-decimal list-inside text-sm space-y-1 text-foreground">
          <li>
            {ct("commons.integ_provider.klaviyo_step1")}{" "}
            <a
              href="https://www.klaviyo.com/settings/account/api-keys"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline font-medium"
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

      <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
        <span>{ct("commons.integ_provider.klaviyo_important")}</span>
        <span className="text-muted-foreground">
          {ct("commons.integ_provider.klaviyo_warning")}
        </span>
      </div>
    </div>
  );
};

export default KlaviyoSetup;
