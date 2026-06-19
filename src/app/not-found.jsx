import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-gray-500">The page you are looking for does not exist.</p>
            <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Back to Home
            </Link>
        </div>
    );
}