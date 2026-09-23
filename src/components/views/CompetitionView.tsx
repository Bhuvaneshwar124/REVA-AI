import React from 'react';
import { useApp } from '../../context/AppContext';
import { SourceDisclaimer } from '../common/SourceDisclaimer';
import { REVAAssistant } from '../common/REVAAssistant';
import { FeedbackWidget } from '../common/FeedbackWidget';
import { Users, MapPin, Eye, AlertCircle } from 'lucide-react';

export const CompetitionView: React.FC = () => {
  const { competition, setCompetitionRadius, location, setActiveDashboardTab } = useApp();

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                Competitor Density Analysis
              </span>
              <SourceDisclaimer type="DEMO DATA" source="Simulated Local Business Registry" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Nearby Competing &amp; Similar Enterprises</h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Identifying enterprise saturation within radius around {location.villageTown}.
            </p>
          </div>

          {/* Radius Selector Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-300 text-xs">
            <span className="text-slate-600 font-semibold px-2">Analysis Radius:</span>
            <button
              onClick={() => setCompetitionRadius(5)}
              className={`px-3 py-1 rounded font-bold transition ${
                competition.radiusKm === 5
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              5 km Radius
            </button>
            <button
              onClick={() => setCompetitionRadius(10)}
              className={`px-3 py-1 rounded font-bold transition ${
                competition.radiusKm === 10
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              10 km Radius
            </button>
          </div>
        </div>

        <REVAAssistant contextTab="competition" />

        {/* Competitor Summary Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-xs">
          <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800">
            <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-1">
              Identified Competitors
            </div>
            <div className="text-3xl font-black font-mono text-amber-400">
              {competition.count} Units
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              Within {competition.radiusKm} km radius of proposed site.
            </p>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800">
            <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-1">
              Competition Saturation Density
            </div>
            <div className="text-3xl font-black text-emerald-400">
              {competition.density} Density
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              {competition.density === 'Low' ? 'Favorable room for new entrant.' : 'Moderate market share distribution.'}
            </p>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-1">
                Visual Spatial Mapping
              </div>
              <div className="text-xs font-bold text-white mt-1">
                Interactive Canvas Map Available
              </div>
            </div>
            <button
              onClick={() => setActiveDashboardTab('map')}
              className="mt-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded text-xs transition flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Open Geographic Map</span>
            </button>
          </div>
        </div>

        {/* Competitor Table */}
        <div className="my-6">
          <div className="flex justify-between items-center mb-3 text-xs">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>Nearby Business List ({competition.radiusKm} km Zone)</span>
            </h3>
            <SourceDisclaimer type="DEMO DATA" reason="Simulated registry data for prototype demonstration" />
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-3">Enterprise Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Distance from Site</th>
                  <th className="p-3">Estimated Scale</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-xs">
                {competition.competitors.map((comp) => (
                  <tr key={comp.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{comp.name}</span>
                    </td>
                    <td className="p-3 text-slate-700">{comp.category}</td>
                    <td className="p-3 font-mono font-bold text-indigo-700">{comp.distanceKm} km</td>
                    <td className="p-3">
                      <span className="bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded text-[10px]">
                        {comp.scale} Enterprise
                      </span>
                    </td>
                    <td className="p-3 text-emerald-700 font-semibold">Active Operating</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategic Observations */}
        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl text-xs">
          <h4 className="font-bold text-indigo-950 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-indigo-700" />
            <span>Advisory Competitive Observations</span>
          </h4>
          <ul className="space-y-1 text-indigo-900">
            {competition.observations.map((obs, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>{obs}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <FeedbackWidget sectionId="competition" sectionTitle="Competition Analysis" />
    </div>
  );
};
