import PrivateRoute from "@/components/auth/PrivateRoute"

function AdminDashboard() {
    return (
        <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-[#1a1f4e] mb-2">Admin Dashboard</h1>
                <p className="text-gray-500">Coming soon — Phase 11</p>
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
        </PrivateRoute>
    )
}