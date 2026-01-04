import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position for 3D effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Animated stats
    const stats = [
        { label: 'Years Experience', value: '3+', color: 'from-blue-500 to-cyan-500' },
        { label: 'Projects Completed', value: '20+', color: 'from-purple-500 to-pink-500' },
        { label: 'Technologies', value: '15+', color: 'from-pink-500 to-orange-500' },
    ];

    // Text animation
    const titleWords = ['Building', 'exceptional', 'digital', 'experiences.'];

    // Typing effect for subtitle
    const [typedText, setTypedText] = useState('');
    const fullText = 'Full-Stack Developer • System Engineer • Problem Solver';

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <section
            ref={containerRef}
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Animated background gradient mesh */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/5 rounded-full blur-[150px]" />
            </div>

            {/* Grid lines */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                }} />
            </div>

            <div className="section-padding relative z-10 text-center">
                <motion.div
                    style={{ rotateX, rotateY, transformPerspective: 1000 }}
                    className="transform-gpu"
                >
                    {/* Animated Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                    >
                        <Sparkles size={14} className="text-yellow-400" />
                        <span className="text-sm text-gray-300">Open to new opportunities</span>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
                    >
                        {titleWords.map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-block mr-4">
                                {word.split('').map((char, charIndex) => (
                                    <motion.span
                                        key={charIndex}
                                        className={`inline-block ${wordIndex === 1 || wordIndex === 3 ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent' : 'text-white'}`}
                                        initial={{ opacity: 0, y: 50, rotateX: -90 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: wordIndex * 0.15 + charIndex * 0.03 + 0.3,
                                            ease: [0.215, 0.61, 0.355, 1],
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                {wordIndex < titleWords.length - 1 && (wordIndex === 1 ? <br className="md:hidden" /> : null)}
                            </span>
                        ))}
                    </motion.h1>

                    {/* Typing Subtitle */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="h-8 mb-6"
                    >
                        <span className="text-lg md:text-xl text-gray-400 font-mono">
                            {typedText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.8 }}
                        className="text-gray-400 max-w-xl mx-auto mb-10 text-lg leading-relaxed"
                    >
                        I'm <span className="text-white font-semibold">Andrew Ellender</span>,
                        crafting secure, scalable applications and robust infrastructure
                        from <span className="text-blue-400">Lake Charles, LA</span>.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                    >
                        <motion.a
                            href="#projects"
                            className="group relative px-8 py-4 rounded-full overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative z-10 flex items-center gap-2 text-white font-semibold">
                                View My Work
                                <motion.span
                                    className="inline-block"
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <ArrowRight size={18} />
                                </motion.span>
                            </span>
                        </motion.a>

                        <motion.a
                            href="#contact"
                            className="group px-8 py-4 rounded-full border border-white/20 font-semibold text-white hover:bg-white/5 transition-colors relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10">Get In Touch</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 0.8 }}
                    className="flex flex-wrap justify-center gap-8 md:gap-16"
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            className="text-center group"
                            whileHover={{ y: -5 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        >
                            <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
            >
                <motion.div
                    className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1 h-2 bg-white/50 rounded-full mt-2"
                        animate={{ opacity: [0.5, 1, 0.5], y: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
