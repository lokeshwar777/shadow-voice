import React from "react";
import Link from "next/link";

const CookiesPolicy = () => {
    return (
        <div className="bg-black text-white min-h-screen flex flex-col justify-between p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Cookies Policy</h1>
                <p className="text-sm text-gray-500">Last Updated: 04/03/2025</p>

                <h2 className="text-2xl font-semibold mt-6">1. What Are Cookies?</h2>
                <p className="mt-2">Cookies are small text files stored on your device when you visit Shadow Voice. They help enhance user experience and functionality.</p>

                <h2 className="text-2xl font-semibold mt-6">2. How We Use Cookies</h2>
                <ul className="list-disc pl-8 mt-2">
                    <li><strong>Essential Cookies:</strong> Required for login and security purposes.</li>
                    <li><strong>Performance Cookies:</strong> Help analyze usage and improve performance.</li>
                    <li><strong>Functional Cookies:</strong> Store preferences to personalize user experience.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">3. Managing Cookies</h2>
                <p className="mt-2">3.1. You can disable cookies through browser settings, but some features may not function properly.</p>

                <h2 className="text-2xl font-semibold mt-6">4. Third-Party Cookies</h2>
                <p className="mt-2">4.1. We may use third-party analytics services that set cookies to track usage.</p>

                <h2 className="text-2xl font-semibold mt-6">5. Opting Out of Cookies</h2>
                <ul className="list-disc pl-8 mt-2">
                    <li>5.1. You have the option to opt out of non-essential cookies through your browser settings or via a cookie consent banner (if available).</li>
                    <li>5.2. Disabling cookies may affect the usability of certain features, such as login sessions and preferences.</li>
                    <li>5.3. To learn more about managing cookies, visit your browser’s support page for specific instructions.</li>
                </ul>

                <p className="mt-6">By using Shadow Voice, you consent to our use of cookies as described in this policy.</p>
            </div>

            <footer className="absolute bottom-2 w-full text-center text-gray-400 text-sm">
                <div className="flex justify-center space-x-4">
                    <Link href="/footer/about/" className="hover:text-white transition">About</Link>
                    <Link href="/footer/cookie/" className="hover:text-white transition">Cookie Policy</Link>
                    <Link href="/footer/privacy/" className="hover:text-white transition">Privacy Policy</Link>
                    <Link href="/footer/Terms/" className="hover:text-white transition">Terms of Service</Link>
                    <Link href="/footer/contact/" className="hover:text-white transition">Contact Us</Link>
                    <p className="mt-1">&copy; {new Date().getFullYear()} Shadow Voice. All rights reserved.</p>
                </div>

            </footer>
        </div>
    );
};

export default CookiesPolicy;
