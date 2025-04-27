import { defineLive, defineQuery } from "next-sanity";
import { sanityFetch } from '../live'



export const getProductByCategory = async (categorySlug: string) => {
    const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        *[
            _type == "product" 
            && references(*[_type == "category" && slug.current == $categorySlug]._id)
        ] | order(name asc)
        `);

    try {
        //use sanity to sent the query
        const products = await sanityFetch({
            query: PRODUCTS_BY_CATEGORY_QUERY,
            params: {
                categorySlug,
            },
        });

        //return the list of prodcuts , or emty arry if no products
        return products.data || [];
    } catch (error) {
        console.error("error fething products by category", error);
        return [];
    }
};