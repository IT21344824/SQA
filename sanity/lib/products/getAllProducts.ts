import { defineLive, defineQuery } from "next-sanity";
import { sanityFetch } from '../live'

export const getAllProducts = async () => {
    const ALL_PRODUCTS_QUERY = defineQuery(`
        *[
            _type == "product"
        ] | order(name asc) 
        `);

    try {
        //use sanity to sent the query
        const products = await sanityFetch({
            query: ALL_PRODUCTS_QUERY,
        });

        //return the list of prodcuts , or emty arry if no products
        return products.data || [];
    } catch (error) {
        console.error("error fething all products", error);
        return [];
    }
};