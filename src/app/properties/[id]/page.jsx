"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
    FaMapMarkerAlt,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaCalendarAlt,
    FaStar,
    FaHeart,
    FaRegHeart,
    FaCheck,
    FaTimes,
    FaShieldAlt,
    FaPhoneAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/auth/PrivateRoute";

// ---------- StarInput ----------
function StarInput({ value, onChange }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                >
                    <FaStar
                        className={`text-2xl transition-colors ${star <= (hovered || value) ? "text-amber-400" : "text-gray-300"
                            }`}
                    />
                </button>
            ))}
        </div>
    );
}

// ---------- BookingModal ----------
function BookingModal({ property, user, onClose }) {
    const router = useRouter();
    const [moveInDate, setMoveInDate] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!moveInDate || !contactNumber) {
            setError("Move-in date and contact number are required.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const { data } = await axiosInstance.post("/bookings", {
                propertyId: property._id,
                moveInDate,
                contactNumber,
                additionalNotes,
            });
            onClose();
            router.push(`/payment/${data.booking._id}`);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create booking. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#1a1f4e]">Book Property</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <FaTimes className="text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    {/* Property Summary */}
                    <div className="bg-[#f0f4ff] rounded-xl p-4 flex gap-3">
                        {property.images?.[0] && (
                            <Image
                                src={property.images[0]}
                                alt={property.title}
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded-lg object-cover shrink-0"
                            />
                        )}
                        <div>
                            <p className="font-semibold text-[#1a1f4e] text-sm">{property.title}</p>
                            <p className="text-gray-500 text-xs">{property.location}</p>
                            <p className="text-amber-600 font-bold text-sm mt-1">
                                ${property.rent}/{property.rentType}
                            </p>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-400 font-medium mb-1">Booking as</p>
                        <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>

                    {/* Move-in Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Move-in Date <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                                type="date"
                                value={moveInDate}
                                onChange={(e) => setMoveInDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a1f4e] transition-colors"
                            />
                        </div>
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Contact Number <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                                type="tel"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                placeholder="Your phone number"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a1f4e] transition-colors"
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Additional Notes
                        </label>
                        <textarea
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                            rows={3}
                            placeholder="Any special requests or notes for the owner..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a1f4e] transition-colors resize-none"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                            {error}
                        </p>
                    )}

                    {/* Amount */}
                    <div className="flex justify-between items-center bg-amber-50 rounded-xl p-4">
                        <span className="text-sm text-gray-600">Total Amount</span>
                        <span className="text-xl font-bold text-[#1a1f4e]">${property.rent}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 py-3 bg-[#1a1f4e] text-white rounded-xl text-sm font-medium hover:bg-[#141840] transition-colors disabled:opacity-60"
                        >
                            {loading ? "Creating booking..." : "Confirm & Pay"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// ---------- Main Page ----------
function PropertyDetailPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const [property, setProperty] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewError, setReviewError] = useState("");
    const [reviewSuccess, setReviewSuccess] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [favoriteError, setFavoriteError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requests = [
                    axiosInstance.get(`/properties/${id}`),
                    axiosInstance.get(`/reviews?propertyId=${id}`),
                ];
                if (user?.role === "tenant") {
                    requests.push(axiosInstance.get(`/favorites/check?propertyId=${id}`));
                }
                const results = await Promise.all(requests);
                setProperty(results[0].data.property);
                setReviews(results[1].data.reviews);
                setAvgRating(results[1].data.avgRating || 0);
                if (user?.role === "tenant" && results[2]) {
                    setIsFavorite(results[2].data.isFavorite);
                    setFavoriteId(results[2].data.favoriteId);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, user]);

    const handleReviewSubmit = async () => {
        if (!rating) { setReviewError("Please select a rating."); return; }
        if (!comment.trim()) { setReviewError("Please write a comment."); return; }
        setReviewLoading(true);
        setReviewError("");
        setReviewSuccess(false);
        try {
            await axiosInstance.post("/reviews", { propertyId: id, rating, comment });
            setReviewSuccess(true);
            setRating(0);
            setComment("");
            const { data } = await axiosInstance.get(`/reviews?propertyId=${id}`);
            setReviews(data.reviews);
            setAvgRating(data.avgRating || 0);
        } catch (err) {
            setReviewError(err.response?.data?.message || "Failed to submit review.");
        } finally {
            setReviewLoading(false);
        }
    };

    const handleFavoriteToggle = async () => {
        if (favoriteLoading) return;
        setFavoriteLoading(true);
        setFavoriteError("");
        try {
            if (isFavorite && favoriteId) {
                await axiosInstance.delete(`/favorites/${favoriteId}`);
                setIsFavorite(false);
                setFavoriteId(null);
            } else {
                const { data } = await axiosInstance.post("/favorites", { propertyId: id });
                setIsFavorite(true);
                setFavoriteId(data.favorite._id);
            }
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to update favorites";
            setFavoriteError(msg);
            console.error("Favorite toggle failed:", err.response?.status, msg);
        } finally {
            setFavoriteLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#1a1f4e] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
                <p className="text-gray-500 text-lg">Property not found.</p>
            </div>
        );
    }

    const images = property.images || [];

    return (
        <>
            {showModal && (
                <BookingModal
                    property={property}
                    user={user}
                    onClose={() => setShowModal(false)}
                />
            )}

            <div className="min-h-screen bg-[#f0f4ff]">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Gallery */}
                    <div className="grid grid-cols-3 gap-3 rounded-2xl overflow-hidden h-105 mb-8">
                        <div className="col-span-2 relative">
                            {images[0] ? (
                                <Image
                                    src={images[0]}
                                    alt={property.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 66vw"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400">No image</span>
                                </div>
                            )}
                            {images.length > 3 && (
                                <button className="absolute bottom-4 right-4 bg-white text-[#1a1f4e] px-4 py-2 rounded-lg text-sm font-medium shadow">
                                    View {images.length} Photos
                                </button>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="relative h-1/2">
                                {images[1] ? (
                                    <Image
                                        src={images[1]}
                                        alt=""
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover rounded-tr-2xl"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 rounded-tr-2xl" />
                                )}
                            </div>
                            <div className="relative h-1/2">
                                {images[2] ? (
                                    <Image
                                        src={images[2]}
                                        alt=""
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover rounded-br-2xl"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 rounded-br-2xl" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content + Sidebar */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Header */}
                            <div>
                                <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                                    {property.type}
                                </span>
                                <h1 className="text-3xl font-bold text-[#1a1f4e] mt-3">{property.title}</h1>
                                <div className="flex items-center gap-2 text-gray-500 mt-2">
                                    <FaMapMarkerAlt className="text-sm" />
                                    <span>{property.location}</span>
                                </div>
                                <p className="text-3xl font-bold text-[#1a1f4e] mt-3">
                                    ${property.rent}
                                    <span className="text-base font-normal text-gray-400">/{property.rentType}</span>
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { icon: FaBed, label: "Bedrooms", value: property.bedrooms },
                                    { icon: FaBath, label: "Bathrooms", value: property.bathrooms },
                                    {
                                        icon: FaRulerCombined,
                                        label: "Size",
                                        value: property.size ? `${property.size} sq ft` : "N/A",
                                    },
                                    { icon: FaCalendarAlt, label: "Rent Type", value: property.rentType },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div
                                        key={label}
                                        className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100"
                                    >
                                        <Icon className="mx-auto text-[#1a1f4e] text-xl mb-2" />
                                        <p className="text-lg font-bold text-[#1a1f4e] capitalize">{value}</p>
                                        <p className="text-xs text-gray-400">{label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Description */}
                            {property.description && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h2 className="text-xl font-bold text-[#1a1f4e] mb-3">About this space</h2>
                                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                                </div>
                            )}

                            {/* Amenities */}
                            {property.amenities?.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h2 className="text-xl font-bold text-[#1a1f4e] mb-4">Amenities</h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        {property.amenities.map((amenity, i) => (
                                            <div key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                                                <FaCheck className="text-green-500 shrink-0" />
                                                <span>{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Reviews */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-[#1a1f4e]">Reviews</h2>
                                    <div className="flex items-center gap-2">
                                        <FaStar className="text-amber-400" />
                                        <span className="font-bold text-[#1a1f4e]">{avgRating.toFixed(1)}</span>
                                        <span className="text-gray-400 text-sm">({reviews.length} reviews)</span>
                                    </div>
                                </div>

                                {reviews.length > 0 ? (
                                    <div className="space-y-4 mb-6">
                                        {reviews.map((review) => (
                                            <div key={review._id} className="border-b border-gray-100 pb-4 last:border-0">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-[#1a1f4e] flex items-center justify-center text-white text-sm font-bold shrink-0">
                                                        {review.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-semibold text-gray-800 text-sm">{review.name}</p>
                                                            <span className="text-xs text-gray-400">
                                                                {new Date(review.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-400 mb-1">{review.email}</p>
                                                        <div className="flex gap-0.5 mb-1">
                                                            {[1, 2, 3, 4, 5].map((s) => (
                                                                <FaStar
                                                                    key={s}
                                                                    className={`text-xs ${s <= review.rating ? "text-amber-400" : "text-gray-200"
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <p className="text-sm text-gray-600">{review.comment}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm mb-6">No reviews yet. Be the first!</p>
                                )}

                                {user?.role === "tenant" && (
                                    <div className="border-t border-gray-100 pt-5">
                                        <h3 className="font-semibold text-[#1a1f4e] mb-3">Write a Review</h3>
                                        <StarInput value={rating} onChange={setRating} />
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            rows={3}
                                            placeholder="Share your experience..."
                                            className="w-full mt-3 px-4 py-3 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:border-[#1a1f4e] resize-none"
                                        />
                                        {reviewError && (
                                            <p className="text-red-500 text-xs mt-1">{reviewError}</p>
                                        )}
                                        {reviewSuccess && (
                                            <p className="text-green-600 text-xs mt-1">Review submitted!</p>
                                        )}
                                        <button
                                            onClick={handleReviewSubmit}
                                            disabled={reviewLoading}
                                            className="mt-3 px-6 py-2.5 bg-[#1a1f4e] text-white rounded-xl text-sm font-medium hover:bg-[#141840] transition-colors disabled:opacity-60"
                                        >
                                            {reviewLoading ? "Submitting..." : "Submit Review"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sticky Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-6 space-y-4">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <p className="text-3xl font-bold text-[#1a1f4e]">
                                        ${property.rent}
                                        <span className="text-base font-normal text-gray-400">/{property.rentType}</span>
                                    </p>
                                    <div className="flex gap-3 mt-4">
                                        {user?.role === "tenant" && (
                                            <button
                                                onClick={() => setShowModal(true)}
                                                className="flex-1 bg-[#1a1f4e] text-white py-3 rounded-xl font-semibold hover:bg-[#141840] transition-colors"
                                            >
                                                Book Property
                                            </button>
                                        )}
                                        <button
                                            onClick={handleFavoriteToggle}
                                            disabled={favoriteLoading || user?.role !== "tenant"}
                                            className={`p-3 rounded-xl border-2 transition-colors ${isFavorite
                                                ? "border-red-200 bg-red-50 text-red-500"
                                                : "border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400"
                                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                        >
                                            {isFavorite ? <FaHeart /> : <FaRegHeart />}
                                        </button>
                                        {favoriteError && (
                                            <p className="text-red-500 text-xs mt-1">{favoriteError}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FaShieldAlt className="text-green-500" />
                                        <span>Verified Property Listing</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FaCheck className="text-blue-500" />
                                        <span>Secure Payment via Stripe</span>
                                    </div>
                                </div>

                                {property.ownerId && (
                                    <div className="bg-[#1a1f4e] rounded-2xl p-5 text-white">
                                        <p className="text-xs text-blue-200 font-medium mb-3">Property Owner</p>
                                        <div className="flex items-center gap-3">
                                            {property.ownerId.photo ? (
                                                <Image
                                                    src={property.ownerId.photo}
                                                    alt={property.ownerId.name}
                                                    width={48}
                                                    height={48}
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                                                    {property.ownerId.name?.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold">{property.ownerId.name}</p>
                                                <p className="text-xs text-blue-200">{property.ownerId.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function Page() {
    return (
        <PrivateRoute allowedRoles={["tenant", "owner", "admin"]}>
            <PropertyDetailPage />
        </PrivateRoute>
    );
}