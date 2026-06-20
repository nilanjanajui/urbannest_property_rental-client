"use client";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const reviews = [
    {
        name: "Sarah Johnson",
        email: "sa***@gmail.com",
        date: "March 2025",
        rating: 5,
        avatar: "SJ",
        comment: "UrbanNest made finding my apartment incredibly easy. The listings were accurate and the booking process was seamless. Highly recommended!",
    },
    {
        name: "Michael Chen",
        email: "mi***@gmail.com",
        date: "April 2025",
        rating: 5,
        avatar: "MC",
        comment: "I found my dream apartment within a week. The search filters are excellent and communication with the owner was smooth throughout.",
    },
    {
        name: "Fatima Al-Hassan",
        email: "fa***@gmail.com",
        date: "May 2025",
        rating: 4,
        avatar: "FA",
        comment: "Very professional platform. The verified listings gave me confidence, and the Stripe payment felt completely secure.",
    },
    {
        name: "David Kumar",
        email: "da***@gmail.com",
        date: "June 2025",
        rating: 5,
        avatar: "DK",
        comment: "As someone relocating abroad, UrbanNest was a lifesaver. I found a great apartment remotely without any hassle.",
    },
];

export default function Reviews() {
    return (
        <section className="py-20 bg-indigo-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-2">
                        Testimonials
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        What Our Tenants Say
                    </h2>
                    <p className="text-indigo-300 max-w-xl mx-auto">
                        Real experiences from people who found their home through UrbanNest.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((r, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col"
                        >
                            <FaQuoteLeft className="text-amber-400 mb-4 opacity-60" size={20} />
                            <p className="text-indigo-100 text-sm leading-relaxed flex-1 mb-6">
                                {r.comment}
                            </p>
                            <div>
                                <div className="flex gap-1 mb-3">
                                    {[...Array(5)].map((_, j) => (
                                        <FaStar
                                            key={j}
                                            size={12}
                                            className={j < r.rating ? "text-amber-400" : "text-white/20"}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                        {r.avatar}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-sm">{r.name}</p>
                                        <p className="text-indigo-400 text-xs">{r.email} · {r.date}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}