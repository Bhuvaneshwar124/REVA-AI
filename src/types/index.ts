export type Language = 'en' | 'ta';

export type BusinessStage = 'new_idea' | 'existing_entrepreneur';

export type FinancingRoute = 'MICRO_FINANCE' | 'TERM_LOAN' | 'OUT_OF_RANGE';

export interface BusinessCategory {
  id: string;
  name: string;
  nameTa: string;
  indicativeCost: number;
  description: string;
  descriptionTa: string;
  requirements: string[];
  components: { name: string; cost: number }[];
}

export interface UserState {
  isLoggedIn: boolean;
  name: string;
  phone: string;
  email: string;
  stage: BusinessStage;
}

export interface BusinessState {
  name: string;
  categoryId: string;
  customIdea: string;
  indicativeCost: number;
}

export interface LocationState {
  villageTown: string;
  district: string;
  state: string;
  pinCode: string;
}

export interface FinancialState {
  availableCapital: number;
  desiredProjectCost: number;
  calculatedMargin: number; // 10%
  calculatedLoan: number;   // 90%
  financingRoute: FinancingRoute;
  interestRate: number;      // e.g. 6.5 or 8.0
  tenureYears: number;       // e.g. 3 or 7
  moratoriumMonths: number;  // e.g. 3 or 6
  monthlyEmi: number;
  quarterlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  repaymentSchedule: RepaymentScheduleRow[];
  cashFlowProjections: CashFlowRow[];
}

export interface RepaymentScheduleRow {
  period: number; // Month or Quarter
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  isMoratorium: boolean;
}

export interface CashFlowRow {
  year: number;
  grossRevenue: number;
  operatingExpenses: number;
  debtServiceEmi: number;
  netCashFlow: number;
}

export interface MarketIndicator {
  title: string;
  titleTa: string;
  value: string;
  source: string;
  dataYear: string;
  status: string;
}

export interface MarketState {
  radiusKm: number;
  population: number;
  households: number;
  demandLevel: 'High' | 'Moderate' | 'Emerging';
  purchasingPowerScore: string;
  underservedScore: number; // Out of 100
  indicators: MarketIndicator[];
}

export interface Competitor {
  id: string;
  name: string;
  category: string;
  distanceKm: number;
  scale: 'Micro' | 'Small' | 'Medium';
  lat: number;
  lng: number;
}

export interface CompetitionState {
  radiusKm: number;
  count: number;
  density: 'Low' | 'Moderate' | 'High';
  competitors: Competitor[];
  observations: string[];
}

export interface SWOTState {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface RiskItem {
  category: 'Market' | 'Financial' | 'Competition' | 'Supply' | 'Seasonality' | 'Operations';
  title: string;
  titleTa: string;
  impact: 'High' | 'Medium' | 'Low';
  description: string;
  mitigation: string;
}

export interface SchemeDetail {
  id: FinancingRoute;
  title: string;
  titleTa: string;
  maxProjectCost: number;
  financingPercentage: number;
  maxLoanAmount: number;
  interestRate: number;
  tenureYears: number;
  moratoriumMonths: number;
  benefits: string[];
  eligibility: string[];
  requiredDocuments: string[];
  applicationProcess: string[];
  faqs: { q: string; a: string }[];
  sources: string[];
  lastVerified: string;
}

export interface AdvisoryReport {
  feasibilityScore: number;
  feasibilityStatus: 'High Feasibility' | 'Moderate Feasibility' | 'Conditional Feasibility';
  feasibilitySummary: string;
  actionPlan: { step: number; title: string; description: string }[];
  revaAdvice: string;
}

export interface AppState {
  language: Language;
  currentStep: 'login' | 'stage' | 'profile' | 'idea' | 'financial_input' | 'dashboard';
  activeDashboardTab: 'overview' | 'financial' | 'market' | 'competition' | 'map' | 'schemes' | 'risks' | 'report';
  user: UserState;
  business: BusinessState;
  location: LocationState;
  financial: FinancialState;
  market: MarketState;
  competition: CompetitionState;
  swot: SWOTState;
  risks: RiskItem[];
  report: AdvisoryReport;
  userFeedback: Record<string, 'yes' | 'no'>;
}
