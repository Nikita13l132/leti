import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navigationItems = [
    { name: 'Главная', path: '/', icon: <Home size={18} /> },
    { name: 'Виртуальный тур', path: '/tour', icon: <Home size={18} /> },
    { name: 'О проекте', path: '/about', icon: <Info size={18} /> },
  ];

  return (
    <>
      {/* Fixed header/navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="text-xl font-bold text-foreground flex items-center gap-2"
            >
              <span className="block w-6 h-6 rounded-full bg-primary" />
              ЛЭТИ Тур
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                    location.pathname === item.path 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-foreground/80 hover:bg-primary/5 hover:text-foreground"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden rounded-md p-2 text-foreground hover:bg-primary/5"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 transform transition-transform ease-in-out duration-300 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="bg-background h-full w-full flex flex-col">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link 
              to="/" 
              className="text-xl font-bold text-foreground"
              onClick={() => setIsOpen(false)}
            >
              ЛЭТИ Тур
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md text-foreground hover:bg-primary/5"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="flex flex-col space-y-1 px-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                    location.pathname === item.path 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-foreground/80 hover:bg-primary/5 hover:text-foreground"
                  )}
                >
                  {item.icon}
                  <span className="text-lg">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Add spacing to ensure content doesn't hide behind the fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Navigation;
