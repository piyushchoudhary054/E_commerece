
import { useState, useEffect } from 'react';
import { Product } from '../types';

const mockProducts: Product[] = [
    { id: 1, name: 'Quantum Leap Sneakers', price: 129.99, description: 'Futuristic sneakers with self-lacing technology and adaptive cushioning. Perfect for the urban explorer.', category: 'Footwear', imageUrl: 'https://picsum.photos/seed/sneakers/600/600' },
    { id: 2, name: 'Aero-Mesh Tech Jacket', price: 199.50, description: 'A lightweight, breathable jacket made from advanced aero-mesh fabric. Weather-resistant and stylish.', category: 'Apparel', imageUrl: 'https://picsum.photos/seed/jacket/600/600' },
    { id: 3, name: 'Chrono-Shift Smartwatch', price: 249.00, description: 'A sleek smartwatch with holographic display, biometric tracking, and seamless smart-home integration.', category: 'Accessories', imageUrl: 'https://picsum.photos/seed/watch/600/600' },
    { id: 4, name: 'Hydro-Dynamic Backpack', price: 89.95, description: 'A waterproof backpack with ergonomic design and multiple compartments, including a solar-charging power bank.', category: 'Bags', imageUrl: 'https://picsum.photos/seed/backpack/600/600' },
    { id: 5, name: 'Echo-Weave Beanie', price: 35.00, description: 'A comfortable beanie made from recycled, sound-dampening materials. Stay warm and find your focus.', category: 'Accessories', imageUrl: 'https://picsum.photos/seed/beanie/600/600' },
    { id: 6, name: 'Terra-Grip Hiking Boots', price: 175.75, description: 'Durable hiking boots with all-terrain grip and memory foam insoles. Conquer any trail.', category: 'Footwear', imageUrl: 'https://picsum.photos/seed/boots/600/600' },
    { id: 7, name: 'Solar-Flare Sunglasses', price: 75.00, description: 'Polarized sunglasses with a built-in UV sensor and a frame that changes color in the sun.', category: 'Accessories', imageUrl: 'https://picsum.photos/seed/sunglasses/600/600' },
    { id: 8, name: 'Kinetic-Flex Yoga Pants', price: 65.50, description: 'High-performance yoga pants that move with you, providing support and comfort for any workout.', category: 'Apparel', imageUrl: 'https://picsum.photos/seed/yogapants/600/600' }
];

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = () => {
            try {
                // Simulate network delay
                setTimeout(() => {
                    setProducts(mockProducts);
                    setLoading(false);
                }, 1000);
            } catch (err) {
                setError('Failed to fetch products.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};
