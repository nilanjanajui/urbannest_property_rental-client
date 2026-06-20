"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const locations = [
    { name: "New York", count: 124, image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&auto=format&fit=crop" },
    { name: "Los Angeles", count: 98, image: "https://images.unsplash.com/photo-1580655653885-65763b2597d2?w=400&auto=format&fit=crop" },
    { name: "Chicago", count: 76, image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400&auto=format&fit=crop" },
    { name: "Miami", count: 65, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop" },
    { name: "Seattle", count: 52, image: "https://images.unsplash.com/photo-1438401171849-74ac270044ee?w=400&auto=format&fit=crop" },
    { name: "Boston", count: 43, image: "https://images.unsplash.com/photo-1501979376754-d8fd6f5f9220?w=400&auto=format&fit=crop" },
];

export default function TopLocations() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-indigo-500 font-semibold text-sm uppercase tracking-widest mb-2">
                        Explore Cities
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Top Locations
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto">
                        Discover rental properties in the most sought-after cities across the country.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {locations.map((loc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.07 }}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square"
                        >
                            <Image
                                src={loc.image}
                                alt={loc.name}
                                fill
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-3">
                                <p className="text-white font-semibold text-sm">{loc.name}</p>
                                <p className="text-indigo-200 text-xs">{loc.count} Properties</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}