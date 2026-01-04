import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // 3D effect for the form
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 30, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-200, 200], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-5, 5]), springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!formRef.current) return;
        const rect = formRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setIsSubmitting(true);

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        console.log('Sending email with:', {
            serviceId,
            templateId,
            publicKey: publicKey ? `${publicKey.substring(0, 3)}...` : 'undefined'
        });

        try {
            await emailjs.sendForm(
                serviceId ?? '',
                templateId ?? '',
                formRef.current,
                publicKey ?? ''
            );
            setIsSubmitting(false);
            setIsSubmitted(true);
            formRef.current.reset();
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (error) {
            console.error('FAILED...', error);
            setIsSubmitting(false);
            alert("Failed to send message. Please try again later.");
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'aellender@drewedev.com',
            href: 'mailto:aellender@drewedev.com',
            color: 'blue',
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '(337) 965-0987',
            href: 'tel:+13379650987',
            color: 'purple',
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'Lake Charles, LA',
            href: '#',
            color: 'pink',
        },
    ];

    const socialLinks = [
        { icon: Github, href: 'https://github.com/Drewe4401', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/andrew-e-b87048222', label: 'LinkedIn' },
    ];

    return (
        <section id="contact" className="section-padding pb-32 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[150px]" />
            <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center relative z-10"
            >
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block text-sm font-medium text-blue-400 mb-4 tracking-wider"
                >
                    // LET'S CONNECT
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="text-white">Get In </span>
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Touch</span>
                </h2>
                <p className="text-gray-400 max-w-lg mx-auto">
                    Have a project in mind or just want to chat? I'd love to hear from you.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto relative z-10">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-2 space-y-8"
                >
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Let's build something
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> amazing </span>
                            together.
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
                        </p>
                    </div>

                    <div className="space-y-4">
                        {contactInfo.map((item, index) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all group"
                                whileHover={{ x: 5 }}
                            >
                                <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-400 group-hover:scale-110 transition-transform`}>
                                    <item.icon size={22} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                                    <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                        {item.value}
                                    </div>
                                </div>
                                <ArrowUpRight size={18} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                viewport={{ once: true }}
                                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/10 hover:border-white/20"
                                whileHover={{ scale: 1.1, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                title={link.label}
                            >
                                <link.icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-3"
                    style={{ rotateX, rotateY, transformPerspective: 1000 }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative group">
                        {/* Gradient background effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 space-y-6 backdrop-blur-sm"
                        >
                            {/* Success overlay */}
                            {isSubmitted && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/90 rounded-3xl z-10"
                                >
                                    <div className="text-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
                                        >
                                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>
                                        <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                                        <p className="text-gray-400">I'll get back to you soon.</p>
                                    </div>
                                </motion.div>
                            )}

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Name</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Email</label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                                    placeholder="Project Inquiry"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Message</label>
                                <textarea
                                    name="message"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 h-36 resize-none focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                                    placeholder="Tell me about your project..."
                                    required
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full relative overflow-hidden rounded-xl font-semibold py-4 group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send size={18} />
                                        </>
                                    )}
                                </span>
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
