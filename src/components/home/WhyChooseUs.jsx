"use client";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaHeadset, FaStar } from "react-icons/fa";

const features = [
    {
        icon: FaShieldAlt,
        title: "Verified Listings",
        desc: "Every property is hand-inspected by our elite local team for quality assurance.",
        style: "bg-purple-100 text-purple-600",
    },
    {
        icon: FaLock,
        title: "Secure Payments",
        desc: "End-to-end encrypted financial transactions and identity protection protocols.",
        style: "bg-blue-100 text-blue-600",
    },
    {
        icon: FaHeadset,
        title: "24/7 Support",
        desc: "Dedicated lifestyle managers available around the clock to assist your transition.",
        style: "bg-amber-100 text-amber-600",
    },
    {
        icon: FaStar,
        title: "Premium Amenities",
        desc: "Exclusive access to gym, private lounges, and co-working spaces in all buildings.",
        style: "bg-emerald-100 text-emerald-600",
    },
];

export default function WhyChooseUs() {
    return (
        <section id="why" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1a1f4e] mb-3">Why UrbanNest?</h2>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto">
                        We simplify the rental experience with quality, security, and support.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${f.style} flex items-center justify-center mb-5`}>
                                <f.icon size={22} />
                            </div>
                            <h3 className="font-semibold text-[#1a1f4e] text-sm mb-2">{f.title}</h3>
                            <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
