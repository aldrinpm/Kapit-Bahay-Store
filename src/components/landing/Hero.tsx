import React from 'react';
import { ArrowRight, Truck, ShieldCheck, HeartHandshake } from 'lucide-react';
import Spotlight from './Spotlight';
import ShimmerButton from './ShimmerButton';

// A small, curated set of real product images used as the hero's lifestyle visual.
const ESSENTIALS = [
  { src: '/images/rice5kg.jpg', alt: 'Bag of Philippine rice', top: '4%', left: '6%' },
  { src: '/images/sardines.jpg', alt: 'Canned sardines', top: '12%', left: '62%' },
  { src: '/images/softdrink2l.jpg', alt: 'Bottle of soft drink', top: '46%', left: '0%' },
  { src: '/images/soap.jpg', alt: 'Bar soap', top: '52%', left: '40%' },
  { src: '/images/bread.jpg', alt: 'Loaf of bread', top: '70%', left: '66%' },
  { src: '/images/coffee.jpg', alt: 'Ground coffee', top: '76%', left: '22%' },
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
              className="kb-hero-fade inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-kapit-primary transition hover:bg-kapit-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-accent"
            >
              Browse Catalog
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

        {/* Supporting product/lifestyle visual */}
        <div className="relative flex h-80 flex-1 items-center justify-center sm:h-96 lg:h-[460px]">
          <div className="kb-orbit absolute h-72 w-72 rounded-full bg-kapit-accent/10 sm:h-80 sm:w-80" />
          <div className="kb-orbit-slow absolute h-56 w-56 rounded-full bg-kapit-primary/10 sm:h-64 sm:w-64" />
          {ESSENTIALS.map((item) => (
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              className="kb-float kb-shadow-soft absolute h-24 w-24 rounded-2xl border border-white object-cover shadow-lg sm:h-28 sm:w-28"
              style={{ top: item.top, left: item.left }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
