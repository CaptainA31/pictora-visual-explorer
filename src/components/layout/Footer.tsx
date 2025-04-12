
import React from 'react';
import { Link } from 'react-router-dom';
import PictoraLogo from '../ui/PictoraLogo';

const Footer = () => {
  return (
    <footer className="border-t border-pictora-teal/10 bg-pictora-cream py-6">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <PictoraLogo className="h-8 w-8" />
            <span className="font-playfair text-xl font-bold text-pictora-teal">Pictora.ai</span>
          </div>
          <p className="text-pictora-teal/70 text-sm text-center md:text-right">
            &copy; {new Date().getFullYear()} Pictora.ai - Where Every Image Tells a Story
          </p>
        </div>
        <div className="mt-4 flex flex-col md:flex-row justify-center md:justify-end items-center gap-4">
          <Link to="/" className="text-pictora-teal/70 text-sm hover:text-pictora-teal">
            Privacy Policy
          </Link>
          <Link to="/" className="text-pictora-teal/70 text-sm hover:text-pictora-teal">
            Terms of Service
          </Link>
          <Link to="/" className="text-pictora-teal/70 text-sm hover:text-pictora-teal">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
