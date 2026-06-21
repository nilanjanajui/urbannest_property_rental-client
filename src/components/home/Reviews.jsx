"use client";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const reviews = [
    {
        name: "Sarah J.",
        role: "Berlin Tenant",
        initials: "SJ",
        rating: 5,
        comment: "Found my dream loft in Berlin in just two days. The verification process gave me so much peace of mind.",
        style: "bg-purple-100 text-purple-600",
    },
    {
        name: "Markus T.",
        role: "Dubai Tenant",
        initials: "MT",
        rating: 5,
        comment: "The concierge support is unmatched. They helped me with everything from movers to internet setup.",
        style: "bg-amber-100 text-amber-700",
    },
    {
        name: "David L.",
        role: "NYC Tenant",
        initials: "DL",
        rating: 5,
        comment: "The app interface is beautiful and so easy to use. UrbanNest is truly the future of property rentals.",
        style: "bg-blue-100 text-blue-600",
    },
    {
        name: "Elena R.",
        role: "London Tenant",
        initials: "ER",
        rating: 4,
        comment: "Luxury listings that actually live up to the photos. The transparency here is a breath of fresh air.",
        style: "bg-emerald-100 text-emerald-600",
    },
];

export default function Reviews() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1a1f4e] mb-3">What Our Tenants Say</h2>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto">
                        Real stories from people who found their perfect home through UrbanNest.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((r, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <FaStar key={j} size={13} className={j < r.rating ? "text-amber-400" : "text-gray-200"} />
                                ))}
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">
                                &ldquo;{r.comment}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full ${r.style} flex items-center justify-center text-xs font-bold shrink-0`}>
                                    {r.initials}
                                </div>
                                <div>
                                    <p className="text-[#1a1f4e] font-semibold text-sm">{r.name}</p>
                                    <p className="text-gray-400 text-xs">{r.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}