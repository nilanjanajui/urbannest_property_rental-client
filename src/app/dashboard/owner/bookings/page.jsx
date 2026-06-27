"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import Image from "next/image";

function StatusBadge({ status }) {
    const map = {
        pending: "bg-yellow-100 text-yellow-700",
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
    };
    return (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${map[status] || "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
}

export default function BookingRequests() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await axiosInstance.get("/bookings/owner");
                setBookings(data.bookings);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleStatus = async (id, status) => {
        setActionLoading(`${id}-${status}`);
        try {
            await axiosInstance.patch(`/bookings/${id}/status`, { status });
            setBookings(prev =>
                prev.map(b => b._id === id ? { ...b, bookingStatus: status } : b)
            );
        } catch (err) {
            console.error(err);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1a1f4e]">Booking Requests</h1>
                <p className="text-gray-500 text-sm mt-1">Review and manage tenant booking requests for your properties</p>
            </div>

            {loading ? (
                <div className="bg-white rounded-2xl p-6 animate-pulse space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl" />)}
                </div>
            ) : bookings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                    <p className="text-gray-400 text-lg">No booking requests yet</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#f0f4ff] text-[#1a1f4e] text-xs font-semibold uppercase tracking-wide">
                                    <th className="text-left px-6 py-4">Tenant</th>
                                    <th className="text-left px-6 py-4">Property</th>
                                    <th className="text-left px-6 py-4">Move-in</th>
                                    <th className="text-left px-6 py-4">Amount</th>
                                    <th className="text-left px-6 py-4">Status</th>
                                    <th className="text-left px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {bookings.map(booking => (
                                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-100">
                                                    {booking.tenantId?.photo ? (
                                                        <Image src={booking.tenantId.photo} alt={booking.tenantId.name} fill sizes="32px" className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-[#1a1f4e] flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">
                                                                {booking.tenantId?.name?.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#1a1f4e]">{booking.tenantId?.name}</p>
                                                    <p className="text-gray-400 text-xs">{booking.tenantId?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-[#1a1f4e] line-clamp-1">{booking.propertyId?.title}</p>
                                            <p className="text-gray-400 text-xs">{booking.propertyId?.location}</p>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(booking.moveInDate).toLocaleDateString("en-US", {
                                                month: "short", day: "numeric", year: "numeric",
                                            })}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-[#1a1f4e]">
                                            ${booking.amount?.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={booking.bookingStatus} />
                                        </td>
                                        <td className="px-6 py-4">
                                            {booking.bookingStatus === "pending" ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleStatus(booking._id, "approved")}
                                                        disabled={!!actionLoading}
                                                        className="text-xs bg-green-100 text-green-700 font-medium px-3 py-1.5 rounded-lg hover:bg-green-500 hover:text-white transition-colors disabled:opacity-60"
                                                    >
                                                        {actionLoading === `${booking._id}-approved` ? "..." : "Approve"}
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatus(booking._id, "rejected")}
                                                        disabled={!!actionLoading}
                                                        className="text-xs bg-red-100 text-red-500 font-medium px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors disabled:opacity-60"
                                                    >
                                                        {actionLoading === `${booking._id}-rejected` ? "..." : "Reject"}
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-xs">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}