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
    <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col">
      {product.imageUrl ? (
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-contain mb-3 bg-gray-100 rounded" 
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded mb-3 text-gray-500">
          Image Placeholder
        </div>
      )}
      <h4 className="text-lg font-semibold text-kapit-primary mb-1 truncate">{product.name}</h4>
      <p className="text-sm text-kapit-text mb-2 line-clamp-2">{product.description}</p>
      
      <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
        <div className="text-lg font-bold text-kapit-accent">
          ₱{Math.round(product.price / 100).toLocaleString()}
        </div>
        <button 
          onClick={handleAddToCart} 
          disabled={product.stock === 0}
          className={`flex items-center px-4 py-2 rounded-lg text-white font-medium transition ${product.stock > 0 ? 'bg-kapit-primary hover:bg-green-800' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          <Plus size={18} className="mr-1" />
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;