
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutViewProps {
  cartItems: CartItem[];
  onBackToCart: () => void;
  onSuccessfulCheckout: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ cartItems, onBackToCart, onSuccessfulCheckout }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccessfulCheckout();
    }, 2500); // Simulate payment processing delay
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Shipping
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">Shipping Information</h2>
            <form className="space-y-4">
              <input className="w-full p-3 border rounded-md focus:ring-2 focus:ring-brand-primary" type="text" placeholder="Full Name" />
              <input className="w-full p-3 border rounded-md focus:ring-2 focus:ring-brand-primary" type="email" placeholder="Email Address" />
              <input className="w-full p-3 border rounded-md focus:ring-2 focus:ring-brand-primary" type="text" placeholder="Street Address" />
              <div className="flex space-x-4">
                <input className="w-full p-3 border rounded-md focus:ring-2 focus:ring-brand-primary" type="text" placeholder="City" />
                <input className="w-full p-3 border rounded-md focus:ring-2 focus:ring-brand-primary" type="text" placeholder="State / Province" />
                <input className="w-full p-3 border rounded-md focus:ring-2 focus:ring-brand-primary" type="text" placeholder="Zip / Postal Code" />
              </div>
              <button onClick={() => setStep(2)} type="button" className="w-full mt-4 bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-brand-dark transition-colors">Continue to Payment</button>
            </form>
          </div>
        );
      case 2: // Payment
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">Payment Details</h2>
            <form className="space-y-4">
              <input className="w-full p-3 border rounded-md focus:ring-2 focus:ring-brand-primary" type="text" placeholder="Name on Card" />
              <input className="w-full p-3 border rounded-md focus:ring-2 focus:ring-brand-primary" type="text" placeholder="Card Number" />
              <div className="flex space-x-4">
                <input className="w-full p-3 border rounded-md focus:ring-2 focus:ring-brand-primary" type="text" placeholder="MM / YY" />
                <input className="w-full p-3 border rounded-md focus:ring-2 focus:ring-brand-primary" type="text" placeholder="CVC" />
              </div>
               <button onClick={handleProcessPayment} type="button" disabled={isProcessing} className="w-full mt-4 bg-brand-secondary text-brand-dark font-bold py-3 rounded-lg hover:bg-amber-400 disabled:bg-gray-400 disabled:cursor-wait transition-colors">
                {isProcessing ? 'Processing Payment...' : `Pay $${total.toFixed(2)}`}
              </button>
              <button onClick={() => setStep(1)} type="button" className="w-full text-center text-gray-600 hover:text-brand-primary mt-2">Back to Shipping</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-brand-dark mb-2">Checkout</h1>
      <button onClick={onBackToCart} className="text-sm text-brand-primary hover:underline mb-8">← Back to Cart</button>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="lg:w-3/5">
          {renderStep()}
        </div>
        <div className="lg:w-2/5">
          <div className="bg-brand-light p-6 rounded-lg">
            <h3 className="text-xl font-bold text-brand-dark mb-4">Your Order</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span>Tax:</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg mt-2"><span>Total:</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
