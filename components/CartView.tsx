
import React from 'react';
import { CartItem } from '../types';
import { TrashIcon } from './Icons';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-md animate-fade-in">
        <h2 className="text-3xl font-bold text-brand-dark mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600">Looks like you haven't added anything to your cart yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-brand-dark mb-8 border-b pb-4">Your Shopping Cart</h1>
      <div className="lg:flex lg:space-x-8">
        <div className="lg:w-2/3">
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4 last:border-b-0 animate-slide-in-right">
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg text-brand-dark">{item.name}</h3>
                  <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                  <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 text-sm mt-1 flex items-center gap-1">
                    <TrashIcon className="w-4 h-4" /> Remove
                  </button>
                </div>
                <div className="flex items-center border border-gray-200 rounded-md">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-gray-500 hover:text-brand-primary">-</button>
                  <span className="px-4 font-semibold">{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-gray-500 hover:text-brand-primary">+</button>
                </div>
                <p className="font-bold text-lg text-brand-primary w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-brand-light p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-brand-dark pt-2 border-t mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="mt-6 w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all duration-300 transform hover:scale-105"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
