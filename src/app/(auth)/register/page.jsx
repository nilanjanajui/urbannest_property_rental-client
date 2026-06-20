"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { FiUser, FiMail, FiLock, FiImage, FiEye, FiEyeOff } from "react-icons/fi"

export default function RegisterPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photo: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters")
            setLoading(false)
            return
        }

        await authClient.signUp.email(
            {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                image: formData.photo || "",
            },
            {
                onSuccess: () => {
                    router.push("/login")
                },
                onError: (ctx) => {
                    setError(ctx.error.message || "Registration failed. Please try again.")
                    setLoading(false)
                },
            }
        )
    }

    return (
        <div className="w-full max-w-md">
            {/* Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-1">UrbanNest</h1>
                    <p className="text-blue-200 text-sm">Create your account</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm rounded-lg px-4 py-3 mb-5">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 text-sm" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 text-sm" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition"
                        />
                    </div>

                    {/* Photo URL */}
                    <div className="relative">
                        <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 text-sm" />
                        <input
                            type="url"
                            name="photo"
                            placeholder="Photo URL (optional)"
                            value={formData.photo}
                            onChange={handleChange}
                            className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 text-sm" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password (min 8 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-lg py-3 pl-10 pr-10 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white transition"
                        >
                            {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-3 text-sm transition mt-2"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-blue-200 text-sm mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-400 hover:text-white font-medium transition">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}