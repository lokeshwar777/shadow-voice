import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BarChart, User, PlusCircle, LogOut, X } from 'lucide-react';
import UserAvatar from '../../components/ui/UserAvatar';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, handleLogout } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const navItems = [
        { label: 'Feed', icon: <Home size={20} />, path: '/' },
        { label: 'Polls', icon: <BarChart size={20} />, path: '/polls' },
        { label: 'Profile', icon: <User size={20} />, path: '/profile' }
    ];

    const handleConfirmLogout = () => {
        console.log("Logging out...");  // Debugging log
        if (handleLogout) {
            handleLogout();  // Ensure this function exists
            console.log("User logged out successfully");  // Confirm logout
        } else {
            console.error("handleLogout function is undefined! Check AuthContext.");
        }
        setShowModal(false);
        navigate('/'); // Redirect after logout
    };

    return (
        <>
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
                <div className="app-container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-xl font-semibold text-primary">
                            Shadow<span className="font-light">Voice</span>
                        </Link>
                        <nav className="hidden md:flex space-x-4">
                            {navItems.map(item => (
                                <Link key={item.path} to={item.path} className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}>
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/create" className="btn-primary hidden md:flex">
                            <PlusCircle size={16} className="mr-2" />Create
                        </Link>
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <Link to="/profile" className="flex items-center gap-2">
                                    <span className="hidden md:inline-block">{user?.name}</span>
                                    <UserAvatar user={user} />
                                </Link>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="btn-secondary flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition"
                                >
                                    <LogOut size={16} />
                                    <span className="hidden md:inline">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn-secondary">Login</Link>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-2 flex justify-around">
                    {navItems.map(item => (
                        <Link key={item.path} to={item.path} className={`flex flex-col items-center p-2 rounded-md ${location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'}`}>
                            {item.icon}
                            <span className="text-xs mt-1">{item.label}</span>
                        </Link>
                    ))}
                    <Link to="/create" className="flex flex-col items-center p-2 text-primary">
                        <PlusCircle size={20} />
                        <span className="text-xs mt-1">Create</span>
                    </Link>
                </div>
            </header>

            {/* Logout Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Confirm Logout</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={18} />
                            </button>
                        </div>
                        <p className="mt-2 text-gray-600">Are you sure you want to log out?</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                            >
                                No
                            </button>
                            <button
                                onClick={handleConfirmLogout}
                                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
