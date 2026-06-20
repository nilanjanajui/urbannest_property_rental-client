"use client";
import Link from "next/link";
import Image from "next/image";
import { FaBed, FaBath, FaMapMarkerAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function PropertyCard({ property }) {
    const { user } = useAuth();
    const detailHref = user ? `/properties/${property._id}` : "/login";

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <Image
                    src={property.images?.[0] || "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop"}
                    alt={property.title}
                    fill
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                    {property.type}
                </span>
                <span className="absolute top-3 right-3 bg-amber-400 text-slate-900 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                    {property.rentType}
                </span>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-slate-800 text-base mb-1 line-clamp-1">{property.title}</h3>
                <div className="flex items-center gap-1 text-slate-400 text-xs mb-3">
                    <FaMapMarkerAlt className="text-indigo-400 shrink-0" />
                    <span className="line-clamp-1">{property.location}</span>
                </div>

                <div className="flex items-center gap-4 text-slate-500 text-xs mb-4">
                    <span className="flex items-center gap-1">
                        <FaBed className="text-indigo-400" /> {property.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1">
                        <FaBath className="text-indigo-400" /> {property.bathrooms} Baths
                    </span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                        <span className="text-xl font-bold text-indigo-600">${property.rent}</span>
                        <span className="text-slate-400 text-xs">/{property.rentType}</span>
                    </div>
                    <Link
                        href={detailHref}
                        className="bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}