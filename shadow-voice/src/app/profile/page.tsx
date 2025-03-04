'use client';
import { useState } from "react";
import { Settings } from "lucide-react";
// import { Button } from "@/components/ui/button";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("posts");

    return (
        <div className="bg-black text-white min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-black p-5 border-r border-gray-700">
                <h1 className="text-2xl font-bold italic ">SHADOW-VOICE</h1>
                <nav className="mt-6 space-y-4">
                    <a href="#" className="flex items-center space-x-2"><span>🏠</span> <span>Home</span></a>
                    <a href="#" className="flex items-center space-x-2"><span>🔍</span> <span>Search</span></a>
                    <a href="#" className="flex items-center space-x-2"><span>🔔</span> <span>Notification</span></a>
                    <a href="#" className="flex items-center space-x-2"><span>✉️</span> <span>Message</span></a>
                    <a href="#" className="flex items-center space-x-2"><span>➕</span> <span>Create</span></a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="flex items-center ml-50 mb-10 space-x-6">
                    <div className="w-40 h-40 bg-gray-600 rounded-full"></div>
                    <div>
                        <h2 className="text-4xl font-semibold mb-10">username</h2>
                        <p className="text-white text-2xl">-- posts -- polls -- Message</p>
                        <p className="text-gray-400 text-sm mt-10">Short user bio or description goes here...</p>
                    </div>
                    <button className="w-full mt-[-100] max-w-30 bg-gray-950 bg-opacity-50 border-1 hover:bg-gray-800 text-white justify-center font-semibold py-2 rounded-md text-xs transition">Edit profile</button>
                    <button className="w-full max-w-30 mt-[-100] ml-5 bg-gray-950 hover:bg-gray-800 bg-opacity-50 text-white font-semibold border-1  justify-center py-2 text-xs rounded-md transition">View archive</button>
                    <Settings className="cursor-pointer mt-[-100]" size={20} />
                </div>

                {/* Tabs */}
                <div className="ml-50 mr-50 mt-4 border-b border-gray-700  flex space-x-200">
                    <button className={`${activeTab === "posts" ? "border-b-2 border-white" : "text-gray-400"}`} onClick={() => setActiveTab("posts")}>Posts</button>
                    <button className={`${activeTab === "polls" ? "border-b-2 border-white" : "text-gray-400"}`} onClick={() => setActiveTab("polls")}>Polls</button>
                </div>

                {/* Content Grid */}
                <div className="grid ml-50 mr-50 grid-cols-3 gap-1 mt-6">
                    {[...Array(9)].map((_, index) => (
                        <div key={index} className="bg-red-400 text-white py-30 p-2 text-center rounded-md">Post {index + 1}</div>
                    ))}
                </div>
            </main>
        </div>
    );
}
