import { useState } from 'react';
import { Wheat, Can, UtensilsCrossed, Cookie, GlassWater, Sparkles, SprayCan, Drumstick, Milk, BookOpen } from 'lucide-react';
import Header from './components/layout/Header';
import Hero from './components/landing/Hero';
import ProductCatalog from './components/catalog/ProductCatalog';
import CartDrawer from './components/cart/CartDrawer';
import CheckoutForm from './components/checkout/CheckoutForm';
import { LucideIcon } from 'lucide-react';

interface CategoryShortcut {
  name: string;
  icon: LucideIcon;
}

const CATEGORY_SHORTCUTS: CategoryShortcut[] = [
  { name: 'Rice and Grains', icon: Wheat },
  { name: 'Canned Goods', icon: Can },
  { name: 'Instant Food', icon: UtensilsCrossed },
  { name: 'Snacks and Biscuits', icon: Cookie },
  { name: 'Beverages', icon: GlassWater },
  { name: 'Personal Care', icon: Sparkles },
  { name: 'Household Essentials', icon: SprayCan },
  { name: 'Condiments and Cooking Ingredients', icon: Drumstick },
  { name: 'Dairy and Breakfast', icon: Milk },
  { name: 'School Supplies', icon: BookOpen },
];

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Phase 1: Header */}
      <Header onCartClick={() => setIsCartOpen(true)} />

      {/* Phase 1: Hero Section (full-bleed, animated, mouse-reactive) */}
      <Hero />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4">
        {/* Phase 1: Category Shortcuts */}
        <section className="mb-12" aria-label="Browse by category">
          <h3 className="text-2xl font-semibold mb-6 text-kapit-primary">Browse by Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORY_SHORTCUTS.map((cat) => (
              <a
                key={cat.name}
                href="#catalog"
                className="kb-cat group flex flex-col items-center gap-2 rounded-lg bg-white p-4 text-center shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-accent"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-kapit-secondary/40 text-kapit-primary transition-colors duration-300 group-hover:bg-kapit-secondary">
                  <cat.icon size={24} />
                </span>
                <span className="text-sm font-medium text-kapit-primary">{cat.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Phase 2: Product Catalog */}
        <section id="catalog" className="mb-10 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-6 text-kapit-primary">Featured Products</h3>
            <ProductCatalog />
        </section>
      </main>
      
      <footer className="p-4 border-t mt-auto text-center text-sm text-gray-500">
        &copy; 2026 Kapit-Bahay Store (Simulated Demo)
      </footer>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} />
      <CheckoutForm isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
}

export default App;