import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/product_comps/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {

  const products = await getAllProducts();
  const categories = await getAllCategories();

  // console.log(
  //   crypto.randomUUID().slice(0,5) +
  //   `>>> Rerendered the home page cache with ${products.length} products and ${categories.length} categories`
  // );

  return (
    <div className="bg-gray-200 pt-2">
      <BlackFridayBanner />
      <div className="flex flex-col items-center justify-top min-h-screen p-4 ">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
