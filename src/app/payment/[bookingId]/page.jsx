"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { FaLock, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import axiosInstance from "@/lib/axios";
import PrivateRoute from "@/components/auth/PrivateRoute";

// loadStripe must be called outside any component
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CARD_STYLE = {
    style: {
        base: {
            color: "#1a1f4e",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "15px",
            "::placeholder": { color: "#94a3b8" },
        },
        invalid: { color: "#ef4444" },
    },
};

// useStripe/useElements must be inside a component rendered under <Elements>
function CheckoutForm({ booking }) {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePay = async () => {
        if (!stripe || !elements) return;
        setLoading(true);
        setError("");

        try {
            // Step 1: create payment intent on server
            const { data } = await axiosInstance.post("/payments/create-intent", {
                bookingId: booking._id,
            });

            // Step 2: confirm card payment with Stripe
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setError(result.error.message);
                setLoading(false);
                return;
            }

            // Step 3: tell server payment succeeded, create transaction
            await axiosInstance.post("/payments/confirm", {
                bookingId: booking._id,
                paymentIntentId: result.paymentIntent.id,
            });

            router.push(`/payment/success?bookingId=${booking._id}`);
        } catch (err) {
            setError(err.response?.data?.message || "Payment failed. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
                <div className="border border-gray-200 rounded-xl p-4 bg-white focus-within:border-[#1a1f4e] transition-colors">
                    <CardElement options={CARD_STYLE} />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                    Test card: 4242 4242 4242 4242 · Any future date · Any CVC
                </p>
            </div>

            {error && (
                <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl p-3">
                    {error}
                </p>
            )}

            <button
                onClick={handlePay}
                disabled={loading || !stripe}
                className="w-full bg-[#1a1f4e] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#141840] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                <FaLock className="text-sm" />
                {loading ? "Processing..." : `Pay $${booking.amount}`}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <FaLock />
                <span>Secured by Stripe · SSL Encrypted</span>
            </div>
        </div>
    );
}

function PaymentPage() {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const { data } = await axiosInstance.get(`/bookings/${bookingId}`);
                setBooking(data.booking);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [bookingId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#1a1f4e] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
                <p className="text-gray-500">Booking not found.</p>
            </div>
        );
    }

    const property = booking.propertyId;

    return (
        <div className="min-h-screen bg-[#f0f4ff] py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#1a1f4e]">Complete Payment</h1>
                    <p className="text-gray-500 mt-1">Review your booking and enter payment details</p>
                </div>

                {/* Booking Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-[#1a1f4e] mb-4">Booking Summary</h2>
                    <div className="flex gap-4">
                        {property?.images?.[0] && (
                            <Image
                                src={property.images[0]}
                                alt={property.title}
                                width={96}
                                height={96}
                                className="rounded-xl object-cover shrink-0"
                            />
                        )}
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{property?.title}</h3>
                            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                                <FaMapMarkerAlt className="text-xs" />
                                <span>{property?.location}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 capitalize">{property?.rentType} rent</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Move-in Date</span>
                            <span className="font-medium">
                                {new Date(booking.moveInDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Contact</span>
                            <span className="font-medium">{booking.contactNumber}</span>
                        </div>
                        {booking.additionalNotes && (
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Notes</span>
                                <span className="font-medium text-right max-w-[60%]">{booking.additionalNotes}</span>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Total Amount</span>
                        <span className="text-2xl font-bold text-[#1a1f4e]">${booking.amount}</span>
                    </div>
                </div>

                {/* Payment Form — Elements wraps CheckoutForm */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-[#1a1f4e] mb-4">Payment Details</h2>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm booking={booking} />
                    </Elements>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <PrivateRoute allowedRoles={["tenant", "owner", "admin"]}>
            <PaymentPage />
        </PrivateRoute>
    );
}