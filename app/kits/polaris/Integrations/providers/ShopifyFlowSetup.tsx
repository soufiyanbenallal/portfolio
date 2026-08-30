import { useCommonsT } from "~/commons/providers";

export const ShopifyFlowSetup = (): JSX.Element => {
  const ct = useCommonsT();
  return (
    <div className="space-y-3">
      <p className="text-foreground text-sm">{ct("commons.integ_provider.flow_intro")}</p>

      <div className="bg-muted/50 border-border space-y-2 rounded-xl border p-4">
        <h4 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
          {ct("commons.integ_provider.flow_how_it_works")}
        </h4>
        <ol className="text-foreground list-inside list-decimal space-y-1 text-sm">
          <li>{ct("commons.integ_provider.flow_step1")}</li>
          <li>{ct("commons.integ_provider.flow_step2")}</li>
          <li>{ct("commons.integ_provider.flow_step3")}</li>
          <li>{ct("commons.integ_provider.flow_step4")}</li>
        </ol>
      </div>

      <p className="text-muted-foreground text-xs">{ct("commons.integ_provider.flow_note")}</p>
    </div>
  );
};

export default ShopifyFlowSetup;
