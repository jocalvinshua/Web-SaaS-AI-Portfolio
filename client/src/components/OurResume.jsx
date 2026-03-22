import React, { useEffect, useState } from 'react';
import { Edit3, Trash2, FileText, Check, X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Tambahkan ini
import { useAppContext } from '../AppContext/AppContext';

function CurrentResume() {
  const { fetchUserResumes, userResumes, deleteResume, editTitleResume } = useAppContext();
  const [editingId, setEditingId] = useState(null);
  const [tempTitle, setTempTitle] = useState('');
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Mencegah kartu terbuka saat klik hapus
    await deleteResume(id);
  };

  const startEdit = (e, resume) => {
    e.stopPropagation(); // Mencegah kartu terbuka saat klik icon edit
    setEditingId(resume._id);
    setTempTitle(resume.title);
  };

  const saveTitle = async (e, id) => {
    e.stopPropagation();
    const success = await editTitleResume(id, tempTitle);
    if (success) {
      setEditingId(null);
    }
  };

  const handleOpenResume = (id) => {
    navigate(`/dashboard/resume/${id}`);
  };

  useEffect(() => {
    fetchUserResumes();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-['Outfit']">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Resumes</h1>
            <p className="text-gray-500 mt-1">Manage and edit your professional documents.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {userResumes.map((resume) => (
            <div 
              key={resume._id}
              onClick={() => handleOpenResume(resume._id)}
              className="group relative bg-white border border-gray-200 rounded-2xl h-64 flex flex-col items-center justify-center transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              {/* Icon Placeholder */}
              <div className="bg-blue-50 p-4 rounded-full mb-4 text-blue-500 group-hover:scale-110 transition-transform duration-300">
                <FileText size={40} />
              </div>

              {/* Title / Edit Mode */}
              {editingId === resume._id ? (
                <div 
                  className="px-4 w-full flex flex-col items-center gap-2 z-30"
                  onClick={(e) => e.stopPropagation()} // Supaya klik input tidak trigger handleOpenResume
                >
                  <input 
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    className="w-full px-3 py-1.5 border-2 border-blue-500 rounded-lg outline-none text-sm text-center font-medium"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => saveTitle(e, resume._id)} 
                      className="p-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    >
                      <Check size={14} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setEditingId(null); }} 
                      className="p-1.5 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <h3 className="font-bold text-gray-800 px-6 text-center line-clamp-2">
                  {resume.title}
                </h3>
              )}

              {/* Hover Overlay - Hanya muncul jika tidak sedang edit judul */}
              {editingId !== resume._id && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                  <button 
                    onClick={(e) => startEdit(e, resume)}
                    className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-xl backdrop-blur-md transition-all hover:scale-110"
                    title="Edit Title"
                  >
                    <Edit3 size={20} />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, resume._id)}
                    className="p-3 bg-red-500/20 hover:bg-red-500 text-white rounded-xl backdrop-blur-md transition-all hover:scale-110 border border-red-500/50"
                    title="Delete Resume"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Empty State */}
          {userResumes.length === 0 && (
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