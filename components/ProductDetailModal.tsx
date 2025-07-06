
import React, { useState, useCallback } from 'react';
import { Product } from '../types';
import { CloseIcon, SparklesIcon } from './Icons';
import { generateProductDescription } from '../services/geminiService';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [aiDescription, setAiDescription] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateDescription = useCallback(async () => {
    setIsGenerating(true);
    const description = await generateProductDescription(product);
    setAiDescription(description);
    setIsGenerating(false);
  }, [product]);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-slide-in-bottom">
        <div className="w-full md:w-1/2 relative">
          <img src={product.imageUrl} alt={product.name} className="w-full h-64 md:h-full object-cover"/>
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/70 p-2 rounded-full text-gray-700 hover:bg-white hover:scale-110 transition-all">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-4">{product.name}</h2>
          
          <div className="mb-6">
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            {aiDescription && (
              <div className="mt-4 p-4 bg-brand-light border-l-4 border-brand-primary rounded-r-lg">
                <p className="text-gray-700 italic">{aiDescription}</p>
              </div>
            )}
            <button onClick={handleGenerateDescription} disabled={isGenerating} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-dark disabled:opacity-50 disabled:cursor-wait transition-colors">
              <SparklesIcon className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Generating...' : 'Generate AI Description'}
            </button>
          </div>
          
          <div className="mt-auto pt-6">
            <p className="text-4xl font-extrabold text-brand-primary mb-6">${product.price.toFixed(2)}</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-gray-600 hover:text-brand-primary rounded-l-full">-</button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 text-gray-600 hover:text-brand-primary rounded-r-full">+</button>
              </div>
            </div>
            <button onClick={handleAddToCart} className="w-full bg-brand-secondary text-brand-dark font-bold py-3 px-6 rounded-full text-lg hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary transform hover:scale-105 transition-all">
              Add {quantity} to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
