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
        <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&auto=format&fit=crop&q=80')" }}
            />
            <div className="absolute inset-0 bg-[#1a1f4e]/75" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5"
                >
                    Find Your Perfect<br />Urban Nest.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.15 }}
                    className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Discover curated properties designed for modern living. From cozy studios to luxury penthouses, your next home is just a search away.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.3 }}
                    className="bg-white rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-stretch md:items-center p-3 md:pl-6 md:pr-2 md:py-2 gap-3 md:gap-0 max-w-3xl mx-auto"
                >
                    <div className="flex flex-col flex-1 md:border-r border-gray-200 md:pr-4">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold hidden md:block">Location</span>
                        <input
                            type="text"
                            placeholder="Where to?"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="text-sm text-gray-700 focus:outline-none placeholder-gray-400 bg-transparent"
                        />
                    </div>

                    <div className="flex flex-col md:border-r border-gray-200 md:px-4">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold hidden md:block">Property Type</span>
                        <select
                            value={form.type}
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                            className="text-sm text-gray-700 focus:outline-none bg-transparent cursor-pointer"
                        >
                            <option value="">Any Type</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="villa">Villa</option>
                            <option value="studio">Studio</option>
                            <option value="office">Office</option>
                            <option value="shop">Shop</option>
                        </select>
                    </div>

                    <div className="flex flex-col md:border-r border-gray-200 md:px-4">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold hidden md:block">Min Price</span>
                        <input
                            type="number"
                            placeholder="$1,000"
                            value={form.minPrice}
                            onChange={(e) => setForm({ ...form, minPrice: e.target.value })}
                            className="text-sm text-gray-700 focus:outline-none w-full md:w-24 placeholder-gray-400 bg-transparent"
                        />
                    </div>

                    <div className="flex flex-col md:px-4">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold hidden md:block">Max Price</span>
                        <input
                            type="number"
                            placeholder="$10,000"
                            value={form.maxPrice}
                            onChange={(e) => setForm({ ...form, maxPrice: e.target.value })}
                            className="text-sm text-gray-700 focus:outline-none w-full md:w-24 placeholder-gray-400 bg-transparent"
                        />
                    </div>

                    <button
                        onClick={handleSearch}
                        className="bg-[#1a1f4e] hover:bg-[#2a2f60] text-white px-7 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-colors shrink-0"
                    >
                        <FaSearch size={12} /> Search
                    </button>
                </motion.div>
            </div>
        </section>
    );
}