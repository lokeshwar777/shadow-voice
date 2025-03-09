'use client';
import { useState } from "react";
import { Settings, Menu, X } from "lucide-react";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("posts");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="bg-black text-white min-h-screen flex flex-col md:flex-row">
            {/* Sidebar / Mobile Menu */}
            <aside className="w-full md:w-64 bg-black p-5 border-b md:border-r border-gray-700">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold italic">SHADOW-VOICE</h1>

                    {/* Hamburger Menu (Mobile) */}
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className={`${isMenuOpen ? "block" : "hidden"} md:block mt-4 space-y-4`}>
                    <a href="#" className="flex items-center space-x-2"><span>🏠</span> <span>Home</span></a>
                    <a href="#" className="flex items-center space-x-2"><span>🔍</span> <span>Search</span></a>
                    <a href="#" className="flex items-center space-x-2"><span>🔔</span> <span>Notifications</span></a>
                    <a href="#" className="flex items-center space-x-2"><span>✉️</span> <span>Messages</span></a>
                    <a href="#" className="flex items-center space-x-2"><span>➕</span> <span>Create</span></a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div className="w-24 h-24 md:w-40 md:h-40 bg-gray-600 rounded-full"></div>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-4xl font-semibold">username</h2>
                        <p className="text-white text-sm md:text-lg mt-2">-- posts -- polls -- messages</p>
                        <p className="text-gray-400 text-xs md:text-sm mt-2">Short user bio or description goes here...</p>
                    </div>
                </div>

                {/* Buttons & Settings */}
                <div className="flex flex-wrap justify-center md:justify-start mt-4 space-x-2 md:space-x-5">
                    <button className="bg-gray-950 bg-opacity-50 hover:bg-gray-800 text-white font-semibold py-2 px-4 text-xs rounded-md transition">Edit Profile</button>
                    <button className="bg-gray-950 hover:bg-gray-800 bg-opacity-50 text-white font-semibold py-2 px-4 text-xs rounded-md transition">View Archive</button>
                    <Settings className="mt-2 cursor-pointer" size={20} />
                </div>

                {/* Tabs */}
                <div className="flex justify-center md:justify-start mt-6 border-b border-gray-700 space-x-6">
                    <button className={`${activeTab === "posts" ? "border-b-2 border-white" : "text-gray-400"}`} onClick={() => setActiveTab("posts")}>Posts</button>
                    <button className={`${activeTab === "polls" ? "border-b-2 border-white" : "text-gray-400"}`} onClick={() => setActiveTab("polls")}>Polls</button>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6">
                    {[...Array(9)].map((_, index) => (
                        <div key={index} className="bg-red-400 text-white p-20 text-center rounded-md">Post {index + 1}</div>
                    ))}
                </div>
            </main>
        </div>
    );
}
