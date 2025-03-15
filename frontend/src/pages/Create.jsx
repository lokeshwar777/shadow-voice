import React from "react";
import { Link } from "react-router-dom";
import { FileText, BarChart2 } from "lucide-react";

const Create = () => {
    return (
        <div className="app-container py-8 animate-fadeIn">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-center mb-8">Create Content</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-all duration-300">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <FileText size={28} className="text-primary" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Create a Post</h2>
                            <p className="text-muted-foreground mb-6">
                                Share your thoughts, ideas, or questions with the community
                            </p>
                            <Link to="/create-post" className="btn-primary w-full">
                                Create Post
                            </Link>
                        </div>
                    </div>

                    <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-all duration-300">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <BarChart2 size={28} className="text-primary" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Create a Poll</h2>
                            <p className="text-muted-foreground mb-6">
                                Ask a question and gather opinions from the community
                            </p>
                            <Link to="/create-poll" className="btn-primary w-full">
                                Create Poll
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
