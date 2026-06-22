"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaMapMarkerAlt, FaBed, FaBath, FaStar, FaHeart, FaCheck, FaEnvelope, FaCalendarAlt, FaHome } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";
import axiosInstance from "@/lib/axios";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { useAuth } from "@/context/AuthContext";

function StarInput({ value, onChange }) {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                >
                    <FaStar size={22} className={star <= (hover || value) ? "text-amber-400" : "text-gray-200"} />
                </button>
            ))}
        </div>
    );
}

function BookingModal({ property, user, onClose }) {
    const [form, setForm] = useState({ moveInDate: "", contactNumber: "", additionalNotes: "" });

    const handleSubmit = () => {
        if (!form.moveInDate || !form.contactNumber) {
            alert("Please fill in the required fields.");
            return;
        }

        alert("Booking confirmed! Payment integration coming in the next update.");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-[#1a1f4e] text-lg">Book Property</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="bg-[#f0f4ff] rounded-xl p-4">
                        <p className="text-xs text-gray-400 mb-1">Booking as</p>
                        <p className="text-sm font-semibold text-[#1a1f4e]">{user?.name}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 font-medium mb-1.5 block">Move-in Date *</label>
                        <input
                            type="date"
                            value={form.moveInDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setForm({ ...form, moveInDate: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a1f4e] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 font-medium mb-1.5 block">Contact Number *</label>
                        <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={form.contactNumber}
                            onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a1f4e] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 font-medium mb-1.5 block">Additional Notes</label>
                        <textarea
                            placeholder="Any special requirements..."
                            value={form.additionalNotes}
                            onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
                            rows={3}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a1f4e] transition-colors resize-none"
                        />
                    </div>

                    <div className="bg-[#f0f4ff] rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">Property</p>
                            <p className="text-sm font-semibold text-[#1a1f4e] line-clamp-1">{property?.title}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400">Rent</p>
                            <p className="text-sm font-bold text-[#1a1f4e]">${property?.rent?.toLocaleString()}/{property?.rentType}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 flex gap-3">
                    <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="flex-1 bg-[#1a1f4e] hover:bg-[#2a2f60] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
}

function PropertyDetailsContent() {
    const { id } = useParams();
    const { user } = useAuth();

    const [property, setProperty] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showBooking, setShowBooking] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [reviewForm, setReviewForm] = useState({ rating: 0, comment: "" });
    const [submitting, setSubmitting] = useState(false);

    const fetchReviews = useCallback(async () => {
        try {
            const res = await axiosInstance.get(`/reviews?propertyId=${id}`);
            setReviews(res.data.reviews || []);
            setAvgRating(res.data.avgRating || 0);
        } catch (err) {
            console.error(err);
        }
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [propRes, reviewRes] = await Promise.all([
                    axiosInstance.get(`/properties/${id}`),
                    axiosInstance.get(`/reviews?propertyId=${id}`),
                ]);
                setProperty(propRes.data.property);
                setReviews(reviewRes.data.reviews || []);
                setAvgRating(reviewRes.data.avgRating || 0);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleReviewSubmit = async () => {
        if (!reviewForm.rating) return alert("Please select a rating.");
        if (!reviewForm.comment.trim()) return alert("Please write a comment.");
        setSubmitting(true);
        try {
            await axiosInstance.post("/reviews", {
                propertyId: id,
                rating: reviewForm.rating,
                comment: reviewForm.comment,
            });
            setReviewForm({ rating: 0, comment: "" });
            // refetch reviews after submission
            const res = await axiosInstance.get(`/reviews?propertyId=${id}`);
            setReviews(res.data.reviews || []);
            setAvgRating(res.data.avgRating || 0);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to submit review.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#1a1f4e] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-400">Property not found.</p>
            </div>
        );
    }

    const images = property.images || [];
    const mainImage = images[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop";
    const sideImage1 = images[1] || "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600&auto=format&fit=crop";
    const sideImage2 = images[2] || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop";

    const stats = [
        { label: "BEDROOMS", value: property.bedrooms, icon: FaBed },
        { label: "BATHROOMS", value: property.bathrooms, icon: FaBath },
        { label: "SQ. FT.", value: property.size || "N/A", icon: FaHome },
        { label: "RENT TYPE", value: property.rentType?.toUpperCase(), icon: FaCalendarAlt },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Gallery */}
            <div className="grid grid-cols-2 h-120 gap-0.5">
                <div className="overflow-hidden relative">
                    <Image src={mainImage} alt={property.title} fill className="object-cover" />
                </div>
                <div className="grid grid-rows-2 gap-0.5 relative">
                    <div className="overflow-hidden relative">
                        <Image src={sideImage1} alt={property.title} fill className="object-cover" />
                    </div>
                    <div className="overflow-hidden relative">
                        <Image src={sideImage2} alt={property.title} fill className="object-cover" />
                        {images.length > 0 && (
                            <button className="absolute bottom-4 right-4 bg-white text-[#1a1f4e] text-xs font-semibold px-4 py-2 rounded-lg shadow flex items-center gap-2 hover:bg-gray-50 transition-colors">
                                <BsArrowsFullscreen size={11} />
                                View {images.length} Photos
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left column */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Title */}
                        <div>
                            <span className="bg-amber-400 text-[#1a1f4e] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">
                                {property.type}
                            </span>
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-[#1a1f4e] mb-2">{property.title}</h1>
                                    <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                                        <FaMapMarkerAlt size={13} className="text-[#1a1f4e]" />
                                        <span>{property.location}</span>
                                    </div>
                                </div>
                                <div className="shrink-0 text-right">
                                    <p className="text-3xl font-bold text-[#1a1f4e]">${property.rent.toLocaleString()}</p>
                                    <p className="text-gray-400 text-xs">per {property.rentType}</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {stats.map((s, i) => (
                                <div key={i} className="border border-gray-200 rounded-xl p-4 text-center">
                                    <s.icon size={16} className="text-[#1a1f4e] mx-auto mb-2" />
                                    <p className="text-[#1a1f4e] font-bold text-base">{s.value}</p>
                                    <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* About */}
                        <div>
                            <h2 className="text-xl font-bold text-[#1a1f4e] mb-4">About this space</h2>
                            <p className="text-gray-500 leading-relaxed text-sm">{property.description}</p>
                        </div>

                        {/* Amenities */}
                        {property.amenities?.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold text-[#1a1f4e] mb-4">Premium Amenities</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {property.amenities.map((amenity, i) => (
                                        <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3.5 text-sm text-gray-700">
                                            <div className="w-8 h-8 bg-[#f0f4ff] rounded-lg flex items-center justify-center shrink-0">
                                                <FaCheck size={11} className="text-[#1a1f4e]" />
                                            </div>
                                            {amenity}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Reviews */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-[#1a1f4e]">Guest Experiences</h2>
                                {reviews.length > 0 && (
                                    <div className="flex items-center gap-1.5">
                                        <FaStar className="text-amber-400" size={14} />
                                        <span className="font-semibold text-gray-700 text-sm">{avgRating}</span>
                                        <span className="text-gray-400 text-sm">({reviews.length} Reviews)</span>
                                    </div>
                                )}
                            </div>

                            {reviews.length === 0 ? (
                                <div className="bg-gray-50 rounded-2xl py-12 text-center">
                                    <p className="text-gray-400 text-sm">No reviews yet. Be the first to share your experience!</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {reviews.map((review, i) => (
                                        <div key={i} className="bg-[#f0f4ff] rounded-2xl p-5">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-[#1a1f4e] rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                                                    {review.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#1a1f4e] text-sm">{review.name}</p>
                                                    <p className="text-gray-400 text-xs">
                                                        {new Date(review.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-0.5 mb-3">
                                                {[...Array(5)].map((_, j) => (
                                                    <FaStar key={j} size={11} className={j < review.rating ? "text-amber-400" : "text-gray-200"} />
                                                ))}
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed italic">&ldquo;{review.comment}&rdquo;</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Review form — tenants only */}
                        {user?.role === "tenant" && (
                            <div className="border border-gray-200 rounded-2xl p-6">
                                <h2 className="text-lg font-bold text-[#1a1f4e] mb-5">Share your experience</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-500 font-medium mb-2 block">Your Rating</label>
                                        <StarInput value={reviewForm.rating} onChange={(rating) => setReviewForm(p => ({ ...p, rating }))} />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-medium mb-1.5 block">Comment</label>
                                        <textarea
                                            placeholder="Tell us about your stay..."
                                            value={reviewForm.comment}
                                            onChange={(e) => setReviewForm(p => ({ ...p, comment: e.target.value }))}
                                            rows={4}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#1a1f4e] transition-colors resize-none"
                                        />
                                    </div>
                                    <button
                                        onClick={handleReviewSubmit}
                                        disabled={submitting}
                                        className="bg-[#1a1f4e] hover:bg-[#2a2f60] text-white px-7 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
                                    >
                                        {submitting ? "Submitting..." : "Submit Review"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-4">
                        <div className="lg:sticky lg:top-24 space-y-4">

                            {/* Price + Buttons */}
                            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Total per month</p>
                                <p className="text-3xl font-bold text-[#1a1f4e] mb-5">
                                    ${property.rent.toLocaleString()}.00
                                </p>
                                <button
                                    onClick={() => setShowBooking(true)}
                                    className="w-full bg-[#1a1f4e] hover:bg-[#2a2f60] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors mb-3"
                                >
                                    <FaCalendarAlt size={12} /> Book Property
                                </button>
                                <button
                                    onClick={() => setFavorited(!favorited)}
                                    className={`w-full border py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${favorited
                                        ? "border-red-300 text-red-500 bg-red-50"
                                        : "border-gray-200 text-gray-700 hover:border-[#1a1f4e] hover:text-[#1a1f4e]"
                                        }`}
                                >
                                    <FaHeart size={12} />
                                    {favorited ? "Added to Favorites" : "Add to Favorites"}
                                </button>
                                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                                        <FaCheck size={10} className="text-emerald-500" /> Verified Listing
                                    </span>
                                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                                        <FaCheck size={10} className="text-emerald-500" /> Secure Payment
                                    </span>
                                </div>
                            </div>

                            {/* Owner Card */}
                            {property.ownerId && (
                                <div className="bg-[#1a1f4e] rounded-2xl p-6 text-white">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg shrink-0">
                                            {property.ownerId.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold">{property.ownerId.name}</p>
                                            <p className="text-indigo-300 text-xs">Property Owner</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-indigo-200 text-xs mb-4">
                                        <FaEnvelope size={11} />
                                        <span className="truncate">{property.ownerId.email}</span>
                                    </div>
                                    <button className="w-full border border-white/30 hover:bg-white/10 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                                        <FaEnvelope size={12} /> Message Host
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showBooking && (
                <BookingModal property={property} user={user} onClose={() => setShowBooking(false)} />
            )}
        </div>
    );
}

export default function PropertyDetailsPage() {
    return (
        <PrivateRoute allowedRoles={["tenant", "owner", "admin"]}>
            <PropertyDetailsContent />
        </PrivateRoute>
    );
}