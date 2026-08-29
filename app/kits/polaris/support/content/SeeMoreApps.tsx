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
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-foreground">Try Our Apps</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {appsData.map((app) => (
          <div
            key={app.id}
            className="p-4 rounded-xl border border-border bg-card shadow-xs flex items-start gap-3"
          >
            <img
              src={app.image}
              alt={app.title}
              className="w-12 h-12 rounded-lg object-contain shrink-0 border border-border"
            />
            <div className="space-y-1 min-w-0 flex-1">
              <h3 className="text-xs font-bold text-foreground truncate">{app.title}</h3>
              <p className="text-[10px] text-muted-foreground line-clamp-2">{app.description}</p>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-primary underline block pt-1"
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
