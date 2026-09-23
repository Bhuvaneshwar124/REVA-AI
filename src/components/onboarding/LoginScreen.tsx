import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/i18n';
import { ShieldCheck, User, Phone, Mail, ArrowRight, Lock } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { language, loginUser } = useApp();
  const [name, setName] = useState('Ramesh Kumar');
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('ramesh.entrepreneur@example.com');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    loginUser(name, phone, email);
  };

  const handleGoogleDemo = () => {
    loginUser('Ramesh Kumar (Google Verified)', '9876543210', 'ramesh.google@example.com');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-100 font-sans">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Government Style Header Bar */}
        <div className="bg-slate-900 text-white p-6 border-b-4 border-amber-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-lg">
              🏛️
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">{getTranslation(language, 'loginTitle')}</h2>
              <p className="text-xs text-amber-400">{getTranslation(language, 'portalSub')}</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mt-2">
            {getTranslation(language, 'loginSubtitle')}
          </p>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-800 px-3 py-2 rounded-md text-xs mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Sign In Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleDemo}
              type="button"
              className="w-full bg-white hover:bg-slate-50 text-slate-800 font-semibold py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm flex items-center justify-center gap-3 transition text-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{getTranslation(language, 'googleLogin')}</span>
            </button>
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
              Or Enter Details
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {getTranslation(language, 'fullName')} *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {getTranslation(language, 'mobileNumber')} *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {getTranslation(language, 'emailAddress')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ramesh@example.com"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg shadow-md flex items-center justify-center gap-2 transition text-xs mt-4"
            >
              <span>{getTranslation(language, 'submitBtn')}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>Government Advisory Portal SSO</span>
            </span>
            <span className="text-amber-700 font-medium">Demo Authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
};
