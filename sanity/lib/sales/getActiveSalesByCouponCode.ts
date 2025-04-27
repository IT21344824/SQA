import { defineQuery } from "next-sanity";
import { CouponCode } from "./couponCode";
import { sanityFetch } from "../live";

export const getActiveSalesByCouponCode = async (couponCode: CouponCode) => {
    const ACTIVE_SALE_BY_COUPON_CODE = defineQuery(`
        *[
            _type == "sale"
            && isActive == true
            && couponCode == $couponCode
        ] | order(validForm desc)  [0]
        `);

    try {
        //use sanity to sent the query
        const activeSale = await sanityFetch({
            query: ACTIVE_SALE_BY_COUPON_CODE,
            params: {
                couponCode,
            },
        });

        //return the list of prodcuts , or emty arry if no products
        return activeSale ? activeSale.data : null;
    } catch (error) {
        console.error("error fething all sales products", error);
        return null;
    }
}