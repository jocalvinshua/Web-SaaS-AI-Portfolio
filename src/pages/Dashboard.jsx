import { useState } from "react"
import { useNavigate } from "react-router-dom"

import OurResume from "../components/OurResume"

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("")
    const navigate = useNavigate()

    // Dummy random id
    const id = Math.random()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (title.trim()) {
            // alert(`Resume Title Created: ${title}`)
            navigate(`/dashboard/resume/${id}`);
            setIsOpen(false)
            setTitle("")
        } else {
            alert("Please enter a title")
        }
    }

    return (
        <div className="p-8 font-['Outfit']">
            {/* Header Section */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-main">My Resume</h1>
                <p className="text-gray-500">Create, edit, and manage your professional resume</p>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                    onClick={() => setIsOpen(true)}
                    className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
                >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20">
                        <span className="text-2xl text-gray-400 group-hover:text-primary">+</span>
                    </div>
                    <span className="font-semibold text-gray-600 group-hover:text-primary">Create New Resume</span>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-all">
                    <span className="font-semibold text-gray-600">Upload Resume</span>
                </div>
            </div>

            {/* User resume */}
            <OurResume />

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
                        <h3 className="text-xl font-bold text-main mb-2">Resume Title</h3>
                        <p className="text-sm text-gray-500 mb-6">Give a name to your new professional journey.</p>
                        
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                autoFocus
                                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all mb-6"
                                placeholder="e.g. Full Stack Developer - 2026"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            
                            <div className="flex gap-3 justify-end">
                                <button 
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-6 py-2 rounded-xl text-gray-500 hover:bg-gray-100 font-medium transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-6 py-2 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}