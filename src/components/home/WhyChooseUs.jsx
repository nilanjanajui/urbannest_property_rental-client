"use client";
import { motion } from "framer-motion";
import { FaShieldAlt, FaSearchLocation, FaHandshake, FaRegCreditCard, FaHeadset, FaStar } from "react-icons/fa";

const features = [
    { icon: FaSearchLocation, title: "Smart Search", desc: "Filter properties by location, type, and price range with our powerful search." },
    { icon: FaShieldAlt, title: "Verified Listings", desc: "Every property is reviewed and approved by our team before going live." },
    { icon: FaRegCreditCard, title: "Secure Payments", desc: "Pay your booking fee safely using Stripe's encrypted payment gateway." },
    { icon: FaHandshake, title: "Easy Booking", desc: "Book your desired property in minutes with a clear, simple process." },
    { icon: FaHeadset, title: "24/7 Support", desc: "Our support team is always available to help with questions or issues." },
    { icon: FaStar, title: "Trusted Reviews", desc: "Read genuine reviews from tenants who have rented through UrbanNest." },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <p className="text-indigo-500 font-semibold text-sm uppercase tracking-widest mb-2">
                        Our Advantages
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Why Choose UrbanNest?
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto">
                        We make renting simple, secure, and stress-free for both tenants and property owners.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group p-6 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all duration-300"
                        >
                            <div className="w-14 h-14 bg-indigo-50 group-hover:bg-indigo-600 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:text-white mb-5 transition-colors duration-300">
                                <f.icon size={22} />
                            </div>
                            <h3 className="text-base font-semibold text-slate-800 mb-2">{f.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}