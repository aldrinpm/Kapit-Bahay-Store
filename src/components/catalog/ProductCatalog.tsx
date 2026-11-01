import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../products/ProductCard';

const ProductCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity'); // 'price', 'popularity'

  // Filter and sort logic memoized for performance
  const filteredAndSortedProducts = useMemo(() => {
    let results = PRODUCTS;

    // 1. Filter by Category
    if (selectedCategory !== 'All') {
      results = results.filter(p => p.category === selectedCategory);
    }
    
    // 2. Filter by Search Term
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(lowerCaseSearch) || 
        p.description.toLowerCase().includes(lowerCaseSearch)
      );
    }

    // 3. Sort
    if (sortBy === 'price') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'popularity') {
      // Simple popularity: Featured + Discounted + Stock > 0
      results.sort((a, b) => (b.isFeatured ? 1 : 0) + (b.isDiscounted ? 1 : 0) + (b.stock > 0 ? 1 : 0) - (a.isFeatured ? 1 : 0) - (a.isDiscounted ? 1 : 0) - (a.stock > 0 ? 1 : 0));
    }
    return results;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="space-y-8">
      {/* Controls: Search, Filters, Sort */}
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          placeholder="Search product name or description..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="p-2 border border-gray-300 rounded-lg flex-grow focus:ring-kapit-accent focus:border-kapit-accent" 
        />
        
        {/* Category Filter Dropdown */}
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)} 
          className="p-2 border border-gray-300 rounded-lg focus:ring-kapit-accent focus:border-kapit-accent"
        >
          <option value="All">All Categories</option>
          {/* Categories list will be dynamic from src/data/categories.ts */}
          {/* Since I don't import it here to avoid circular deps, I'll list manually */}
          <option value="Rice and Grains">Rice and Grains</option>
          <option value="Canned Goods">Canned Goods</option>
          <option value="Instant Food">Instant Food</option>
          <option value="Snacks and Biscuits">Snacks and Biscuits</option>
          <option value="Beverages">Beverages</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Household Essentials">Household Essentials</option>
          <option value="Condiments and Cooking Ingredients">Condiments and Cooking Ingredients</option>
          <option value="Dairy and Breakfast">Dairy and Breakfast</option>
          <option value="School Supplies">School Supplies</option>
        </select>

        {/* Sort Dropdown */}
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)} 
          className="p-2 border border-gray-300 rounded-lg focus:ring-kapit-accent focus:border-kapit-accent"
        >
          <option value="popularity">Popularity</option>
          <option value="price">Price (Low to High)</option>
        </select>
      </div>

      {/* Product Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center p-10 bg-white rounded-xl shadow-md">
          <h4 className="text-xl font-semibold text-kapit-primary">No Products Found</h4>
          <p className="text-kapit-text/70 mt-2">Try adjusting your search term, category filter, or clear all filters to view the catalog.</p>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;