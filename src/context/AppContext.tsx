import React, { createContext, useContext, useState } from 'react';
import type { 
  AppState, 
  Language, 
  BusinessStage, 
  FinancialState, 
  MarketState, 
  CompetitionState, 
  SWOTState, 
  RiskItem, 
  AdvisoryReport 
} from '../types';
import { DEMO_BUSINESS_CATEGORIES, DEMO_COMPETITORS, getDemoMarketState, getDemoSWOT, getDemoRisks } from '../utils/demoData';
import { calculateFinancials } from '../utils/financialEngine';

interface AppContextType extends AppState {
  setLanguage: (lang: Language) => void;
  setCurrentStep: (step: AppState['currentStep']) => void;
  setActiveDashboardTab: (tab: AppState['activeDashboardTab']) => void;
  loginUser: (name: string, phone: string, email: string) => void;
  setBusinessStage: (stage: BusinessStage) => void;
  updateBusinessProfile: (name: string, categoryId: string, customIdea: string, village: string, district: string, state: string, pin: string) => void;
  updateFinancials: (availableCapital: number, desiredCost?: number) => void;
  submitFeedback: (sectionId: string, isUseful: 'yes' | 'no') => void;
  setMarketRadius: (radiusKm: number) => void;
  setCompetitionRadius: (radiusKm: number) => void;
  resetPrototype: () => void;
}

const defaultCategory = DEMO_BUSINESS_CATEGORIES[0]; // Small Dairy Enterprise (₹10 Lakh)
const initialFinancials = calculateFinancials(100000, 1000000); // ₹1 Lakh margin -> ₹10 Lakh cost -> ₹9 Lakh loan

const initialReport: AdvisoryReport = {
  feasibilityScore: 84,
  feasibilityStatus: 'High Feasibility',
  feasibilitySummary: 'The proposed Small Dairy Enterprise displays strong economic viability in this location with a 10% promoter contribution (₹1,00,000) and 90% loan requirement (₹9,00,000) routed under the Term Loan Enterprise Scheme.',
  actionPlan: [
    { step: 1, title: 'Review Local Market Demand', description: 'Confirm local milk supply gap of ~950 Liters/day with nearby village co-operatives.' },
    { step: 2, title: 'Verify Project Cost & Quotations', description: 'Obtain formal quotes for 10 high-yield cows and 5 kW solar milk chilling equipment.' },
    { step: 3, title: 'Review Term Loan Route Parameters', description: 'Study 8.0% interest rate, 7-year tenure, and 6-month moratorium terms.' },
    { step: 4, title: 'Assemble Documentation Dossier', description: 'Gather Aadhaar, PAN, Land Lease Deed, 12-month Bank Statement, and REVA Feasibility Summary.' },
    { step: 5, title: 'Visit Nearest Rural Bank / DIC', description: 'Present this structured advisory dossier to District Industries Centre or Regional Rural Bank.' }
  ],
  revaAdvice: 'Your enterprise has high local demand and clear scheme alignment. Focus on building liquid working capital for the first 3 months during the moratorium phase.'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentStep, setCurrentStep] = useState<AppState['currentStep']>('login');
  const [activeDashboardTab, setActiveDashboardTab] = useState<AppState['activeDashboardTab']>('overview');

  const [user, setUser] = useState<AppState['user']>({
    isLoggedIn: false,
    name: 'Ramesh Kumar',
    phone: '9876543210',
    email: 'ramesh.entrepreneur@example.com',
    stage: 'new_idea'
  });

  const [business, setBusiness] = useState<AppState['business']>({
    name: 'Sri Lakshmi Dairy Farm',
    categoryId: defaultCategory.id,
    customIdea: defaultCategory.description,
    indicativeCost: defaultCategory.indicativeCost
  });

  const [location, setLocation] = useState<AppState['location']>({
    villageTown: 'Perumalpattu Village',
    district: 'Tiruvallur',
    state: 'Tamil Nadu',
    pinCode: '602024'
  });

  const [financial, setFinancial] = useState<FinancialState>(initialFinancials);
  const [market, setMarket] = useState<MarketState>(getDemoMarketState('Perumalpattu Village', 'Tiruvallur'));
  
  const [competition, setCompetition] = useState<CompetitionState>({
    radiusKm: 5,
    count: 3,
    density: 'Low',
    competitors: DEMO_COMPETITORS.filter(c => c.distanceKm <= 5),
    observations: [
      'Only 2 small competitors operating within 5 km radius.',
      'No computerized bulk milk chiller unit exists in the immediate 5 km zone.',
      'High potential to capture underserved morning delivery demand.'
    ]
  });

  const [swot, setSwot] = useState<SWOTState>(getDemoSWOT(defaultCategory.name));
  const [risks, setRisks] = useState<RiskItem[]>(getDemoRisks());
  const [report, setReport] = useState<AdvisoryReport>(initialReport);
  const [userFeedback, setUserFeedback] = useState<Record<string, 'yes' | 'no'>>({});

  const loginUser = (name: string, phone: string, email: string) => {
    setUser(prev => ({
      ...prev,
      isLoggedIn: true,
      name: name || prev.name,
      phone: phone || prev.phone,
      email: email || prev.email
    }));
    setCurrentStep('stage');
  };

  const setBusinessStage = (stage: BusinessStage) => {
    setUser(prev => ({ ...prev, stage }));
  };

  const updateBusinessProfile = (
    name: string,
    categoryId: string,
    customIdea: string,
    village: string,
    district: string,
    stateStr: string,
    pin: string
  ) => {
    const selectedCat = DEMO_BUSINESS_CATEGORIES.find(c => c.id === categoryId) || defaultCategory;
    
    setBusiness({
      name: name || `${village} ${selectedCat.name}`,
      categoryId,
      customIdea: customIdea || selectedCat.description,
      indicativeCost: selectedCat.indicativeCost
    });

    setLocation({
      villageTown: village || 'Rural Village',
      district: district || 'District Center',
      state: stateStr || 'Tamil Nadu',
      pinCode: pin || '600001'
    });

    // Update Market, SWOT & Risks
    setMarket(getDemoMarketState(village, district));
    setSwot(getDemoSWOT(selectedCat.name));
    setRisks(getDemoRisks());
    
    // Default financial calculation based on category indicative cost
    const newFinancial = calculateFinancials(selectedCat.indicativeCost * 0.10, selectedCat.indicativeCost);
    setFinancial(newFinancial);
  };

  const updateFinancials = (availableCapital: number, desiredCost?: number) => {
    const calculated = calculateFinancials(availableCapital, desiredCost);
    setFinancial(calculated);

    // Dynamic Report Score recalculation
    let score = 85;
    if (calculated.financingRoute === 'OUT_OF_RANGE') score = 45;
    else if (calculated.availableCapital < calculated.calculatedMargin) score = 65;

    let status: AdvisoryReport['feasibilityStatus'] = 'High Feasibility';
    if (score < 60) status = 'Conditional Feasibility';
    else if (score < 80) status = 'Moderate Feasibility';

    setReport(prev => ({
      ...prev,
      feasibilityScore: score,
      feasibilityStatus: status,
      feasibilitySummary: `Based on ₹${(calculated.availableCapital).toLocaleString('en-IN')} contribution and ₹${(calculated.calculatedLoan).toLocaleString('en-IN')} loan under the ${calculated.financingRoute === 'MICRO_FINANCE' ? 'Micro Finance Scheme' : 'Term Loan Scheme'}, the enterprise demonstrates ${status.toLowerCase()} in ${location.villageTown}.`
    }));
  };

  const setMarketRadius = (radiusKm: number) => {
    setMarket(prev => ({
      ...prev,
      radiusKm,
      population: radiusKm === 10 ? 42000 : 18450,
      households: radiusKm === 10 ? 9800 : 4210
    }));
  };

  const setCompetitionRadius = (radiusKm: number) => {
    const filtered = DEMO_COMPETITORS.filter(c => c.distanceKm <= radiusKm);
    setCompetition({
      radiusKm,
      count: filtered.length,
      density: filtered.length > 3 ? 'Moderate' : 'Low',
      competitors: filtered,
      observations: [
        `${filtered.length} competitors identified within ${radiusKm} km radius.`,
        radiusKm === 10 ? 'Market density remains moderate across the broader 10 km radius.' : 'Immediate 5 km radius has low competitor saturation.'
      ]
    });
  };

  const submitFeedback = (sectionId: string, isUseful: 'yes' | 'no') => {
    setUserFeedback(prev => ({ ...prev, [sectionId]: isUseful }));
  };

  const resetPrototype = () => {
    setCurrentStep('login');
    setActiveDashboardTab('overview');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        currentStep,
        activeDashboardTab,
        user,
        business,
        location,
        financial,
        market,
        competition,
        swot,
        risks,
        report,
        userFeedback,
        setLanguage,
        setCurrentStep,
        setActiveDashboardTab,
        loginUser,
        setBusinessStage,
        updateBusinessProfile,
        updateFinancials,
        submitFeedback,
        setMarketRadius,
        setCompetitionRadius,
        resetPrototype
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
