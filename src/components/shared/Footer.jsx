import Link from "next/link";
import { FaFacebookF, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-[#111827] text-gray-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

                    <div>
                        <p className="text-white font-bold text-xl mb-3">UrbanNest</p>
                        <p className="text-sm leading-relaxed mb-6">
                            Connecting urban living with modern technology. Your search for the perfect urban nest ends here.
                        </p>
                        <div className="flex gap-3">
                            {[FaFacebookF, FaPinterestP, FaXTwitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                                    <Icon size={13} className="text-gray-300" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold text-sm mb-5">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/properties" className="hover:text-white transition-colors">Search Houses</Link></li>
                            <li><Link href="/dashboard" className="hover:text-white transition-colors">List Your Property</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Our Story</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Market Reports</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold text-sm mb-5">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Press & Media</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold text-sm mb-5">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 text-center text-xs">
                    © {new Date().getFullYear()} UrbanNest. All rights reserved.
                </div>
            </div>
        </footer>
    );
}