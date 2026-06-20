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
            .then((res) => setProperties(res.data.properties))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-indigo-500 font-semibold text-sm uppercase tracking-widest mb-2">
                        Handpicked For You
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Featured Properties
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto">
                        Explore our top verified listings — quality homes that fit every lifestyle and budget.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
                        ))}
                    </div>
                ) : properties.length === 0 ? (
                    <p className="text-center text-slate-400 py-16 text-sm">
                        No featured properties yet. Check back soon!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((property, i) => (
                            <motion.div
                                key={property._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <PropertyCard property={property} />
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link
                        href="/properties"
                        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-colors"
                    >
                        View All Properties →
                    </Link>
                </div>
            </div>
        </section>
    );
}