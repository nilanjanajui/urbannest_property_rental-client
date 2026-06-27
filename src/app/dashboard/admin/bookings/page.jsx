"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

function StatusBadge({ status, type }) {
    const payMap = { paid: "bg-green-100 text-green-700", unpaid: "bg-yellow-100 text-yellow-700" };
    const bookMap = { approved: "bg-green-100 text-green-700", rejected: "bg-red-100 text-red-700", pending: "bg-yellow-100 text-yellow-700" };
    const map = type === "payment" ? payMap : bookMap;
    return (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${map[status] || "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
}

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await axiosInstance.get("/bookings/admin");
                setBookings(data.bookings);
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
                <h1 className="text-2xl font-bold text-[#1a1f4e]">All Bookings</h1>
                <p className="text-gray-500 text-sm mt-1">Monitor all booking activity across the platform</p>
            </div>

            {loading ? (
                <div className="bg-white rounded-2xl p-6 animate-pulse space-y-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-14 bg-gray-100 rounded-xl" />)}
                </div>
            ) : bookings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                    <p className="text-gray-400 text-lg">No bookings yet</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#f0f4ff] text-[#1a1f4e] text-xs font-semibold uppercase tracking-wide">
                                    <th className="text-left px-6 py-4">Property</th>
                                    <th className="text-left px-6 py-4">Tenant</th>
                                    <th className="text-left px-6 py-4">Owner</th>
                                    <th className="text-left px-6 py-4">Amount</th>
                                    <th className="text-left px-6 py-4">Booking</th>
                                    <th className="text-left px-6 py-4">Payment</th>
                                    <th className="text-left px-6 py-4">Move-in</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {bookings.map(booking => (
                                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-[#1a1f4e] line-clamp-1">{booking.propertyId?.title}</p>
                                            <p className="text-gray-400 text-xs">{booking.propertyId?.location}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-gray-700">{booking.tenantId?.name}</p>
                                            <p className="text-gray-400 text-xs">{booking.tenantId?.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-gray-700">{booking.ownerId?.name}</p>
                                            <p className="text-gray-400 text-xs">{booking.ownerId?.email}</p>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-[#1a1f4e]">${booking.amount?.toLocaleString()}</td>
                                        <td className="px-6 py-4"><StatusBadge status={booking.bookingStatus} type="booking" /></td>
                                        <td className="px-6 py-4"><StatusBadge status={booking.paymentStatus} type="payment" /></td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">
                                            {new Date(booking.moveInDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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