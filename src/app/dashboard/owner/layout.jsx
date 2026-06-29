"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaChartLine, FaPlus, FaBuilding, FaCalendarAlt, FaUser, FaHome, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/auth-client";
import PrivateRoute from "@/components/auth/PrivateRoute";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";

const navLinks = [
    { href: "/dashboard/owner", label: "Analytics", icon: FaChartLine, exact: true },
    { href: "/dashboard/owner/add-property", label: "Add Property", icon: FaPlus },
    { href: "/dashboard/owner/properties", label: "My Properties", icon: FaBuilding },
    { href: "/dashboard/owner/bookings", label: "Booking Requests", icon: FaCalendarAlt },
    { href: "/dashboard/owner/profile", label: "Profile", icon: FaUser },
];

function OwnerLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSignOut = async () => {
        sessionStorage.removeItem("auth_token");
        await signOut();
        router.push("/");
    };

    useEffect(() => {
        const storeJwt = async () => {
            if (sessionStorage.getItem("auth_token")) return;
            try {
                const { data } = await axiosInstance.get("/token");
                if (data?.token) sessionStorage.setItem("auth_token", data.token);
            } catch {
                // ignore
            }
        };
        storeJwt();
    }, []);

    const isActive = (href, exact) =>
        exact ? pathname === href : pathname.startsWith(href);

    return (
        <div className="min-h-screen bg-[#f0f4ff] flex">
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#1a1f4e] text-white flex flex-col transform transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
                            <span className="text-[#1a1f4e] font-bold text-sm">U</span>
                        </div>
                        <span className="font-bold text-lg">UrbanNest</span>
                    </Link>
                </div>

                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        {user?.image ? (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                                <Image src={user.image} alt={user.name} fill sizes="40px" className="object-cover" />
                            </div>
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
                                <span className="text-[#1a1f4e] font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
                            </div>
                        )}
                        <div className="min-w-0">
                            <p className="font-semibold text-sm truncate">{user?.name}</p>
                            <p className="text-white/50 text-xs capitalize">{user?.role}</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/10 hover:text-white transition-colors text-sm">
                        <FaHome size={14} />
                        Back to Home
                    </Link>
                    {navLinks.map(({ href, label, icon: Icon, exact }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${isActive(href, exact)
                                ? "bg-amber-400 text-[#1a1f4e] font-semibold"
                                : "text-white/70 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            <Icon size={14} />
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-colors text-sm w-full"
                    >
                        <FaSignOutAlt size={14} />
                        Sign Out
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 sticky top-0 z-10">
                    <button onClick={() => setSidebarOpen(true)} className="text-[#1a1f4e]">
                        <FaBars size={20} />
                    </button>
                    <span className="font-bold text-[#1a1f4e]">UrbanNest</span>
                </header>
                <main className="flex-1 p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}

export default function Layout({ children }) {
    return (
        <PrivateRoute allowedRoles={["owner"]}>
            <OwnerLayout>{children}</OwnerLayout>
        </PrivateRoute>
    );
}