import { defineQuery } from "next-sanity";
import { sanityFetch } from '../live'

export const searchProductByName = async (searchParam: string) => {
    const PRODUCT_SEARCH_QUERY = defineQuery(`
        *[
            _type == "product"
            && name match $searchParam
        ] | order(name asc) 
        `);

    try {
        //use sanity to sent the query
        const products = await sanityFetch({
            query: PRODUCT_SEARCH_QUERY,
            params: {
                searchParam: `${searchParam}*`,
            },
        });

        //return the list of prodcuts , or emty arry if no products
        return products.data || [];
    } catch (error) {
        console.error("error fething search products", error);
        return [];
    }
};