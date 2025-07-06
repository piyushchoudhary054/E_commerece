
import React from 'react';
import { SearchIcon, ShoppingCartIcon } from './Icons';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, onLogoClick, searchTerm, onSearchChange }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={onLogoClick}
          >
            <span className="text-3xl font-bold text-brand-primary group-hover:text-brand-dark transition-colors">GemStore</span>
          </div>

          <div className="hidden md:block w-full max-w-sm lg:max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCartIcon className="h-7 w-7" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-6 w-6 text-xs font-bold text-white bg-brand-secondary rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="md:hidden pb-4 px-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
