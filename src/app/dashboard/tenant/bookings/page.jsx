"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";

function StatusBadge({ status, type }) {
    const map = {
        booking: {
            pending: "bg-yellow-100 text-yellow-700",
            approved: "bg-green-100 text-green-700",
            rejected: "bg-red-100 text-red-700",
        },
        payment: {
            unpaid: "bg-red-100 text-red-700",
            paid: "bg-green-100 text-green-700",
        },
    };
    return (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${map[type]?.[status] || "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
}

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
    const [loading, setLoading] = useState(true);

    const fetchBookings = async (page = 1) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get(`/bookings/tenant?page=${page}&limit=5`);
            setBookings(data.bookings);
            setPagination(data.pagination);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const { data } = await axiosInstance.get("/bookings/tenant?page=1&limit=5");
                setBookings(data.bookings);
                setPagination(data.pagination);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1a1f4e]">My Bookings</h1>
                <p className="text-gray-500 text-sm mt-1">Track all your property booking requests</p>
            </div>

            {loading ? (
                <div className="bg-white rounded-2xl p-6 animate-pulse space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl" />)}
                </div>
            ) : bookings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                    <p className="text-gray-400 text-lg">No bookings yet</p>
                    <Link href="/properties" className="mt-4 inline-block text-sm text-[#1a1f4e] underline">
                        Browse properties
                    </Link>
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[#f0f4ff] text-[#1a1f4e] text-xs font-semibold uppercase tracking-wide">
                                        <th className="text-left px-6 py-4">Property</th>
                                        <th className="text-left px-6 py-4">Move-in Date</th>
                                        <th className="text-left px-6 py-4">Amount</th>
                                        <th className="text-left px-6 py-4">Booking Status</th>
                                        <th className="text-left px-6 py-4">Payment</th>
                                        <th className="text-left px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {bookings.map(booking => (
                                        <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                                        {booking.propertyId?.images?.[0] && (
                                                            <Image
                                                                src={booking.propertyId.images[0]}
                                                                alt={booking.propertyId.title}
                                                                fill
                                                                sizes="48px"
                                                                className="object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-[#1a1f4e] line-clamp-1">
                                                            {booking.propertyId?.title || "Property removed"}
                                                        </p>
                                                        <p className="text-gray-400 text-xs line-clamp-1">
                                                            {booking.propertyId?.location}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {new Date(booking.moveInDate).toLocaleDateString("en-US", {
                                                    month: "short", day: "numeric", year: "numeric"
                                                })}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-[#1a1f4e]">
                                                ${booking.amount?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={booking.bookingStatus} type="booking" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={booking.paymentStatus} type="payment" />
                                            </td>
                                            <td className="px-6 py-4">
                                                {booking.paymentStatus === "unpaid" && (
                                                    <Link
                                                        href={`/payment/${booking._id}`}
                                                        className="text-xs bg-amber-400 text-[#1a1f4e] font-semibold px-3 py-1.5 rounded-lg hover:bg-amber-500 transition-colors"
                                                    >
                                                        Pay Now
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {pagination.totalPages > 1 && (
                        <div className="flex items-center justify-between mt-4 text-sm">
                            <p className="text-gray-500">
                                Showing {bookings.length} of {pagination.total} bookings
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => fetchBookings(pagination.page - 1)}
                                    disabled={pagination.page === 1}
                                    className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                                >
                                    ‹ Prev
                                </button>
                                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
                                    <button
                                        key={p}
                                        onClick={() => fetchBookings(p)}
                                        className={`px-3 py-1.5 rounded-lg border transition-colors ${p === pagination.page
                                            ? "bg-[#1a1f4e] text-white border-[#1a1f4e]"
                                            : "border-gray-200 hover:bg-gray-50"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    onClick={() => fetchBookings(pagination.page + 1)}
                                    disabled={pagination.page === pagination.totalPages}
                                    className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                                >
                                    Next ›
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}