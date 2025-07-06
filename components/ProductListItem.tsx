
import React from 'react';
import { Product } from '../types';

interface ProductListItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductSelect: (product: Product) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onAddToCart, onProductSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row animate-fade-in">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-full sm:w-48 h-48 sm:h-auto object-cover cursor-pointer" 
        onClick={() => onProductSelect(product)}
      />
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
          <h3 
            className="text-2xl font-bold text-brand-dark mb-2 cursor-pointer hover:text-brand-primary"
            onClick={() => onProductSelect(product)}
          >
            {product.name}
          </h3>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
          <p className="text-3xl font-extrabold text-brand-primary mb-4 sm:mb-0">${product.price.toFixed(2)}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-brand-secondary text-brand-dark font-bold py-2 px-6 rounded-full hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary transform hover:scale-105 transition-transform"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
