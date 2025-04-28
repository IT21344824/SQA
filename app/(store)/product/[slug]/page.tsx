// import AddToBasketButton from '@/components/product_comps/AddToBasketButton';
// import { Button } from '@/components/ui/button';
import { ImageUrl } from '@/lib/ImageUrl';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import AddToCartButton from '@/components/product_comps/AddToCartButton';

const ProductPage = async ({ params }: { params: Promise<{ slug: string }>; }) => {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return notFound();
    }

    const isOutOfStock = product.stock != null && product.stock <= 0;

    return (
        <div className=' container mx-auto px-4 my-8'>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className={`relative aspect-square sm:aspect-auto  overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}>

                    {product.image && (
                        <Image
                            className="object-contain transition-transform duration-300 hover:scale-105 border-2"
                            src={ImageUrl(product.image).url()}
                            alt={product.name || "product image"}
                            fill
                        />
                    )}



                    {isOutOfStock && (
                        <div className="flex absolute inset-0 items-center justify-center bg-black/80">
                            <span className="text-white font-bold text-lg"> out of stock</span>
                        </div>
                    )}
                </div>
                <div className='flex flex-col '>
                    <div>
                        <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
                        <div className='text-xl font-semibold mb-4'>
                            Rs: {product.price?.toFixed(2)}
                        </div>

                        <div className=' prose max-w-none mb-6'>
                            {Array.isArray(product.description) && (
                                <PortableText value={product.description} />
                            )}
                        </div>
                    </div>

                    <div className='mt-6'>
                        {/* <AddToBasketButton product={product} disabled={isOutOfStock} /> */}
                        <AddToCartButton product={product} disabled={isOutOfStock} />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ProductPage