"use client";
import Link from "next/link";
import Image from "next/image";
import { FaBed, FaBath, FaMapMarkerAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const BADGES = ["Featured", "Hot Deal", "Exclusive"];
const BADGE_STYLES = [
    "bg-[#1a1f4e] text-white",
    "bg-amber-500 text-white",
    "bg-emerald-600 text-white",
];

export default function PropertyCard({ property, index = 0 }) {
    const { user } = useAuth();
    const detailHref = user ? `/properties/${property._id}` : "/login";

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-100">
            <div className="relative h-52 overflow-hidden">
                <Image
                    src={property.images?.[0] || "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop"}
                    alt={property.title}
                    fill
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${BADGE_STYLES[index % 3]}`}>
                    {BADGES[index % 3]}
                </span>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-[#1a1f4e] text-sm leading-snug line-clamp-2 flex-1">
                        {property.title}
                    </h3>
                    <p className="text-amber-500 font-bold text-sm shrink-0">
                        ${property.rent.toLocaleString()}
                        <span className="text-gray-400 text-xs font-normal">/{property.rentType}</span>
                    </p>
                </div>

                <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                    <FaMapMarkerAlt size={10} className="text-[#1a1f4e] shrink-0" />
                    <span className="line-clamp-1">{property.location}</span>
                </div>

                <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
                    <span className="flex items-center gap-1">
                        <FaBed size={11} className="text-[#1a1f4e]" /> {property.bedrooms} Bed
                    </span>
                    <span className="flex items-center gap-1">
                        <FaBath size={11} className="text-[#1a1f4e]" /> {property.bathrooms} Bath
                    </span>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100">
                    <Link href={detailHref} className="text-[#1a1f4e] hover:text-amber-500 text-xs font-semibold transition-colors">
                        View Details →
                    </Link>
                </div>
            </div>
        </div>
    );
}