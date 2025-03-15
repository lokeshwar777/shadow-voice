import React, { createContext, useContext, useMemo, useId, forwardRef } from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "../../lib/utils";

const THEMES = { light: "", dark: ".dark" };

const ChartContext = createContext(null);

function useChart() {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />");
    }
    return context;
}

const ChartContainer = forwardRef(({ id, className, children, config, ...props }, ref) => {
    const uniqueId = useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-chart={chartId}
                ref={ref}
                className={cn("flex aspect-video justify-center text-xs", className)}
                {...props}
            >
                <ChartStyle id={chartId} config={config} />
                <RechartsPrimitive.ResponsiveContainer>
                    {children}
                </RechartsPrimitive.ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }) => {
    const colorConfig = Object.entries(config).filter(([_, cfg]) => cfg.theme || cfg.color);

    if (!colorConfig.length) return null;

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.entries(THEMES)
                    .map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
                        .map(([key, cfg]) => {
                            const color = cfg.theme?.[theme] || cfg.color;
                            return color ? `  --color-${key}: ${color};` : null;
                        })
                        .join("\n")}
}`)
                    .join("\n"),
            }}
        />
    );
};

const ChartTooltip = RechartsPrimitive.Tooltip;
const ChartLegend = RechartsPrimitive.Legend;

const ChartTooltipContent = forwardRef(
    ({ active, payload, className, label, labelFormatter, formatter, color, nameKey, labelKey, hideLabel, hideIndicator, indicator = "dot" }, ref) => {
        const { config } = useChart();

        const tooltipLabel = useMemo(() => {
            if (hideLabel || !payload?.length) return null;
            const item = payload[0];
            const key = labelKey || item.dataKey || item.name || "value";
            const value = labelFormatter ? labelFormatter(item.name) : config[key]?.label || item.name;
            return <div className={cn("font-medium")}>{value}</div>;
        }, [label, labelFormatter, payload, hideLabel, config, labelKey]);

        if (!active || !payload?.length) return null;

        return (
            <div ref={ref} className={cn("grid min-w-[8rem] border bg-background px-2.5 py-1.5 text-xs shadow-xl", className)}>
                {tooltipLabel}
                <div className="grid gap-1.5">
                    {payload.map((item, index) => (
                        <div key={item.dataKey} className="flex w-full items-center gap-2">
                            {!hideIndicator && <div className="h-2.5 w-2.5" style={{ backgroundColor: color || item.color }} />}
                            <span className="text-muted-foreground">{item.name}</span>
                            <span className="font-mono font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegendContent = forwardRef(({ className, payload, hideIcon = false, nameKey, verticalAlign = "bottom" }, ref) => {
    const { config } = useChart();

    if (!payload?.length) return null;

    return (
        <div ref={ref} className={cn("flex items-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}>
            {payload.map((item) => (
                <div key={item.value} className="flex items-center gap-1.5">
                    {!hideIcon && <div className="h-2 w-2" style={{ backgroundColor: item.color }} />}
                    <span>{config[item.dataKey]?.label || item.value}</span>
                </div>
            ))}
        </div>
    );
});
ChartLegendContent.displayName = "ChartLegend";

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };