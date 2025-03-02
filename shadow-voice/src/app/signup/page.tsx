'use client';

import { useState } from 'react' ;
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const ShadowVoiceLanding = () => {
    const router = useRouter();
    const [showRegister, setShowRegister] = useState(false);
    return (
        <div className="relative min-h-screen flex flex-col text-white">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover z-[-1]"
            >
                <source src="/bg.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>

            {/* Content Wrapper */}
            <div className="flex flex-grow items-center justify-center bg-black bg-opacity-50">
                <div
                    className="w-full max-w-md p-6 bg-gray-900 bg-opacity-75 rounded-lg shadow-lg flex flex-col items-center">
                    {/* Left-aligned text */}
                    <div className="w-full text-left mb-3">
                        <h1 className="text-5xl font-roboto font-bold m-2 p-2">Tell the world</h1>
                        <p className="text-3xl font-roboto font-bold text-white m-2 p-2">with a Veil</p>
                        <p className="text-gray-400 m-2 p-2">Join Now</p>
                    </div>

                    {/* Signup Options */}
                    <div className="flex flex-col items-center gap-4 w-full mt-5">
                        <button
                            className="w-full bg-gray-800 hover:bg-gray-700 py-2 rounded-lg transition flex items-center justify-center gap-2">
                            <Image src="/google.svg" alt="Google" width={24} height={24}/>
                            <span>Sign up with Google</span>
                        </button>

                        <button
                            className="w-full bg-blue-800 hover:bg-blue-700 py-2 rounded-lg transition flex items-center justify-center gap-2">
                            <Image src="/apple.svg" alt="Apple" width={24} height={24}/>
                            <span>Sign up with Apple</span>
                        </button>

                        {/* Divider */}
                        <div className="flex items-center w-full">
                            <div className="w-2/3 border-b border-gray-600"></div>
                            <p className="mx-2 text-gray-400">or</p>
                            <div className="w-2/3 border-b border-gray-600"></div>
                        </div>

                        {/* Create Account */}
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg transition"
                            onClick={() => setShowRegister(true)}
                        >
                            Create Account
                        </button>
                        <p className="text-xs">By signing up, you agree to the
                            <Link href="/footer/Terms/" className="text-blue-400 hover:underline transition"> Terms
                                of Service</Link> and
                            <Link href="/footer/privacy/"
                                  className="text-blue-400 hover:underline transition"> Privacy Policy</Link>, including
                            <Link href="/footer/cookie/"
                                  className="text-blue-400 hover:underline transition"> Cookie Use</Link>.
                        </p>
                    </div>

                    {/* Login Link - Left-aligned */}
                    <p className="text-sm mt-4 w-full text-left">
                        Already have an account?
                        <Link href="/login/" className="ml-2 text-blue-400 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>

            {/* Register Popup */}
            {showRegister && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-sm p-6 bg-gray-900 rounded-lg shadow-lg relative">
                        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                        <button
                            className="absolute top-2 right-2 text-white text-xl"
                            onClick={() => setShowRegister(false)}
                        >
                            ✕
                        </button>
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg transition"
                            onClick={() => router.push('/register')}
                        >
                            Continue to Register
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="w-full py-1 bg-gray-900 text-gray-400 text-center bg-opacity-60">
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/footer/about/" className="hover:text-white transition">About</Link>
                    <Link href="/footer/cookie/" className="hover:text-white transition">Cookie Policy</Link>
                    <Link href="/footer/privacy/" className="hover:text-white transition">Privacy Policy</Link>
                    <Link href="/footer/Terms/" className="hover:text-white transition">Terms of Service</Link>
                    <Link href="/footer/contact/" className="hover:text-white transition">Contact Us</Link>
                    <p className="mt-1">&copy; {new Date().getFullYear()} -------. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ShadowVoiceLanding;
