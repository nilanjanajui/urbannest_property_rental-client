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
    }, [user, isPending])

    if (isPending) return <div>Loading...</div>
    if (!user) return null

    return children
}