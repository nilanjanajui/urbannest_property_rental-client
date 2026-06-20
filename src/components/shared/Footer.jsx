import Link from "next/link";
import { FaBuilding, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
                                <FaBuilding className="text-white text-base" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                Urban<span className="text-indigo-400">Nest</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed mb-5">
                            Your trusted marketplace for finding and listing verified rental properties.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors"><FaFacebookF size={16} /></a>
                            <a href="#" className="hover:text-white transition-colors"><FaXTwitter size={16} /></a>
                            <a href="#" className="hover:text-white transition-colors"><FaInstagram size={16} /></a>
                            <a href="#" className="hover:text-white transition-colors"><FaLinkedinIn size={16} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/properties" className="hover:text-white transition-colors">All Properties</Link></li>
                            <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                            <li><Link href="/register" className="hover:text-white transition-colors">Register</Link></li>
                        </ul>
                    </div>

                    {/* Property Types */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Property Types</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/properties?type=apartment" className="hover:text-white transition-colors">Apartments</Link></li>
                            <li><Link href="/properties?type=house" className="hover:text-white transition-colors">Houses</Link></li>
                            <li><Link href="/properties?type=villa" className="hover:text-white transition-colors">Villas</Link></li>
                            <li><Link href="/properties?type=studio" className="hover:text-white transition-colors">Studios</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li>hello@urbannest.com</li>
                            <li>+1 (555) 000-0000</li>
                            <li>123 Rental Ave, New York, NY</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-6 text-center text-xs">
                    © {new Date().getFullYear()} UrbanNest. All rights reserved.
                </div>
            </div>
        </footer>
    );
}