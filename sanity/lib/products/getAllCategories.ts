import { defineLive, defineQuery } from "next-sanity";
import { sanityFetch } from '../live'

export const getAllCategories = async () => {
    const ALL_CATEGORIES_QUERY = defineQuery(`
        *[
            _type == "category"
        ] | order(name asc) 
        `);

    try {
        //use sanity to sent the query
        const categories = await sanityFetch({
            query: ALL_CATEGORIES_QUERY,
        });

        //return the list of prodcuts , or emty arry if no products
        return categories.data || [];
    } catch (error) {
        console.error("error fething all categories", error);
        return [];
    }
};