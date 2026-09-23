import React from 'react';
import { useApp } from '../../context/AppContext';
import { SourceDisclaimer } from '../common/SourceDisclaimer';
import { REVAAssistant } from '../common/REVAAssistant';
import { FeedbackWidget } from '../common/FeedbackWidget';
import { ShieldAlert, CheckCircle2, AlertTriangle, Lightbulb, Zap, ShieldCheck } from 'lucide-react';

export const RisksView: React.FC = () => {
  const { swot, risks, business, location } = useApp();

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                Risk &amp; SWOT Analysis
              </span>
              <SourceDisclaimer type="ADVISORY" source="REVA Operational Advisory Engine" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">SWOT Quadrants &amp; Categorized Risk Mitigations</h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Risk evaluation matrix for {business.name} in {location.villageTown}.
            </p>
          </div>
        </div>

        <REVAAssistant contextTab="risks" />

        {/* Section 1: SWOT Grid (4 Quadrants) */}
        <div className="my-6">
          <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>SWOT Strategic Matrix</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Strengths */}
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
              <div className="font-bold text-emerald-950 text-sm mb-2 flex items-center justify-between border-b border-emerald-200 pb-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>STRENGTHS</span>
                </span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded">
                  Internal Drivers
                </span>
              </div>
              <ul className="space-y-1.5 text-emerald-900">
                {swot.strengths.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
              <div className="font-bold text-amber-950 text-sm mb-2 flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>WEAKNESSES</span>
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">
                  Internal Constraints
                </span>
              </div>
              <ul className="space-y-1.5 text-amber-900">
                {swot.weaknesses.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-200">
              <div className="font-bold text-indigo-950 text-sm mb-2 flex items-center justify-between border-b border-indigo-200 pb-2">
                <span className="flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-indigo-700" />
                  <span>OPPORTUNITIES</span>
                </span>
                <span className="text-[10px] bg-indigo-200 text-indigo-900 font-bold px-2 py-0.5 rounded">
                  External Growth
                </span>
              </div>
              <ul className="space-y-1.5 text-indigo-900">
                {swot.opportunities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-700 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="bg-red-50/60 p-4 rounded-xl border border-red-200">
              <div className="font-bold text-red-950 text-sm mb-2 flex items-center justify-between border-b border-red-200 pb-2">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-700" />
                  <span>THREATS</span>
                </span>
                <span className="text-[10px] bg-red-200 text-red-900 font-bold px-2 py-0.5 rounded">
                  External Risks
                </span>
              </div>
              <ul className="space-y-1.5 text-red-900">
                {swot.threats.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-700 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Categorized Risk Evaluation & Mitigations */}
        <div className="my-6">
          <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Categorized Risk Impact &amp; Practical Mitigations</span>
          </h3>

          <div className="space-y-4 text-xs">
            {risks.map((risk, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-slate-300 transition">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <span className="bg-slate-900 text-amber-400 text-[11px] px-2.5 py-0.5 rounded">
                      {risk.category} Risk
                    </span>
                    <span>{risk.title}</span>
                  </div>

                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    risk.impact === 'High' ? 'bg-red-100 text-red-800 border border-red-300' : risk.impact === 'Medium' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {risk.impact} Severity Impact
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-0.5">
                      Why it matters:
                    </div>
                    <p className="text-slate-800 leading-relaxed bg-white p-2.5 rounded border border-slate-200">
                      {risk.description}
                    </p>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-0.5">
                      Possible Mitigation Strategy:
                    </div>
                    <p className="text-emerald-950 font-medium leading-relaxed bg-emerald-50/70 p-2.5 rounded border border-emerald-200">
                      {risk.mitigation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FeedbackWidget sectionId="risks" sectionTitle="SWOT & Risk Analysis" />
    </div>
  );
};
