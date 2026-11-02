import React from 'react';
import { ArrowRight, Truck, ShieldCheck, HeartHandshake } from 'lucide-react';
import Spotlight from './Spotlight';
import ShimmerButton from './ShimmerButton';
import ProductWheel from './ProductWheel';

// Featured essentials for the hero's works-wheel visual. Titles are also
// used by the index list and the front-card title when the drum is open.
const WHEEL_ITEMS = [
  { title: 'Rice 5 kg', src: '/images/rice5kg.jpg', alt: 'Bag of Philippine rice', href: '#catalog' },
  { title: 'Sardines', src: '/images/sardines.jpg', alt: 'Canned sardines', href: '#catalog' },
  { title: 'Softdrink 2L', src: '/images/softdrink2l.jpg', alt: 'Bottle of soft drink', href: '#catalog' },
  { title: 'Bar Soap', src: '/images/soap.jpg', alt: 'Bar soap', href: '#catalog' },
  { title: 'Loaf of Bread', src: '/images/bread.jpg', alt: 'Loaf of bread', href: '#catalog' },
  { title: 'Ground Coffee', src: '/images/coffee.jpg', alt: 'Ground coffee', href: '#catalog' },
];

const Hero: React.FC = () => {
  const shopNow = () => {
    const target = document.getElementById('catalog');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Animated, mouse-reactive landing backdrop */}
      <Spotlight className="z-0" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:py-24">
        {/* Copy */}
        <div className="kb-hero-fade flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-kapit-primary/20 bg-white/70 px-4 py-1.5 text-sm font-medium text-kapit-primary backdrop-blur">
            <Truck size={16} />
            Neighborhood essentials, delivered
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-kapit-text sm:text-5xl lg:max-w-xl">
            Everyday Essentials,{' '}
            <span className="text-kapit-accent">Just Around the Corner.</span>
          </h1>

          <p className="kb-hero-fade mt-4 max-w-md text-lg text-kapit-text/80">
            Your friendly Filipino neighborhood store — rice, canned goods, snacks,
            and daily necessities, all at honest prices.
          </p>

          <div className="kb-hero-fade mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <ShimmerButton onClick={shopNow}>
              Shop Now
              <ArrowRight size={18} />
            </ShimmerButton>
            <a
              href="#catalog"
              className="kb-hero-fade group inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-kapit-primary transition-colors duration-300 hover:bg-kapit-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-accent"
            >
              Browse Catalog
              <ArrowRight
                size={18}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          <div className="kb-hero-fade mt-10 flex flex-wrap justify-center gap-6 text-sm text-kapit-text/70 lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} className="text-kapit-primary" />
              Cash on Delivery
            </span>
            <span className="inline-flex items-center gap-2">
              <HeartHandshake size={16} className="text-kapit-primary" />
              Friendly service
            </span>
          </div>
        </div>

        {/* Supporting visual: Crafter UI works-wheel — ring of essentials that
            blows open into a 3D drum you turn (scroll, drag, or arrow keys) */}
        <div className="kb-hero-fade flex flex-1 items-center justify-center">
          <ProductWheel
            items={WHEEL_ITEMS}
            label="Kapit-Bahay Store"
            action="Shop"
            className="h-80 w-full max-w-lg sm:h-96 lg:h-[460px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
