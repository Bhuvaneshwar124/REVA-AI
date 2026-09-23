import React from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/i18n';
import type { BusinessStage } from '../../types';
import { Lightbulb, Building, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { REVAAssistant } from '../common/REVAAssistant';

export const BusinessStageStep: React.FC = () => {
  const { language, user, setBusinessStage, setCurrentStep } = useApp();

  const handleSelect = (stage: BusinessStage) => {
    setBusinessStage(stage);
  };

  const handleContinue = () => {
    setCurrentStep('profile');
  };

  const handleBack = () => {
    setCurrentStep('login');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 font-sans">
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-6">
        {/* Step Banner */}
        <div className="bg-slate-900 text-white p-6 border-b-4 border-amber-500">
          <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
            Step 1 of 3: Operational Stage
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            {getTranslation(language, 'businessStageTitle')}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {getTranslation(language, 'businessStageSub')}
          </p>
        </div>

        <div className="p-6">
          <REVAAssistant contextTab="stage" />

          {/* Cards Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            {/* Option 1: New Business Idea */}
            <div
              onClick={() => handleSelect('new_idea')}
              className={`cursor-pointer rounded-xl p-6 border-2 transition relative flex flex-col justify-between ${
                user.stage === 'new_idea'
                  ? 'border-amber-500 bg-amber-50/50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 font-bold">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  {user.stage === 'new_idea' && (
                    <CheckCircle2 className="w-6 h-6 text-amber-600" />
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {getTranslation(language, 'newIdeaTitle')}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {getTranslation(language, 'newIdeaDesc')}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] font-semibold text-amber-700 flex items-center gap-1">
                <span>Recommended for First-Time Rural Entrepreneurs</span>
              </div>
            </div>

            {/* Option 2: Entrepreneur Phase */}
            <div
              onClick={() => handleSelect('existing_entrepreneur')}
              className={`cursor-pointer rounded-xl p-6 border-2 transition relative flex flex-col justify-between ${
                user.stage === 'existing_entrepreneur'
                  ? 'border-amber-500 bg-amber-50/50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600 font-bold">
                    <Building className="w-6 h-6" />
                  </div>
                  {user.stage === 'existing_entrepreneur' && (
                    <CheckCircle2 className="w-6 h-6 text-amber-600" />
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {getTranslation(language, 'entrepreneurTitle')}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {getTranslation(language, 'entrepreneurDesc')}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] font-semibold text-indigo-700 flex items-center gap-1">
                <span>Recommended for Existing Micro Units Seeking Expansion</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{getTranslation(language, 'backBtn')}</span>
            </button>

            <button
              onClick={handleContinue}
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
