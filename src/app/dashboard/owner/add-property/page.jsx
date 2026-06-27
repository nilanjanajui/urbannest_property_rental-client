"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

const PROPERTY_TYPES = ["apartment", "house", "villa", "studio", "office", "shop"];
const RENT_TYPES = ["monthly", "weekly", "daily"];
const AMENITY_OPTIONS = ["WiFi", "Parking", "Pool", "Gym", "AC", "Laundry", "Security", "Pet Friendly", "Elevator", "Balcony"];

export default function AddProperty() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [form, setForm] = useState({
        title: "", description: "", location: "",
        type: "apartment", rent: "", rentType: "monthly",
        bedrooms: "", bathrooms: "", size: "",
        amenities: [], images: ["", "", ""], extraFeatures: "",
    });

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
        setLoading(true);
        try {
            await axiosInstance.post("/properties", {
                ...form,
                rent: Number(form.rent),
                bedrooms: Number(form.bedrooms),
                bathrooms: Number(form.bathrooms),
                images: form.images.filter(Boolean),
            });
            setSuccess("Property submitted! It will go live after admin approval.");
            setTimeout(() => router.push("/dashboard/owner/properties"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add property");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1f4e]/20";

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1a1f4e]">Add Property</h1>
                <p className="text-gray-500 text-sm mt-1">Your property will be reviewed before going live.</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                    <h2 className="font-semibold text-[#1a1f4e]">Basic Information</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
                        <input name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="e.g. Spacious 2BR Apartment in Downtown" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className={`${inputClass} resize-none`} placeholder="Describe your property..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input name="location" value={form.location} onChange={handleChange} required className={inputClass} placeholder="e.g. Manhattan, New York" />
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
                            <input name="rent" type="number" min="0" value={form.rent} onChange={handleChange} required className={inputClass} placeholder="e.g. 1200" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Property Size</label>
                            <input name="size" value={form.size} onChange={handleChange} required className={inputClass} placeholder="e.g. 850 sqft" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                            <input name="bedrooms" type="number" min="0" value={form.bedrooms} onChange={handleChange} required className={inputClass} placeholder="e.g. 2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                            <input name="bathrooms" type="number" min="0" value={form.bathrooms} onChange={handleChange} required className={inputClass} placeholder="e.g. 1" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Extra Features</label>
                        <input name="extraFeatures" value={form.extraFeatures} onChange={handleChange} className={inputClass} placeholder="e.g. Rooftop access, Concierge" />
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image {i + 1} {i === 0 ? "(Main — required)" : "(Optional)"}
                            </label>
                            <input type="url" value={img} onChange={e => handleImageChange(i, e.target.value)}
                                required={i === 0} className={inputClass} placeholder="https://..." />
                        </div>
                    ))}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}

                <button type="submit" disabled={loading}
                    className="w-full bg-amber-400 text-[#1a1f4e] font-semibold py-3 rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-60">
                    {loading ? "Submitting..." : "Submit Property for Review"}
                </button>
            </form>
        </div>
    );
}