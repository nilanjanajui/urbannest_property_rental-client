"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/register";
    const isDashboard = pathname.startsWith("/dashboard");

    return (
        <>
            {!isAuthPage && !isDashboard && <Navbar />}
            {children}
            {!isAuthPage && !isDashboard && <Footer />}
        </>
    );
}