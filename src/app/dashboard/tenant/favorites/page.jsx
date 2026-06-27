"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaMapMarkerAlt } from "react-icons/fa";

export default function MyFavorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removing, setRemoving] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const { data } = await axiosInstance.get("/favorites/mine");
                setFavorites(data.favorites);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    const handleRemove = async (favoriteId) => {
        setRemoving(favoriteId);
        try {
            await axiosInstance.delete(`/favorites/${favoriteId}`);
            setFavorites(prev => prev.filter(f => f._id !== favoriteId));
        } catch (err) {
            console.error(err);
        } finally {
            setRemoving(null);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1a1f4e]">My Favorites</h1>
                <p className="text-gray-500 text-sm mt-1">Properties you have saved</p>
            </div>

            {loading ? (
                <div className="bg-white rounded-2xl p-6 animate-pulse space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl" />)}
                </div>
            ) : favorites.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                    <p className="text-gray-400 text-lg">No favorites saved yet</p>
                    <Link href="/properties" className="mt-4 inline-block text-sm text-[#1a1f4e] underline">
                        Browse properties
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#f0f4ff] text-[#1a1f4e] text-xs font-semibold uppercase tracking-wide">
                                    <th className="text-left px-6 py-4">Property</th>
                                    <th className="text-left px-6 py-4">Location</th>
                                    <th className="text-left px-6 py-4">Rent</th>
                                    <th className="text-left px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {favorites.map(fav => {
                                    const property = fav.propertyId;
                                    if (!property) return null;
                                    return (
                                        <tr key={fav._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                                        {property.images?.[0] && (
                                                            <Image
                                                                src={property.images[0]}
                                                                alt={property.title}
                                                                fill
                                                                sizes="48px"
                                                                className="object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <p className="font-semibold text-[#1a1f4e] line-clamp-1">
                                                        {property.title}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <FaMapMarkerAlt size={10} className="text-[#1a1f4e] shrink-0" />
                                                    <span className="line-clamp-1">{property.location}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-[#1a1f4e]">${property.rent?.toLocaleString()}</span>
                                                <span className="text-gray-400 text-xs">/{property.rentType}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/properties/${property._id}`}
                                                        className="text-xs bg-[#1a1f4e] text-white px-3 py-1.5 rounded-lg hover:bg-[#141840] transition-colors"
                                                    >
                                                        View
                                                    </Link>
                                                    <button
                                                        onClick={() => handleRemove(fav._id)}
                                                        disabled={removing === fav._id}
                                                        className="text-xs bg-red-50 text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center gap-1"
                                                    >
                                                        <FaTrash size={10} />
                                                        {removing === fav._id ? "..." : "Remove"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}