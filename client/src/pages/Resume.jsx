import { useState, useEffect, useRef } from "react" // Ditambahkan: useRef
import { Link, useParams } from "react-router-dom"
import { Palette, LayoutTemplate, Save, Download } from "lucide-react"
import { useReactToPrint } from "react-to-print"
import { toast } from "react-toastify"

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
import { useAppContext } from "../AppContext/AppContext"

export default function Resume() {
    const { resumeId } = useParams()
    const { saveResume, getResumeById, currentResume } = useAppContext()
    
    // Ref untuk menangkap elemen yang akan di-print ke PDF
    const componentRef = useRef(null) 

    const [step, setStep] = useState(1)
    const totalSteps = 6
    
    const [themeColor, setThemeColor] = useState("#2563eb")
    const [selectedTemplate, setSelectedTemplate] = useState("classic")
    const [removeBackground, setRemoveBackground] = useState(false)

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

    // Ambil data dari database saat pertama kali halaman dibuka
    useEffect(() => {
        if (resumeId) {
            getResumeById(resumeId)
        }
    }, [resumeId]) // Hanya jalan jika resumeId di URL berubah

    // Sinkronisasi data dari Context ke State Lokal Editor
    useEffect(() => {
        if (currentResume && currentResume._id === resumeId) {
            setResumeData({
                personal_info: currentResume.personal_info || {},
                professional_summary: currentResume.professional_summary || "",
                education: currentResume.education || [],
                experience: currentResume.experience || [],
                project: currentResume.project || [],
                skills: currentResume.skills || []
            });
            if (currentResume.themeColor) setThemeColor(currentResume.themeColor);
            if (currentResume.template) setSelectedTemplate(currentResume.template);
        }
    }, [currentResume, resumeId])

    const updateSection = (section, value) => {
        setResumeData(prev => ({ ...prev, [section]: value }))
    }

    const ActiveTemplate = templates[selectedTemplate] || ClassicTemplate

    const handleSave = async () => {
        const formData = new FormData();
        
        // Jika user memilih file baru (bukan string URL)
        if (resumeData.personal_info.image instanceof File) {
            formData.append("profile_image", resumeData.personal_info.image);
        }

        // Masukkan data lainnya
        formData.append("personal_info", JSON.stringify(resumeData.personal_info));
        formData.append("professional_summary", resumeData.professional_summary);
        formData.append("education", JSON.stringify(resumeData.education));
        formData.append("experience", JSON.stringify(resumeData.experience));
        formData.append("project", JSON.stringify(resumeData.project));
        formData.append("skills", JSON.stringify(resumeData.skills));
        formData.append("template", selectedTemplate);
        formData.append("themeColor", themeColor);

        await saveResume(resumeId, formData);
    };

    // Logic Download PDF
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: resumeData.personal_info?.full_name || "My_Resume",
    });

    return (
        <div className="min-h-screen bg-gray-50 font-['Outfit']">
            <header className="sticky top-0 z-40 flex items-center justify-between px-8 py-3 bg-white border-b border-gray-200">
                <Link to="/dashboard" className="text-gray-600 hover:text-primary flex items-center gap-2 font-medium">
                    <span>&larr;</span><span>Back</span>
                </Link>

                <div className="flex items-center gap-6">
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

                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <Save size={16} /> Save Progress
                    </button>

                    <button onClick={handlePrint} className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        <Download size={16} /> Download PDF
                    </button>
                </div>
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
                            className="bg-primary text-white px-10 py-2.5 rounded-xl font-bold hover:shadow-xl transition-all active:scale-95"
                        >
                            {step === totalSteps ? "Finish" : "Next Step"}
                        </button>
                    </div>
                </div>

                {/* PREVIEW SIDE */}
                <div className="bg-slate-100 p-12 overflow-y-auto flex justify-center custom-scrollbar shadow-inner">
                    {/* Pembungkus yang ditangkap oleh react-to-print */}
                    <div 
                        ref={componentRef} 
                        className="bg-white shadow-2xl w-[210mm] min-h-[297mm] h-fit mb-10 origin-top transform scale-[0.85] xl:scale-100 transition-transform print:scale-100 print:shadow-none print:m-0"
                    >
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