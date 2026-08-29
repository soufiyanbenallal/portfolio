import { useEffect, useState } from "react";
import { DeepLink } from "../utils/DeepLink";
import { getEnvironments } from "../service/getEnvironments";
import { useCommonsT } from "~/commons/providers";

export type AppStatusPropsType = {
  template: string;
  appHandle?: string;
};

// Compatibility alias
export type AppStatusProps = AppStatusPropsType;

export function AppStatus({ template, appHandle = "app" }: AppStatusPropsType): JSX.Element {
  const ct = useCommonsT();
  const [env, setEnv] = useState<Record<string, string>>({});

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const envData = await getEnvironments("SHOPIFY_EMBED_APP_ID");
      if (isMounted && envData) {
        setEnv(envData);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <s-banner tone="critical">
      {ct("commons.app_status.enable_embed")}{" "}
      <button
        type="button"
        onClick={() => DeepLink(appHandle, template, env)}
        className="font-semibold underline cursor-pointer text-foreground hover:opacity-80 inline"
      >
        {ct("commons.app_status.enable_link")}
      </button>
    </s-banner>
  );
}

export default AppStatus;
