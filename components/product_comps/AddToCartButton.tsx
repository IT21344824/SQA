"use client";

import { Product } from '@/sanity.types';
import useBasketStore from '@/store/store';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface AddToBasketButtonProps {
    product: Product;
    disabled?: boolean;
}

const AddToCartButton = ({ product, disabled }: AddToBasketButtonProps) => {
    const { addItem } = useBasketStore();
    const [localQuantity, setLocalQuantity] = useState(1); // Start with quantity 1
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const handleAddToCart = () => {
        for (let i = 0; i < localQuantity; i++) {
            addItem(product);
        }
        setLocalQuantity(1); // reset after adding
    };

    const handleIncrement = () => {
        setLocalQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setLocalQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Don't go below 1
    };

    return (
        <div className='flex justify-around items-center space-y-4'>
            {/* Quantity Selector */}
            <div className='flex items-center justify-center space-x-2'>
                <button
                    onClick={handleDecrement}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${disabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    disabled={disabled}
                >
                    <span className='text-xl font-bold text-gray-800'>-</span>
                </button>
                <span className='w-8 text-center font-semibold'>{localQuantity}</span>
                <button
                    onClick={handleIncrement}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${disabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    disabled={disabled}
                >
                    <span className='text-xl font-bold text-white'>+</span>
                </button>
            </div>

            {/* Add to Cart Button */}
            <Button
                onClick={handleAddToCart}
                className={`px-6 cursor-pointer py-2 rounded-md text-white font-semibold transition-colors duration-300 ${disabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                    }`}
                disabled={disabled}
            >
                Add to Cart
            </Button>
        </div>
    );
};

export default AddToCartButton;
