"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";

const PROPERTY_TYPES = ["apartment", "house", "villa", "studio", "office", "shop"];
const RENT_TYPES = ["monthly", "weekly", "daily"];
const AMENITY_OPTIONS = ["WiFi", "Parking", "Pool", "Gym", "AC", "Laundry", "Security", "Pet Friendly", "Elevator", "Balcony"];

export default function EditProperty() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [form, setForm] = useState({
        title: "", description: "", location: "",
        type: "apartment", rent: "", rentType: "monthly",
        bedrooms: "", bathrooms: "", size: "",
        amenities: [], images: ["", "", ""], extraFeatures: "",
    });

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await axiosInstance.get(`/properties/${id}`);
                const p = data.property;
                setForm({
                    title: p.title || "",
                    description: p.description || "",
                    location: p.location || "",
                    type: p.type || "apartment",
                    rent: p.rent || "",
                    rentType: p.rentType || "monthly",
                    bedrooms: p.bedrooms || "",
                    bathrooms: p.bathrooms || "",
                    size: p.size || "",
                    amenities: p.amenities || [],
                    images: [p.images?.[0] || "", p.images?.[1] || "", p.images?.[2] || ""],
                    extraFeatures: p.extraFeatures || "",
                });
            } catch (err) {
                setError("Failed to load property");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleAmenityToggle = amenity =>
        setForm(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity],
        }));

    const handleImageChange = (index, value) => {
        const updated = [...form.images];
        updated[index] = value;
        setForm(prev => ({ ...prev, images: updated }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(""); setSuccess("");
        setSaving(true);
        try {
            await axiosInstance.patch(`/properties/${id}`, {
                ...form,
                rent: Number(form.rent),
                bedrooms: Number(form.bedrooms),
                bathrooms: Number(form.bathrooms),
                images: form.images.filter(Boolean),
            });
            setSuccess("Property updated successfully!");
            setTimeout(() => router.push("/dashboard/owner/properties"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update property");
        } finally {
            setSaving(false);
        }
    };

    const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1f4e]/20";

    if (loading) {
        return (
            <div className="animate-pulse space-y-6 max-w-2xl">
                <div className="h-8 w-48 bg-gray-200 rounded" />
                {[1, 2, 3].map(i => <div key={i} className="h-48 bg-white rounded-2xl" />)}
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1a1f4e]">Edit Property</h1>
                <p className="text-gray-500 text-sm mt-1">Update your property details below.</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                    <h2 className="font-semibold text-[#1a1f4e]">Basic Information</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
                        <input name="title" value={form.title} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className={`${inputClass} resize-none`} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input name="location" value={form.location} onChange={handleChange} required className={inputClass} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                    <h2 className="font-semibold text-[#1a1f4e]">Property Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                            <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
                                {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rent Type</label>
                            <select name="rentType" value={form.rentType} onChange={handleChange} className={inputClass}>
                                {RENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rent ($)</label>
                            <input name="rent" type="number" min="0" value={form.rent} onChange={handleChange} required className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Property Size</label>
                            <input name="size" value={form.size} onChange={handleChange} required className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                            <input name="bedrooms" type="number" min="0" value={form.bedrooms} onChange={handleChange} required className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                            <input name="bathrooms" type="number" min="0" value={form.bathrooms} onChange={handleChange} required className={inputClass} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Extra Features</label>
                        <input name="extraFeatures" value={form.extraFeatures} onChange={handleChange} className={inputClass} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="font-semibold text-[#1a1f4e] mb-4">Amenities</h2>
                    <div className="flex flex-wrap gap-2">
                        {AMENITY_OPTIONS.map(amenity => (
                            <button type="button" key={amenity} onClick={() => handleAmenityToggle(amenity)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${form.amenities.includes(amenity)
                                        ? "bg-[#1a1f4e] text-white border-[#1a1f4e]"
                                        : "border-gray-200 text-gray-600 hover:border-[#1a1f4e]"
                                    }`}>
                                {amenity}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
                    <h2 className="font-semibold text-[#1a1f4e]">Property Images (URLs)</h2>
                    {form.images.map((img, i) => (
                        <div key={i}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image {i + 1} {i === 0 ? "(Main)" : "(Optional)"}</label>
                            <input type="url" value={img} onChange={e => handleImageChange(i, e.target.value)}
                                required={i === 0} className={inputClass} placeholder="https://..." />
                        </div>
                    ))}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}

                <div className="flex gap-3">
                    <button type="button" onClick={() => router.push("/dashboard/owner/properties")}
                        className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" disabled={saving}
                        className="flex-1 bg-amber-400 text-[#1a1f4e] font-semibold py-3 rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-60">
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}