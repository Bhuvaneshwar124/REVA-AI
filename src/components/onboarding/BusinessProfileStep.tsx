import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/i18n';
import { DEMO_BUSINESS_CATEGORIES } from '../../utils/demoData';
import { Building2, MapPin, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { REVAAssistant } from '../common/REVAAssistant';

export const BusinessProfileStep: React.FC = () => {
  const { language, business, location, updateBusinessProfile, setCurrentStep } = useApp();

  const [companyName, setCompanyName] = useState(business.name || '');
  const [categoryId, setCategoryId] = useState(business.categoryId || DEMO_BUSINESS_CATEGORIES[0].id);
  const [customIdea, setCustomIdea] = useState(business.customIdea || '');

  const [village, setVillage] = useState(location.villageTown || '');
  const [district, setDistrict] = useState(location.district || '');
  const [stateStr, setStateStr] = useState(location.state || 'Tamil Nadu');
  const [pin, setPin] = useState(location.pinCode || '');

  const [error, setError] = useState('');

  const handleCategoryChange = (catId: string) => {
    setCategoryId(catId);
    const cat = DEMO_BUSINESS_CATEGORIES.find(c => c.id === catId);
    if (cat) {
      setCustomIdea(cat.description);
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      setError('Please enter a business or enterprise name.');
      return;
    }
    if (!village.trim() || !district.trim() || !pin.trim()) {
      setError('Please complete all hyper-local location fields (Village, District, PIN Code).');
      return;
    }
    if (pin.length < 6) {
      setError('Please enter a valid 6-digit Indian PIN Code.');
      return;
    }
    setError('');

    updateBusinessProfile(companyName, categoryId, customIdea, village, district, stateStr, pin);
    setCurrentStep('idea');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 font-sans">
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-6">
        <div className="bg-slate-900 text-white p-6 border-b-4 border-amber-500">
          <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
            Step 2 of 3: Business &amp; Hyper-Local Identity
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            {getTranslation(language, 'businessDetailsTitle')}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {getTranslation(language, 'businessDetailsSub')}
          </p>
        </div>

        <form onSubmit={handleContinue} className="p-6">
          <REVAAssistant contextTab="profile" />

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg text-xs my-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6 my-4 text-xs">
            {/* Section 1: Business Details */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
              <div className="font-bold text-slate-900 flex items-center gap-2 text-sm border-b border-slate-200 pb-2">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Business Identity &amp; Sector Category</span>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {getTranslation(language, 'companyName')} *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Sri Lakshmi Small Dairy Enterprise"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {getTranslation(language, 'businessCategory')} *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white font-medium focus:outline-none focus:border-amber-500"
                >
                  {DEMO_BUSINESS_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} — Indicative Cost: ₹{(cat.indicativeCost / 100000).toFixed(2)} Lakh
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {getTranslation(language, 'businessIdeaDesc')}
                </label>
                <textarea
                  rows={3}
                  value={customIdea}
                  onChange={(e) => setCustomIdea(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>
            </div>

            {/* Section 2: Location Details (Hyper-Local) */}
            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 space-y-4">
              <div className="font-bold text-slate-900 flex items-center justify-between text-sm border-b border-amber-200 pb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-700" />
                  <span>{getTranslation(language, 'locationSection')}</span>
                </div>
                <span className="text-[11px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">
                  Critical for Local Demand
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {getTranslation(language, 'villageTown')} *
                  </label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="e.g. Perumalpattu Village"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {getTranslation(language, 'districtLabel')} *
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Tiruvallur"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {getTranslation(language, 'stateLabel')} *
                  </label>
                  <input
                    type="text"
                    value={stateStr}
                    onChange={(e) => setStateStr(e.target.value)}
                    placeholder="e.g. Tamil Nadu"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {getTranslation(language, 'pinCode')} *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 602024"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white font-mono focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setCurrentStep('stage')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{getTranslation(language, 'backBtn')}</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition"
            >
              <span>{getTranslation(language, 'continueBtn')}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
