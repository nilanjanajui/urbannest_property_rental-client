"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaCheckCircle, FaHome, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import axiosInstance from "@/lib/axios";

function SuccessContent() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            if (!bookingId) {
                setLoading(false);
                return;
            }
            try {
                const { data } = await axiosInstance.get(`/bookings/${bookingId}`);
                setBooking(data.booking);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [bookingId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#1a1f4e] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const property = booking?.propertyId;

    return (
        <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center py-12 px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="text-5xl text-green-500" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-[#1a1f4e] mb-2">Payment Successful!</h1>
                <p className="text-gray-500 text-sm mb-8">
                    Your booking has been confirmed. The owner will review your request shortly.
                </p>

                {booking && (
                    <div className="bg-[#f0f4ff] rounded-xl p-5 text-left space-y-3 mb-8">
                        {property?.title && (
                            <div className="flex items-start gap-3">
                                <FaHome className="text-[#1a1f4e] mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">Property</p>
                                    <p className="text-sm font-semibold text-gray-800">{property.title}</p>
                                </div>
                            </div>
                        )}
                        {property?.location && (
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-[#1a1f4e] mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">Location</p>
                                    <p className="text-sm font-semibold text-gray-800">{property.location}</p>
                                </div>
                            </div>
                        )}
                        <div className="flex items-start gap-3">
                            <FaCalendarAlt className="text-[#1a1f4e] mt-0.5 shrink-0" />
                            <div>
                                <p className="text-xs text-gray-400 font-medium">Move-in Date</p>
                                <p className="text-sm font-semibold text-gray-800">
                                    {new Date(booking.moveInDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                            <span className="text-sm text-gray-500">Amount Paid</span>
                            <span className="text-lg font-bold text-[#1a1f4e]">${booking.amount}</span>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <Link
                        href="/dashboard/tenant/bookings"
                        className="w-full bg-[#1a1f4e] text-white py-3 rounded-xl font-semibold hover:bg-[#141840] transition-colors block"
                    >
                        View My Bookings
                    </Link>
                    <Link
                        href="/properties"
                        className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors block"
                    >
                        Browse More Properties
                    </Link>
                </div>
            </div>
        </div>
    );
}

// useSearchParams requires Suspense in Next.js App Router
export default function SuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#1a1f4e] border-t-transparent rounded-full animate-spin" />
                </div>
            }
        >
            <SuccessContent />
        </Suspense>
    );
}