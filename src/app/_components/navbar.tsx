'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Menu, X, Home, ShoppingBag, Info } from 'lucide-react';
import { AuthButton } from './auth-button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/orders', label: 'My Orders', icon: ShoppingBag },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight text-stone-900 hover:text-green-600 transition-colors">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">
            <Leaf size={16} className="sm:w-[18px] sm:h-[18px]" />
          </div>
          <span className="hidden sm:inline">Organic Eats</span>
          <span className="sm:hidden">OE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(link.href)
                    ? 'bg-green-100 text-green-700'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Button */}
        <div className="hidden md:flex items-center gap-4">
          <AuthButton />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-stone-700" />
          ) : (
            <Menu className="w-6 h-6 text-stone-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-green-100 text-green-700'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-stone-200 mt-2">
              <AuthButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;