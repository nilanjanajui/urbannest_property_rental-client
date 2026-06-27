"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TenantDashboardHome() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/dashboard/tenant/bookings");
    }, [router]);
    return null;
}