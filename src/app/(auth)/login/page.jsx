"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc"

export default function LoginPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        await authClient.signIn.email(
            {
                email: formData.email,
                password: formData.password,
            },
            {
                onSuccess: () => {
                    router.push("/dashboard")
                },
                onError: (ctx) => {
                    setError(ctx.error.message || "Invalid email or password.")
                    setLoading(false)
                },
            }
        )
    }

    const handleGoogleLogin = async () => {
        setGoogleLoading(true)
        setError("")

        await authClient.signIn.social(
            {
                provider: "google",
                callbackURL: "/dashboard",
            },
            {
                onError: (ctx) => {
                    setError(ctx.error.message || "Google login failed.")
                    setGoogleLoading(false)
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
                    <p className="text-blue-200 text-sm">Welcome back</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm rounded-lg px-4 py-3 mb-5">
                        {error}
                    </div>
                )}

                {/* Google Button */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={googleLoading || loading}
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-700 font-semibold rounded-lg py-3 text-sm transition mb-5"
                >
                    <FcGoogle size={18} />
                    {googleLoading ? "Redirecting..." : "Continue with Google"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-white/20" />
                    <span className="text-blue-300 text-xs">or sign in with email</span>
                    <div className="flex-1 h-px bg-white/20" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

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

                    {/* Password */}
                    <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 text-sm" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
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
                        disabled={loading || googleLoading}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-3 text-sm transition mt-2"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-blue-200 text-sm mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-400 hover:text-white font-medium transition">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    )
}