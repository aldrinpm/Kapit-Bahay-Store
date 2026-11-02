import React from 'react';
import { Product } from '../../types/cart.types';
import { Plus } from 'lucide-react';
import { useStore } from '../../providers/StoreProvider';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useStore(); // Assuming useStore is globally available
  
  // Handle Add to Cart action
  const handleAddToCart = () => {
    if (product.stock > 0) {
      addItem(product, 1);
    } else {
      alert(`${product.name} is currently out of stock.`);
    }
  };

  return (
    <div className="bg-white dark:bg-kapit-panel dark:shadow-black/30 p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-contain mb-3 bg-gray-100 dark:bg-white/5 rounded"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 dark:bg-white/5 flex items-center justify-center rounded mb-3 text-gray-500 dark:text-gray-400">
          Image Placeholder
        </div>
      )}
      <h4 className="text-lg font-semibold text-kapit-primary dark:text-kapit-light mb-1 truncate">{product.name}</h4>
      <p className="text-sm text-kapit-text dark:text-kapit-light/80 mb-2 line-clamp-2">{product.description}</p>

      <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-white/10 mt-auto pt-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-base font-bold text-kapit-accent sm:text-lg">
          ₱{Math.round(product.price / 100).toLocaleString()}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`flex items-center justify-center gap-1 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-accent focus-visible:ring-offset-2 sm:gap-1.5 ${
            product.stock > 0
              ? 'bg-kapit-primary px-3 py-1.5 text-sm text-white hover:-translate-y-0.5 hover:bg-green-800 active:translate-y-0 sm:px-4 sm:py-2 sm:text-base'
              : 'cursor-not-allowed bg-gray-400 px-3 py-1.5 text-sm text-white sm:px-4 sm:py-2 sm:text-base'
          }`}
        >
          <Plus size={16} className="sm:size-[18px]" aria-hidden />
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;