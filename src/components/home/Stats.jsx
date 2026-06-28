"use client";
import { motion } from "framer-motion";

const stats = [
    { value: "2,500+", label: "Properties Listed" },
    { value: "1,800+", label: "Happy Tenants" },
    { value: "400+", label: "Verified Owners" },
    { value: "50+", label: "Cities Covered" },
];

export default function RentalStats() {
    return (
        <section className="py-16 bg-[#1a1f4e]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="text-center"
                        >
                            <p className="text-4xl md:text-5xl font-bold text-white mb-2">{s.value}</p>
                            <p className="text-blue-200 text-sm font-medium">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}