'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ShadowVoiceLanding: React.FC = () => {
    const [showRegister, setShowRegister] = useState<boolean>(false);
    const [form, setForm] = useState<{ email: string; username: string; password: string }>({
        email: "",
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted:", form);
    };

    return (
        <div className="relative min-h-screen flex flex-col text-white">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
            >
                <source src="/bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Main Content */}
            <div className="flex flex-grow items-center justify-center p-4 bg-opacity-50">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-6 bg-gray-900 bg-opacity-75 rounded-lg shadow-lg flex flex-col items-center">
                    {/* Header Text */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">Where Echoes Remain</h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mt-2">Join Now</p>

                    {/* Signup Buttons */}
                    <div className="flex flex-col items-center gap-4 w-full mt-5">
                        <button className="w-full sm:w-3/4 md:w-2/3 bg-gray-800 hover:bg-gray-700 py-2 rounded-lg flex items-center justify-center gap-2 transition">
                            <Image src="/google.svg" alt="Google" width={24} height={24} />
                            <span>Sign up with Google</span>
                        </button>

                        <button className="w-full sm:w-3/4 md:w-2/3 bg-blue-800 hover:bg-blue-700 py-2 rounded-lg flex items-center justify-center gap-2 transition">
                            <Image src="/apple.svg" alt="Apple" width={24} height={24} />
                            <span>Sign up with Apple</span>
                        </button>

                        {/* Divider */}
                        <div className="flex items-center w-full">
                            <div className="w-2/5 border-b border-gray-600"></div>
                            <p className="mx-2 text-gray-400">or</p>
                            <div className="w-2/5 border-b border-gray-600"></div>
                        </div>

                        {/* Create Account Button */}
                        <button
                            className="w-full sm:w-3/4 md:w-2/3 bg-blue-500 hover:bg-blue-600 py-2 rounded-lg transition"
                            onClick={() => setShowRegister(true)}
                        >
                            Create Account
                        </button>
                    </div>

                    {/* Terms & Privacy Notice */}
                    <p className="text-xs text-center mt-4">
                        By signing up, you agree to the{" "}
                        <Link href="/footer/Terms/" className="text-blue-400 hover:underline transition">Terms of Service</Link>
                        {" "}and{" "}
                        <Link href="/footer/privacy/" className="text-blue-400 hover:underline transition">Privacy Policy</Link>
                        , including{" "}
                        <Link href="/footer/cookie/" className="text-blue-400 hover:underline transition">Cookie Use</Link>.
                    </p>

                    {/* Login Link */}
                    <p className="text-sm mt-4 text-center">
                        Already have an account?
                        <Link href="/login/" className="ml-2 text-blue-400 hover:underline">Login</Link>
                    </p>
                </div>
            </div>

            {/* Register Modal */}
            {showRegister && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl p-6 bg-gray-900 rounded-lg shadow-lg relative">
                        <button className="absolute top-2 right-2 text-white text-xl" onClick={() => setShowRegister(false)}>
                            ✕
                        </button>
                        <div className="w-full bg-gray-900 flex flex-col p-4">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">SHADOW VOICE</h1>
                            <h2 className="text-xl sm:text-2xl mt-2">Sign up</h2>
                            <p className="text-gray-400 text-sm mt-2">Create your account</p>

                            <form onSubmit={handleSubmit} className="mt-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Enter your username"
                                        value={form.username}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition">
                                    SIGN IN
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="absolute bottom-2 w-full text-center text-gray-400 text-sm p-4">
                <div className="flex flex-wrap justify-center space-x-4">
                    <Link href="/footer/about/" className="hover:text-white transition">About</Link>
                    <Link href="/footer/cookie/" className="hover:text-white transition">Cookie Policy</Link>
                    <Link href="/footer/privacy/" className="hover:text-white transition">Privacy Policy</Link>
                    <Link href="/footer/Terms/" className="hover:text-white transition">Terms of Service</Link>
                    <Link href="/footer/contact/" className="hover:text-white transition">Contact Us</Link>
                    <p className="">&copy; {new Date().getFullYear()} Shadow Voice. All rights reserved.</p>
                </div>

            </footer>
        </div>
    );
};

export default ShadowVoiceLanding;
