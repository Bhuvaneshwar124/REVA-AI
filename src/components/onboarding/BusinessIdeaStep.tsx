import React from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/i18n';
import { DEMO_BUSINESS_CATEGORIES } from '../../utils/demoData';
import { SourceDisclaimer } from '../common/SourceDisclaimer';
import { REVAAssistant } from '../common/REVAAssistant';
import { Layers, CheckCircle2, ArrowRight, ArrowLeft, ShieldAlert } from 'lucide-react';
import { formatCurrency } from '../../utils/financialEngine';

export const BusinessIdeaStep: React.FC = () => {
  const { language, business, setCurrentStep } = useApp();

  const selectedCategory = DEMO_BUSINESS_CATEGORIES.find(c => c.id === business.categoryId) || DEMO_BUSINESS_CATEGORIES[0];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 font-sans">
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-6">
        <div className="bg-slate-900 text-white p-6 border-b-4 border-amber-500">
          <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
            Step 3 of 3: Indicative Cost &amp; Infrastructure
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            {getTranslation(language, 'indicativeCostTitle')}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Review standard investment components for {selectedCategory.name}
          </p>
        </div>

        <div className="p-6">
          <REVAAssistant contextTab="idea" />

          {/* Mandatory Government Disclaimer Badge */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-lg my-4 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-amber-900">Mandatory Portal Notice:</div>
              <p className="text-xs text-amber-900 font-semibold mt-0.5">
                "{getTranslation(language, 'indicativeCostBadge')}"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 text-xs">
            {/* Left 2 Cols: Category & Breakdown */}
            <div className="md:col-span-2 space-y-6">
              {/* Category Info Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {selectedCategory.name}
                  </span>
                  <SourceDisclaimer type="FACT" source="Rural Industry Benchmark" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{business.name}</h3>
                <p className="text-slate-600 leading-relaxed">{business.customIdea || selectedCategory.description}</p>
              </div>

              {/* Basic Investment Components */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="font-bold text-slate-900 mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <span>{getTranslation(language, 'investmentComponents')}</span>
                  </div>
                  <SourceDisclaimer type="CALCULATION" formula="Component Sum = Indicative Cost" />
                </div>

                <div className="space-y-2">
                  {selectedCategory.components.map((comp, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                      <span className="font-medium text-slate-800">{comp.name}</span>
                      <span className="font-bold font-mono text-slate-900">{formatCurrency(comp.cost)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Basic Business Requirements */}
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-emerald-950 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>{getTranslation(language, 'basicRequirements')}</span>
                </h4>
                <ul className="space-y-1.5 text-emerald-900">
                  {selectedCategory.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 1 Col: Total Indicative Cost Display Card */}
            <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between shadow-lg">
              <div>
                <div className="text-amber-400 font-bold uppercase text-[11px] tracking-wider mb-2">
                  Indicative Project Cost
                </div>
                <div className="text-3xl font-black font-mono text-white mb-2 tracking-tight">
                  {formatCurrency(selectedCategory.indicativeCost)}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-4">
                  Standard indicative capital cost for setting up a operational {selectedCategory.name} in rural regions.
                </p>

                <div className="space-y-2 border-t border-slate-800 pt-4 text-[11px]">
                  <div className="flex justify-between text-slate-300">
                    <span>10% Promoter Contribution:</span>
                    <span className="font-mono font-bold text-amber-400">{formatCurrency(selectedCategory.indicativeCost * 0.10)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>90% Loan Requirement:</span>
                    <span className="font-mono font-bold text-emerald-400">{formatCurrency(selectedCategory.indicativeCost * 0.90)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <SourceDisclaimer type="DEMO DATA" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <button
              onClick={() => setCurrentStep('profile')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{getTranslation(language, 'backBtn')}</span>
            </button>

            <button
              onClick={() => setCurrentStep('financial_input')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition"
            >
              <span>{getTranslation(language, 'continueBtn')}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
