"use client";

export default function Error({ error, reset }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#f0f4ff] gap-4 px-4 text-center">
            <p className="text-6xl font-bold text-[#1a1f4e]">Oops!</p>
            <h2 className="text-xl font-bold text-[#1a1f4e]">Something went wrong</h2>
            <p className="text-gray-500 text-sm max-w-xs">{error?.message || "An unexpected error occurred."}</p>
            <button
                onClick={reset}
                className="mt-2 px-6 py-3 bg-[#1a1f4e] hover:bg-[#2a2f60] text-white text-sm font-semibold rounded-full transition-colors"
            >
                Try Again
            </button>
        </div>
    );
}