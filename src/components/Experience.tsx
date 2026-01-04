import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, Code2, Server, Shield, Database, Cloud, Terminal, ExternalLink } from 'lucide-react';
import { useRef } from 'react';

const Experience = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const experiences = [
        {
            company: "Kronos Louisiana",
            role: "IT Client Service Analyst",
            period: "Apr 2024 - Present",
            location: "Westlake, LA",
            description: "Engineered and deployed full-stack ASP.NET applications, migrating legacy systems. Architected SQL databases and fortified network security across fiber/ethernet environments.",
            skills: ["ASP.NET", "SQL Server", "Network Security", "Azure"],
            current: true,
            link: "https://www.kronosww.com/"
        },
        {
            company: "National Networks",
            role: "System Engineer",
            period: "Dec 2023 - Apr 2024",
            location: "Lake Charles, LA",
            description: "Managed Windows servers (AD, DHCP, DNS), backup solutions, and Microsoft 365 services ensuring business continuity.",
            skills: ["Windows Server", "Active Directory", "M365", "Backup Solutions"],
            current: false,
            link: "https://ntwo.com/"
        }
    ];

    const skills = [
        { name: 'React / Next.js', level: 95, icon: Code2, color: 'from-cyan-400 to-blue-500' },
        { name: 'TypeScript', level: 90, icon: Terminal, color: 'from-blue-400 to-indigo-500' },
        { name: 'Go / Node.js', level: 85, icon: Server, color: 'from-emerald-400 to-teal-500' },
        { name: 'SQL / PostgreSQL', level: 88, icon: Database, color: 'from-orange-400 to-amber-500' },
        { name: 'Docker / DevOps', level: 80, icon: Cloud, color: 'from-violet-400 to-purple-500' },
        { name: 'Network Security', level: 82, icon: Shield, color: 'from-rose-400 to-pink-500' },
    ];

    return (
        <section ref={sectionRef} id="experience" className="section-padding relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-600/10 to-pink-600/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-20 relative z-10"
            >
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 mb-4 tracking-wider"
                >
                    <span className="w-8 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500" />
                    CAREER PATH
                </motion.span>
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    <span className="text-white">Experience & </span>
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">Education</span>
                </h2>
                <p className="text-gray-400 max-w-xl text-lg">
                    My professional journey in technology and the knowledge that drives my work.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                {/* Work Experience */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-4 mb-10"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur-lg" />
                            <div className="relative p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20">
                                <Briefcase size={24} className="text-blue-400" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white">Work Experience</h3>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline line with gradient */}
                        <div className="absolute left-[23px] top-0 bottom-0 w-[2px]">
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 to-purple-500/20" />
                            <motion.div
                                className="absolute top-0 w-full bg-gradient-to-b from-white/80 to-transparent"
                                initial={{ height: 0 }}
                                animate={isInView ? { height: '100%' } : {}}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                style={{ height: '30%', mixBlendMode: 'overlay' }}
                            />
                        </div>

                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                                    className="relative pl-14 group"
                                >
                                    {/* Timeline node */}
                                    <div className="absolute left-0 top-3">
                                        <div className={`relative w-[46px] h-[46px] rounded-full flex items-center justify-center
                                            ${exp.current
                                                ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                                                : 'bg-gradient-to-br from-purple-500/50 to-purple-600/30 border border-purple-500/30'
                                            }`}
                                        >
                                            {exp.current && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full bg-blue-500/40"
                                                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            )}
                                            <div className={`w-3 h-3 rounded-full ${exp.current ? 'bg-white' : 'bg-purple-400'}`} />
                                        </div>
                                    </div>

                                    {/* Card */}
                                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-blue-500/5">
                                        {/* Top gradient accent */}
                                        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${exp.current ? 'from-blue-500 via-purple-500 to-pink-500' : 'from-purple-500/50 to-pink-500/50'}`} />

                                        {/* Shine effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                        </div>

                                        <div className="relative p-6">
                                            {/* Header */}
                                            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${exp.current ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-purple-500/15 text-purple-400 border border-purple-500/20'}`}>
                                                    <Calendar size={12} />
                                                    {exp.period}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5 text-gray-400">
                                                    <MapPin size={12} />
                                                    {exp.location}
                                                </span>
                                                {exp.current && (
                                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs border border-green-500/30">
                                                        <span className="relative flex h-2 w-2">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                        </span>
                                                        Current
                                                    </span>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-100 transition-colors">
                                                {exp.role}
                                            </h4>

                                            {/* Company with Link */}
                                            {exp.link ? (
                                                <a href={exp.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 text-sm font-medium w-fit group/link">
                                                    {exp.company}
                                                    <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                                </a>
                                            ) : (
                                                <div className="text-gray-400 mb-4 text-sm font-medium">
                                                    {exp.company}
                                                </div>
                                            )}

                                            {/* Description */}
                                            <p className="text-gray-500 text-sm leading-relaxed mb-5">
                                                {exp.description}
                                            </p>

                                            {/* Skills */}
                                            <div className="flex flex-wrap gap-2">
                                                {exp.skills.map(skill => (
                                                    <span
                                                        key={skill}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300
                                                            ${exp.current
                                                                ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40'
                                                                : 'bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40'
                                                            }`}
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Education & Skills Column */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-4 mb-10"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-purple-500/30 rounded-xl blur-lg" />
                            <div className="relative p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/10 border border-purple-500/20">
                                <GraduationCap size={24} className="text-purple-400" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white">Education & Skills</h3>
                    </motion.div>

                    <div className="space-y-6">
                        {/* Education Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-orange-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all duration-500 h-full">
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />

                                <div className="p-6">
                                    <div className="flex items-start gap-5">
                                        <div className="relative shrink-0 mt-1 hidden sm:block">
                                            <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur-md" />
                                            <div className="relative p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                                <GraduationCap size={28} className="text-purple-400" />
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                <h4 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                                                    Bachelor of Science
                                                </h4>
                                                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-medium border border-purple-500/20">
                                                    2019 - 2023
                                                </span>
                                            </div>

                                            <div className="text-purple-400 text-sm font-medium mb-4">
                                                Computer Science • LSU
                                            </div>

                                            <div className="grid grid-cols-3 gap-3 mb-5">
                                                <div className="p-3 rounded-lg bg-black/20 border border-white/5 text-center">
                                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">GPA</div>
                                                    <div className="text-white font-bold">3.55</div>
                                                </div>
                                                <div className="p-3 rounded-lg bg-black/20 border border-white/5 text-center col-span-2">
                                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Focus</div>
                                                    <div className="text-white font-bold text-sm">Software Engineering</div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {['Data Structures', 'Algorithms', 'Databases', 'Networks', 'Operating Systems'].map((course) => (
                                                    <span key={course} className="px-2.5 py-1 rounded-md text-xs font-medium bg-purple-500/5 text-purple-300 border border-purple-500/10">
                                                        {course}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Technical Proficiency Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-600/10 to-teal-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all duration-500 h-full">
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500" />

                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                            <Code2 size={20} className="text-blue-400" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white">Technical Proficiency</h4>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {skills.map((skill, index) => (
                                            <div key={skill.name} className="group/skill">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <skill.icon size={14} className="text-gray-400 group-hover/skill:text-white transition-colors" />
                                                        <span className="text-sm font-medium text-gray-300 group-hover/skill:text-white transition-colors">{skill.name}</span>
                                                    </div>
                                                    <span className="text-xs font-medium text-gray-500">{skill.level}%</span>
                                                </div>
                                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                                                        initial={{ width: 0 }}
                                                        animate={isInView ? { width: `${skill.level}%` } : {}}
                                                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
