import React from "react";
import type { ExperienceStoryItemType } from "@/types";
import { Briefcase, CheckCircle2, Cpu, MapPin, Sparkles } from "lucide-react";

export type ExperienceGridPartPropsType = {
  item: ExperienceStoryItemType;
};

export function ExperienceGridPart({ item }: ExperienceGridPartPropsType) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-6 lg:gap-8 w-full">
      {/* Col 1: Role & Location Meta */}
      <div className="flex flex-col justify-between p-5 rounded-xl border border-current/15 bg-current/[0.03] backdrop-blur-xs">
        <div>
          <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold uppercase tracking-widest opacity-75">
            <Briefcase className="w-3.5 h-3.5" />
            <span>ROLE & TENURE</span>
          </div>
          <h4 className="text-xl font-bold tracking-tight mb-1">{item.role}</h4>
          <p className="text-sm font-semibold opacity-90 mb-3">{item.company}</p>
          <div className="flex items-center gap-1.5 text-xs font-mono opacity-70">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{item.location}</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-current/15 flex items-center justify-between text-xs font-mono">
          <span className="opacity-60">TIMELINE</span>
          <span className="font-bold px-2 py-0.5 rounded-full bg-current/10">
            {item.period}
          </span>
        </div>
      </div>

      {/* Col 2: Key Responsibilities */}
      <div className="flex flex-col justify-between p-5 rounded-xl border border-current/15 bg-current/[0.03] backdrop-blur-xs">
        <div>
          <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold uppercase tracking-widest opacity-75">
            <Cpu className="w-3.5 h-3.5" />
            <span>OWNERSHIP & SYSTEM</span>
          </div>
          <ul className="space-y-2.5 text-sm leading-relaxed opacity-85">
            {item.keyResponsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono text-xs opacity-50 mt-1">0{idx + 1}.</span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Col 3: Key Outcomes */}
      <div className="flex flex-col justify-between p-5 rounded-xl border border-current/15 bg-current/[0.03] backdrop-blur-xs">
        <div>
          <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold uppercase tracking-widest opacity-75">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>OUTCOMES & IMPACT</span>
          </div>
          <ul className="space-y-2.5 text-sm leading-relaxed opacity-85">
            {item.outcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Col 4: Metrics & Stack */}
      <div className="flex flex-col justify-between p-5 rounded-xl border border-current/15 bg-current/[0.03] backdrop-blur-xs">
        <div>
          <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold uppercase tracking-widest opacity-75">
            <Sparkles className="w-3.5 h-3.5" />
            <span>METRICS & STACK</span>
          </div>

          {item.metrics && item.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {item.metrics.slice(0, 2).map((m, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-current/10 border border-current/10">
                  <div className="text-lg font-black tracking-tight">{m.value}</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider opacity-70 leading-tight">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono border border-current/20 bg-current/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
