
import React from 'react';

interface ConfirmationViewProps {
  onContinueShopping: () => void;
}

const ConfirmationView: React.FC<ConfirmationViewProps> = ({ onContinueShopping }) => {
  return (
    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-xl animate-fade-in max-w-2xl mx-auto">
      <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 className="mt-4 text-3xl font-extrabold text-brand-dark">Order Confirmed!</h2>
      <p className="mt-2 text-lg text-gray-600">
        Thank you for your purchase. A confirmation email has been sent to your address.
      </p>
      <div className="mt-8">
        <button
          onClick={onContinueShopping}
          className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all duration-300 transform hover:scale-105"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ConfirmationView;
