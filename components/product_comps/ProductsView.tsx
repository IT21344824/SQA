import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "../category_comps/category-selector";

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
    return (
        <div className="flex flex-col w-full ">
            {/* categories */}
            <div className="w-full sm:w-[200px]">
                <CategorySelectorComponent categories={categories} />

            </div>


            {/* products */}
            <div className="flex-1">
                <div>
                    <ProductGrid products={products} />

                    <hr className="w-1/2 sm:w-3/4 mt-20" />
                </div>
            </div>
        </div>
    )
}

export default ProductsView