"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";

export default function Profile() {
    const { user, refetch } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [imageUrl, setImageUrl] = useState(user?.image || "");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccess("");
        setError("");
        try {
            await authClient.updateUser({ name, image: imageUrl });
            await refetch();
            setSuccess("Profile updated successfully");
        } catch (err) {
            setError("Failed to update profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1a1f4e]">My Profile</h1>
                <p className="text-gray-500 text-sm mt-1">Manage your personal information</p>
            </div>

            <div className="max-w-lg">
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative">
                            {imageUrl ? (
                                <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#f0f4ff]">
                                    <Image src={imageUrl} alt={user?.name || ""} fill sizes="96px" className="object-cover" />
                                </div>
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-amber-400 ring-4 ring-[#f0f4ff] flex items-center justify-center">
                                    <span className="text-[#1a1f4e] font-bold text-3xl">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#1a1f4e] rounded-full flex items-center justify-center">
                                <FaCamera size={11} className="text-white" />
                            </div>
                        </div>
                        <p className="mt-3 font-bold text-[#1a1f4e] text-lg">{user?.name}</p>
                        <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium capitalize mt-1">
                            {user?.role}
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[#1a1f4e] mb-2">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1f4e]/20 focus:border-[#1a1f4e]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#1a1f4e] mb-2">Email</label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                disabled
                                className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#1a1f4e] mb-2">Photo URL</label>
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                                placeholder="https://example.com/photo.jpg"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1f4e]/20 focus:border-[#1a1f4e]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#1a1f4e] mb-2">Member Since</label>
                            <input
                                type="text"
                                value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                                disabled
                                className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                            />
                        </div>

                        {success && <p className="text-green-600 text-sm bg-green-50 px-4 py-3 rounded-xl">{success}</p>}
                        {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-[#1a1f4e] text-white py-3 rounded-xl font-semibold hover:bg-[#141840] transition-colors disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}