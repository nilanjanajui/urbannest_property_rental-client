"use client"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PrivateRoute({ children, allowedRoles }) {
    const { user, isPending } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isPending && !user) {
            router.push("/login")
        }
        if (!isPending && user && allowedRoles && !allowedRoles.includes(user.role)) {
            router.push("/")
        }
    }, [user, isPending, router, allowedRoles])  // ← added router and allowedRoles

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f0f4ff]">
                <div className="w-10 h-10 border-4 border-[#1a1f4e] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }
    if (!user) return null

    return children
}