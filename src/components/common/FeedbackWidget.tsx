import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/i18n';
import { ThumbsUp, ThumbsDown, CheckCircle2, Send } from 'lucide-react';

interface FeedbackWidgetProps {
  sectionId: string;
  sectionTitle?: string;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ sectionId, sectionTitle }) => {
  const { language, userFeedback, submitFeedback } = useApp();
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const existingVote = userFeedback[sectionId];

  const handleVote = (vote: 'yes' | 'no') => {
    submitFeedback(sectionId, vote);
    if (vote === 'yes') {
      setSubmitted(true);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 my-4 text-xs font-sans">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="font-medium text-slate-800 flex items-center gap-2">
          <span>{getTranslation(language, 'wasUseful')}</span>
          {sectionTitle && <span className="text-slate-500 font-normal">({sectionTitle})</span>}
        </div>

        {!submitted ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleVote('yes')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border transition ${
                existingVote === 'yes'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-emerald-50 hover:border-emerald-400'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{getTranslation(language, 'yes')}</span>
            </button>

            <button
              onClick={() => handleVote('no')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border transition ${
                existingVote === 'no'
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-amber-50 hover:border-amber-400'
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>{getTranslation(language, 'no')}</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Thank you for your feedback!</span>
          </div>
        )}
      </div>

      {existingVote === 'no' && !submitted && (
        <form onSubmit={handleCommentSubmit} className="mt-3 flex gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={getTranslation(language, 'missingInfoPlaceholder')}
            className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded font-medium flex items-center gap-1 transition"
          >
            <Send className="w-3 h-3" />
            <span>{getTranslation(language, 'submitFeedback')}</span>
          </button>
        </form>
      )}
    </div>
  );
};
