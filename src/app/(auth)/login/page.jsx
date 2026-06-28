"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc"
import { BsShieldCheck } from "react-icons/bs"
import { HiOutlineLockClosed } from "react-icons/hi"

export default function LoginPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
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

        const result = await authClient.signIn.email({
            email: formData.email,
            password: formData.password,
        })

        if (result.error) {
            setError(result.error.message || "Invalid email or password.")
            setLoading(false)
            return
        }

        const role = result.data?.user?.role
        if (role === "admin") router.push("/dashboard/admin")
        else if (role === "owner") router.push("/dashboard/owner")
        else router.push("/dashboard/tenant")
    }

    const handleGoogleLogin = async () => {
        setGoogleLoading(true)
        setError("")
        await authClient.signIn.social(
            {
                provider: "google",
                callbackURL: "/dashboard/tenant",
                errorCallbackURL: "/login?error=google_auth_failed",
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
        <div className="min-h-screen flex">
            {/* Left — image panel */}
            <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&auto=format&fit=crop&q=80"
                    alt="Luxury property"
                    fill
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-indigo-950/70" />
                <div className="relative z-10 flex flex-col justify-end p-16 pb-20 text-white">
                    <h1 className="text-5xl font-bold mb-4 leading-tight">
                        Welcome to UrbanNest
                    </h1>
                    <p className="text-blue-200 text-lg leading-relaxed mb-10 max-w-lg">
                        Access an exclusive collection of curated properties. Join a community of sophisticated tenants and premium property owners today.
                    </p>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-xl px-5 py-3">
                            <BsShieldCheck className="text-amber-400 text-xl shrink-0" />
                            <span className="text-sm font-medium">Verified Listings</span>
                        </div>
                        <div className="flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-xl px-5 py-3">
                            <HiOutlineLockClosed className="text-amber-400 text-xl shrink-0" />
                            <span className="text-sm font-medium">Secure Bookings</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right — form panel */}
            <div className="w-full lg:w-[40%] flex flex-col bg-white">
                <div className="flex-1 flex flex-col justify-center px-10 py-12 max-w-md mx-auto w-full">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                        <p className="text-gray-500 text-sm">Login to manage your properties and bookings.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm text-black focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <span className="text-sm text-indigo-600 hover:underline cursor-pointer">
                                    Forgot password?
                                </span>
                            </div>
                            <div className="relative">
                                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-10 text-sm text-black focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                >
                                    {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-2.5">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="rememberMe" className="text-sm text-gray-600">
                                Stay signed in for 30 days
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || googleLoading}
                            className="w-full bg-indigo-900 hover:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition mt-1"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400 font-medium tracking-wide">
                            OR CONTINUE WITH
                        </span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Google button */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading || googleLoading}
                        className="w-full flex items-center justify-center gap-2.5 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                        <FcGoogle size={18} />
                        {googleLoading ? "Redirecting..." : "Continue with Google"}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-indigo-600 font-medium hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <div className="px-10 py-4 flex justify-between items-center border-t border-gray-100">
                    <p className="text-xs text-gray-400">© 2024 UrbanNest. All rights reserved.</p>
                    <div className="flex gap-4">
                        {["Privacy", "Terms", "Help"].map((item) => (
                            <span key={item} className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}