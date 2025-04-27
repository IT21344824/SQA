import ProductGrid from '@/components/product_comps/ProductGrid';
import { searchProductByName } from '@/sanity/lib/products/searchProductByName';
import React from 'react';

interface SearchPageProps {
    searchParams: Promise<{ query: string }>;
}

async function SearchPage({ searchParams }: SearchPageProps) {
    const resolvedSearchParams = await searchParams; // Awaiting Promise resolution
    const { query } = resolvedSearchParams;  // Now `searchParams` is resolved
    const products = await searchProductByName(query);

    if (!products.length) {
        return (
            <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        No products found for : {query}
                    </h1>
                    <p className="text-gray-600 text-center">Try searching different keywords</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Search results for {query}</h1>
                <ProductGrid products={products} />
            </div>
        </div>
    );
}

export default SearchPage;
