'use client';

import { useState } from "react";
import Link from "next/link";

export default function Signup() {
    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <div className="flex items-center justify-center  min-h-screen bg-black text-white">
            <div className="relative w-full max-w-7/15  p-8 bg-gray-900 pt-2 bg-opacity-80 rounded-lg shadow-lg flex flex-col">
                <div className="flex flex-col absolute pl-5 pt-4 top-4 left-4">
                    <h1 className="text-4xl font-bold text-white italic font-extrabold tracking-wider">SHADOW VOICE</h1>
                    <h2 className="text-2xl mt-6 text-gray-450 mt-2">use your account</h2>
                </div>
                <div className="w-full ml-120 mb-3 mt-5">
                    <form onSubmit={handleSubmit} className="mt-6">
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
                        <div className="ml-7 flex items-center">
                            <Link href="/register" className="pr-5 text-blue-400 hover:underline">create account</Link>
                            <button type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white w-full max-w-2/15 h-10 rounded-lg">LOG IN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <footer className="absolute bottom-2 w-full text-center text-gray-400 text-sm">
                <div className="flex justify-center space-x-4">
                    <Link href="/footer/about/" className="hover:text-white transition">About</Link>
                    <Link href="/footer/cookie/" className="hover:text-white transition">Cookie Policy</Link>
                    <Link href="/footer/privacy/" className="hover:text-white transition">Privacy Policy</Link>
                    <Link href="/footer/Terms/" className="hover:text-white transition">Terms of Service</Link>
                    <Link href="/footer/contact/" className="hover:text-white transition">Contact Us</Link>
                    <p className="mt-1 justify-center">&copy; {new Date().getFullYear()} Shadow Voice. All rights
                        reserved.</p>
                </div>
            </footer>
        </div>
    );
}
