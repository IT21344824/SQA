import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("strpie secret key is not set");
}

const strpie = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-03-31.basil",
});

export default strpie;