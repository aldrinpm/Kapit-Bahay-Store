import React, { useState } from 'react';
import { useStore } from '../../providers/StoreProvider';
import { createSimulatedOrder, CustomerDetails } from '../../services/order.service';
import { X } from 'lucide-react';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ isOpen, onClose }) => {
  const { cart, clearCart } = useStore();
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    mobileNumber: '',
    deliveryAddress: '',
    deliveryInstructions: '',
  });
  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});
  const [order, setOrder] = useState<any>(null);

  const validate = () => {
    const newErrors: Partial<CustomerDetails> = {};
    if (!customer.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!customer.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required.';
    else if (!/^09\d{9}$/.test(customer.mobileNumber)) newErrors.mobileNumber = 'Must be a valid 11-digit Philippine mobile number (e.g., 09171234567).';
    if (!customer.deliveryAddress.trim()) newErrors.deliveryAddress = 'Delivery address is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      const newOrder = createSimulatedOrder(customer, cart, subtotal);
      setOrder(newOrder);
      clearCart();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof CustomerDetails]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-2xl font-bold text-kapit-primary">Checkout (Simulated COD)</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-kapit-primary p-2">
            <X size={24} />
          </button>
        </div>

        {order ? (
          // Confirmation Screen
          <div className="p-6 text-center space-y-4">
            <h4 className="text-3xl font-bold text-green-600">Order Confirmed!</h4>
            <p className="text-lg text-gray-700">This is a **simulation**. No real transaction or fulfillment has occurred.</p>
            
            <div className="bg-kapit-background p-4 rounded-lg text-left border border-dashed">
              <p className="font-bold text-kapit-primary mb-2">Order Reference: {order.orderId}</p>
              <p className="text-sm">Customer: {order.customer.fullName}</p>
              <p className="text-sm">Address: {order.customer.deliveryAddress}</p>
              <p className="text-sm">Payment: {order.paymentMethod}</p>
              <p className="text-lg font-bold mt-2 text-kapit-accent">Total: ₱{Math.round(order.total / 100).toLocaleString()}</p>
            </div>

            <button 
              onClick={onClose}
              className="mt-6 px-8 py-3 bg-kapit-primary text-white font-semibold rounded-lg shadow-lg hover:bg-green-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          // Form Screen
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-kapit-primary">Customer Details</h4>
              
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-kapit-text">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  value={customer.fullName} 
                  onChange={handleInputChange} 
                  className={`w-full p-2 border rounded-lg focus:ring-kapit-accent focus:border-kapit-accent ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`} 
                />
                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-kapit-text">Mobile Number</label>
                <input 
                  type="tel" 
                  id="mobileNumber" 
                  name="mobileNumber" 
                  value={customer.mobileNumber} 
                  onChange={handleInputChange} 
                  placeholder="09171234567"
                  className={`w-full p-2 border rounded-lg focus:ring-kapit-accent focus:border-kapit-accent ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'}`} 
                />
                {errors.mobileNumber && <p className="text-red-500 text-xs">{errors.mobileNumber}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="deliveryAddress" className="block text-sm font-medium text-kapit-text">Delivery Address</label>
                <textarea 
                  id="deliveryAddress" 
                  name="deliveryAddress" 
                  value={customer.deliveryAddress} 
                  onChange={handleInputChange} 
                  rows={3}
                  className={`w-full p-2 border rounded-lg focus:ring-kapit-accent focus:border-kapit-accent ${errors.deliveryAddress ? 'border-red-500' : 'border-gray-300'}`} 
                />
                {errors.deliveryAddress && <p className="text-red-500 text-xs">{errors.deliveryAddress}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="deliveryInstructions" className="block text-sm font-medium text-kapit-text">Delivery Instructions (Optional)</label>
                <textarea 
                  id="deliveryInstructions" 
                  name="deliveryInstructions" 
                  value={customer.deliveryInstructions} 
                  onChange={handleInputChange} 
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-kapit-accent focus:border-kapit-accent" 
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-kapit-background p-4 rounded-lg border border-dashed">
              <h4 className="text-lg font-semibold text-kapit-primary mb-3">Order Summary</h4>
              {cart.map(item => (
                <div key={item.productId} className="flex justify-between text-sm mb-1">
                  <span>{item.quantity} x {item.product.name}</span>
                  <span>₱{Math.round((item.product.price * item.quantity) / 100).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-gray-300">
                <span>Total:</span>
                <span>₱{Math.round(cart.reduce((t, i) => t + i.product.price * i.quantity, 0) / 100).toLocaleString()}</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={cart.length === 0}
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${cart.length > 0 ? 'bg-kapit-accent hover:bg-orange-700' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              Place Simulated COD Order
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;