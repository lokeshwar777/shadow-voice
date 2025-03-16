import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <span className="text-xl font-semibold text-primary">
                Shadow<span className="font-light">Voice</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ShadowVoice. All rights reserved.
            </p>
            <div className="text-sm text-muted-foreground flex space-x-4 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>  
          </div>
        </div>
      </footer>
    );
};

export default Footer;