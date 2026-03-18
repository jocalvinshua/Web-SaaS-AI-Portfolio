import React, { useState } from 'react';
import { Plus, X, Lightbulb } from 'lucide-react';

const SkillsForm = ({ data = [], onChange }) => {
  const [skillInput, setSkillInput] = useState('');

  // Fungsi menambah skill baru
  const addSkill = (e) => {
    e.preventDefault();
    const trimmedSkill = skillInput.trim();
    
    // Validasi: Tidak kosong dan belum ada di list
    if (trimmedSkill && !data.includes(trimmedSkill)) {
      onChange([...data, trimmedSkill]);
      setSkillInput('');
    }
  };

  // Fungsi menghapus skill
  const removeSkill = (indexToRemove) => {
    const newList = data.filter((_, index) => index !== indexToRemove);
    onChange(newList);
  };

  // Handle tekan Enter di input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addSkill(e);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        <p className="text-sm text-gray-600">Add your technical and soft skills to highlight your expertise.</p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="e.g. React.js, Project Management, Python"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            />
            <Lightbulb className="absolute right-3 top-3.5 text-gray-300" size={18} />
          </div>
          <button
            onClick={addSkill}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors active:scale-95"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Daftar Skill (Tags) */}
        <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl">
          {data.length === 0 ? (
            <p className="text-gray-400 text-sm italic m-auto">No skills added yet.</p>
          ) : (
            data.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm animate-in zoom-in duration-200"
              >
                {skill}
                <button
                  onClick={() => removeSkill(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tip untuk User */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>Pro Tip:</strong> Group your skills by category (e.g., Frontend, Backend, Tools) to make it easier for recruiters to read.
        </p>
      </div>
    </div>
  );
};

export default SkillsForm;