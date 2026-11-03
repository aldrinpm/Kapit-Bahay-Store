import React, { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useStore } from '../../providers/StoreProvider';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onCartClick: () => void;
  /** Shared with the catalog so the header search filters the grid live. */
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

/** Shared styling for the header search inputs (desktop bar + mobile menu). */
const SEARCH_INPUT_CLASSES =
  'p-2 border border-gray-300 rounded-lg text-sm text-kapit-text bg-white ' +
  'focus:border-kapit-accent focus:ring-2 focus:ring-kapit-accent ' +
  'dark:border-white/20 dark:bg-white/10 dark:text-kapit-light dark:placeholder-kapit-light/60';

const Header: React.FC<HeaderProps> = ({ onCartClick, searchTerm, onSearchChange }) => {
  const { cart } = useStore();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the mobile menu and returns focus to its toggle button.
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  /** Enter in a header search jumps to the filtered catalog results. */
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsMenuOpen(false);
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  const cartAriaLabel =
    cartCount > 0
      ? `View shopping cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`
      : 'View shopping cart';

  return (
    <>
      {/* Click-away layer beneath the sticky header (z-40) that closes the mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <header className="bg-kapit-primary shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          {/* Brand */}
          <div className="text-2xl font-extrabold text-kapit-secondary">
            Kapit-Bahay Store
          </div>

          {/* Desktop Navigation / Search Area */}
          <div className="hidden md:flex items-center gap-6">
            <nav aria-label="Primary">
              <a
                href="#catalog"
                className="text-sm font-semibold text-kapit-background/90 hover:text-kapit-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-secondary rounded-lg px-2 py-1"
              >
                Browse Catalog
              </a>
            </nav>
            <input
              type="search"
              placeholder="Search for essentials..."
              aria-label="Search products"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className={`${SEARCH_INPUT_CLASSES} w-64`}
            />
            <button
              type="button"
              onClick={() => { closeMenu(); onCartClick(); }}
              className="p-2 rounded-full bg-kapit-accent text-white hover:bg-orange-700 transition relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-accent focus-visible:ring-offset-2 focus-visible:ring-offset-kapit-primary"
              aria-label={cartAriaLabel}
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu toggle — accessible disclosure */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden p-2 rounded-md bg-kapit-accent text-white hover:bg-orange-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-accent focus-visible:ring-offset-2 focus-visible:ring-offset-kapit-primary"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu panel, anchored below the sticky header */}
        <div
          id="mobile-menu"
          className={`md:hidden absolute inset-x-0 top-full border-t border-white/10 shadow-lg bg-kapit-primary ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3">
            {/* Search — shared state with the catalog */}
            <input
              type="search"
              placeholder="Search for essentials..."
              aria-label="Search products"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className={`${SEARCH_INPUT_CLASSES} w-full`}
            />
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1 text-white">
                <li>
                  <a
                    href="#categories"
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-secondary"
                  >
                    Browse Categories
                  </a>
                </li>
                <li>
                  <a
                    href="#catalog"
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-secondary"
                  >
                    Browse Catalog
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => { closeMenu(); onCartClick(); }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-secondary"
                    aria-label={cartAriaLabel}
                  >
                    <ShoppingCart size={20} />
                    View Cart
                    {cartCount > 0 && (
                      <span
                        aria-hidden="true"
                        className="ml-auto rounded-full bg-kapit-secondary text-kapit-text text-xs font-bold px-2 py-0.5"
                      >
                        {cartCount}
                      </span>
                    )}
                  </button>
                </li>
                <li className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-1">
                  <span className="text-sm text-white/90">Theme</span>
                  <ThemeToggle />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
