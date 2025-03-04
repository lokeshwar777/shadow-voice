'use client';

import React from "react";
import Link from "next/link";

const TermsAndConditions: React.FC = () => {
    return (
        <div className="w-full bg-black min-h-screen flex flex-col justify-between">
            <div className="w-full max-w-3xl text-white mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
                <p className="text-gray-600 mb-6">Last Updated: 04/03/2025</p>
                <p className="mb-4">
                    Welcome to <strong>Shadow Voice</strong>! These Terms and Conditions ("Terms") govern your access to
                    and use of our application. By using Shadow Voice, you agree to comply with these Terms.
                </p>

                <h2 className="text-2xl font-semibold mt-6">1. Account Registration and Use</h2>
                <ul className="list-disc pl-8 mb-4">
                    <li>You must create an account using a valid email, password, and a chosen nickname. Do not use your
                        real name as your username.
                    </li>
                    <li>Your email will be verified upon registration and will only be used for this purpose.</li>
                    <li>Google or Apple login is also available.</li>
                    <li>You are responsible for securing your login credentials and account activity.</li>
                    <li>Multiple accounts, impersonation, or account sharing is prohibited.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">2. Privacy and Anonymity</h2>
                <ul className="list-disc pl-8 mb-4">
                    <li>You must use a nickname instead of your real name to maintain anonymity.</li>
                    <li>Revealing or attempting to reveal other users' real identities is not allowed.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">3. User Conduct</h2>
                <ul className="list-disc pl-8 mb-4">
                    <li>Posting harmful, illegal, or offensive content is prohibited.</li>
                    <li>Harassment, hate speech, and spamming are strictly forbidden.</li>
                    <li>Violating these rules may result in account suspension or ban.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">4. Content Ownership and Usage</h2>
                <ul className="list-disc pl-8 mb-4">
                    <li>You own any content you post but grant Shadow Voice a license to use it within the platform.
                    </li>
                    <li>Ensure you have rights to any content you share.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">5. Termination of Service</h2>
                <ul className="list-disc pl-8 mb-4">
                    <li>We may suspend or terminate your account if you violate these Terms.</li>
                    <li>We reserve the right to modify or discontinue services without notice.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">6. Limitation of Liability</h2>
                <ul className="list-disc pl-8 mb-4">
                    <li>Shadow Voice is provided "as is" without any warranties.</li>
                    <li>We are not responsible for data loss, unauthorized access, or service interruptions.</li>
                </ul>
            </div>

            <footer className="w-full text-center text-gray-400 text-sm p-4 border-gray-700">
                <div className="flex justify-center space-x-4">
                    <Link href="/footer/about/" className="hover:text-white transition">About</Link>
                    <Link href="/footer/cookie/" className="hover:text-white transition">Cookie Policy</Link>
                    <Link href="/footer/privacy/" className="hover:text-white transition">Privacy Policy</Link>
                    <Link href="/footer/Terms/" className="hover:text-white transition">Terms of Service</Link>
                    <Link href="/footer/contact/" className="hover:text-white transition">Contact Us</Link>
                    <p className="mt-2">&copy; {new Date().getFullYear()} Shadow Voice. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default TermsAndConditions;