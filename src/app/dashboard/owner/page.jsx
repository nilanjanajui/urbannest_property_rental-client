"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { FaDollarSign, FaBuilding, FaCalendarAlt } from "react-icons/fa";

function SummaryCard({ title, value, icon: Icon, bgColor }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor}`}>
                <Icon size={20} className="text-white" />
            </div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-bold text-[#1a1f4e]">{value}</p>
            </div>
        </div>
    );
}

export default function OwnerAnalytics() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const { data: res } = await axiosInstance.get("/analytics/owner");
                setData(res);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white rounded-2xl" />)}
                </div>
                <div className="h-80 bg-white rounded-2xl" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1a1f4e]">Analytics</h1>
                <p className="text-gray-500 text-sm mt-1">Overview of your rental business performance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <SummaryCard
                    title="Total Earnings"
                    value={`$${data?.totalEarnings?.toLocaleString() || 0}`}
                    icon={FaDollarSign}
                    bgColor="bg-green-500"
                />
                <SummaryCard
                    title="Total Properties"
                    value={data?.totalProperties || 0}
                    icon={FaBuilding}
                    bgColor="bg-[#1a1f4e]"
                />
                <SummaryCard
                    title="Approved Bookings"
                    value={data?.totalBookings || 0}
                    icon={FaCalendarAlt}
                    bgColor="bg-amber-400"
                />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#1a1f4e] mb-6">Monthly Earnings — Last 12 Months</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data?.monthlyEarnings || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} tickFormatter={v => `$${v}`} />
                        <Tooltip formatter={value => [`$${value}`, "Earnings"]} />
                        <Line
                            type="monotone"
                            dataKey="earnings"
                            stroke="#F59E0B"
                            strokeWidth={2.5}
                            dot={{ fill: "#F59E0B", strokeWidth: 0, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}