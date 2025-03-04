'use client';
import React from "react";
import Link from "next/link";

const AboutUs = () => {
    return (
        <div className="bg-black text-white min-h-screen flex flex-col p-6">
            <div className="max-w-3xl mx-auto text-center mb-5">
                <h1 className="text-4xl font-bold text-blue-400 mb-4">About Us</h1>
                <p className="text-lg text-gray-400">Welcome to Shadow Voice!</p>

                <p className="mt-4">
                    Shadow Voice is an innovative social media platform designed to foster open discussions while
                    maintaining complete user anonymity. Our goal is to provide a safe and secure environment where
                    users can freely express their thoughts without the fear of being identified in the real world.
                </p>

                <h2 className="text-3xl font-semibold text-green-400 mt-8">Our Mission</h2>
                <ul className="pl-6 mt-4 text-center">
                    <li>Provide a secure and anonymous space for users to engage in meaningful discussions.</li>
                    <li>Encourage a respectful and inclusive community.</li>
                    <li>Maintain user privacy with strict data protection measures.</li>
                    <li>Innovate continuously to enhance user experience and security.</li>
                </ul>

                <h2 className="text-3xl font-semibold text-yellow-400 mt-8">Who We Are</h2>
                <p className="mt-4">
                    Shadow Voice is a major project developed by students of BVRIT, as part of their final year major
                    project. The project was designed and implemented by a dedicated team from the CSE-C class.
                </p>

                <h3 className="text-2xl font-semibold text-red-400 mt-6">Presented By:</h3>
                <ul className="list-none mt-2">
                    <li>Mulla Vivek (Roll No: 21211A05H8)</li>
                    <li>Mukash (Roll No: 21211A05E-)</li>
                    <li>Lokeshwar (Roll No: 21211A05E-)</li>
                    <li>Naran (Roll No: 21211A05J-)</li>
                </ul>

                <p className="mt-6">
                    This project is the result of extensive research, design, and development, ensuring that anonymity
                    and privacy are the core foundations of the platform. We are committed to delivering a user-friendly
                    experience while upholding the highest security and ethical standards.
                </p>

                <h2 className="text-3xl font-semibold text-purple-400 mt-8">Get in Touch</h2>
                <p className="mt-4">If you have any feedback, questions, or suggestions, feel free to reach out to us.
                    We appreciate your support and look forward to building a strong and positive community
                    together!</p>
            </div>

            {/* Footer Section */}
            <div className="relative mb-2 mt-auto">
                <footer className="absolute bottom w-full text-center text-gray-400 text-sm">
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
        </div>
    );
};

export default AboutUs;
