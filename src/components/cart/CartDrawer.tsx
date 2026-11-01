import React, { useMemo } from 'react';
import { useStore } from '../../providers/StoreProvider';
import { X } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, removeItem, updateQuantity } = useStore();

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }, [cart]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={`${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-2xl z-50 flex flex-col`}>
      <div className="p-6 border-b flex justify-between items-center">
        <h3 className="text-2xl font-bold text-kapit-primary">Your Cart ({totalItems})</h3>
        <button onClick={onClose} className="text-gray-600 hover:text-kapit-primary p-2">
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto p-6 space-y-4">
        {cart.length === 0 ? (
          <div className="text-center p-10 bg-kapit-background rounded-lg border border-dashed">
            <p className="text-lg text-gray-600">Your cart is empty.</p>
            <button onClick={onClose} className="mt-4 text-kapit-primary font-medium">
              Continue Shopping
            </button>
          </div>
        ) : (
          cart.map(item => (
            <div key={item.productId} className="flex items-center space-x-4 border-b pb-4">
              <img src={item.product.imageUrl || '/images/placeholder.jpg'} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-grow">
                <h4 className="font-semibold text-kapit-primary">{item.product.name}</h4>
                <p className="text-sm text-gray-600">₱{Math.round(item.product.price / 100).toLocaleString()}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  min="1" 
                  value={item.quantity} 
                  onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                  className="w-16 p-1 border rounded text-center" 
                />
                <button onClick={() => removeItem(item.productId)} className="text-red-500 hover:text-red-700 transition" aria-label="Remove item">
                  <X size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Cart Totals and Checkout */}
      <div className="p-6 border-t bg-kapit-background">
        <div className="flex justify-between font-bold text-xl mb-4">
          <span>Subtotal:</span>
          <span>₱{Math.round(subtotal / 100).toLocaleString()}</span>
        </div>
        <button 
          onClick={onCheckout}
          disabled={cart.length === 0}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${cart.length > 0 ? 'bg-kapit-accent hover:bg-orange-700' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;