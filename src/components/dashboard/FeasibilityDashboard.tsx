import React from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/i18n';
import { OverviewView } from '../views/OverviewView';
import { FinancialsView } from '../views/FinancialsView';
import { MarketView } from '../views/MarketView';
import { CompetitionView } from '../views/CompetitionView';
import { MapView } from '../views/MapView';
import { SchemesView } from '../views/SchemesView';
import { RisksView } from '../views/RisksView';
import { AIReportView } from '../views/AIReportView';
import { LayoutDashboard, Calculator, TrendingUp, Users, MapPin, ShieldCheck, Zap, FileText } from 'lucide-react';

export const FeasibilityDashboard: React.FC = () => {
  const { activeDashboardTab, setActiveDashboardTab, language, business, location } = useApp();

  const tabs = [
    { id: 'overview' as const, label: getTranslation(language, 'tabsOverview'), icon: LayoutDashboard },
    { id: 'financial' as const, label: getTranslation(language, 'tabsFinancial'), icon: Calculator },
    { id: 'market' as const, label: getTranslation(language, 'tabsMarket'), icon: TrendingUp },
    { id: 'competition' as const, label: getTranslation(language, 'tabsCompetition'), icon: Users },
    { id: 'map' as const, label: getTranslation(language, 'tabsMap'), icon: MapPin },
    { id: 'schemes' as const, label: getTranslation(language, 'tabsSchemes'), icon: ShieldCheck },
    { id: 'risks' as const, label: getTranslation(language, 'tabsRisks'), icon: Zap },
    { id: 'report' as const, label: getTranslation(language, 'tabsReport'), icon: FileText }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 font-sans">
      {/* Persistent Dashboard Tab Bar */}
      <div className="bg-slate-900 text-white rounded-xl shadow-md overflow-hidden mb-6 border-b-4 border-amber-500">
        <div className="p-4 border-b border-slate-800 flex flex-wrap justify-between items-center gap-2 text-xs">
          <div>
            <div className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">
              Rural Enterprise Virtual Advisor Dashboard
            </div>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <span>{business.name}</span>
              <span className="text-slate-400 font-normal">|</span>
              <span className="text-slate-300 text-xs">{location.villageTown}, {location.district}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex overflow-x-auto scrollbar-none bg-slate-950 p-1.5 gap-1 border-t border-slate-900">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDashboardTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveDashboardTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition flex-shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active View */}
      <main className="transition-all duration-300">
        {activeDashboardTab === 'overview' && <OverviewView />}
        {activeDashboardTab === 'financial' && <FinancialsView />}
        {activeDashboardTab === 'market' && <MarketView />}
        {activeDashboardTab === 'competition' && <CompetitionView />}
        {activeDashboardTab === 'map' && <MapView />}
        {activeDashboardTab === 'schemes' && <SchemesView />}
        {activeDashboardTab === 'risks' && <RisksView />}
        {activeDashboardTab === 'report' && <AIReportView />}
      </main>
    </div>
  );
};
