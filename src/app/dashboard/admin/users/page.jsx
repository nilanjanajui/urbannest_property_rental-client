"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import Image from "next/image";

function RoleBadge({ role }) {
    const map = {
        admin: "bg-purple-100 text-purple-700",
        owner: "bg-blue-100 text-blue-700",
        tenant: "bg-green-100 text-green-700",
    };
    return (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${map[role] || "bg-gray-100 text-gray-600"}`}>
            {role}
        </span>
    );
}

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    const fetchUsers = async (page = 1) => {
        try {
            const { data } = await axiosInstance.get(`/users?page=${page}&limit=10`);
            setUsers(data.users);
            setPagination(data.pagination);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const load = async () => {
            await fetchUsers(1);
        };
        load();
    }, []);

    const handleRoleChange = async (userId, currentRole) => {
        const newRole = currentRole === "tenant" ? "owner" : "tenant";
        setActionLoading(userId);
        try {
            await axiosInstance.patch(`/users/${userId}/role`, { role: newRole });
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
        } catch (err) {
            console.error(err);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1a1f4e]">All Users</h1>
                <p className="text-gray-500 text-sm mt-1">Manage user roles across the platform</p>
            </div>

            {loading ? (
                <div className="bg-white rounded-2xl p-6 animate-pulse space-y-4">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-14 bg-gray-100 rounded-xl" />)}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#f0f4ff] text-[#1a1f4e] text-xs font-semibold uppercase tracking-wide">
                                    <th className="text-left px-6 py-4">User</th>
                                    <th className="text-left px-6 py-4">Email</th>
                                    <th className="text-left px-6 py-4">Role</th>
                                    <th className="text-left px-6 py-4">Joined</th>
                                    <th className="text-left px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.map(user => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#1a1f4e]">
                                                    {user.photo ? (
                                                        <Image src={user.photo} alt={user.name} fill sizes="36px" className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="font-medium text-[#1a1f4e]">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4"><RoleBadge role={user.role} /></td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">
                                            {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.role !== "admin" ? (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, user.role)}
                                                    disabled={actionLoading === user._id}
                                                    className="text-xs bg-[#1a1f4e] text-white px-3 py-1.5 rounded-lg hover:bg-[#2a2f6e] transition-colors disabled:opacity-60"
                                                >
                                                    {actionLoading === user._id ? "..." : `Make ${user.role === "tenant" ? "Owner" : "Tenant"}`}
                                                </button>
                                            ) : (
                                                <span className="text-gray-300 text-xs">Protected</span>
                                            )}
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
                                    onClick={() => fetchUsers(pagination.page - 1)}
                                    className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                                >
                                    Previous
                                </button>
                                <button
                                    disabled={pagination.page >= pagination.totalPages}
                                    onClick={() => fetchUsers(pagination.page + 1)}
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