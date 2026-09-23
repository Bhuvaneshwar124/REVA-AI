import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { LoginScreen } from './components/onboarding/LoginScreen';
import { BusinessStageStep } from './components/onboarding/BusinessStageStep';
import { BusinessProfileStep } from './components/onboarding/BusinessProfileStep';
import { BusinessIdeaStep } from './components/onboarding/BusinessIdeaStep';
import { FinancialInputStep } from './components/onboarding/FinancialInputStep';
import { FeasibilityDashboard } from './components/dashboard/FeasibilityDashboard';

const MainWorkflow: React.FC = () => {
  const { currentStep } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans">
      <Header />

      <main className="flex-1 py-4 sm:py-6">
        {currentStep === 'login' && <LoginScreen />}
        {currentStep === 'stage' && <BusinessStageStep />}
        {currentStep === 'profile' && <BusinessProfileStep />}
        {currentStep === 'idea' && <BusinessIdeaStep />}
        {currentStep === 'financial_input' && <FinancialInputStep />}
        {currentStep === 'dashboard' && <FeasibilityDashboard />}
      </main>

      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainWorkflow />
    </AppProvider>
  );
}

export default App;
