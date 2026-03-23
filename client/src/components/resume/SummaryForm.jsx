import React, { useState } from 'react';
import { Save, Sparkle, Sparkles, Loader2 } from 'lucide-react';
import { useAppContext } from '../../AppContext/AppContext';
import { toast } from 'react-toastify';

const SummaryForm = ({ data, onChange, profession }) => {
  const { enhanceSummary } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleAIEnhance = async () => {
    // Validasi input minimal
    if (!data || data.trim().length < 10) {
      return toast.warn("Please write at least a short sentence to enhance.");
    }

    setIsLoading(true);
    try {
      // Panggil fungsi enhance
      const enhancedText = await enhanceSummary(data, profession);
      
      // Update data di parent (Resume.jsx)
      onChange(enhancedText); 
      
      toast.success("Summary enhanced by AI!");
    } catch (error) {
      toast.error("AI enhancement failed. Check your connection/API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Professional Summary</h3>
          <p className="text-sm text-gray-600 mt-1">
            Summarize your career and key achievements.
          </p>
        </div>
        <button 
          onClick={handleAIEnhance}
          disabled={isLoading}
          className='flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
        >
          {isLoading ? (
            <Loader2 className='size-4 animate-spin'/>
          ) : (
            <Sparkles className='size-4'/>
          )}
          {isLoading ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="relative">
        <textarea 
          className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-all text-sm leading-relaxed"
          placeholder="e.g. Passionate Software Engineer with 5+ years of experience..."
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading}
        />
        
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[10px] text-gray-400 font-medium bg-white/80 px-2 py-1 rounded">
          <Sparkle size={10} className="text-purple-500" />
          Powered by Gemini AI
        </div>
      </div>
    </div>
  );
};

export default SummaryForm