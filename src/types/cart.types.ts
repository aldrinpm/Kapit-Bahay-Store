export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number; // In PHP minor units (cents/centavos equivalent)
  stock: number;
  imageUrl?: string;
  isFeatured?: boolean;
  isDiscounted?: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
}

export interface CartActions {
  addItem: (product: Product, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}