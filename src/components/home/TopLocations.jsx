"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const locations = [
    { name: "New York", count: 1240, image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&auto=format&fit=crop" },
    { name: "London", count: 890, image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop" },
    { name: "Dubai", count: 629, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop" },
    { name: "Tokyo", count: 545, image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop" },
];

export default function TopLocations() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1a1f4e] mb-1">Top Global Locations</h2>
                    <p className="text-gray-400 text-sm">Explore properties in the world&apos;s most sought-after cities.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {locations.map((loc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-video"
                        >
                            <Image
                                src={loc.image}
                                alt={loc.name}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#1a1f4e]/80 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <p className="text-white font-bold text-base">{loc.name}</p>
                                <p className="text-gray-300 text-xs">{loc.count.toLocaleString()} Properties</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}