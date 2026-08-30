import { useCommonsT } from "~/commons/providers";
import { formatCount } from "~/commons/utils/intl";

export type UsageStatsType = {
  totalRequests: number;
  requestsByDay: Array<{ date: string; count: number }>;
  requestsByEndpoint: Array<{ path: string; count: number }>;
};

export type ApiUsageStatsPropsType = {
  stats: UsageStatsType;
};

export const ApiUsageStats = ({ stats }: ApiUsageStatsPropsType): JSX.Element => {
  const ct = useCommonsT();
  const avgPerDay =
    stats.requestsByDay.length > 0
      ? Math.round(stats.totalRequests / Math.max(stats.requestsByDay.length, 1))
      : 0;

  const dayCounts = stats.requestsByDay.map((d) => d.count);
  const maxCount = Math.max(...dayCounts, 1);
  const hasData = stats.totalRequests > 0;

  if (!hasData) {
    return (
      <div className="space-y-3">
        <div>
          <h3 className="text-foreground text-base font-bold">{ct("commons.api_usage.title")}</h3>
          <p className="text-muted-foreground text-xs">{ct("commons.api_usage.last_30_days")}</p>
        </div>
        <div className="bg-muted/40 border-border space-y-1 rounded-xl border p-8 text-center">
          <p className="text-foreground text-sm font-semibold">
            {ct("commons.api_usage.no_requests")}
          </p>
          <p className="text-muted-foreground text-xs">
            {ct("commons.api_usage.no_requests_desc")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-foreground text-base font-bold">{ct("commons.api_usage.title")}</h3>
        <p className="text-muted-foreground text-xs">{ct("commons.api_usage.last_30_days")}</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          {
            value: formatCount(stats.totalRequests),
            label: ct("commons.api_usage.total_requests"),
          },
          {
            value: formatCount(avgPerDay),
            label: ct("commons.api_usage.avg_per_day"),
          },
          {
            value: String(stats.requestsByEndpoint.length),
            label: ct("commons.api_usage.endpoints"),
          },
        ].map((metric) => (
          <div
            key={metric.label}
            className="bg-muted/40 border-border space-y-0.5 rounded-xl border p-4 text-center"
          >
            <span className="text-foreground block text-2xl font-extrabold tracking-tight">
              {metric.value}
            </span>
            <span className="text-muted-foreground block text-xs">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      {stats.requestsByDay.length > 0 && (
        <div className="bg-muted/40 border-border space-y-3 rounded-xl border p-4">
          <span className="text-foreground block text-xs font-semibold">
            {ct("commons.api_usage.daily_requests")}
          </span>
          <div className="flex h-20 items-end gap-1 pt-2">
            {stats.requestsByDay.slice(-14).map((day, i) => {
              const count = day.count;
              const heightPct = Math.max(6, (count / maxCount) * 100);
              return (
                <div
                  key={i}
                  title={`${day.date}: ${count} requests`}
                  className="bg-primary hover:bg-primary/80 flex-1 rounded-t-sm transition-all"
                  style={{ height: `${heightPct}%` }}
                />
              );
            })}
          </div>
          <div className="text-muted-foreground border-border/40 flex items-center justify-between border-t pt-1 text-[11px]">
            <span>
              {stats.requestsByDay[Math.max(0, stats.requestsByDay.length - 14)]?.date || ""}
            </span>
            <span>{stats.requestsByDay[stats.requestsByDay.length - 1]?.date || ""}</span>
          </div>
        </div>
      )}

      {/* Top Endpoints */}
      {stats.requestsByEndpoint.length > 0 && (
        <div className="space-y-2">
          <span className="text-foreground block text-xs font-semibold">
            {ct("commons.api_usage.top_endpoints")}
          </span>
          {stats.requestsByEndpoint.slice(0, 5).map((endpoint, i) => (
            <div
              key={i}
              className="bg-card border-border flex items-center justify-between rounded-lg border p-3 text-xs"
            >
              <span className="text-foreground font-mono font-medium">{endpoint.path}</span>
              <span className="text-muted-foreground">
                {`${formatCount(endpoint.count)} ${ct("commons.api_usage.req")}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiUsageStats;
