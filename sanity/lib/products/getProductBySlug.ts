import { defineLive, defineQuery } from "next-sanity";
import { sanityFetch } from '../live'



export const getProductBySlug = async (slug: string) => {
    const PRODUCT_BY_ID_QUERY = defineQuery(`
        *[
            _type == "product" && slug.current == $slug
        ] | order(name asc) [0]
        `);

    try {
        //use sanity to sent the query
        const products = await sanityFetch({
            query: PRODUCT_BY_ID_QUERY,
            params: {
                slug,
            },
        });

        //return the list of prodcuts , or emty arry if no products
        return products.data || null;
    } catch (error) {
        console.error("error fething product by id", error);
        return null;
    }
};