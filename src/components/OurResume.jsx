import React, { useState } from 'react';
import { Edit3, Trash2, FileText, Check, X } from 'lucide-react';

function CurrentResume() {
  // Data dummy
  const [resumes, setResumes] = useState([
    { id: 1, title: 'Frontend Developer 2026' },
    { id: 2, title: 'Project Manager - Tech' },
    { id: 3, title: 'Fullstack Web Resume' },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [tempTitle, setTempTitle] = useState('');

  // Handler Hapus
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      setResumes(resumes.filter(r => r.id !== id));
    }
  };

  // Handler Mulai Edit
  const startEdit = (resume) => {
    setEditingId(resume.id);
    setTempTitle(resume.title);
  };

  // Handler Simpan Judul Baru
  const saveTitle = (id) => {
    setResumes(resumes.map(r => 
      r.id === id ? { ...r, title: tempTitle } : r
    ));
    setEditingId(null);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-['Outfit']">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Resumes</h1>
            <p className="text-gray-500 mt-1">Manage and edit your professional documents.</p>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
            + Create New
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {resumes.map((resume) => (
            <div 
              key={resume.id}
              className="group relative bg-white border border-gray-200 rounded-2xl h-64 flex flex-col items-center justify-center transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden"
            >
              {/* Icon Placeholder */}
              <div className="bg-blue-50 p-4 rounded-full mb-4 text-blue-500 group-hover:scale-110 transition-transform duration-300">
                <FileText size={40} />
              </div>

              {/* Title / Edit Mode */}
              {editingId === resume.id ? (
                <div className="px-4 w-full flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-200">
                  <input 
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    className="w-full px-3 py-1.5 border-2 border-blue-500 rounded-lg outline-none text-sm text-center"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button onClick={() => saveTitle(resume.id)} className="p-1.5 bg-green-500 text-white rounded-md hover:bg-green-600">
                      <Check size={14} />
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-1.5 bg-gray-400 text-white rounded-md hover:bg-gray-500">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <h3 className="font-bold text-gray-800 px-4 text-center line-clamp-2">
                  {resume.title}
                </h3>
              )}

              {/* Hover Overlay */}
              {editingId !== resume.id && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                  <button 
                    onClick={() => startEdit(resume)}
                    className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-xl backdrop-blur-md transition-all hover:scale-110"
                    title="Edit Title"
                  >
                    <Edit3 size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(resume.id)}
                    className="p-3 bg-red-500/20 hover:bg-red-500 text-white rounded-xl backdrop-blur-md transition-all hover:scale-110 border border-red-500/50"
                    title="Delete Resume"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Empty State Card */}
          {resumes.length === 0 && (
            <div className="col-span-full py-20 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400">
              <FileText size={48} className="mb-4 opacity-20" />
              <p>No resumes found. Create your first one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrentResume;