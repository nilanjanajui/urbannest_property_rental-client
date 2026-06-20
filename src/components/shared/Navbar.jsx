"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBuilding, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/auth-client";

export default function Navbar() {
    const { user, isPending } = useAuth();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        await signOut();
        router.push("/");
        setMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
                            <FaBuilding className="text-white text-base" />
                        </div>
                        <span className="text-xl font-bold text-indigo-900 tracking-tight">
                            Urban<span className="text-indigo-500">Nest</span>
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors">
                            Home
                        </Link>
                        <Link href="/properties" className="text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors">
                            All Properties
                        </Link>
                    </div>

                    {/* Auth — Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        {isPending ? (
                            <div className="w-6 h-6 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
                        ) : user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden text-slate-600 p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-slate-100 py-3 flex flex-col gap-1">
                        <Link href="/" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-slate-600 hover:text-indigo-600 text-sm font-medium">Home</Link>
                        <Link href="/properties" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-slate-600 hover:text-indigo-600 text-sm font-medium">All Properties</Link>
                        {user ? (
                            <>
                                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-slate-600 hover:text-indigo-600 text-sm font-medium">Dashboard</Link>
                                <button onClick={handleLogout} className="px-4 py-2 text-left text-red-500 text-sm font-medium">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-slate-600 hover:text-indigo-600 text-sm font-medium">Login</Link>
                                <Link href="/register" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-indigo-600 text-sm font-medium">Register</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}