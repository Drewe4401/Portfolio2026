import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Music, Smartphone, Globe, Layers } from 'lucide-react';
import { useRef } from 'react';
import riffImage from '../assets/Riff.png';

interface Project {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
    featured?: boolean;
    gradient: string;
    icon: 'music' | 'mobile' | 'web' | 'layers';
    image?: string;
}

const projects: Project[] = [
    {
        title: "Riff",
        description: "A modern, sleek desktop music player that bridges the gap between streaming and offline playback. Features Spotify integration, smart playlists, and a glassmorphism-inspired interface.",
        tags: ["Electron", "React", "Spotify API", "Node.js"],
        featured: true,
        gradient: 'from-violet-600 via-purple-600 to-blue-600',
        icon: 'music',
        image: riffImage,
        link: "https://riff.drewedev.com/"
    },
    {
        title: "TuneGrab",
        description: "A Phantom Thieves inspired YouTube to MP3 converter. Features high-quality audio extraction, playlist support, and auto-expiring downloads in a slick, containerized package.",
        tags: ["Node.js", "Docker", "yt-dlp", "Express"],
        github: "https://github.com/Drewe4401/TuneGrab",
        gradient: 'from-red-600 to-rose-600',
        icon: 'music',
    },
    {
        title: "Nexus Music",
        description: "Self-hosted music streaming platform for managing and streaming personal media collections.",
        tags: ["Go", "React", "Docker", "Streaming"],
        github: "https://github.com/Drewe4401/Nexus-Music",
        gradient: 'from-blue-600 to-indigo-600',
        icon: 'web',
    },
    {
        title: "Bravo Auction Calculator",
        description: "Cross-platform mobile app providing fantasy football players with strategic data tools for auction-style drafts.",
        tags: ["React Native", "TypeScript", "Mobile"],
        link: "https://apps.apple.com/us/app/bravo-auction-calculator/id6747628724",
        gradient: 'from-orange-600 to-pink-600',
        icon: 'mobile',
    },
    {
        title: "Budgello",
        description: "Self-hosted personal finance management application featuring budget tracking and spending visualization.",
        tags: ["Go", "React", "PostgreSQL", "Docker"],
        github: "https://github.com/Drewe4401/Budgello",
        gradient: 'from-emerald-600 to-cyan-600',
        icon: 'layers',
    }
];

const iconMap = {
    music: Music,
    mobile: Smartphone,
    web: Globe,
    layers: Layers,
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const Icon = iconMap[project.icon];

    if (project.featured) {
        return (
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformPerspective: 1000 }}
                className="md:col-span-2 transform-gpu"
            >
                <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-1">
                    {/* Gradient border effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />

                    <div className="relative bg-[#0a0a0a] rounded-[22px] p-8 md:p-10 flex flex-col md:flex-row gap-8">
                        {/* Content */}
                        <div className="flex-1 z-10">
                            <div className="flex items-start justify-between mb-6">
                                <motion.div
                                    className={`p-4 rounded-2xl bg-gradient-to-br ${project.gradient} shadow-lg`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                >
                                    <Icon size={28} className="text-white" />
                                </motion.div>
                                <div className="flex gap-3">
                                    {project.github && (
                                        <motion.a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Github size={20} />
                                        </motion.a>
                                    )}
                                    {project.link && (
                                        <motion.a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <ExternalLink size={20} />
                                        </motion.a>
                                    )}
                                </div>
                            </div>

                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/20 mb-4">
                                Featured Project
                            </span>

                            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                {project.title}
                            </h3>
                            <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 rounded-full text-sm text-gray-300 bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Preview Area */}
                        <div className="flex-1 relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 rounded-2xl`} />
                            {project.image ? (
                                <div className="relative h-full min-h-[250px] rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-contain bg-black/50 transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                </div>
                            ) : (
                                <div className="relative h-full min-h-[250px] rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden">
                                    {/* Mock app preview for others */}
                                    <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent">
                                        <div className="h-8 bg-white/5 rounded-t-xl flex items-center px-3 gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/60" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/60" />
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div className="h-3 bg-white/10 rounded-full w-3/4" />
                                            <div className="h-3 bg-white/10 rounded-full w-1/2" />
                                            <div className="h-20 bg-white/5 rounded-lg mt-4" />
                                        </div>
                                    </div>

                                    {/* Floating elements */}
                                    <motion.div
                                        className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r ${project.gradient} opacity-60 blur-lg`}
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className="transform-gpu h-full"
        >
            <div className="relative group h-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-[1px]">
                {/* Gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />

                <div className="relative h-full bg-[#0a0a0a] rounded-[15px] p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                        <motion.div
                            className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} shadow-lg`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        >
                            <Icon size={22} className="text-white" />
                        </motion.div>
                        <div className="flex gap-2">
                            {project.github && (
                                <motion.a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Github size={18} />
                                </motion.a>
                            )}
                            {project.link && (
                                <motion.a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <ExternalLink size={18} />
                                </motion.a>
                            )}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed flex-grow text-sm">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map(tag => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full text-xs text-gray-400 bg-white/5 border border-white/5"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="section-padding relative">
            {/* Background accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 relative z-10"
            >
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="inline-block text-sm font-medium text-blue-400 mb-4 tracking-wider"
                >
                    // SELECTED WORK
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="text-white">Projects I've </span>
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Built</span>
                </h2>
                <p className="text-gray-400 max-w-xl">
                    A collection of applications and tools I've crafted with passion and attention to detail.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {projects.map((project, index) => (
                    <ProjectCard key={project.title} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
