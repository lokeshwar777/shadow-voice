
export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
            <div className="text-center max-w-2xl">
                <span className="bg-blue-200 text-black-700 px-3 py-1 rounded-full text-sm font-medium">Welcome to ShadowVoice</span>
                <h1 className="text-4xl font-bold text-black-900 mt-4">
                    Where your voice is heard, <span className="text-gray-700">not your identity</span>
                </h1>
                <p className="text-black-600 text-lg mt-4">
                    An anonymous social platform where you can freely express your thoughts, create polls,
                    and receive honest feedback without revealing who you are.
                </p>
                <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition">
                    Get Started →
                </button>
            </div>
        </div>
    );
}
