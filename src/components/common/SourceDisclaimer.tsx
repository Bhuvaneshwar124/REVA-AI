import React from 'react';
import { Info, Calculator, FileCheck, Sparkles, Database } from 'lucide-react';

export type BadgeType = 'FACT' | 'CALCULATION' | 'ASSUMPTION' | 'ADVISORY' | 'DEMO DATA';

interface SourceDisclaimerProps {
  type: BadgeType;
  source?: string;
  dataYear?: string;
  formula?: string;
  reason?: string;
}

export const SourceDisclaimer: React.FC<SourceDisclaimerProps> = ({
  type,
  source,
  dataYear,
  formula,
  reason
}) => {
  const getBadgeStyle = (bType: BadgeType) => {
    switch (bType) {
      case 'FACT':
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          icon: <FileCheck className="w-3 h-3 text-emerald-700" />
        };
      case 'CALCULATION':
        return {
          bg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
          icon: <Calculator className="w-3 h-3 text-indigo-700" />
        };
      case 'ASSUMPTION':
        return {
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          icon: <Info className="w-3 h-3 text-amber-700" />
        };
      case 'ADVISORY':
        return {
          bg: 'bg-purple-100 text-purple-900 border-purple-300',
          icon: <Sparkles className="w-3 h-3 text-purple-700" />
        };
      case 'DEMO DATA':
      default:
        return {
          bg: 'bg-teal-100 text-teal-900 border-teal-300',
          icon: <Database className="w-3 h-3 text-teal-700" />
        };
    }
  };

  const style = getBadgeStyle(type);

  return (
    <div className="inline-flex flex-wrap items-center gap-2 text-[11px] font-sans">
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border font-semibold tracking-wider text-[10px] ${style.bg}`}>
        {style.icon}
        <span>{type}</span>
      </span>

      {source && (
        <span className="text-slate-600 font-medium">
          Source: <span className="text-slate-900">{source}</span>
        </span>
      )}

      {dataYear && (
        <span className="text-slate-500">
          ({dataYear})
        </span>
      )}

      {formula && (
        <span className="text-indigo-800 font-mono text-[10px] bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
          Formula: {formula}
        </span>
      )}

      {reason && (
        <span className="text-amber-800 text-[11px]">
          Note: {reason}
        </span>
      )}
    </div>
  );
};
