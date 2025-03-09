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
        <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl bg-gray-900 p-8 bg-opacity-80 rounded-lg shadow-lg flex flex-col">
                <div className="flex flex-col pb-6">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white italic tracking-wider">SHADOW VOICE</h1>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-350 mt-2">Sign up</h2>
                    <p className="text-gray-400 font-bold pt-2">Create your account</p>
                </div>
                <div className="space-x-50">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="items-center">
                    <button
                        type="submit"
                        className="w-full max-w-1/4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition"
                    >
                        SIGN UP
                    </button>
                    </div>
                </form>
                </div>
                <p className="mt-4 text-gray-400">
                    Already have an account?{' '}
                    <Link href="/login/" className="text-blue-400 hover:underline">Login</Link>
                </p>
            </div>
            <footer className="absolute bottom-2 w-full text-center text-gray-400 text-sm p-2">
                <div className="flex flex-wrap justify-center space-x-4">
                    <Link href="/footer/about/" className="hover:text-white transition">About</Link>
                    <Link href="/footer/cookie/" className="hover:text-white transition">Cookie Policy</Link>
                    <Link href="/footer/privacy/" className="hover:text-white transition">Privacy Policy</Link>
                    <Link href="/footer/Terms/" className="hover:text-white transition">Terms of Service</Link>
                    <Link href="/footer/contact/" className="hover:text-white transition">Contact Us</Link>
                    <p>&copy; {new Date().getFullYear()} Shadow Voice. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
