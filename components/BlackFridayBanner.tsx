import { COUPON_CODE } from "@/sanity/lib/sales/couponCode";
import { getActiveSalesByCouponCode } from "@/sanity/lib/sales/getActiveSalesByCouponCode";

async function BlackFridayBanner() {

    const sale = await getActiveSalesByCouponCode(COUPON_CODE.BFRIDAY);

    if (!sale?.isActive) {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">

            <div className=" container mx-auto items-center justify-between">
                <h2 className="text-3xl sm:text-5xl font-semibold text-left mb-4"> {sale.title}</h2>
                <p className="text-left text-xl sm:text-3xl font-semibold mb-6"> {sale.description}</p>
                <div className="flex">
                    <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
                        <span className="font-bold text-base sm:text-xl"> Use code:{" "}
                            <span className="text-red-600"> {sale.couponCode}</span>
                        </span>
                        <span className="ml-2 font-bold text-base  sm:text-xl"> for {sale.discountAmount}% OFF</span>
                    </div></div>
            </div>
        </div>
    )
}

export default BlackFridayBanner;