"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";

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

function FeedbackModal({ feedback, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
                <h3 className="text-lg font-bold text-[#1a1f4e] mb-3">Rejection Feedback</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feedback || "No feedback provided."}</p>
                <button onClick={onClose}
                    className="mt-5 w-full bg-[#1a1f4e] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#141840] transition-colors">
                    Close
                </button>
            </div>
        </div>
    );
}

export default function MyProperties() {
    const [properties, setProperties] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
    const [loading, setLoading] = useState(true);
    const [feedbackModal, setFeedbackModal] = useState({ open: false, feedback: "" });
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchProperties = async (page = 1) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get(`/properties/owner/mine?page=${page}&limit=8`);
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
            setLoading(true);
            try {
                const { data } = await axiosInstance.get("/properties/owner/mine?page=1&limit=8");
                setProperties(data.properties);
                setPagination(data.pagination);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleDelete = async id => {
        setDeleteLoading(true);
        try {
            await axiosInstance.delete(`/properties/${id}`);
            setProperties(prev => prev.filter(p => p._id !== id));
            setDeleteId(null);
        } catch (err) {
            console.error(err);
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <div>
            {feedbackModal.open && (
                <FeedbackModal
                    feedback={feedbackModal.feedback}
                    onClose={() => setFeedbackModal({ open: false, feedback: "" })}
                />
            )}

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#1a1f4e]">My Properties</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your listed properties</p>
                </div>
                <Link href="/dashboard/owner/add-property"
                    className="bg-amber-400 text-[#1a1f4e] font-semibold px-4 py-2 rounded-xl text-sm hover:bg-amber-500 transition-colors">
                    + Add New
                </Link>
            </div>

            {loading ? (
                <div className="bg-white rounded-2xl p-6 animate-pulse space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl" />)}
                </div>
            ) : properties.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                    <p className="text-gray-400 text-lg">No properties yet</p>
                    <Link href="/dashboard/owner/add-property" className="mt-4 inline-block text-sm text-[#1a1f4e] underline">
                        Add your first property
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
                                                    <div>
                                                        <p className="font-semibold text-[#1a1f4e] line-clamp-1">{property.title}</p>
                                                        <p className="text-gray-400 text-xs">{property.location}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 capitalize">{property.type}</td>
                                            <td className="px-6 py-4 font-semibold text-[#1a1f4e]">
                                                ${property.rent?.toLocaleString()}
                                                <span className="text-gray-400 text-xs font-normal">/{property.rentType}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <StatusBadge status={property.status} />
                                                    {property.status === "rejected" && (
                                                        <button
                                                            onClick={() => setFeedbackModal({ open: true, feedback: property.rejectionFeedback })}
                                                            className="text-gray-400 hover:text-[#1a1f4e] transition-colors"
                                                            title="View rejection feedback"
                                                        >
                                                            <FaEye size={13} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/dashboard/owner/properties/edit/${property._id}`}
                                                        className="text-xs bg-[#f0f4ff] text-[#1a1f4e] font-medium px-3 py-1.5 rounded-lg hover:bg-[#1a1f4e] hover:text-white transition-colors flex items-center gap-1"
                                                    >
                                                        <FaPen size={10} /> Edit
                                                    </Link>
                                                    {deleteId === property._id ? (
                                                        <div className="flex gap-1">
                                                            <button onClick={() => handleDelete(property._id)} disabled={deleteLoading}
                                                                className="text-xs bg-red-500 text-white px-2 py-1.5 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-60">
                                                                {deleteLoading ? "..." : "Confirm"}
                                                            </button>
                                                            <button onClick={() => setDeleteId(null)}
                                                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button onClick={() => setDeleteId(property._id)}
                                                            className="text-xs bg-red-50 text-red-500 font-medium px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors flex items-center gap-1">
                                                            <FaTrash size={10} /> Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {pagination.totalPages > 1 && (
                        <div className="flex items-center justify-between mt-4 text-sm">
                            <p className="text-gray-500">Showing {properties.length} of {pagination.total} properties</p>
                            <div className="flex gap-2">
                                <button onClick={() => fetchProperties(pagination.page - 1)} disabled={pagination.page === 1}
                                    className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors">
                                    ‹ Prev
                                </button>
                                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
                                    <button key={p} onClick={() => fetchProperties(p)}
                                        className={`px-3 py-1.5 rounded-lg border transition-colors ${p === pagination.page ? "bg-[#1a1f4e] text-white border-[#1a1f4e]" : "border-gray-200 hover:bg-gray-50"}`}>
                                        {p}
                                    </button>
                                ))}
                                <button onClick={() => fetchProperties(pagination.page + 1)} disabled={pagination.page === pagination.totalPages}
                                    className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors">
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