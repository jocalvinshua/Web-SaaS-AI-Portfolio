import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800 shadow-sm min-h-[297mm]">
            <div className="grid grid-cols-3 min-h-[297mm]">
                
                {/* --- LEFT SIDEBAR --- */}
                <aside className="col-span-1 bg-zinc-50/50 border-r border-zinc-100 flex flex-col">
                    <div className="py-12 px-8">
                        {/* Enhanced Profile Image */}
                        <div className="mb-8 flex justify-center">
                            <div className="relative">
                                <div 
                                    className="absolute -inset-2 rounded-full opacity-20"
                                    style={{ backgroundColor: accentColor }}
                                ></div>
                                {data.personal_info?.image ? (
                                    <img 
                                        src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)} 
                                        alt="Profile" 
                                        className="w-36 h-36 object-cover rounded-full relative border-4 border-white shadow-md"
                                    />
                                ) : (
                                    <div className="w-36 h-36 rounded-full bg-zinc-200 flex items-center justify-center relative border-4 border-white shadow-md">
                                        <span className="text-zinc-400 text-xs">No Photo</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Contact Section */}
                        <section className="mb-10">
                            <h2 className="text-[11px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-5 border-b pb-2">
                                Contact
                            </h2>
                            <div className="space-y-4 text-[13px]">
                                {data.personal_info?.phone && (
                                    <div className="flex items-center gap-3 group">
                                        <div className="p-1.5 rounded bg-white shadow-sm"><Phone size={12} style={{ color: accentColor }} /></div>
                                        <span className="text-zinc-600">{data.personal_info.phone}</span>
                                    </div>
                                )}
                                {data.personal_info?.email && (
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 rounded bg-white shadow-sm"><Mail size={12} style={{ color: accentColor }} /></div>
                                        <span className="text-zinc-600 break-all">{data.personal_info.email}</span>
                                    </div>
                                )}
                                {data.personal_info?.location && (
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 rounded bg-white shadow-sm"><MapPin size={12} style={{ color: accentColor }} /></div>
                                        <span className="text-zinc-600">{data.personal_info.location}</span>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Education Section */}
                        {data.education?.length > 0 && (
                            <section className="mb-10">
                                <h2 className="text-[11px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-5 border-b pb-2">
                                    Education
                                </h2>
                                <div className="space-y-6">
                                    {data.education.map((edu, index) => (
                                        <div key={index} className="text-[13px]">
                                            <p className="font-bold text-zinc-800 leading-tight mb-1 uppercase tracking-wide">{edu.degree}</p>
                                            <p className="text-zinc-500 italic mb-1">{edu.institution}</p>
                                            <p className="text-[11px] font-medium" style={{ color: accentColor }}>
                                                {formatDate(edu.graduation_date)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills Section */}
                        {data.skills?.length > 0 && (
                            <section>
                                <h2 className="text-[11px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-5 border-b pb-2">
                                    Expertise
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1 bg-white border border-zinc-200 text-zinc-600 text-[11px] font-medium rounded-full shadow-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <main className="col-span-2 flex flex-col">
                    {/* Header */}
                    <div className="py-12 px-10">
                        <h1 className="text-5xl font-black text-zinc-800 tracking-tighter leading-none mb-3">
                            {data.personal_info?.full_name?.split(' ')[0]} <br/>
                            <span style={{ color: accentColor }}>{data.personal_info?.full_name?.split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <p className="text-lg font-light text-zinc-500 tracking-[0.3em] uppercase">
                            {data?.personal_info?.profession || "Profession"}
                        </p>
                    </div>

                    <div className="px-10 pb-12 space-y-10">
                        {/* Summary */}
                        {data.professional_summary && (
                            <section>
                                <h2 className="text-xs font-black tracking-[0.2em] mb-4 flex items-center gap-3 uppercase">
                                    <span className="w-8 h-[2px]" style={{ backgroundColor: accentColor }}></span>
                                    Profile Summary
                                </h2>
                                <p className="text-[14px] text-zinc-600 leading-relaxed text-justify">
                                    {data.professional_summary}
                                </p>
                            </section>
                        )}

                        {/* Experience */}
                        {data.experience?.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black tracking-[0.2em] mb-6 flex items-center gap-3 uppercase">
                                    <span className="w-8 h-[2px]" style={{ backgroundColor: accentColor }}></span>
                                    Experience
                                </h2>
                                <div className="space-y-8">
                                    {data.experience.map((exp, index) => (
                                        <div key={index} className="relative pl-4 border-l border-zinc-100">
                                            <div className="absolute w-2 h-2 rounded-full -left-[4.5px] top-1.5" style={{ backgroundColor: accentColor }}></div>
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-zinc-800 uppercase text-sm tracking-wide">{exp.position}</h3>
                                                <span className="text-[11px] font-bold text-zinc-400 bg-zinc-50 px-2 py-1 rounded">
                                                    {formatDate(exp.start_date)} — {exp.is_current ? "PRESENT" : formatDate(exp.end_date)}
                                                </span>
                                            </div>
                                            <p className="text-[13px] font-bold mb-3" style={{ color: accentColor }}>{exp.company}</p>
                                            {exp.description && (
                                                <ul className="space-y-1.5">
                                                    {exp.description.split("\n").map((line, i) => (
                                                        <li key={i} className="text-[13px] text-zinc-600 flex gap-2">
                                                            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: accentColor }}></span>
                                                            {line}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {data.project?.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black tracking-[0.2em] mb-6 flex items-center gap-3 uppercase">
                                    <span className="w-8 h-[2px]" style={{ backgroundColor: accentColor }}></span>
                                    Featured Projects
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {data.project.map((project, index) => (
                                        <div key={index} className="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                                            <h3 className="font-bold text-zinc-800 text-sm mb-1">{project.name}</h3>
                                            <p className="text-[11px] font-medium mb-2 uppercase tracking-wider" style={{ color: accentColor }}>{project.type}</p>
                                            <p className="text-[13px] text-zinc-600 leading-snug">{project.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MinimalImageTemplate;