import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SourceDisclaimer } from '../common/SourceDisclaimer';
import { REVAAssistant } from '../common/REVAAssistant';
import { FeedbackWidget } from '../common/FeedbackWidget';
import { DEMO_SCHEMES } from '../../utils/demoData';
import { ShieldCheck, CheckCircle2, FileText, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/financialEngine';

export const SchemesView: React.FC = () => {
  const { financial } = useApp();
  const [selectedSchemeId, setSelectedSchemeId] = useState<'MICRO_FINANCE' | 'TERM_LOAN'>(
    financial.financingRoute === 'MICRO_FINANCE' ? 'MICRO_FINANCE' : 'TERM_LOAN'
  );

  const activeScheme = DEMO_SCHEMES[selectedSchemeId] || DEMO_SCHEMES['TERM_LOAN'];

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Government Enterprise Scheme Router
              </span>
              <SourceDisclaimer type="FACT" source="NABARD & MSME Directives 2024-26" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Applicable Credit &amp; Subsidy Schemes</h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Deterministic scheme routing based on your proposed project cost of {formatCurrency(financial.desiredProjectCost)}.
            </p>
          </div>
        </div>

        <REVAAssistant contextTab="schemes" />

        {/* Scheme Selection Tabs (Micro Finance vs Term Loan) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 text-xs">
          {/* Micro Finance Card Option */}
          <div
            onClick={() => setSelectedSchemeId('MICRO_FINANCE')}
            className={`cursor-pointer rounded-xl p-5 border-2 transition relative ${
              selectedSchemeId === 'MICRO_FINANCE'
                ? 'border-emerald-600 bg-emerald-50/50 shadow-md'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            {financial.financingRoute === 'MICRO_FINANCE' && (
              <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>ROUTED FOR YOUR PROJECT</span>
              </span>
            )}
            <div className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider mb-1">
              Project Cost ≤ ₹1.40 Lakh
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Micro Finance Support Route</h3>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 bg-white p-2.5 rounded border border-slate-200">
              <div>Interest: <strong className="text-emerald-800 font-mono font-bold">6.5% p.a.</strong></div>
              <div>Tenure: <strong className="text-slate-900 font-mono">3 Years</strong></div>
              <div>Max Loan: <strong className="text-slate-900 font-mono">₹1.25 Lakh</strong></div>
              <div>Moratorium: <strong className="text-amber-800 font-mono font-bold">3 Months</strong></div>
            </div>
          </div>

          {/* Term Loan Card Option */}
          <div
            onClick={() => setSelectedSchemeId('TERM_LOAN')}
            className={`cursor-pointer rounded-xl p-5 border-2 transition relative ${
              selectedSchemeId === 'TERM_LOAN'
                ? 'border-blue-600 bg-blue-50/50 shadow-md'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            {financial.financingRoute === 'TERM_LOAN' && (
              <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>ROUTED FOR YOUR PROJECT</span>
              </span>
            )}
            <div className="text-[10px] uppercase font-bold text-blue-700 tracking-wider mb-1">
              Project Cost &gt; ₹1.40 Lakh to ₹50 Lakh
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Term Loan Enterprise Route</h3>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 bg-white p-2.5 rounded border border-slate-200">
              <div>Interest: <strong className="text-blue-800 font-mono font-bold">8.0% p.a.</strong></div>
              <div>Tenure: <strong className="text-slate-900 font-mono">7 Years</strong></div>
              <div>Max Loan: <strong className="text-slate-900 font-mono">₹45.0 Lakhs</strong></div>
              <div>Moratorium: <strong className="text-amber-800 font-mono font-bold">6 Months</strong></div>
            </div>
          </div>
        </div>

        {/* Selected Scheme Detailed View */}
        <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 my-6 text-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-amber-400 font-bold uppercase text-[10px] tracking-wider">
                Official Scheme Specifications
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">{activeScheme.title}</h3>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <span>Last Verified: <strong className="text-emerald-400">{activeScheme.lastVerified}</strong></span>
              <span>•</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded text-slate-300 font-mono">Status: Verified Official</span>
            </div>
          </div>

          {/* Scheme Parameters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center font-mono">
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase">Financing Cap</div>
              <div className="text-lg font-bold text-amber-400">{activeScheme.financingPercentage}% of Project</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase">Interest Rate</div>
              <div className="text-lg font-bold text-emerald-400">{activeScheme.interestRate}% p.a.</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase">Repayment Tenure</div>
              <div className="text-lg font-bold text-white">{activeScheme.tenureYears} Years</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase">Moratorium Window</div>
              <div className="text-lg font-bold text-amber-400">{activeScheme.moratoriumMonths} Months</div>
            </div>
          </div>

          {/* 2-Col Specs: Benefits & Eligibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <h4 className="font-bold text-amber-400 text-sm mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Key Scheme Benefits</span>
              </h4>
              <ul className="space-y-2 text-slate-300">
                {activeScheme.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <h4 className="font-bold text-amber-400 text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Eligibility Criteria</span>
              </h4>
              <ul className="space-y-2 text-slate-300">
                {activeScheme.eligibility.map((e, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Required Documents & Application Process */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <h4 className="font-bold text-amber-400 text-sm mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Mandatory Documents Required</span>
              </h4>
              <ul className="space-y-2 text-slate-300">
                {activeScheme.requiredDocuments.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">{i + 1}.</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <h4 className="font-bold text-amber-400 text-sm mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-400" />
                <span>Official Application Process Steps</span>
              </h4>
              <ul className="space-y-2 text-slate-300">
                {activeScheme.applicationProcess.map((proc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-400 font-bold">•</span>
                    <span>{proc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQs & Official Sources */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Sources &amp; Reference Verification</span>
            </h4>
            <div className="flex flex-wrap gap-2 text-[11px]">
              {activeScheme.sources.map((src, i) => (
                <span key={i} className="bg-slate-700 text-amber-300 px-3 py-1 rounded border border-slate-600 flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" />
                  <span>{src}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FeedbackWidget sectionId="schemes" sectionTitle="Government Scheme Router" />
    </div>
  );
};
