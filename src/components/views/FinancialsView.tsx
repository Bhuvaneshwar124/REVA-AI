import React from 'react';
import { useApp } from '../../context/AppContext';
import { SourceDisclaimer } from '../common/SourceDisclaimer';
import { REVAAssistant } from '../common/REVAAssistant';
import { FeedbackWidget } from '../common/FeedbackWidget';
import { Calculator, Calendar, BarChart3 } from 'lucide-react';
import { formatCurrency } from '../../utils/financialEngine';

export const FinancialsView: React.FC = () => {
  const { financial, business } = useApp();

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                10/90 Capital Structure &amp; EMI Model
              </span>
              <SourceDisclaimer type="CALCULATION" formula="Deterministic Loan = Project Cost * 90%" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Financial Feasibility &amp; Repayment Schedule</h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Calculated for {business.name} with {formatCurrency(financial.availableCapital)} available margin contribution.
            </p>
          </div>
        </div>

        <REVAAssistant contextTab="financial" />

        {/* 10/90 Visual Capital Structure Bar */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 my-6">
          <div className="flex justify-between items-center mb-2 text-xs font-bold text-slate-900">
            <span>Capital Breakdown (10% Margin / 90% Loan)</span>
            <span className="font-mono text-slate-700">Total: {formatCurrency(financial.desiredProjectCost)}</span>
          </div>

          {/* Visual Percentage Bar */}
          <div className="h-6 w-full rounded-lg overflow-hidden flex font-mono text-[11px] font-bold text-white shadow-inner">
            <div
              style={{ width: '10%' }}
              className="bg-amber-500 flex items-center justify-center text-slate-950"
              title="Promoter Contribution (10%)"
            >
              10%
            </div>
            <div
              style={{ width: '90%' }}
              className="bg-emerald-600 flex items-center justify-center"
              title="Indicative Bank Loan (90%)"
            >
              90% Indicative Loan
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
            <div className="bg-white p-3 rounded border border-slate-200">
              <div className="text-[11px] text-slate-500 font-semibold uppercase">PROMOTER MARGIN (10%)</div>
              <div className="text-lg font-bold font-mono text-amber-700">{formatCurrency(financial.calculatedMargin)}</div>
              <SourceDisclaimer type="FACT" source="Promoter Equity" />
            </div>

            <div className="bg-white p-3 rounded border border-slate-200">
              <div className="text-[11px] text-slate-500 font-semibold uppercase">INDICATIVE LOAN (90%)</div>
              <div className="text-lg font-bold font-mono text-emerald-700">{formatCurrency(financial.calculatedLoan)}</div>
              <SourceDisclaimer type="CALCULATION" formula="Project Cost x 90%" />
            </div>

            <div className="bg-white p-3 rounded border border-slate-200">
              <div className="text-[11px] text-slate-500 font-semibold uppercase">PROJECT COST (100%)</div>
              <div className="text-lg font-bold font-mono text-slate-900">{formatCurrency(financial.desiredProjectCost)}</div>
              <SourceDisclaimer type="ASSUMPTION" reason="Indicative Estimate" />
            </div>
          </div>
        </div>

        {/* Repayment Key Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs my-6">
          <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800">
            <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Interest Rate</div>
            <div className="text-2xl font-black font-mono text-amber-400 mt-1">{financial.interestRate}% p.a.</div>
            <div className="text-[10px] text-slate-400 mt-1">Concessional Rural Rate</div>
          </div>

          <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800">
            <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Tenure Window</div>
            <div className="text-2xl font-black font-mono text-white mt-1">{financial.tenureYears} Years</div>
            <div className="text-[10px] text-slate-400 mt-1">{financial.tenureYears * 12} Total Months</div>
          </div>

          <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800">
            <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Moratorium Period</div>
            <div className="text-2xl font-black font-mono text-emerald-400 mt-1">{financial.moratoriumMonths} Months</div>
            <div className="text-[10px] text-slate-400 mt-1">Principal Deferred</div>
          </div>

          <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800">
            <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Estimated Monthly EMI</div>
            <div className="text-2xl font-black font-mono text-amber-400 mt-1">{formatCurrency(financial.monthlyEmi)}</div>
            <div className="text-[10px] text-slate-400 mt-1">Quarterly: {formatCurrency(financial.quarterlyPayment)}</div>
          </div>
        </div>

        {/* Total Interest & Repayment Summary */}
        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl flex flex-wrap justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-indigo-950">Total Lifetime Loan Repayment Summary</div>
              <div className="text-[11px] text-indigo-800">
                Total Interest Payable over {financial.tenureYears} years: <strong className="font-mono text-indigo-950">{formatCurrency(financial.totalInterest)}</strong>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-indigo-700">Total Repayment Amount</div>
            <div className="text-xl font-black font-mono text-indigo-950">{formatCurrency(financial.totalRepayment)}</div>
          </div>
        </div>

        {/* Cash Flow Projections Table (Years 1 to 3) */}
        <div className="my-6">
          <div className="flex items-center justify-between mb-3 text-xs">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-600" />
              <span>3-Year Projected Cash Flow &amp; Debt Service</span>
            </h3>
            <SourceDisclaimer type="ASSUMPTION" reason="Based on 22% monthly revenue-to-capital ratio" />
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-3">Year</th>
                  <th className="p-3">Gross Revenue (Est.)</th>
                  <th className="p-3">Operating Expenses</th>
                  <th className="p-3">Annual Debt EMI</th>
                  <th className="p-3">Net Cash Flow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {financial.cashFlowProjections.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50 font-mono">
                    <td className="p-3 font-bold text-slate-900 font-sans">Year {row.year}</td>
                    <td className="p-3 text-emerald-700 font-bold">{formatCurrency(row.grossRevenue)}</td>
                    <td className="p-3 text-slate-700">{formatCurrency(row.operatingExpenses)}</td>
                    <td className="p-3 text-amber-700 font-semibold">{formatCurrency(row.debtServiceEmi)}</td>
                    <td className={`p-3 font-bold ${row.netCashFlow > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                      {formatCurrency(row.netCashFlow)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Repayment Schedule Snippet (First 6 Months) */}
        <div className="my-6">
          <h3 className="font-bold text-slate-900 text-xs mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>Indicative Repayment Schedule (Initial Moratorium &amp; EMI Phase)</span>
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-100 text-slate-700 text-[11px] uppercase">
                <tr>
                  <th className="p-2.5">Month</th>
                  <th className="p-2.5">Phase Status</th>
                  <th className="p-2.5">Payment (EMI)</th>
                  <th className="p-2.5">Principal</th>
                  <th className="p-2.5">Interest</th>
                  <th className="p-2.5">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white font-mono text-[11px]">
                {financial.repaymentSchedule.slice(0, 8).map((row) => (
                  <tr key={row.period} className={row.isMoratorium ? 'bg-amber-50/60' : 'hover:bg-slate-50'}>
                    <td className="p-2.5 font-bold font-sans">Month {row.period}</td>
                    <td className="p-2.5 font-sans">
                      {row.isMoratorium ? (
                        <span className="bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">
                          Moratorium Phase
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          Active EMI
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 font-bold text-slate-900">{formatCurrency(row.payment)}</td>
                    <td className="p-2.5 text-emerald-700">{formatCurrency(row.principal)}</td>
                    <td className="p-2.5 text-amber-700">{formatCurrency(row.interest)}</td>
                    <td className="p-2.5 font-bold text-slate-800">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <FeedbackWidget sectionId="financial" sectionTitle="Financial Feasibility" />
    </div>
  );
};
