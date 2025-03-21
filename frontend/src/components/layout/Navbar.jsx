import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import { Home, BarChart, User, PlusCircle, LogOut, FileText } from 'lucide-react';
import UserAvatar from '../../components/ui/UserAvatar';

const Navbar = () => {
    const location = useLocation();
    const { user, isAuthenticated, logout } = useAuth();

    const navItems = [
        {
            label: 'Feed',
            icon: <Home size={20} />,
            path: '/dashboard',
        },
        {
            label: 'Posts',
            icon: <FileText size={20} />,
            path: '/posts',
        },
        {
            label: 'Polls',
            icon: <BarChart size={20} />,
            path: '/polls',
        },
        {
            label: 'Profile',
            icon: <User size={20} />,
            path: '/profile',
            requiresAuth: true,
        },
    ];

    const filteredNavItems = navItems.filter(item =>
        !item.requiresAuth || (item.requiresAuth && isAuthenticated)
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200">
            <div className="app-container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center">
                        <span className="text-xl font-bold text-primary">ShadowVoice</span>
                    </Link>

                    <nav className="hidden md:flex space-x-1">
                        {filteredNavItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "nav-link",
                                    location.pathname === item.path && "active"
                                )}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/create"
                                className="btn-primary hidden md:flex"
                            >
                                <PlusCircle size={16} className="mr-2" />
                                Create
                            </Link>

                            <div className="flex items-center gap-2">
                                <Link to="/profile" className="flex items-center gap-2">
                                    <span className="hidden md:inline-block">{user?.name}</span>
                                    <UserAvatar user={user} />
                                </Link>

                                <button
                                    onClick={() => logout()}
                                    className="text-muted-foreground hover:text-destructive p-2 rounded-full transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link to="/auth" className="btn-secondary">
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-2 flex justify-around z-50">
                {filteredNavItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                            "flex flex-col items-center p-2 rounded-md",
                            location.pathname === item.path
                                ? "text-primary"
                                : "text-muted-foreground"
                        )}
                    >
                        {item.icon}
                        <span className="text-xs mt-1">{item.label}</span>
                    </Link>
                ))}
                {isAuthenticated && (
                    <Link
                        to="/create"
                        className="flex flex-col items-center p-2 text-primary"
                    >
                        <PlusCircle size={20} />
                        <span className="text-xs mt-1">Create</span>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Navbar;
