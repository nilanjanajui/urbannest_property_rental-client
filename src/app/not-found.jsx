import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#f0f4ff] gap-4 px-4 text-center">
            <p className="text-8xl font-bold text-[#1a1f4e]">404</p>
            <h1 className="text-2xl font-bold text-[#1a1f4e]">Page Not Found</h1>
            <p className="text-gray-500 text-sm max-w-xs">
                The page you are looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
                href="/"
                className="mt-2 px-6 py-3 bg-[#1a1f4e] hover:bg-[#2a2f60] text-white text-sm font-semibold rounded-full transition-colors"
            >
                Back to Home
            </Link>
        </div>
    );
}