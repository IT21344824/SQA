import { defineLive, defineQuery } from "next-sanity";
import { sanityFetch } from '../live'

export const getMyOrders = async (userId: string) => {

    if (!userId) {
        throw new Error("User Id is requird");
    }

    const ALL_ORDERS_QUERY = defineQuery(`
        *[
            _type == "order" && clerkUserId == $userId  ] | order(orderDate desc) {
                ...,
                products[]{
                    ...,
                    product->
                }
            } 
        `);

    try {
        //use sanity to sent the query
        const orders = await sanityFetch({
            query: ALL_ORDERS_QUERY,
            params: { userId, },
        });

        //return the list of prodcuts , or emty arry if no products
        return orders.data || [];
    } catch (error) {
        console.error("error fething all orders :", error);
        throw new Error("error fething all orders");
    }
};