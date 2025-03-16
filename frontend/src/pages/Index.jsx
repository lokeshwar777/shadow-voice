import { useState } from "react";

export default function LandingPage() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        setPasswordError("");
        // Proceed with signup logic
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
                <h1 className="text-xl font-bold text-blue-600">Shadow<span className="text-xl font-bold text-blue-400">Voice</span></h1>
                <button 
                    className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
                    onClick={() => setShowLogin(true)}
                >
                    Login
                </button>
            </nav>

            {/* Hero Section */}
            <header className="text-center py-16 bg-white shadow-sm">
                <span className="bg-blue-200 text-black-700 px-3 py-1 rounded-full text-sm font-medium">Welcome to ShadowVoice</span>
                <h1 className="text-4xl font-bold mt-2">Where your voice is heard, <br/> not your identity</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    An anonymous social platform where you can freely express your thoughts, create polls, and receive
                    honest feedback without revealing who you are.
                </p>
                <button 
                    className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-lg text-lg font-medium hover:bg-blue-600"
                    onClick={() => setShowSignup(true)}
                >
                    Get Started →
                </button>
            </header>


            {/* Features Section */}
            <section className="py-16 text-center bg-gray-50">
                <h2 className="text-3xl font-bold">Why Choose ShadowVoice?</h2>
                <p className="text-gray-600 mt-2">Our platform is designed with privacy and expression in mind.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">
                    <FeatureCard title="Share Your Thoughts" desc="Create posts and express yourself without fear of judgment." icon="💬" />
                    <FeatureCard title="Private & Secure" desc="Your identity is protected unless you choose to reveal it." icon="🔒" />
                    <FeatureCard title="Get Honest Feedback" desc="Create polls and gather genuine opinions from the community." icon="👁️" />
                    <FeatureCard title="Stay Anonymous" desc="Toggle between anonymous and public modes for each interaction." icon="👤" />
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 text-center bg-white shadow-md mx-4 md:mx-0 rounded-lg">
                <h2 className="text-2xl font-bold">Ready to find your voice?</h2>
                <p className="text-gray-600 mt-2 max-w-lg mx-auto">
                    Join thousands of people who are already expressing themselves freely and getting honest feedback on ShadowVoice.
                </p>
                <button 
                    className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-lg text-lg font-medium hover:bg-blue-600"
                    onClick={() => setShowSignup(true)}
                >
                    Create an account
                </button>
            </section>

            {/* Login Modal */}
            {showLogin && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
                        <button 
                            className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl"
                            onClick={() => setShowLogin(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-600 text-sm mb-1">Email</label>
                                <input type="email" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" required />
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm mb-1">Password</label>
                                <input type="password" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" required />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Login</button>
                        </form>
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Don't have an account? <a href="#" className="text-blue-500 hover:underline" onClick={() => { setShowLogin(false); setShowSignup(true); }}>Sign Up</a>
                        </p>
                    </div>
                </div>
            )}

            {/* Signup Modal */}
            {showSignup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
                        <button 
                            className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl"
                            onClick={() => setShowSignup(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
                        <form className="space-y-4" onSubmit={handleSignupSubmit}>
                            <div>
                                <label className="block text-gray-600 text-sm mb-1">Email</label>
                                <input type="email" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" required />
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm mb-1">Password</label>
                                <input 
                                    type="password" 
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    placeholder="Enter your password" 
                                    required 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm mb-1">Confirm Password</label>
                                <input 
                                    type="password" 
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    placeholder="Confirm your password" 
                                    required 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Sign Up</button>
                        </form>
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Already have an account? <a href="#" className="text-blue-500 hover:underline" onClick={() => { setShowSignup(false); setShowLogin(true); }}>Login</a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// Feature Card Component
function FeatureCard({ title, desc, icon }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-lg">
            <div className="text-3xl">{icon}</div>
            <h3 className="text-lg font-semibold mt-4">{title}</h3>
            <p className="text-gray-600 mt-2">{desc}</p>
        </div>
    );
}
