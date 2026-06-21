"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaSearch, FaMapMarkerAlt, FaStar, FaHeart, FaTh, FaList } from "react-icons/fa";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

const BADGES = [
    { label: "Featured", cls: "bg-[#1a1f4e] text-white" },
    { label: "New", cls: "bg-amber-400 text-[#1a1f4e]" },
    { label: "Exclusive", cls: "bg-emerald-600 text-white" },
];

function ListingCard({ property, index }) {
    const { user } = useAuth();
    const href = user ? `/properties/${property._id}` : "/login";
    const badge = BADGES[index % 3];

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="relative h-52 overflow-hidden">
                <Image
                    src={property.images?.[0] || "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop"}
                    alt={property.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${badge.cls}`}>
                    {badge.label}
                </span>
                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors">
                    <FaHeart size={12} className="text-gray-300" />
                </button>
            </div>
            <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-[#1a1f4e] text-sm line-clamp-2 flex-1">{property.title}</h3>
                    <div className="flex items-center gap-1 shrink-0">
                        <FaStar size={11} className="text-amber-400" />
                        <span className="text-xs font-semibold text-gray-600">4.9</span>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-4">
                    <FaMapMarkerAlt size={10} className="text-[#1a1f4e]" />
                    <span className="line-clamp-1">{property.location}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-[#1a1f4e] font-bold text-base">${property.rent.toLocaleString()}</span>
                        <span className="text-gray-400 text-xs">/{property.rentType}</span>
                    </div>
                    <Link href={href} className="bg-[#1a1f4e] hover:bg-[#2a2f60] text-white text-xs px-4 py-2 rounded-lg font-semibold transition-colors">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

function Pagination({ page, totalPages, onPageChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const getPages = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        const pages = [1];
        if (page > 3) pages.push("...");
        for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
        if (page < totalPages - 2) pages.push("...");
        pages.push(totalPages);
        return pages;
    };

    const Btn = ({ children, active, disabled, onClick }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors flex items-center justify-center ${active
                    ? "bg-[#1a1f4e] text-white border border-[#1a1f4e]"
                    : disabled
                        ? "border border-gray-200 bg-white text-gray-300 cursor-not-allowed"
                        : "border border-gray-200 bg-white text-gray-600 hover:bg-[#1a1f4e] hover:text-white hover:border-[#1a1f4e]"
                }`}
        >
            {children}
        </button>
    );

    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            <Btn disabled={page === 1} onClick={() => onPageChange(page - 1)}>‹</Btn>
            {getPages().map((p, i) =>
                p === "..." ? (
                    <span key={i} className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm">...</span>
                ) : (
                    <Btn key={i} active={p === page} onClick={() => onPageChange(p)}>{p}</Btn>
                )
            )}
            <Btn disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>›</Btn>
        </div>
    );
}

function PropertiesContent() {
    const searchParams = useSearchParams();

    const [properties, setProperties] = useState([]);
    const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("grid");

    const [inputSearch, setInputSearch] = useState(searchParams.get("search") || "");
    const [inputType, setInputType] = useState(searchParams.get("type") || "");
    const [inputSort, setInputSort] = useState("price_asc");

    const [activeFilters, setActiveFilters] = useState({
        search: searchParams.get("search") || "",
        type: searchParams.get("type") || "",
        sort: "price_asc",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        page: 1,
    });

    const fetchProperties = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (activeFilters.search) params.set("search", activeFilters.search);
            if (activeFilters.type) params.set("type", activeFilters.type);
            if (activeFilters.sort) params.set("sort", activeFilters.sort);
            if (activeFilters.minPrice) params.set("minPrice", activeFilters.minPrice);
            if (activeFilters.maxPrice) params.set("maxPrice", activeFilters.maxPrice);
            params.set("page", activeFilters.page);
            params.set("limit", 9);
            const res = await axiosInstance.get(`/properties?${params.toString()}`);
            setProperties(res.data.properties || []);
            setPagination(res.data.pagination || { total: 0, page: 1, totalPages: 1 });
        } catch (err) {
            console.error(err);
            setProperties([]);
        } finally {
            setLoading(false);
        }
    }, [activeFilters]);

    useEffect(() => { fetchProperties(); }, [fetchProperties]);

    const handleSearch = () => {
        setActiveFilters(prev => ({ ...prev, search: inputSearch, type: inputType, sort: inputSort, page: 1 }));
    };

    const handlePageChange = (page) => {
        setActiveFilters(prev => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-[#f0f4ff]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-[#1a1f4e] mb-8">
                    Discover Exceptional Living
                </h1>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="text-xs text-gray-400 font-medium mb-1.5 block">Location</label>
                            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#1a1f4e] transition-colors">
                                <FaMapMarkerAlt size={13} className="text-[#1a1f4e] shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Where would you like to live?"
                                    value={inputSearch}
                                    onChange={(e) => setInputSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    className="text-sm text-gray-700 focus:outline-none w-full placeholder-gray-300 bg-transparent"
                                />
                            </div>
                        </div>

                        <div className="md:w-44">
                            <label className="text-xs text-gray-400 font-medium mb-1.5 block">Property Type</label>
                            <select
                                value={inputType}
                                onChange={(e) => setInputType(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a1f4e] bg-white transition-colors"
                            >
                                <option value="">All Types</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                                <option value="studio">Studio</option>
                                <option value="office">Office</option>
                                <option value="shop">Shop</option>
                            </select>
                        </div>

                        <div className="md:w-52">
                            <label className="text-xs text-gray-400 font-medium mb-1.5 block">Sort By</label>
                            <select
                                value={inputSort}
                                onChange={(e) => setInputSort(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a1f4e] bg-white transition-colors"
                            >
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={handleSearch}
                                className="w-full md:w-auto bg-[#1a1f4e] hover:bg-[#2a2f60] text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                            >
                                <FaSearch size={12} /> Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#1a1f4e]">
                        Approved Listings{" "}
                        <span className="font-normal text-gray-400 text-base">({pagination.total} properties)</span>
                    </h2>
                    <div className="flex gap-1.5">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2.5 rounded-lg border transition-colors ${viewMode === "grid" ? "bg-[#1a1f4e] text-white border-[#1a1f4e]" : "bg-white text-gray-400 border-gray-200"}`}
                        >
                            <FaTh size={13} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2.5 rounded-lg border transition-colors ${viewMode === "list" ? "bg-[#1a1f4e] text-white border-[#1a1f4e]" : "bg-white text-gray-400 border-gray-200"}`}
                        >
                            <FaList size={13} />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(9)].map((_, i) => <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />)}
                    </div>
                ) : properties.length === 0 ? (
                    <div className="bg-white rounded-2xl py-24 text-center border border-gray-100">
                        <p className="text-gray-400 text-sm">No properties found. Try adjusting your search criteria.</p>
                    </div>
                ) : (
                    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                        {properties.map((property, i) => (
                            <motion.div
                                key={property._id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                            >
                                <ListingCard property={property} index={i} />
                            </motion.div>
                        ))}
                    </div>
                )}

                <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default function PropertiesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#1a1f4e] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <PropertiesContent />
        </Suspense>
    );
}