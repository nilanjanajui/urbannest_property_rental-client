"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
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

function RejectModal({ property, onConfirm, onClose, loading }) {
    const [feedback, setFeedback] = useState("");
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                <h2 className="text-lg font-bold text-[#1a1f4e] mb-1">Reject Property</h2>
                <p className="text-sm text-gray-500 mb-4">Provide feedback for <span className="font-medium text-[#1a1f4e]">{property.title}</span>. The owner will see this.</p>
                <textarea
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    rows={4}
                    placeholder="Reason for rejection..."
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1f4e] resize-none"
                />
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(property._id, feedback)}
                        disabled={!feedback.trim() || loading}
                        className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 disabled:opacity-60"
                    >
                        {loading ? "Rejecting..." : "Confirm Reject"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminProperties() {
    const [properties, setProperties] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [rejectTarget, setRejectTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const fetchProperties = async (page = 1) => {
        try {
            const { data } = await axiosInstance.get(`/properties/admin/all?page=${page}&limit=10`);
            setProperties(data.properties);
            setPagination(data.pagination);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const load = async () => {
            await fetchProperties(1);
        };
        load();
    }, []);

    const handleApprove = async (id) => {
        setActionLoading(`approve-${id}`);
        try {
            await axiosInstance.patch(`/properties/${id}/status`, { status: "approved" });
            setProperties(prev => prev.map(p => p._id === id ? { ...p, status: "approved", rejectionFeedback: "" } : p));
        } catch (err) {
            console.error(err);
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (id, rejectionFeedback) => {
        setActionLoading(`reject-${id}`);
        try {
            await axiosInstance.patch(`/properties/${id}/status`, { status: "rejected", rejectionFeedback });
            setProperties(prev => prev.map(p => p._id === id ? { ...p, status: "rejected", rejectionFeedback } : p));
            setRejectTarget(null);
        } catch (err) {
            console.error(err);
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (id) => {
        setActionLoading(`delete-${id}`);
        try {
            await axiosInstance.delete(`/properties/${id}`);
            setProperties(prev => prev.filter(p => p._id !== id));
            setDeleteTarget(null);
        } catch (err) {
            console.error(err);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div>
            {rejectTarget && (
                <RejectModal
                    property={rejectTarget}
                    onConfirm={handleReject}
                    onClose={() => setRejectTarget(null)}
                    loading={!!actionLoading}
                />
            )}

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1a1f4e]">All Properties</h1>
                <p className="text-gray-500 text-sm mt-1">Review, approve, reject, and manage all listings</p>
            </div>

            {loading ? (
                <div className="bg-white rounded-2xl p-6 animate-pulse space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl" />)}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#f0f4ff] text-[#1a1f4e] text-xs font-semibold uppercase tracking-wide">
                                    <th className="text-left px-6 py-4">Property</th>
                                    <th className="text-left px-6 py-4">Owner</th>
                                    <th className="text-left px-6 py-4">Type</th>
                                    <th className="text-left px-6 py-4">Rent</th>
                                    <th className="text-left px-6 py-4">Status</th>
                                    <th className="text-left px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {properties.map(property => (
                                    <tr key={property._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                                    {property.images?.[0] && (
                                                        <Image src={property.images[0]} alt={property.title} fill sizes="48px" className="object-cover" />
                                                    )}
                                                </div>
                                                <p className="font-medium text-[#1a1f4e] line-clamp-1 max-w-40">{property.title}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            <p className="text-xs">{property.ownerId?.name}</p>
                                            <p className="text-xs text-gray-400">{property.ownerId?.email}</p>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 capitalize">{property.type}</td>
                                        <td className="px-6 py-4 font-semibold text-[#1a1f4e]">${property.rent?.toLocaleString()}</td>
                                        <td className="px-6 py-4"><StatusBadge status={property.status} /></td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-2">
                                                {property.status !== "approved" && (
                                                    <button
                                                        onClick={() => handleApprove(property._id)}
                                                        disabled={!!actionLoading}
                                                        className="text-xs bg-green-100 text-green-700 px-2.5 py-1.5 rounded-lg hover:bg-green-500 hover:text-white transition-colors disabled:opacity-60"
                                                    >
                                                        {actionLoading === `approve-${property._id}` ? "..." : "Approve"}
                                                    </button>
                                                )}
                                                {property.status !== "rejected" && (
                                                    <button
                                                        onClick={() => setRejectTarget(property)}
                                                        disabled={!!actionLoading}
                                                        className="text-xs bg-red-100 text-red-500 px-2.5 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors disabled:opacity-60"
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                                <Link
                                                    href={`/dashboard/admin/properties/edit/${property._id}`}
                                                    className="text-xs bg-[#f0f4ff] text-[#1a1f4e] px-2.5 py-1.5 rounded-lg hover:bg-[#1a1f4e] hover:text-white transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                {deleteTarget === property._id ? (
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => handleDelete(property._id)}
                                                            disabled={!!actionLoading}
                                                            className="text-xs bg-red-500 text-white px-2 py-1.5 rounded-lg disabled:opacity-60"
                                                        >
                                                            {actionLoading === `delete-${property._id}` ? "..." : "Confirm"}
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteTarget(null)}
                                                            className="text-xs border border-gray-200 text-gray-500 px-2 py-1.5 rounded-lg"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setDeleteTarget(property._id)}
                                                        className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1.5 rounded-lg hover:bg-red-100 hover:text-red-500 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {pagination.totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                            <p className="text-sm text-gray-400">Page {pagination.page} of {pagination.totalPages}</p>
                            <div className="flex gap-2">
                                <button
                                    disabled={pagination.page <= 1}
                                    onClick={() => fetchProperties(pagination.page - 1)}
                                    className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                                >
                                    Previous
                                </button>
                                <button
                                    disabled={pagination.page >= pagination.totalPages}
                                    onClick={() => fetchProperties(pagination.page + 1)}
                                    className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}