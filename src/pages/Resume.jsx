import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Palette, LayoutTemplate } from "lucide-react"

import PersonalForm from "../components/resume/PersonalForm"
import SummaryForm from "../components/resume/SummaryForm"
import EducationForm from "../components/resume/EducationForm"
import ExperienceForm from "../components/resume/ExperienceForm"
import ProjectForm from "../components/resume/ProjectForm"
import SkillsForm from "../components/resume/SkillsForm"

import ClassicTemplate from "../assets/templates/ClassicTemplate"
import MinimalImageTemplate from "../assets/templates/MinimalImageTemplate"
import MinimalTemplate from "../assets/templates/MinimalTemplate"
import ModernTemplate from "../assets/templates/ModernTemplate"

export default function Resume() {
    const { userId } = useParams()
    const [step, setStep] = useState(1)
    const totalSteps = 6
    
    const [themeColor, setThemeColor] = useState("#2563eb")
    const [selectedTemplate, setSelectedTemplate] = useState("classic")
    const [removeBackground, setRemoveBackground] = useState(false)

    // Struktur state disamakan dengan kebutuhan template
    const [resumeData, setResumeData] = useState({
        personal_info: {
            full_name: "", email: "", phone: "", location: "",
            profession: "", linkedin: "", website: "", image: null
        },
        professional_summary: "",
        education: [],
        experience: [],
        project: [],
        skills: []
    })

    const colors = ["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#27272a", "#ea580c"]
    
    const templates = {
        classic: ClassicTemplate,
        modern: ModernTemplate,
        minimal: MinimalTemplate,
        minimalImage: MinimalImageTemplate
    }

    const updateSection = (section, value) => {
        setResumeData(prev => ({ ...prev, [section]: value }))
    }

    const ActiveTemplate = templates[selectedTemplate] || ClassicTemplate

    return (
        <div className="min-h-screen bg-gray-50 font-['Outfit']">
            <header className="sticky top-0 z-40 flex items-center justify-between px-8 py-3 bg-white border-b border-gray-200">
                <Link to="/dashboard" className="text-gray-600 hover:text-primary flex items-center gap-2 font-medium">
                    <span>&larr;</span><span>Back</span>
                </Link>

                <div className="flex items-center gap-6">
                    {/* Color Picker */}
                    <div className="hidden md:flex items-center gap-2 border-r pr-6 border-gray-100">
                        <Palette size={18} className="text-gray-400" />
                        <div className="flex gap-1.5">
                            {colors.map(color => (
                                <button 
                                    key={color}
                                    onClick={() => setThemeColor(color)}
                                    className={`w-6 h-6 rounded-full border-2 transition-all ${themeColor === color ? 'border-gray-400 scale-125' : 'border-transparent'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Template Selector */}
                    <div className="flex items-center gap-2">
                        <LayoutTemplate size={18} className="text-gray-400" />
                        <select 
                            value={selectedTemplate}
                            onChange={(e) => setSelectedTemplate(e.target.value)}
                            className="text-sm font-bold outline-none bg-transparent cursor-pointer text-gray-700"
                        >
                            <option value="classic">Classic Style</option>
                            <option value="modern">Modern Professional</option>
                            <option value="minimal">Minimalist Clean</option>
                            <option value="minimalImage">Minimalist + Photo</option>
                        </select>
                    </div>
                </div>

                <button className="btn-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all">
                    Download
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-65px)] overflow-hidden">
                
                {/* EDITOR SIDE */}
                <div className="p-8 overflow-y-auto bg-white border-r border-gray-200 custom-scrollbar">
                    <div className="mb-8">
                        <div className="flex justify-between items-end mb-2">
                            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Resume Editor</h2>
                            <span className="text-xs font-bold text-gray-400 uppercase">Step {step} of {totalSteps}</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full transition-all duration-700 ease-in-out" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
                        </div>
                    </div>

                    <div className="min-h-[400px]">
                        {step === 1 && <PersonalForm data={resumeData.personal_info} onChange={(val) => updateSection('personal_info', val)} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />}
                        {step === 2 && <SummaryForm data={resumeData.professional_summary} onChange={(val) => updateSection('professional_summary', val)} />}
                        {step === 3 && <EducationForm data={resumeData.education} onChange={(val) => updateSection('education', val)} />}
                        {step === 4 && <ExperienceForm data={resumeData.experience} onChange={(val) => updateSection('experience', val)} />}
                        {step === 5 && <ProjectForm data={resumeData.project} onChange={(val) => updateSection('project', val)} />}
                        {step === 6 && <SkillsForm data={resumeData.skills} onChange={(val) => updateSection('skills', val)} />}
                    </div>
                    
                    <div className="mt-12 flex justify-between pt-6 border-t border-gray-50">
                        <button 
                            onClick={() => setStep(prev => Math.max(1, prev - 1))} 
                            className={`px-6 py-2 font-bold transition-colors ${step === 1 ? 'text-gray-200' : 'text-gray-400 hover:text-gray-800'}`}
                            disabled={step === 1}
                        >
                            Previous
                        </button>
                        <button 
                            onClick={() => setStep(prev => Math.min(totalSteps, prev + 1))} 
                            className="btn-primary text-white px-10 py-2.5 rounded-xl font-bold hover:shadow-xl transition-all active:scale-95"
                        >
                            {step === totalSteps ? "Finish" : "Next Step"}
                        </button>
                    </div>
                </div>

                {/* PREVIEW SIDE */}
                <div className="bg-slate-100 p-12 overflow-y-auto flex justify-center custom-scrollbar shadow-inner">
                    {/* Kertas A4 Wrapper */}
                    <div className="bg-white shadow-2xl w-[210mm] min-h-[297mm] h-fit mb-10 origin-top transform scale-[0.85] xl:scale-100 transition-transform">
                        <ActiveTemplate 
                            data={resumeData} 
                            accentColor={themeColor} 
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}