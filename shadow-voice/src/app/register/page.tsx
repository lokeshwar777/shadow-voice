'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Signup() {
    const [form, setForm] = useState({ email: '', username: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="relative w-full max-w-7/15 bg-gray-900 p-8 bg-opacity-80 rounded-lg shadow-lg flex flex-col">
                <div className="flex flex-col pl-4 pt-5 absolute top-4 left-4">
                    <h1 className="text-4xl font-bold text-white italic font-extrabold tracking-wider">SHADOW VOICE</h1>
                    <h2 className="text-3xl font-bold text-gray-350 mt-4">Sign up</h2>
                    <p className="text-gray-400 font-bold pt-4">Create your account</p>
                </div>
                <div className="w-full ml-120 mt-5">
                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter the Email id"
                                value={form.email}
                                onChange={handleChange}
                                className="p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-5/15"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter the username"
                                value={form.username}
                                onChange={handleChange}
                                className="p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-5/15"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter the password"
                                value={form.password}
                                onChange={handleChange}
                                className="p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-5/15"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-2/15 ml-37 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition"
                        >
                            SIGN IN
                        </button>
                    </form>
                </div>
                <p className="mt-2 text-gray-400">
                    Already have an account?{' '}
                    <Link href="/login/" className="text-blue-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
            <footer className="absolute bottom-2 w-full text-center text-gray-400 text-sm">
                <div className="flex justify-center space-x-4">
                    <Link href="/footer/about/" className="hover:text-white transition">About</Link>
                    <Link href="/footer/cookie/" className="hover:text-white transition">Cookie Policy</Link>
                    <Link href="/footer/privacy/" className="hover:text-white transition">Privacy Policy</Link>
                    <Link href="/footer/Terms/" className="hover:text-white transition">Terms of Service</Link>
                    <Link href="/footer/contact/" className="hover:text-white transition">Contact Us</Link>
                    <p className="mt-1 justify-center">&copy; {new Date().getFullYear()} Shadow Voice. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}