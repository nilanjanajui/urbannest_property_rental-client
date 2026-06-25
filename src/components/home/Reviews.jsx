"use client";

import { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data } = await axiosInstance.get("/reviews/home");
                setReviews(data.reviews);
            } catch (err) {
                console.error("Failed to fetch reviews:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    // Fallback static reviews if DB is empty
    const staticReviews = [
        {
            _id: "1",
            name: "Sarah Mitchell",
            email: "sarah@example.com",
            rating: 5,
            comment: "UrbanNest made finding my apartment so easy. The booking process was smooth and the owner was very responsive.",
            createdAt: new Date().toISOString(),
        },
        {
            _id: "2",
            name: "James Carter",
            email: "james@example.com",
            rating: 5,
            comment: "Excellent platform! I listed my property and had a tenant within a week. Highly recommended.",
            createdAt: new Date().toISOString(),
        },
        {
            _id: "3",
            name: "Priya Sharma",
            email: "priya@example.com",
            rating: 4,
            comment: "Very professional service. The search filters helped me find exactly what I was looking for.",
            createdAt: new Date().toISOString(),
        },
        {
            _id: "4",
            name: "Michael Torres",
            email: "michael@example.com",
            rating: 5,
            comment: "The Stripe payment integration gave me peace of mind. Secure and fast — I'll definitely use UrbanNest again.",
            createdAt: new Date().toISOString(),
        },
    ];

    const displayReviews = reviews.length > 0 ? reviews : staticReviews;

    return (
        <section className="py-20 bg-[#1a1f4e]">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-2">
                        Testimonials
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        What Our Tenants Say
                    </h2>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white/10 rounded-2xl p-6 animate-pulse h-52" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayReviews.map((review, i) => (
                            <motion.div
                                key={review._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors"
                            >
                                <FaQuoteLeft className="text-amber-400 text-xl mb-4" />
                                <p className="text-white/80 text-sm leading-relaxed mb-5">
                                    {review.comment}
                                </p>
                                <div className="flex gap-0.5 mb-4">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <FaStar
                                            key={s}
                                            className={`text-xs ${s <= review.rating ? "text-amber-400" : "text-white/20"}`}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-[#1a1f4e] font-bold text-sm shrink-0">
                                        {review.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold text-sm">{review.name}</p>
                                        <p className="text-white/40 text-xs">{review.email}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}