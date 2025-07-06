
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onProductSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col overflow-hidden group">
      <div className="relative overflow-hidden cursor-pointer" onClick={() => onProductSelect(product)}>
        <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity duration-300"></div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 
          className="text-lg font-semibold text-brand-dark mb-2 truncate cursor-pointer"
          onClick={() => onProductSelect(product)}
        >
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 flex-grow">{product.category}</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-2xl font-bold text-brand-primary">${product.price.toFixed(2)}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-brand-secondary text-brand-dark font-bold py-2 px-4 rounded-full hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary transform hover:scale-105 transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
