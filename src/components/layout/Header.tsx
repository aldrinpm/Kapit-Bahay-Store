import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { useStore } from '../../providers/StoreProvider';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { cart } = useStore();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-kapit-primary shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Brand */}
        <div className="text-2xl font-extrabold text-kapit-secondary">
          Kapit-Bahay Store
        </div>
        
        {/* Desktop Navigation / Search Area */}
        <div className="hidden md:flex items-center space-x-6">
          <input 
            type="search" 
            placeholder="Search for essentials..." 
            className="p-2 border border-gray-300 rounded-lg focus:ring-kapit-accent focus:border-kapit-accent w-64" 
          />
          <button onClick={onCartClick} className="p-2 rounded-full bg-kapit-accent text-white hover:bg-orange-700 transition relative" aria-label="View Shopping Cart">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="p-2 rounded-md bg-kapit-accent text-white hover:bg-orange-700" aria-label="Open Menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;