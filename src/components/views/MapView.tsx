import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SourceDisclaimer } from '../common/SourceDisclaimer';
import { REVAAssistant } from '../common/REVAAssistant';
import { FeedbackWidget } from '../common/FeedbackWidget';
import { Compass, ShieldAlert } from 'lucide-react';
import { DEMO_COMPETITORS } from '../../utils/demoData';
import type { Competitor } from '../../types';

export const MapView: React.FC = () => {
  const { location } = useApp();
  const [selectedRadius, setSelectedRadius] = useState<number>(10);
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);

  // Schematic SVG dimensions & scaling logic
  const center = 250;
  const r5km = 100; // 5km circle radius in SVG pixels
  const r10km = 200; // 10km circle radius in SVG pixels

  // Helper to map radial distance to SVG coordinates
  const getCoordinates = (comp: Competitor, index: number) => {
    // Distribute angles deterministically around center
    const angles = [45, 135, 225, 315, 90, 180, 270, 0];
    const angleRad = (angles[index % angles.length] * Math.PI) / 180;
    const pixelDistance = (comp.distanceKm / 10) * r10km;
    
    const x = center + pixelDistance * Math.cos(angleRad);
    const y = center + pixelDistance * Math.sin(angleRad);
    return { x, y };
  };

  const filteredCompetitors = DEMO_COMPETITORS.filter(c => c.distanceKm <= selectedRadius);

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                Spatial Radius Visualization
              </span>
              <SourceDisclaimer type="DEMO DATA" source="Schematic Radar Model" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Geographic Location &amp; Competitor Radius</h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Simulated geographic radar view of {location.villageTown}, {location.district} (5 km &amp; 10 km zones).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-300 text-xs">
            <span className="text-slate-600 font-semibold px-2">Show Radius:</span>
            <button
              onClick={() => setSelectedRadius(5)}
              className={`px-3 py-1 rounded font-bold transition ${
                selectedRadius === 5 ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-white text-slate-700'
              }`}
            >
              5 km Zone
            </button>
            <button
              onClick={() => setSelectedRadius(10)}
              className={`px-3 py-1 rounded font-bold transition ${
                selectedRadius === 10 ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-white text-slate-700'
              }`}
            >
              10 km Zone
            </button>
          </div>
        </div>

        <REVAAssistant contextTab="map" />

        {/* Mandatory Prototype Disclaimer Notice */}
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-900 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>
              <strong>Schematic Demonstration Map:</strong> Relative distance markers are plotted for decision visualization. Real-world street topology connects to GIS APIs in production.
            </span>
          </div>
        </div>

        {/* Interactive SVG Radar Map View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
          <div className="md:col-span-2 bg-slate-950 rounded-xl p-4 border border-slate-800 relative flex items-center justify-center overflow-hidden shadow-inner">
            {/* SVG Canvas */}
            <svg viewBox="0 0 500 500" className="w-full max-w-[480px] h-auto font-sans select-none">
              {/* Background Grid Pattern */}
              <defs>
                <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="500" height="500" fill="url(#grid)" />

              {/* 10 km Outer Circle */}
              <circle
                cx={center}
                cy={center}
                r={r10km}
                fill="none"
                stroke="#334155"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              <text x={center + r10km - 45} y={center - 8} fill="#94a3b8" fontSize="10" fontWeight="bold">
                10 km Zone
              </text>

              {/* 5 km Inner Circle */}
              <circle
                cx={center}
                cy={center}
                r={r5km}
                fill="rgba(245, 158, 11, 0.05)"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <text x={center + r5km - 40} y={center - 8} fill="#f59e0b" fontSize="10" fontWeight="bold">
                5 km Zone
              </text>

              {/* Crosshair Axes */}
              <line x1={center} y1="20" x2={center} y2="480" stroke="#1e293b" strokeWidth="1" />
              <line x1="20" y1={center} x2="480" y2={center} stroke="#1e293b" strokeWidth="1" />

              {/* Competitor Markers */}
              {filteredCompetitors.map((comp, idx) => {
                const { x, y } = getCoordinates(comp, idx);
                const isSelected = selectedCompetitor?.id === comp.id;

                return (
                  <g
                    key={comp.id}
                    onClick={() => setSelectedCompetitor(comp)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring for selected */}
                    {isSelected && (
                      <circle cx={x} cy={y} r="16" fill="rgba(99, 102, 241, 0.3)" stroke="#6366f1" strokeWidth="1.5" />
                    )}

                    <circle
                      cx={x}
                      cy={y}
                      r="9"
                      fill={isSelected ? '#6366f1' : '#ef4444'}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="transition transform group-hover:scale-125"
                    />

                    <text
                      x={x}
                      y={y + 3}
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="black"
                      textAnchor="middle"
                    >
                      {idx + 1}
                    </text>

                    {/* Label Tag */}
                    <text
                      x={x}
                      y={y + 20}
                      fill="#cbd5e1"
                      fontSize="9"
                      fontWeight="600"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {comp.name.split(' ')[0]} ({comp.distanceKm}k)
                    </text>
                  </g>
                );
              })}

              {/* User Center Pin (Village Site) */}
              <g className="cursor-pointer">
                <circle cx={center} cy={center} r="14" fill="rgba(16, 185, 129, 0.3)" />
                <circle cx={center} cy={center} r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
                <text x={center} y={center - 15} fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">
                  📍 {location.villageTown} (Proposed Site)
                </text>
              </g>
            </svg>
          </div>

          {/* Map Legend & Competitor Info Panel */}
          <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 flex flex-col justify-between text-xs">
            <div>
              <h3 className="font-bold text-amber-400 text-sm mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                <span>Map Legend &amp; Details</span>
              </h3>

              <div className="space-y-3 mb-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 border border-white"></div>
                  <span>Green Pin: {location.villageTown} (Your Site)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 border border-white"></div>
                  <span>Red Pin: Competing Business Unit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500/40 border border-amber-500"></div>
                  <span>Inner Ring: 5 km Proximity Radius</span>
                </div>
              </div>

              {/* Selected Competitor Details Box */}
              {selectedCompetitor ? (
                <div className="bg-slate-800 p-3.5 rounded-lg border border-indigo-500/50 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-indigo-400">Selected Competitor #</div>
                  <div className="font-bold text-white text-sm">{selectedCompetitor.name}</div>
                  <div className="text-slate-300">Category: {selectedCompetitor.category}</div>
                  <div className="text-amber-400 font-mono font-bold">Distance: {selectedCompetitor.distanceKm} km</div>
                  <div className="text-slate-400 text-[11px]">Scale: {selectedCompetitor.scale} Unit</div>
                </div>
              ) : (
                <div className="bg-slate-800/50 p-3 rounded text-slate-400 text-center text-[11px]">
                  Click on any numbered red marker on the radar map to view competitor details.
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              Showing {filteredCompetitors.length} competitors within {selectedRadius} km radius.
            </div>
          </div>
        </div>
      </div>

      <FeedbackWidget sectionId="map" sectionTitle="Geographic Map Analysis" />
    </div>
  );
};
