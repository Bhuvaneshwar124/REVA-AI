import React from 'react';
import { useApp } from '../../context/AppContext';
import { SourceDisclaimer } from '../common/SourceDisclaimer';
import { REVAAssistant } from '../common/REVAAssistant';
import { FeedbackWidget } from '../common/FeedbackWidget';
import { TrendingUp, ShoppingBag, Database } from 'lucide-react';

export const MarketView: React.FC = () => {
  const { market, location, setMarketRadius, business } = useApp();

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                Hyper-Local Market Intelligence
              </span>
              <SourceDisclaimer type="DEMO DATA" source="Government Census & Data.gov.in Baseline" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Demographic Demand &amp; Opportunity Index</h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Assessing consumer potential in {location.villageTown}, {location.district} for {business.name}.
            </p>
          </div>

          {/* Radius Selector Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-300 text-xs">
            <span className="text-slate-600 font-semibold px-2">Analysis Radius:</span>
            <button
              onClick={() => setMarketRadius(5)}
              className={`px-3 py-1 rounded font-bold transition ${
                market.radiusKm === 5
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              5 km
            </button>
            <button
              onClick={() => setMarketRadius(10)}
              className={`px-3 py-1 rounded font-bold transition ${
                market.radiusKm === 10
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              10 km
            </button>
          </div>
        </div>

        <REVAAssistant contextTab="market" />

        {/* Top Demographics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-xs">
          <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-1">
                Target Resident Population
              </div>
              <div className="text-3xl font-black font-mono text-amber-400">
                {market.population.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                ~{market.households.toLocaleString('en-IN')} rural households within {market.radiusKm} km.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800">
              <SourceDisclaimer type="FACT" source="Government Census Dataset" dataYear="2024 Est." />
            </div>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-1">
                Local Demand Indicator
              </div>
              <div className="text-3xl font-black text-emerald-400 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                <span>{market.demandLevel}</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                High daily essential consumption pattern.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800">
              <SourceDisclaimer type="CALCULATION" formula="Demand = Consumption / Population" />
            </div>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-1">
                Underserved Opportunity Score
              </div>
              <div className="text-3xl font-black text-amber-400 font-mono">
                {market.underservedScore}/100
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                34% unfulfilled local supply gap identified.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800">
              <SourceDisclaimer type="ADVISORY" source="Supply-Demand Gap Model" />
            </div>
          </div>
        </div>

        {/* Local Purchasing Power Card */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs mb-6">
          <h4 className="font-bold text-amber-950 mb-1 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-amber-700" />
            <span>Local Purchasing Power &amp; Economic Profile</span>
          </h4>
          <p className="text-amber-900 leading-relaxed">
            {market.purchasingPowerScore}
          </p>
        </div>

        {/* Detailed Market Indicators Table */}
        <div className="my-6">
          <h3 className="font-bold text-slate-900 text-xs mb-3 flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-600" />
            <span>Hyper-Local Government &amp; Public Market Datasets</span>
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-3">Market Parameter</th>
                  <th className="p-3">Measured Value</th>
                  <th className="p-3">Data Source</th>
                  <th className="p-3">Data Year</th>
                  <th className="p-3">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-xs">
                {market.indicators.map((ind, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{ind.title}</td>
                    <td className="p-3 font-mono font-bold text-emerald-800">{ind.value}</td>
                    <td className="p-3 text-slate-700">{ind.source}</td>
                    <td className="p-3 font-mono text-slate-600">{ind.dataYear}</td>
                    <td className="p-3">
                      <span className="bg-teal-100 text-teal-900 font-semibold px-2 py-0.5 rounded text-[10px]">
                        {ind.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <FeedbackWidget sectionId="market" sectionTitle="Hyper-Local Market Analysis" />
    </div>
  );
};
