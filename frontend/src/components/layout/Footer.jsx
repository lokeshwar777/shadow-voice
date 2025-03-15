import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-6 md:py-0 border-t mt-auto">
            <div className="app-container items-center gap-8 py-8">
                <div className="space-y-4 items-center">
                    <h3 className="text-lg font-semibold">Shadow-Voice</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        Share your thoughts anonymously or publicly, create polls, and get AI-powered insights.
                    </p>
                </div>
            </div>

            <div className="border-t">
                <div className="app-container flex flex-col md:flex-row justify-between items-center py-4 text-sm text-muted-foreground">
                    <p>© {currentYear} Shadow-Voice. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;