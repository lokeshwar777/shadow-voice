'use client';

import React from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
    return (
        <div className="bg-black text-white min-h-screen flex flex-col justify-between p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-sm text-gray-500">Last Updated: 04/03/2023</p>

                <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
                <p className="mt-2">1.1. We collect only the following data:</p>
                <ul className="list-disc pl-8 mt-2">
                    <li>Email address (for account verification and communication)</li>
                    <li>Username (nickname) and password</li>
                    <li>Activity logs related to posts and interactions</li>
                    <li>Authentication data from Google or Apple accounts if used for login</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
                <p className="mt-2">2.1. Your email is used solely for registration and verification.</p>
                <p>2.2. Your username is displayed publicly, ensuring anonymity.</p>
                <p>2.3. We do not sell, rent, or share user data with third parties.</p>

                <h2 className="text-2xl font-semibold mt-6">3. Data Security</h2>
                <p className="mt-2">3.1. We implement security measures to protect user data but cannot guarantee complete security.</p>
                <p>3.2. Users should use strong passwords and avoid sharing login details.</p>

                <h2 className="text-2xl font-semibold mt-6">4. Data Retention and Deletion</h2>
                <p className="mt-2">4.1. User data is retained as long as the account is active.</p>
                <p>4.2. You can request account deletion, and all associated data will be permanently erased.</p>

                <h2 className="text-2xl font-semibold mt-6">5. Third-Party Services</h2>
                <p className="mt-2">5.1. We may use third-party services for analytics or authentication, which may collect additional data.</p>
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

export default PrivacyPolicy;
