"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function DashboardPage() {
    const router = useRouter()
    const { user, isPending } = useAuth()

    useEffect(() => {
        if (isPending) return
        if (!user) {
            router.replace("/login")
            return
        }
        if (user.role === "admin") router.replace("/dashboard/admin")
        else if (user.role === "owner") router.replace("/dashboard/owner")
        else router.replace("/dashboard/tenant")
    }, [user, isPending, router])

    return null
}