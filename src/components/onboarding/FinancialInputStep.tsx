import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/i18n';
import { SourceDisclaimer } from '../common/SourceDisclaimer';
import { REVAAssistant } from '../common/REVAAssistant';
import { Calculator, ArrowLeft, ChevronDown, ChevronUp, CheckCircle, Info } from 'lucide-react';
import { formatCurrency } from '../../utils/financialEngine';

export const FinancialInputStep: React.FC = () => {
  const { language, business, location, financial, updateFinancials, setCurrentStep, setActiveDashboardTab } = useApp();

  const [availableCapital, setAvailableCapital] = useState(financial.availableCapital || 100000);
  const [desiredCost, setDesiredCost] = useState(financial.desiredProjectCost || 1000000);
  const [showReviewToggle, setShowReviewToggle] = useState(true);

  const handleCapitalChange = (val: number) => {
    setAvailableCapital(val);
    updateFinancials(val, desiredCost);
  };

  const handleCostChange = (val: number) => {
    setDesiredCost(val);
    updateFinancials(availableCapital, val);
  };

  const handleStartAnalysis = () => {
    updateFinancials(availableCapital, desiredCost);
    setCurrentStep('dashboard');
    setActiveDashboardTab('overview');
  };

  const calcMargin = desiredCost * 0.10;
  const calcLoan = desiredCost * 0.90;
  const capitalDiff = availableCapital - calcMargin;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 font-sans">
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-6">
        <div className="bg-slate-900 text-white p-6 border-b-4 border-amber-500">
          <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
            Financial Input &amp; 10/90 Capital Structuring
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            {getTranslation(language, 'financialDetailsTitle')}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Enter your available margin contribution to calculate the 90% loan requirement and applicable government scheme route.
          </p>
        </div>

        <div className="p-6">
          <REVAAssistant contextTab="financial_input" />

          {/* Toggle Review Details Drawer */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl my-4 overflow-hidden text-xs">
            <button
              onClick={() => setShowReviewToggle(!showReviewToggle)}
              className="w-full p-3.5 bg-slate-100 hover:bg-slate-200 flex items-center justify-between font-bold text-slate-900 transition"
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-600" />
                <span>{getTranslation(language, 'reviewDetailsToggle')}</span>
              </span>
              {showReviewToggle ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showReviewToggle && (
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-200 bg-white">
                <div>
                  <span className="text-slate-500">Enterprise Name:</span>
                  <div className="font-semibold text-slate-900">{business.name}</div>
                </div>
                <div>
                  <span className="text-slate-500">Category:</span>
                  <div className="font-semibold text-slate-900">{business.categoryId}</div>
                </div>
                <div>
                  <span className="text-slate-500">Location:</span>
                  <div className="font-semibold text-slate-900">
                    {location.villageTown}, {location.district}, {location.state} (PIN: {location.pinCode})
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">10/90 Capital Rule:</span>
                  <div className="font-semibold text-emerald-700">10% Margin / 90% Loan Formula Active</div>
                </div>
              </div>
            )}
          </div>

          {/* Financial Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 text-xs">
            {/* Input 1: Available Capital */}
            <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-200 flex flex-col justify-between">
              <div>
                <label className="block text-slate-900 font-bold mb-1 text-sm">
                  {getTranslation(language, 'availableCapitalLabel')} *
                </label>
                <p className="text-[11px] text-slate-600 mb-3">
                  Your personal equity / margin contribution (minimum 10% required).
                </p>

                <div className="relative mb-3">
                  <span className="absolute left-3 top-2.5 text-slate-500 font-bold">₹</span>
                  <input
                    type="number"
                    value={availableCapital}
                    onChange={(e) => handleCapitalChange(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-base bg-white focus:outline-none focus:border-amber-500"
                    placeholder="100000"
                    step={10000}
                    min={10000}
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[50000, 100000, 150000, 250000, 500000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleCapitalChange(amt)}
                      className={`px-2.5 py-1 rounded border text-[11px] font-medium transition ${
                        availableCapital === amt
                          ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {formatCurrency(amt)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-200/60 text-[11px]">
                <SourceDisclaimer type="FACT" source="10% Promoter Contribution Guidelines" />
              </div>
            </div>

            {/* Input 2: Desired Project Cost */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <label className="block text-slate-900 font-bold mb-1 text-sm">
                  {getTranslation(language, 'desiredCostLabel')} *
                </label>
                <p className="text-[11px] text-slate-600 mb-3">
                  Proposed enterprise cost (or auto-calculated from 10% margin).
                </p>

                <div className="relative mb-3">
                  <span className="absolute left-3 top-2.5 text-slate-500 font-bold">₹</span>
                  <input
                    type="number"
                    value={desiredCost}
                    onChange={(e) => handleCostChange(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-base bg-white focus:outline-none focus:border-amber-500"
                    placeholder="1000000"
                    step={50000}
                    min={50000}
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[140000, 500000, 1000000, 2000000, 3500000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleCostChange(amt)}
                      className={`px-2.5 py-1 rounded border text-[11px] font-medium transition ${
                        desiredCost === amt
                          ? 'bg-slate-900 text-white border-slate-900 font-bold'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {formatCurrency(amt)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px]">
                <SourceDisclaimer type="CALCULATION" formula="Project Cost = Available Capital / 10%" />
              </div>
            </div>
          </div>

          {/* Core Financial Structure Result Card */}
          <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-lg my-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Calculator className="w-5 h-5 text-amber-400" />
                <span>Deterministic Financial Structure (10% Margin / 90% Loan)</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                financial.financingRoute === 'MICRO_FINANCE'
                  ? 'bg-emerald-500 text-slate-950'
                  : financial.financingRoute === 'TERM_LOAN'
                  ? 'bg-blue-500 text-white'
                  : 'bg-red-500 text-white'
              }`}>
                {financial.financingRoute === 'MICRO_FINANCE' ? 'Micro Finance Route (≤ ₹1.40L)' : financial.financingRoute === 'TERM_LOAN' ? 'Term Loan Route (₹1.40L - ₹50L)' : 'Exceeds Prototype Limits'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700">
                <div className="text-[11px] text-slate-400 font-semibold uppercase mb-1">
                  YOUR CONTRIBUTION (10%)
                </div>
                <div className="text-xl sm:text-2xl font-black font-mono text-amber-400">
                  {formatCurrency(calcMargin)}
                </div>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700">
                <div className="text-[11px] text-slate-400 font-semibold uppercase mb-1">
                  INDICATIVE LOAN (90%)
                </div>
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
                  {formatCurrency(calcLoan)}
                </div>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700">
                <div className="text-[11px] text-slate-400 font-semibold uppercase mb-1">
                  TOTAL PROJECT COST
                </div>
                <div className="text-xl sm:text-2xl font-black font-mono text-white">
                  {formatCurrency(desiredCost)}
                </div>
              </div>
            </div>

            {/* Shortfall / Surplus Notice */}
            {capitalDiff < 0 && (
              <div className="mt-4 p-2.5 bg-amber-950/80 border border-amber-800 rounded text-xs text-amber-200 flex items-center justify-between">
                <span>Shortfall in Available Capital for 10% Margin:</span>
                <span className="font-mono font-bold text-amber-400">Need {formatCurrency(Math.abs(capitalDiff))} additional capital</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setCurrentStep('idea')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{getTranslation(language, 'backBtn')}</span>
            </button>

            <button
              type="button"
              onClick={handleStartAnalysis}
              className="flex items-center gap-2 px-8 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition transform hover:-translate-y-0.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{getTranslation(language, 'startAnalysisBtn')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
