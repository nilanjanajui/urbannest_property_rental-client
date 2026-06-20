"use client"
import { createContext, useContext } from "react"
import { useSession } from "@/lib/auth-client"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const { data: session, isPending, refetch } = useSession()

    return (
        <AuthContext.Provider value={{
            user: session?.user || null,
            session,
            isPending,
            refetch
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)