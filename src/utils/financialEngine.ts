import type { FinancialState, FinancingRoute, RepaymentScheduleRow, CashFlowRow } from '../types';

export const calculateFinancials = (
  availableCapital: number,
  desiredProjectCost?: number
): FinancialState => {
  // Ensure non-negative input
  const safeCapital = Math.max(0, availableCapital || 100000);
  
  // Project cost calculation
  let projectCost = desiredProjectCost && desiredProjectCost > 0 
    ? desiredProjectCost 
    : safeCapital * 10; // 10% margin -> 100% cost

  const calculatedMargin = projectCost * 0.10;
  let rawLoan = projectCost * 0.90;

  // Determine Financing Route based on deterministic thresholds
  let financingRoute: FinancingRoute = 'TERM_LOAN';
  let interestRate = 8.0;
  let tenureYears = 7;
  let moratoriumMonths = 6;
  let maxLoanAmount = 4500000;

  if (projectCost <= 140000) {
    financingRoute = 'MICRO_FINANCE';
    interestRate = 6.5;
    tenureYears = 3;
    moratoriumMonths = 3;
    maxLoanAmount = 125000;
  } else if (projectCost <= 5000000) {
    financingRoute = 'TERM_LOAN';
    interestRate = 8.0;
    tenureYears = 7;
    moratoriumMonths = 6;
    maxLoanAmount = 4500000;
  } else {
    financingRoute = 'OUT_OF_RANGE';
    interestRate = 9.5;
    tenureYears = 10;
    moratoriumMonths = 12;
    maxLoanAmount = projectCost * 0.90;
  }

  // Cap loan at maximum for route
  const calculatedLoan = Math.min(rawLoan, maxLoanAmount);

  // EMI and Repayment Calculations
  const totalMonths = tenureYears * 12;
  const activePaymentMonths = totalMonths - moratoriumMonths;
  const monthlyRate = (interestRate / 100) / 12;

  let monthlyEmi = 0;
  if (monthlyRate > 0 && activePaymentMonths > 0) {
    monthlyEmi = (calculatedLoan * monthlyRate * Math.pow(1 + monthlyRate, activePaymentMonths)) / 
                 (Math.pow(1 + monthlyRate, activePaymentMonths) - 1);
  } else if (activePaymentMonths > 0) {
    monthlyEmi = calculatedLoan / activePaymentMonths;
  }

  monthlyEmi = Math.round(monthlyEmi);
  const quarterlyPayment = monthlyEmi * 3;
  const totalRepayment = Math.round(monthlyEmi * activePaymentMonths);
  const totalInterest = Math.max(0, totalRepayment - calculatedLoan);

  // Generate monthly repayment schedule
  const repaymentSchedule: RepaymentScheduleRow[] = [];
  let remainingBalance = calculatedLoan;

  for (let m = 1; m <= totalMonths; m++) {
    const isMoratorium = m <= moratoriumMonths;
    if (isMoratorium) {
      repaymentSchedule.push({
        period: m,
        payment: 0,
        principal: 0,
        interest: Math.round(remainingBalance * monthlyRate),
        balance: Math.round(remainingBalance),
        isMoratorium: true
      });
    } else {
      const interestComp = Math.round(remainingBalance * monthlyRate);
      const principalComp = Math.min(remainingBalance, monthlyEmi - interestComp);
      remainingBalance = Math.max(0, remainingBalance - principalComp);
      
      repaymentSchedule.push({
        period: m,
        payment: monthlyEmi,
        principal: Math.round(principalComp),
        interest: Math.round(interestComp),
        balance: Math.round(remainingBalance),
        isMoratorium: false
      });
    }
  }

  // Generate 3-Year Cash Flow Projections (Deterministic estimates based on industry benchmarks)
  const estimatedMonthlyRevenue = Math.round(projectCost * 0.22); // ~22% monthly revenue to capital ratio
  const estimatedMonthlyOperatingCost = Math.round(estimatedMonthlyRevenue * 0.65); // ~65% operating cost ratio

  const cashFlowProjections: CashFlowRow[] = [];
  for (let yr = 1; yr <= 3; yr++) {
    const growthFactor = 1 + (yr - 1) * 0.15; // 15% annual growth
    const grossRevenue = Math.round(estimatedMonthlyRevenue * 12 * growthFactor);
    const operatingExpenses = Math.round(estimatedMonthlyOperatingCost * 12 * growthFactor);
    const debtServiceEmi = monthlyEmi * 12;
    const netCashFlow = grossRevenue - operatingExpenses - debtServiceEmi;

    cashFlowProjections.push({
      year: yr,
      grossRevenue,
      operatingExpenses,
      debtServiceEmi,
      netCashFlow
    });
  }

  return {
    availableCapital: safeCapital,
    desiredProjectCost: projectCost,
    calculatedMargin,
    calculatedLoan,
    financingRoute,
    interestRate,
    tenureYears,
    moratoriumMonths,
    monthlyEmi,
    quarterlyPayment,
    totalInterest,
    totalRepayment,
    repaymentSchedule,
    cashFlowProjections
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
