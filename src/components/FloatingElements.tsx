import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

const FloatingElements = () => {
    const { scrollY } = useScroll();
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 50, stiffness: 100 };
    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set((clientX - innerWidth / 2) / 50);
            mouseY.set((clientY - innerHeight / 2) / 50);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Scroll-based transforms
    const rotate1 = useTransform(scrollY, [0, 3000], [0, 360]);
    const rotate2 = useTransform(scrollY, [0, 3000], [0, -180]);
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Large gradient orb - top left */}
            <motion.div
                className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
                    x: mouseXSpring,
                    y: useTransform(mouseYSpring, v => v + (scrollY.get() * 0.1)),
                }}
            />

            {/* Medium gradient orb - right side */}
            <motion.div
                className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)',
                    x: useTransform(mouseXSpring, v => -v * 0.5),
                    y: y1,
                }}
            />

            {/* Small accent orb - bottom left */}
            <motion.div
                className="absolute bottom-1/4 left-10 w-[300px] h-[300px] rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)',
                    x: useTransform(mouseXSpring, v => v * 0.3),
                    y: y2,
                }}
            />

            {/* Geometric shapes */}
            {/* Rotating square */}
            <motion.div
                className="absolute top-[20%] right-[15%] w-16 h-16 border border-white/10 opacity-40"
                style={{
                    rotate: rotate1,
                    x: useTransform(mouseXSpring, v => v * 2),
                    y: useTransform(mouseYSpring, v => v * 2),
                }}
            />

            {/* Circle outline */}
            <motion.div
                className="absolute top-[60%] left-[10%] w-24 h-24 border border-white/5 rounded-full opacity-50"
                style={{
                    rotate: rotate2,
                    x: useTransform(mouseXSpring, v => -v * 1.5),
                }}
            />

            {/* Diamond */}
            <motion.div
                className="absolute top-[40%] right-[8%] w-12 h-12 border border-purple-500/20 opacity-40"
                style={{
                    rotate: 45,
                    x: useTransform(mouseXSpring, v => v * 3),
                    y: useTransform(mouseYSpring, v => v * 3),
                }}
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Floating dots */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                    style={{
                        top: `${15 + i * 15}%`,
                        left: `${5 + i * 12}%`,
                        x: useTransform(mouseXSpring, v => v * (i + 1) * 0.5),
                        y: useTransform(mouseYSpring, v => v * (i + 1) * 0.5),
                    }}
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.3,
                    }}
                />
            ))}

            {/* Crossing lines */}
            <motion.div
                className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"
                style={{
                    y: useTransform(scrollY, [0, 1000], [0, 100]),
                }}
            />
            <motion.div
                className="absolute top-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"
                style={{
                    y: useTransform(scrollY, [0, 1000], [0, -50]),
                }}
            />

            {/* Vertical accent line */}
            <motion.div
                className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"
                style={{
                    x: useTransform(mouseXSpring, v => v * 10),
                }}
            />
        </div>
    );
};

export default FloatingElements;
