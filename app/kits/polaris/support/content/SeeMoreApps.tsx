import { useEffect, useState } from "react";
import AppsInfoData from "../config/XcoAppInfoData";
import { useAppState } from "~/commons/utils/state/hooks/useAppState";

export type AppDataInfoType = {
  id: number;
  image: string;
  title: string;
  description: string;
  url: string;
};

export type AppData = AppDataInfoType;

export const SeeMoreApps = (): JSX.Element => {
  const { shop_url } = useAppState<any>("shop") || {};
  const [appsData, setAppsData] = useState<AppDataInfoType[]>([]);

  useEffect(() => {
    if (shop_url && appsData.length === 0) {
      const data = AppsInfoData(shop_url);
      setAppsData(data);
    }
  }, [shop_url, appsData.length]);

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-foreground text-xl font-bold">Try Our Apps</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {appsData.map((app) => (
          <div
            key={app.id}
            className="border-border bg-card flex items-start gap-3 rounded-xl border p-4 shadow-xs"
          >
            <img
              src={app.image}
              alt={app.title}
              className="border-border h-12 w-12 shrink-0 rounded-lg border object-contain"
            />
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="text-foreground truncate text-xs font-bold">{app.title}</h3>
              <p className="text-muted-foreground line-clamp-2 text-[10px]">{app.description}</p>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary block pt-1 text-xs font-semibold underline"
              >
                Open →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeMoreApps;
