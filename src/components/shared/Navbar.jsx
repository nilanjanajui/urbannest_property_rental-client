"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/auth-client";

export default function Navbar() {
    const { user, isPending } = useAuth();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const dashboardPath =
        user?.role === "admin"
            ? "/dashboard/admin"
            : user?.role === "owner"
                ? "/dashboard/owner"
                : "/dashboard/tenant"

    const handleLogout = async () => {
        sessionStorage.removeItem("auth_token");
        await signOut();
        router.push("/");
        setMenuOpen(false);
    };

    return (
        <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <Link href="/" className="text-xl font-bold text-[#1a1f4e]">
                        UrbanNest
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm text-gray-600 hover:text-[#1a1f4e] font-medium transition-colors">Home</Link>
                        <Link href="/properties" className="text-sm text-gray-600 hover:text-[#1a1f4e] font-medium transition-colors">All Properties</Link>
                        <a href="#why" className="text-sm text-gray-600 hover:text-[#1a1f4e] font-medium transition-colors">Help</a>
                    </div>

                    <div className="hidden md:flex items-center gap-5">
                        {isPending ? (
                            <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
                        ) : user ? (
                            <>
                                <Link href={dashboardPath} className="text-sm text-gray-600 hover:text-[#1a1f4e] font-medium">Dashboard</Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm bg-[#1a1f4e] hover:bg-[#2a2f60] text-white px-5 py-2 rounded-full font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm text-gray-600 hover:text-[#1a1f4e] font-medium">Sign In</Link>
                                <Link href="/register" className="text-sm bg-[#1a1f4e] hover:bg-[#2a2f60] text-white px-5 py-2 rounded-full font-medium transition-colors">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    <button className="md:hidden p-1.5 text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                    </button>
                </div>

                {menuOpen && (
                    <div className="md:hidden border-t border-gray-100 py-3 flex flex-col gap-0.5 pb-4">
                        <Link href="/" onClick={() => setMenuOpen(false)} className="px-2 py-2.5 text-sm text-gray-700 font-medium rounded-lg hover:bg-gray-50">Home</Link>
                        <Link href="/properties" onClick={() => setMenuOpen(false)} className="px-2 py-2.5 text-sm text-gray-700 font-medium rounded-lg hover:bg-gray-50">All Properties</Link>
                        {user ? (
                            <>
                                <Link href={dashboardPath} onClick={() => setMenuOpen(false)} className="px-2 py-2.5 text-sm text-gray-700 font-medium rounded-lg hover:bg-gray-50">Dashboard</Link>
                                <button onClick={handleLogout} className="px-2 py-2.5 text-left text-sm text-red-500 font-medium">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setMenuOpen(false)} className="px-2 py-2.5 text-sm text-gray-700 font-medium rounded-lg hover:bg-gray-50">Sign In</Link>
                                <Link href="/register" onClick={() => setMenuOpen(false)} className="px-2 py-2.5 text-sm text-[#1a1f4e] font-semibold">Register</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}