import React from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/i18n';
import { Shield, Globe, UserCheck, RefreshCw } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, user, currentStep, resetPrototype, location: appLocation } = useApp();

  return (
    <header className="bg-slate-900 text-white border-b-4 border-amber-500 shadow-md">
      {/* Top National Strip */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs border-b border-slate-800 flex flex-wrap justify-between items-center text-slate-300">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium text-amber-400">
            <Shield className="w-3.5 h-3.5" />
            <span>Government of India Digital Service Portal</span>
          </div>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">SIH 2026 Innovation Initiative</span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded text-xs border border-slate-700 transition">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'ta')}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-slate-900 text-white">English</option>
              <option value="ta" className="bg-slate-900 text-white">தமிழ் (Tamil)</option>
            </select>
          </div>

          {user.isLoggedIn && (
            <button
              onClick={resetPrototype}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition text-xs"
              title="Reset Prototype to Start"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Government Banner */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          {/* Emblem Icon / Logo */}
          <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center border-2 border-amber-400 shadow-inner flex-shrink-0">
            <span className="text-xl font-black text-slate-900 tracking-tighter">🏛️</span>
          </div>

          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              {getTranslation(language, 'portalName')}
            </h1>
            <p className="text-xs text-amber-400 font-medium tracking-wide">
              {getTranslation(language, 'solutionTitle')}
            </p>
          </div>
        </div>

        {/* User Badge / Onboarding Status */}
        {user.isLoggedIn && (
          <div className="flex items-center gap-3 bg-slate-800/80 px-3.5 py-1.5 rounded-lg border border-slate-700 text-xs">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-white flex items-center gap-1">
                <span>{user.name}</span>
                <UserCheck className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="text-slate-400 text-[11px]">
                {appLocation.district ? `${appLocation.district}, ${appLocation.state}` : 'Rural Micro-Entrepreneur'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Workflow Stepper Indicator (when in onboarding) */}
      {currentStep !== 'login' && currentStep !== 'dashboard' && (
        <div className="bg-slate-800/90 border-t border-slate-700 px-4 py-2">
          <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold text-amber-400 flex items-center gap-1.5">
              <span>Workflow Progress:</span>
              <span className="capitalize">{currentStep.replace('_', ' ')}</span>
            </span>
            <div className="flex items-center gap-2">
              {['stage', 'profile', 'financial_input'].map((step, idx) => {
                const isActive = currentStep === step;
                const isPast = (
                  (step === 'stage' && (currentStep === 'profile' || currentStep === 'financial_input')) ||
                  (step === 'profile' && currentStep === 'financial_input')
                );
                return (
                  <React.Fragment key={step}>
                    <div className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      isActive ? 'bg-amber-500 text-slate-950 font-bold' : isPast ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {idx + 1}. {step === 'stage' ? 'Stage' : step === 'profile' ? 'Profile' : 'Financials'}
                    </div>
                    {idx < 2 && <span className="text-slate-600">→</span>}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
