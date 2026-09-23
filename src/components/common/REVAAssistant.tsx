import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Sparkles, MessageSquare, X, Send, ChevronRight, ShieldAlert } from 'lucide-react';
import { formatCurrency } from '../../utils/financialEngine';

interface REVAAssistantProps {
  contextTab?: string;
}

export const REVAAssistant: React.FC<REVAAssistantProps> = ({ contextTab }) => {
  const { 
    language, 
    business, 
    location, 
    financial, 
    market, 
    competition, 
    activeDashboardTab,
    currentStep 
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'reva' | 'user'; text: string; time: string }>>([
    {
      sender: 'reva',
      text: language === 'ta' 
        ? `வணக்கம்! நான் REVA. ${location.villageTown} கிராமத்தில் உங்கள் ${business.name} தொழில் பற்றிய சந்தேகங்களுக்கு விளக்கம் அளிக்க தயாராக உள்ளேன்.`
        : `Greetings! I am REVA, your Virtual Advisor. I can help explain the 10/90 capital structure, hyper-local market findings in ${location.villageTown}, and scheme guidelines. How can I assist you?`,
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');

  // Contextual text recommendation based on step/tab
  const getContextualAdvice = () => {
    const isTa = language === 'ta';
    const active = contextTab || activeDashboardTab || currentStep;

    switch (active) {
      case 'stage':
      case 'profile':
      case 'idea':
        return isTa
          ? `அமைவிடம் (${location.villageTown}, ${location.district}) மற்றும் வணிக யோசனையின் அடிப்படையில், உள்ளூர் தேவை மற்றும் அரசு உதவி பற்றிய தகவல்களை வழங்குகிறேன்.`
          : `Based on your location (${location.villageTown}, ${location.district}) and business idea, I can help analyze local demand, competition density, and financial structuring.`;
      
      case 'financial_input':
      case 'financial':
        return isTa
          ? `உங்கள் ${formatCurrency(financial.availableCapital)} தொகையானது 10% பங்களிப்பாகும். இதன் மூலம் மொத்த திட்ட செலவு ${formatCurrency(financial.desiredProjectCost)} மற்றும் கடனுக்கான தேவை ${formatCurrency(financial.calculatedLoan)} ஆகும்.`
          : `Your available ${formatCurrency(financial.availableCapital)} represents the 10% margin contribution under the specified structure, giving an indicative project cost of ${formatCurrency(financial.desiredProjectCost)} and loan requirement of ${formatCurrency(financial.calculatedLoan)}.`;

      case 'market':
        return isTa
          ? `உள்ளூர் சந்தை தரவுகளின்படி ${location.villageTown} பகுதியின் மக்கள் தொகை ${market.population.toLocaleString('en-IN')} மற்றும் தேவை குறியீடு 'உயர்' (High) ஆகும்.`
          : `Here is what local market data indicates: ${location.villageTown} has ~${market.population.toLocaleString('en-IN')} residents with an underserved milk/service gap index of ${market.underservedScore}/100.`;

      case 'competition':
      case 'map':
        return isTa
          ? `${competition.radiusKm} கி.மீ சுற்றளவில் ${competition.count} போட்டியாளர்கள் மட்டுமே உள்ளனர். சந்தை அடர்த்தி 'குறைவு' (Low) ஆகும்.`
          : `In the selected ${competition.radiusKm} km radius, ${competition.count} competing units were identified. The market density is categorized as ${competition.density}.`;

      case 'schemes':
        return isTa
          ? `உங்கள் திட்டத்தின் மொத்த செலவு (${formatCurrency(financial.desiredProjectCost)}) ${financial.financingRoute === 'MICRO_FINANCE' ? 'நுண் நிதி கடன் வரம்பிற்குள் (≤ ₹1.40 லட்சம்)' : 'காலக் கடன் வரம்பிற்குள் (₹1.40 லட்சம் முதல் ₹50 லட்சம்)'} வருகிறது.`
          : `Your project cost falls within the specified ${financial.financingRoute === 'MICRO_FINANCE' ? 'Micro Finance Scheme' : 'Term Loan Scheme'} range. Review eligibility and official process details before applying.`;

      case 'risks':
        return isTa
          ? `பகுப்பாய்வின்படி பருவகால தேவை மற்றும் ஆரம்ப 3 மாத வேலை மூலதனம் கவனிக்கப்பட வேண்டிய அபாயங்கள் ஆகும்.`
          : `The analysis indicates seasonal demand and initial 3-month working capital as key considerations. Review your moratorium cash flow strategy.`;

      case 'overview':
      case 'report':
      default:
        return isTa
          ? `உங்கள் ${business.name} தொழில் திட்டம் ${financial.financingRoute === 'MICRO_FINANCE' ? 'நுண் நிதி' : 'காலக் கடன்'} திட்டத்தின் கீழ் உயர் சாத்தியக்கூறு கொண்டுள்ளது.`
          : `Your proposed ${business.name} enterprise demonstrates strong economic feasibility in ${location.villageTown} with a 10% promoter margin contribution.`;
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = { sender: 'user' as const, text, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Generate Contextual REVA Response
    setTimeout(() => {
      let revaReply = '';
      const lower = text.toLowerCase();
      const isTa = language === 'ta';

      if (lower.includes('10/90') || lower.includes('margin') || lower.includes('capital') || lower.includes('contribution')) {
        revaReply = isTa
          ? `10/90 விதியின்படி: உங்கள் சொந்தப் பங்கு 10% (${formatCurrency(financial.calculatedMargin)}) மற்றும் வங்கி கடன் 90% (${formatCurrency(financial.calculatedLoan)}). இதன் மூலம் மொத்த திட்ட செலவு ${formatCurrency(financial.desiredProjectCost)} ஆகும்.`
          : `Under the 10/90 structure: Your 10% margin contribution is ${formatCurrency(financial.calculatedMargin)}, while the remaining 90% loan requirement is ${formatCurrency(financial.calculatedLoan)} for a total project cost of ${formatCurrency(financial.desiredProjectCost)}.`;
      } else if (lower.includes('emi') || lower.includes('repayment') || lower.includes('interest')) {
        revaReply = isTa
          ? `${financial.financingRoute === 'MICRO_FINANCE' ? '6.5%' : '8.0%'} வட்டி விகிதத்தில் உங்கள் தோராய மாத EMI ${formatCurrency(financial.monthlyEmi)} ஆகும் (தவணைக்காலம் ${financial.tenureYears} ஆண்டுகள், சலுகைக் காலம் ${financial.moratoriumMonths} மாதங்கள்).`
          : `At an interest rate of ${financial.interestRate}% p.a., your estimated monthly EMI is ${formatCurrency(financial.monthlyEmi)} for a tenure of ${financial.tenureYears} years with a ${financial.moratoriumMonths}-month moratorium period.`;
      } else if (lower.includes('moratorium')) {
        revaReply = isTa
          ? `சலுகைக் காலத்தில் (${financial.moratoriumMonths} மாதங்கள்) அசல் தொகையை செலுத்தத் தேவையில்லை. இது தொழில் நிலைபெற உதவுகிறது.`
          : `During the ${financial.moratoriumMonths}-month moratorium, principal repayment is deferred. This allows your business to generate steady operational revenue before regular EMI payments begin.`;
      } else if (lower.includes('risk') || lower.includes('competition')) {
        revaReply = isTa
          ? `${location.villageTown} பகுதியில் ${competition.count} போட்டியாளர்கள் மட்டுமே உள்ளனர். பருவகால தீவன பற்றாக்குறைக்கு சொந்தமாக தீவனம் வளர்ப்பது நல்ல தீர்வாகும்.`
          : `With only ${competition.count} competitors in ${location.villageTown}, competition risk is low. The main operational risk is feed/input price seasonality, which can be mitigated by contract purchasing.`;
      } else {
        revaReply = isTa
          ? `நன்றி! உங்கள் ${business.name} திட்டமானது ${financial.financingRoute === 'MICRO_FINANCE' ? 'நுண் நிதி' : 'காலக் கடன்'} திட்டத்தின் அனைத்து விதிகளுக்கும் உட்பட்டுள்ளது.`
          : `Thank you. Your ${business.name} project cost of ${formatCurrency(financial.desiredProjectCost)} is fully compatible with the ${financial.financingRoute === 'MICRO_FINANCE' ? 'Micro Finance Route' : 'Term Loan Route'}. Review the official document checklist on the Schemes tab.`;
      }

      setMessages(prev => [...prev, { sender: 'reva', text: revaReply, time: 'Just now' }]);
    }, 400);
  };

  const presetQuestions = [
    'Explain the 10/90 capital contribution rule',
    'What is my estimated monthly EMI and interest?',
    'How does the loan moratorium period work?',
    'What are the key operational risks for my location?'
  ];

  return (
    <>
      {/* Contextual REVA Advice Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-700/50 rounded-xl p-4 text-white shadow-sm my-4 font-sans relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold flex-shrink-0">
              <Bot className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white tracking-wide flex items-center gap-1.5">
                  <span>REVA Advisory Insight</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <span className="text-[10px] bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded border border-indigo-700 font-mono">
                  Contextual AI
                </span>
              </div>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                "{getContextualAdvice()}"
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs transition shadow-sm self-end sm:self-center flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask REVA</span>
          </button>
        </div>
      </div>

      {/* Floating REVA Chat Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end transition-opacity">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col font-sans border-l border-slate-300">
            {/* Drawer Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b-2 border-amber-500">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">REVA Virtual Advisor</h3>
                  <p className="text-[11px] text-amber-400">Rural Enterprise Virtual Assistant</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Disclaimer Bar */}
            <div className="bg-amber-50 border-b border-amber-200 px-3 py-2 text-[11px] text-amber-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>REVA provides advice based on verified deterministic calculations and government guidelines.</span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-indigo-900 text-white rounded-br-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                    }`}
                  >
                    {msg.sender === 'reva' && (
                      <div className="text-[10px] font-bold text-amber-600 mb-1 flex items-center gap-1">
                        <Bot className="w-3 h-3" />
                        <span>REVA Advisory</span>
                      </div>
                    )}
                    <p>{msg.text}</p>
                    <div className="text-[9px] text-right mt-1 opacity-60">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Prompt Chips */}
            <div className="p-2 bg-white border-t border-slate-200 space-y-1">
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-1">
                Suggested Questions:
              </div>
              <div className="flex flex-wrap gap-1">
                {presetQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    className="text-[11px] bg-slate-100 hover:bg-amber-50 hover:text-amber-900 text-slate-700 border border-slate-200 rounded px-2 py-1 text-left flex items-center gap-1 transition"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-500" />
                    <span className="line-clamp-1">{q}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Box */}
            <div className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask REVA about 10/90 financing, risks, or schemes..."
                className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-2 rounded-lg font-bold text-xs flex items-center gap-1 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
