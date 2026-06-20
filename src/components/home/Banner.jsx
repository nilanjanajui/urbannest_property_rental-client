"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function Banner() {
    const router = useRouter();
    const [form, setForm] = useState({ location: "", type: "", minPrice: "", maxPrice: "" });

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (form.location) params.set("search", form.location);
        if (form.type) params.set("type", form.type);
        if (form.minPrice) params.set("minPrice", form.minPrice);
        if (form.maxPrice) params.set("maxPrice", form.maxPrice);
        router.push(`/properties?${params.toString()}`);
    };

    return (
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&auto=format&fit=crop')",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-indigo-950/70 to-indigo-950/80" />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4"
                >
                    Trusted Property Rental Platform
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                >
                    Find Your Perfect{" "}
                    <span className="text-amber-400">Rental Home</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-12"
                >
                    Browse thousands of verified properties. Find the home that fits your lifestyle and budget — all in one place.
                </motion.p>

                {/* Search Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="bg-white rounded-2xl p-4 shadow-2xl"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        <input
                            type="text"
                            placeholder="Search by location..."
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            className="lg:col-span-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <select
                            value={form.type}
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                        >
                            <option value="">Property Type</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="villa">Villa</option>
                            <option value="studio">Studio</option>
                            <option value="office">Office</option>
                            <option value="shop">Shop</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={form.minPrice}
                            onChange={(e) => setForm({ ...form, minPrice: e.target.value })}
                            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={form.maxPrice}
                            onChange={(e) => setForm({ ...form, maxPrice: e.target.value })}
                            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <button
                            onClick={handleSearch}
                            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                        >
                            <FaSearch /> Search
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}