
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductListItem from './ProductListItem';
import { GridIcon, ListIcon } from './Icons';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onAddToCart: (product: Product) => void;
  onProductSelect: (product: Product) => void;
}

type ViewMode = 'grid' | 'list';

const ProductList: React.FC<ProductListProps> = ({ products, loading, error, onAddToCart, onProductSelect }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl py-10">{error}</div>;
  }
  
  if (products.length === 0) {
    return <div className="text-center text-gray-500 text-xl py-10">No products found. Try a different search term.</div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brand-dark">Our Products</h1>
        <div className="flex items-center space-x-2 p-1 bg-gray-200 rounded-lg">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}>
            <GridIcon className="h-5 w-5" />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}>
            <ListIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onProductSelect={onProductSelect} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map(product => (
            <ProductListItem key={product.id} product={product} onAddToCart={onAddToCart} onProductSelect={onProductSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
