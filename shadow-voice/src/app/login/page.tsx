'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Signup() {
    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            username: form.username,
            password: form.password,
        });

        if (result?.error) {
            console.error(result.error);
        } else {
            // Redirect to dashboard or another page
            window.location.href = "/dashboard";
        }
        console.log(form);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-6 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold italic tracking-wider text-white">SHADOW VOICE</h1>
                    <h2 className="text-xl sm:text-2xl text-gray-400 mt-4">Use your account</h2>
                </div>
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Link href="/register" className="text-blue-400 hover:underline">Create account</Link>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md transition"
                        >
                            LOG IN
                        </button>
                    </div>
                </form>
            </div>
            <footer className="absolute bottom-4 w-full text-center text-gray-400 text-sm px-4">
                <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
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
