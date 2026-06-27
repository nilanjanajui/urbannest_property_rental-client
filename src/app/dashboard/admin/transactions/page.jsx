"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

export default function AdminTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await axiosInstance.get("/transactions");
                setTransactions(data.transactions);
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
                <h1 className="text-2xl font-bold text-[#1a1f4e]">Transactions</h1>
                <p className="text-gray-500 text-sm mt-1">All successful payment records on the platform</p>
            </div>

            {loading ? (
                <div className="bg-white rounded-2xl p-6 animate-pulse space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-14 bg-gray-100 rounded-xl" />)}
                </div>
            ) : transactions.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                    <p className="text-gray-400 text-lg">No transactions yet</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#f0f4ff] text-[#1a1f4e] text-xs font-semibold uppercase tracking-wide">
                                    <th className="text-left px-6 py-4">Transaction ID</th>
                                    <th className="text-left px-6 py-4">Property</th>
                                    <th className="text-left px-6 py-4">Tenant</th>
                                    <th className="text-left px-6 py-4">Owner</th>
                                    <th className="text-left px-6 py-4">Amount</th>
                                    <th className="text-left px-6 py-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {transactions.map(tx => (
                                    <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                {tx.transactionId?.slice(0, 20)}...
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-[#1a1f4e] line-clamp-1">{tx.propertyId?.title}</p>
                                            <p className="text-gray-400 text-xs">{tx.propertyId?.location}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-gray-700">{tx.tenantId?.name}</p>
                                            <p className="text-gray-400 text-xs">{tx.tenantId?.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-gray-700">{tx.ownerId?.name}</p>
                                            <p className="text-gray-400 text-xs">{tx.ownerId?.email}</p>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-green-600">${tx.amount?.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">
                                            {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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