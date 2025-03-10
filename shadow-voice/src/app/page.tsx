'use client';
import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="flex flex-col relative min-h-screen  text-white">
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover z-[-1]"
            >
                <source src="/bg.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className="flex flex-col items-center justify-center flex-grow">
                <h1 className="text-4xl font-extrabold mb-3">Shadow Voice</h1>
                <p className="text-gray-400 mb-6 text-center max-w-md">
                    Connect anonymously. Speak freely. Stay private.
                </p>
                <div className="flex space-x-4">
                    <a href="/login"
                       className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition">
                        Login
                    </a>
                    <a href="/signup"
                       className="px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-medium transition">
                        Sign Up
                    </a>
                </div>
            </div>
            <footer className="absolute bottom-2 w-full text-center text-gray-400 text-sm">
                <div className="flex justify-center space-x-4">
                    <Link href="/footer/about/" className="hover:text-white transition">About</Link>
                    <Link href="/footer/cookie/" className="hover:text-white transition">Cookie Policy</Link>
                    <Link href="/footer/privacy/" className="hover:text-white transition">Privacy Policy</Link>
                    <Link href="/footer/Terms/" className="hover:text-white transition">Terms of Service</Link>
                    <Link href="/footer/contact/" className="hover:text-white transition">Contact Us</Link>
                    <p className="justify-center">&copy; {new Date().getFullYear()} Shadow Voice. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
