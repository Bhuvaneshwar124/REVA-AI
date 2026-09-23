import React from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/i18n';
import { SourceDisclaimer } from '../common/SourceDisclaimer';
import { REVAAssistant } from '../common/REVAAssistant';
import { FeedbackWidget } from '../common/FeedbackWidget';
import { Award, ShieldAlert, CheckCircle, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/financialEngine';

export const OverviewView: React.FC = () => {
  const { language, business, location, financial, market, competition, report, setActiveDashboardTab } = useApp();

  return (
    <div className="space-y-6 font-sans">
      {/* Top Advisory Feasibility Header Card */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border-b-4 border-amber-500 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800">
                Decision Support Output
              </span>
              <SourceDisclaimer type="ADVISORY" source="REVA Hyper-Local Feasibility Model" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white">{business.name}</h2>
            <p className="text-xs text-slate-300 mt-1">
              Hyper-local enterprise feasibility analysis for {location.villageTown}, {location.district}, {location.state} (PIN: {location.pinCode})
            </p>
          </div>

          {/* Feasibility Indicator Score Badge */}
          <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-xl text-center min-w-[200px] flex-shrink-0">
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-1">
              {getTranslation(language, 'feasibilityScore')}
            </div>
            <div className="text-3xl font-black text-amber-400 font-mono">
              {report.feasibilityScore}/100
            </div>
            <div className="text-xs font-semibold text-emerald-400 mt-1 flex items-center justify-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{report.feasibilityStatus}</span>
            </div>
          </div>
        </div>

        {/* Mandatory Disclaimer Requirement #17 */}
        <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300/90 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            "{getTranslation(language, 'disclaimerText')}"
          </p>
        </div>
      </div>

      <REVAAssistant contextTab="overview" />

      {/* Grid Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Card 1: Financial Structure */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider mb-1">
              Capital &amp; Loan Requirement
            </div>
            <div className="text-lg font-bold font-mono text-slate-900">
              {formatCurrency(financial.desiredProjectCost)}
            </div>
            <div className="space-y-1 mt-2 text-[11px]">
              <div className="flex justify-between text-slate-600">
                <span>Margin (10%):</span>
                <span className="font-mono font-bold text-amber-700">{formatCurrency(financial.calculatedMargin)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Loan (90%):</span>
                <span className="font-mono font-bold text-emerald-700">{formatCurrency(financial.calculatedLoan)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-100 flex justify-between items-center">
            <SourceDisclaimer type="CALCULATION" />
            <button
              onClick={() => setActiveDashboardTab('financial')}
              className="text-amber-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 2: Financing Route */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider mb-1">
              Applicable Scheme Route
            </div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${financial.financingRoute === 'MICRO_FINANCE' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
              <span>{financial.financingRoute === 'MICRO_FINANCE' ? 'Micro Finance Route' : 'Term Loan Route'}</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-600 space-y-0.5">
              <div>Interest: <strong className="text-slate-900">{financial.interestRate}% p.a.</strong></div>
              <div>Tenure: <strong className="text-slate-900">{financial.tenureYears} Years ({financial.moratoriumMonths}m moratorium)</strong></div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-100 flex justify-between items-center">
            <SourceDisclaimer type="FACT" source="Government Guidelines" />
            <button
              onClick={() => setActiveDashboardTab('schemes')}
              className="text-amber-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 3: Market Indicator */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider mb-1">
              Local Market Demand
            </div>
            <div className="text-sm font-bold text-emerald-800 flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>{market.demandLevel} Demand Segment</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-2">
              ~{market.population.toLocaleString('en-IN')} residents in {market.radiusKm} km radius. Underserved score: {market.underservedScore}/100.
            </p>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-100 flex justify-between items-center">
            <SourceDisclaimer type="DEMO DATA" />
            <button
              onClick={() => setActiveDashboardTab('market')}
              className="text-amber-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>Market</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 4: Competition Density */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider mb-1">
              Nearby Competitors
            </div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-1">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>{competition.count} Competitors ({competition.density} Density)</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-2">
              Low competitor saturation within 5 km radius of {location.villageTown}.
            </p>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-100 flex justify-between items-center">
            <SourceDisclaimer type="DEMO DATA" />
            <button
              onClick={() => setActiveDashboardTab('competition')}
              className="text-amber-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>View Map</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Executive Summary & Next Action Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-600" />
          <span>Feasibility Advisory Summary</span>
        </h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          {report.feasibilitySummary}
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveDashboardTab('report')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-lg transition flex items-center gap-1.5"
          >
            <span>View Full AI Advisory Report &amp; Next Steps</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>

      <FeedbackWidget sectionId="overview" sectionTitle="Overview Dashboard" />
    </div>
  );
};
