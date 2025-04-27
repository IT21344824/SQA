import { Metadata } from "@/actions/createCheckoutSession";
import strpie from "@/lib/stripe";
import { headers } from "next/headers";
import { backendClient } from "@/sanity/lib/backendClient";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const headerList = await headers();
    const sig = headerList.get("stripe-signature");

    console.log("HIT WEBHOOK");

    if (!sig) {
        return NextResponse.json({ error: "no signatuter" }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WENHOOK_SECRE;
    if (!webhookSecret) {
        console.log(" stripe webhook secrete is not set");
        return NextResponse.json({ error: "stripe webhook secrete is not set" }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
        event = strpie.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (error) {
        console.error(" webhook signature verification failed", error);
        return NextResponse.json({ error: `webhook error : ${error} ` }, { status: 400 });
    }


    // fix typo: "checkout.session.completed"
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            const order = await createOrderInSanity(session);
            console.log("Order created in Sanity:", order);
        } catch (error) {
            console.error("Error creating order in Sanity:", error);
            return NextResponse.json({ error: "Error creating order" }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details,
    } = session;

    const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as Metadata;
    console.log("Metadata from server Stripe Session:", session.metadata);
    const lineItemsWithProduct = await strpie.checkout.sessions.listLineItems(
        id,
        {
            expand: ["data.price.product"],
        }
    );

    const sanityProducts = lineItemsWithProduct.data.map((item) => ({
        _key: crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
        },
        quantity: item.quantity || 0,
    }));

    const order = await backendClient.create({
        _type: "order",
        orderNumber,
        stripeCheckoutSessionId: id,
        stripePaymentIntentId: payment_intent,
        customerName,
        stripeCustomerId: customer,
        clerkUserId: clerkUserId,
        currency,
        email: customerEmail,
        amountDiscount: total_details?.amount_discount
            ? total_details.amount_discount / 100
            : 0,
        products: sanityProducts,
        totalPrice: amount_total ? amount_total / 100 : 0,
        status: "paid",
        orderDate: new Date().toISOString(),
    });


    return order;
} 