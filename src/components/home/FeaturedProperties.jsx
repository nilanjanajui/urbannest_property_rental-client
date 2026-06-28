"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import PropertyCard from "./PropertyCard";

export default function FeaturedProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance
            .get("/properties/featured")
            .then((res) => setProperties(res.data.properties || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1f4e] mb-1">Featured Properties</h2>
                        <p className="text-gray-400 text-sm">Handpicked selections of premium urban living spaces.</p>
                    </div>
                    <Link href="/properties" className="text-sm text-[#1a1f4e] hover:text-amber-500 font-semibold transition-colors whitespace-nowrap">
                        View All →
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
                        ))}
                    </div>
                ) : properties.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 text-sm">No featured properties yet.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((property, i) => (
                            <motion.div
                                key={property._id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="h-full"
                            >
                                <PropertyCard property={property} index={i} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}