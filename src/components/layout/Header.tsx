import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, ShoppingCart, X } from 'lucide-react';
import { useStore } from '../../providers/StoreProvider';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onCartClick: () => void;
  /** Shared with the catalog's filter — both search inputs filter the grid live. */
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const MENU_ID = 'mobile-menu';

const Header: React.FC<HeaderProps> = ({
  onCartClick,
  searchTerm,
  onSearchChange,
}) => {
  const { cart } = useStore();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and returns focus to its trigger for keyboard users.
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    closeMenu();
    document
      .getElementById('catalog')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cartButtonClasses =
    'p-2 rounded-full bg-kapit-accent text-white transition-all duration-200 hover:scale-105 hover:bg-orange-700 active:scale-95 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-kapit-primary';

  const cartBadge = (size: 'xs' | 'sm') => (
    <span
      aria-hidden
      className={
        size === 'xs'
          ? 'absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center'
          : 'absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'
      }
    >
      {cartCount}
    </span>
  );

  return (
    <header className="bg-kapit-primary shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Brand */}
        <div className="text-2xl font-extrabold text-kapit-secondary">
          Kapit-Bahay Store
        </div>

        {/* Desktop search + cart + theme */}
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search for essentials..."
            aria-label="Search products"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-64 rounded-lg border border-white/30 bg-white/95 p-2 text-kapit-text placeholder-gray-400 focus:border-kapit-secondary focus:ring-kapit-secondary dark:border-white/20 dark:bg-white/10 dark:text-kapit-light dark:placeholder-gray-500"
          />
          <ThemeToggle />
          <button onClick={onCartClick} className={cartButtonClasses} aria-label="View Shopping Cart">
            <ShoppingCart size={24} />
            {cartCount > 0 && cartBadge('sm')}
          </button>
        </div>

        {/* Mobile: fast cart access + menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={onCartClick} className={cartButtonClasses} aria-label="View Shopping Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && cartBadge('xs')}
          </button>
          <button
            ref={menuButtonRef}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls={MENU_ID}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="p-2 rounded-md bg-kapit-accent text-white transition-all duration-200 hover:scale-105 hover:bg-orange-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-kapit-primary"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile menu panel: expands the header; the backdrop closes it on tap */}
      {isMenuOpen && (
        <>
          <div
            aria-hidden
            onClick={closeMenu}
            className="fixed inset-0 bg-kapit-text/40 md:hidden dark:bg-black/60"
          />
          <div
            id={MENU_ID}
            className="kb-menu-in mx-4 mb-3 rounded-xl bg-white p-4 shadow-xl ring-1 ring-kapit-primary/10 md:hidden dark:bg-kapit-panel dark:ring-white/10"
          >
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="search"
                placeholder="Search for essentials..."
                aria-label="Search products"
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
                className="min-w-0 flex-grow rounded-lg border border-gray-300 bg-white p-2 text-kapit-text focus:border-kapit-accent focus:ring-kapit-accent dark:border-white/15 dark:bg-white/5 dark:text-kapit-light"
              />
              <button
                type="submit"
                className="flex items-center gap-1 rounded-lg bg-kapit-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-accent focus-visible:ring-offset-2"
              >
                Search
                <ArrowRight size={16} aria-hidden />
              </button>
            </form>

            <nav aria-label="Mobile" className="mt-2 grid gap-1">
              <a
                href="#categories"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-kapit-primary transition-colors hover:bg-kapit-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-accent dark:text-kapit-light dark:hover:bg-white/10"
              >
                Browse by Category
              </a>
              <a
                href="#catalog"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-kapit-primary transition-colors hover:bg-kapit-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-accent dark:text-kapit-light dark:hover:bg-white/10"
              >
                View Catalog
              </a>
              <button
                onClick={() => {
                  closeMenu();
                  onCartClick();
                }}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-kapit-primary transition-colors hover:bg-kapit-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-accent dark:text-kapit-light dark:hover:bg-white/10"
              >
                View Cart
                <span className="inline-flex min-w-6 justify-center rounded-full bg-kapit-accent px-2 py-0.5 text-xs font-semibold text-white">
                  {cartCount}
                  <span className="sr-only"> items in your cart</span>
                </span>
              </button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
