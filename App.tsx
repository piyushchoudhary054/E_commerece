
import React, { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import ConfirmationView from './components/ConfirmationView';
import ProductDetailModal from './components/ProductDetailModal';
import Footer from './components/Footer';
import { useProducts } from './hooks/useProducts';
import { Product, CartItem, View } from './types';

export default function App() {
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const [view, setView] = useState<View>('store');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  }, []);

  const updateCartQuantity = useCallback((productId: number, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'cart':
        return <CartView cartItems={cart} onUpdateQuantity={updateCartQuantity} onRemoveItem={removeFromCart} onCheckout={() => setView('checkout')} />;
      case 'checkout':
        return <CheckoutView cartItems={cart} onBackToCart={() => setView('cart')} onSuccessfulCheckout={() => { clearCart(); setView('confirmation'); }} />;
      case 'confirmation':
        return <ConfirmationView onContinueShopping={() => setView('store')} />;
      case 'store':
      default:
        return <ProductList 
                  products={filteredProducts} 
                  loading={productsLoading} 
                  error={productsError} 
                  onAddToCart={addToCart} 
                  onProductSelect={handleProductSelect}
                />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-light font-sans text-gray-800">
      <Header
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setView('cart')}
        onLogoClick={() => setView('store')}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        {renderContent()}
      </main>
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={addToCart}
        />
      )}
      <Footer />
    </div>
  );
}