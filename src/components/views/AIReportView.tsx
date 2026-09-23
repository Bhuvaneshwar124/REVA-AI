import React from 'react';
import { useApp } from '../../context/AppContext';
import { SourceDisclaimer } from '../common/SourceDisclaimer';
import { REVAAssistant } from '../common/REVAAssistant';
import { FeedbackWidget } from '../common/FeedbackWidget';
import { Printer, FileText, CheckCircle2, ShieldAlert, UserCheck, MapPin, Building2, Calculator, TrendingUp, Users, Zap } from 'lucide-react';
import { formatCurrency } from '../../utils/financialEngine';

export const AIReportView: React.FC = () => {
  const { user, business, location, financial, market, competition, swot, risks, report } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner & Export Actions */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border-b-4 border-amber-500 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
              Official Advisory Dossier
            </span>
            <SourceDisclaimer type="ADVISORY" source="REVA AI Feasibility Engine" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Consolidated AI Feasibility &amp; Action Report</h2>
          <p className="text-xs text-slate-300 mt-1">
            Generated for {business.name} ({location.villageTown}, {location.district}, {location.state})
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs shadow-md transition flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF Report</span>
        </button>
      </div>

      <REVAAssistant contextTab="report" />

      {/* Printable Report Container */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-md font-sans text-xs space-y-8 print:p-0 print:border-none print:shadow-none">
        {/* Document Official Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
          <div>
            <div className="text-[11px] font-bold uppercase text-amber-700 tracking-wider">
              Rural Enterprise Advisory Portal (REVA)
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-0.5">{business.name}</h1>
            <p className="text-slate-600">Comprehensive Hyper-Local Advisory &amp; Financial Dossier</p>
          </div>
          <div className="text-right text-[11px] text-slate-500 font-mono">
            <div>Report ID: REVA-2026-{(Math.random() * 10000).toFixed(0)}</div>
            <div>Date: {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</div>
            <div className="text-emerald-700 font-bold mt-1">Feasibility Score: {report.feasibilityScore}/100</div>
          </div>
        </div>

        {/* Section 1: Entrepreneur Profile */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-1">
            <UserCheck className="w-4 h-4 text-amber-600" />
            <span>1. Entrepreneur Profile</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
            <div><span className="text-slate-500">Name:</span> <strong className="text-slate-900">{user.name}</strong></div>
            <div><span className="text-slate-500">Contact:</span> <strong className="text-slate-900">{user.phone}</strong></div>
            <div><span className="text-slate-500">Email:</span> <strong className="text-slate-900">{user.email}</strong></div>
            <div><span className="text-slate-500">Entrepreneur Stage:</span> <strong className="text-amber-800 capitalize">{user.stage.replace('_', ' ')}</strong></div>
          </div>
        </div>

        {/* Section 2: Business Idea */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-1">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>2. Business Idea &amp; Sector Category</span>
          </h3>
          <div className="bg-slate-50 p-3.5 rounded border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900">{business.name} ({business.categoryId})</div>
            <p className="text-slate-700 leading-relaxed">{business.customIdea}</p>
          </div>
        </div>

        {/* Section 3: Location */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-1">
            <MapPin className="w-4 h-4 text-amber-700" />
            <span>3. Enterprise Location</span>
          </h3>
          <div className="bg-slate-50 p-3 rounded border border-slate-200 flex flex-wrap gap-4">
            <div>Village/Town: <strong>{location.villageTown}</strong></div>
            <div>District: <strong>{location.district}</strong></div>
            <div>State: <strong>{location.state}</strong></div>
            <div>PIN Code: <strong className="font-mono">{location.pinCode}</strong></div>
          </div>
        </div>

        {/* Section 4 & 5: Market & Competition Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-1">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>4. Market Analysis</span>
            </h3>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
              <div>Population Reach: <strong>{market.population.toLocaleString('en-IN')} residents</strong></div>
              <div>Demand Level: <strong className="text-emerald-700">{market.demandLevel} Demand</strong></div>
              <div>Underserved Score: <strong>{market.underservedScore}/100</strong></div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-1">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>5. Competition Analysis</span>
            </h3>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
              <div>Nearby Competitors: <strong>{competition.count} Units</strong></div>
              <div>Density Rating: <strong>{competition.density} Saturation</strong></div>
              <div>Primary Radius: <strong>{competition.radiusKm} km Zone</strong></div>
            </div>
          </div>
        </div>

        {/* Section 6, 7 & 8: Financial Structure & Scheme */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-1">
            <Calculator className="w-4 h-4 text-amber-600" />
            <span>6, 7 &amp; 8. Financial Structure, Route &amp; Repayment</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900 text-white p-4 rounded-xl font-mono text-center">
            <div>
              <div className="text-[10px] text-slate-400 font-sans">Margin (10%)</div>
              <div className="font-bold text-amber-400">{formatCurrency(financial.calculatedMargin)}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-sans">Indicative Loan (90%)</div>
              <div className="font-bold text-emerald-400">{formatCurrency(financial.calculatedLoan)}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-sans">Applicable Route</div>
              <div className="font-bold text-white font-sans text-xs">
                {financial.financingRoute === 'MICRO_FINANCE' ? 'Micro Finance' : 'Term Loan'}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-sans">Monthly EMI</div>
              <div className="font-bold text-amber-400">{formatCurrency(financial.monthlyEmi)}</div>
            </div>
          </div>
        </div>

        {/* Section 9 & 10: SWOT & Risks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-1">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>9. SWOT Highlights</span>
            </h3>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
              <div><strong>Strengths:</strong> {swot.strengths[0]}</div>
              <div><strong>Weaknesses:</strong> {swot.weaknesses[0]}</div>
              <div><strong>Opportunities:</strong> {swot.opportunities[0]}</div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-1">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>10. Risk Evaluation</span>
            </h3>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
              <div><strong>Market Risk:</strong> {risks[0]?.description}</div>
              <div><strong>Mitigation:</strong> {risks[0]?.mitigation}</div>
            </div>
          </div>
        </div>

        {/* Section 11 & 12: Assumptions & Sources */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-1">
            <FileText className="w-4 h-4 text-teal-600" />
            <span>11 &amp; 12. Key Assumptions &amp; Verified Sources</span>
          </h3>
          <div className="bg-amber-50 p-3 rounded border border-amber-200 text-amber-900 space-y-1">
            <div>• All calculations follow pure deterministic formulas (10% promoter contribution / 90% loan requirement).</div>
            <div>• Sources: NABARD Micro Finance Directives 2024-25, Ministry of MSME Guidelines, Data.gov.in Census Baselines.</div>
          </div>
        </div>

        {/* Section 13: REVA Summary */}
        <div className="bg-slate-900 text-white p-4 rounded-xl space-y-1">
          <div className="text-[11px] font-bold text-amber-400 uppercase">13. REVA Virtual Advisor Summary</div>
          <p className="text-slate-200 leading-relaxed">{report.revaAdvice}</p>
        </div>

        {/* Section 14: Action Plan (Requirement #26) */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>14. Actionable Next Steps Plan</span>
          </h3>

          <div className="space-y-2">
            {report.actionPlan.map((act) => (
              <div key={act.step} className="flex items-start gap-3 p-3 bg-slate-50 rounded border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  {act.step}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{act.title}</div>
                  <div className="text-slate-600 text-xs">{act.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FeedbackWidget sectionId="ai_report" sectionTitle="Consolidated AI Report" />
    </div>
  );
};
