"use server";

import { ImageUrl } from "@/lib/ImageUrl";
import strpie from "@/lib/stripe";
import { BasketItem } from "@/store/store";

export type Metadata = {
    orderNumber: string,
    customerName: string,
    customerEmail: string,
    clerkUserId: string,
};

export type GroupedBasketItem = {
    product: BasketItem["product"];
    quantity: number;
};

export async function createCheckoutSession(
    items: GroupedBasketItem[],
    metadata: Metadata
) {
    try {
        console.log("Metadata client from Stripe Session:", metadata);
        //check if any grouped items don't have a price
        const itemWithoutPrice = items.filter((item) => !item.product.price);
        if (itemWithoutPrice.length > 0) {
            throw new Error("some item do not have a price");
        }

        //search for existing customer by email
        const customer = await strpie.customers.list({
            email: metadata.customerEmail,
            limit: 1,

        });

        let customerId: string | undefined;
        if (customer.data.length > 0) {
            customerId = customer.data[0].id;
        }



        const baseUrl = process.env.NODE_ENV === "production"
            ? `https://${process.env.VERCEL_URL}`
            : `${process.env.NEXT_PUBLIC_BASE_URL}`;

        //p_sucess = filename
        const successUrl = `${baseUrl}/payment_success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

        const cancelUrl = `${baseUrl}/basket`;


        console.log("sucess url >>>>>>", successUrl);
        console.log("cancel url >>>>>>", cancelUrl);

        const session = await strpie.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : "always",
            customer_email: !customerId ? metadata.customerEmail : undefined,
            metadata,
            mode: "payment",
            allow_promotion_codes: true,
            success_url: successUrl,
            cancel_url: cancelUrl,
            line_items: items.map((item) => ({
                price_data: {
                    currency: "gbp",
                    unit_amount: Math.round(item.product.price! * 100),
                    product_data: {
                        name: item.product.name || " unnamed product",
                        description: `product Id: ${item.product._id}`,
                        metadata: {
                            id: item.product._id,
                        },
                        images: item.product.image
                            ? [ImageUrl(item.product.image).url()]
                            : undefined,
                    },
                },
                quantity: item.quantity,
            })),
        });
        return session.url;
    } catch (error) {
        console.error("error creating server checkout session", error);
        throw error;

    }
}