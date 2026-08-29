import { useCommonsT } from "~/commons/providers";
import { formatCount } from "~/commons/utils/intl";

export type UsageStatsType = {
  totalRequests: number;
  requestsByDay: Array<{ date: string; count: number }>;
  requestsByEndpoint: Array<{ path: string; count: number }>;
};

// Compatibility alias
export type UsageStats = UsageStatsType;

export type ApiUsageStatsPropsType = {
  stats: UsageStatsType;
};

// Compatibility alias
export type ApiUsageStatsProps = ApiUsageStatsPropsType;

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
          <h3 className="text-base font-bold text-foreground">{ct("commons.api_usage.title")}</h3>
          <p className="text-xs text-muted-foreground">{ct("commons.api_usage.last_30_days")}</p>
        </div>
        <div className="p-8 text-center bg-muted/40 rounded-xl border border-border space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {ct("commons.api_usage.no_requests")}
          </p>
          <p className="text-xs text-muted-foreground">
            {ct("commons.api_usage.no_requests_desc")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-foreground">{ct("commons.api_usage.title")}</h3>
        <p className="text-xs text-muted-foreground">{ct("commons.api_usage.last_30_days")}</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
            className="p-4 rounded-xl bg-muted/40 border border-border text-center space-y-0.5"
          >
            <span className="text-2xl font-extrabold text-foreground tracking-tight block">
              {metric.value}
            </span>
            <span className="text-xs text-muted-foreground block">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      {stats.requestsByDay.length > 0 && (
        <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-3">
          <span className="text-xs font-semibold text-foreground block">
            {ct("commons.api_usage.daily_requests")}
          </span>
          <div className="flex items-end gap-1 h-20 pt-2">
            {stats.requestsByDay.slice(-14).map((day, i) => {
              const count = day.count;
              const heightPct = Math.max(6, (count / maxCount) * 100);
              return (
                <div
                  key={i}
                  title={`${day.date}: ${count} requests`}
                  className="flex-1 bg-primary hover:bg-primary/80 transition-all rounded-t-sm"
                  style={{ height: `${heightPct}%` }}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/40">
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
          <span className="text-xs font-semibold text-foreground block">
            {ct("commons.api_usage.top_endpoints")}
          </span>
          {stats.requestsByEndpoint.slice(0, 5).map((endpoint, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-card border border-border text-xs"
            >
              <span className="font-mono font-medium text-foreground">{endpoint.path}</span>
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
