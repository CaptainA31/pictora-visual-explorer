
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Clock, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PictoraLogo from '../ui/PictoraLogo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children, icon }: { to: string; children: React.ReactNode; icon: React.ReactNode }) => (
    <Link to={to} className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${isActive(to) ? 'bg-pictora-teal text-white' : 'text-pictora-teal hover:bg-pictora-teal/10'}`}>
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  );

  const NavLinks = () => (
    <>
      <NavLink to="/" icon={<Home size={20} />}>
        Home
      </NavLink>
      <NavLink to="/text-search" icon={<Search size={20} />}>
        Text Search
      </NavLink>
      <NavLink to="/history" icon={<Clock size={20} />}>
        History
      </NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-30 w-full border-b border-pictora-teal/10 bg-pictora-cream/80 backdrop-blur-md">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <PictoraLogo className="h-10 w-10" />
          <span className="font-playfair text-2xl font-bold text-pictora-teal">Pictora.ai</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden ml-auto md:flex items-center gap-4">
          <NavLinks />
        </nav>
        
        {/* Mobile Navigation */}
        <div className="flex ml-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-pictora-teal/20">
                <Menu className="h-5 w-5 text-pictora-teal" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] bg-pictora-cream border-pictora-teal/20">
              <div className="flex flex-col mt-8 space-y-2">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
