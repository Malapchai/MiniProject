import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.SECRET_STRIPE_KEY, { apiVersion: '2024-09-30.acacia' });

export async function createCheckoutSession(req, res) {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: "price_1QGR8mL6U9r1ZA6GoMcZRkVO",
                    quantity: 1
                }
            ],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/profile?tab=membership&status=failed`
        });
        

        // Send the session URL back to the client
        res.json({ url: session.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
}