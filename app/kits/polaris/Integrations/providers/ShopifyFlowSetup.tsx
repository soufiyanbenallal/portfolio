import { useCommonsT } from "~/commons/providers";

export const ShopifyFlowSetup = (): JSX.Element => {
  const ct = useCommonsT();
  return (
    <div className="space-y-3">
      <p className="text-sm text-foreground">{ct("commons.integ_provider.flow_intro")}</p>

      <div className="bg-muted/50 p-4 rounded-xl border border-border space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {ct("commons.integ_provider.flow_how_it_works")}
        </h4>
        <ol className="list-decimal list-inside text-sm space-y-1 text-foreground">
          <li>{ct("commons.integ_provider.flow_step1")}</li>
          <li>{ct("commons.integ_provider.flow_step2")}</li>
          <li>{ct("commons.integ_provider.flow_step3")}</li>
          <li>{ct("commons.integ_provider.flow_step4")}</li>
        </ol>
      </div>

      <p className="text-xs text-muted-foreground">{ct("commons.integ_provider.flow_note")}</p>
    </div>
  );
};

export default ShopifyFlowSetup;
