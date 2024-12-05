import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51QSBTmGCzwjZyjMRxquEBmEB4AHmAb5r7WBIuehNzK6boSUJ027nKPJsXf1oBYEOXcKIMqOwNIIyIawQjUtfwvHj003CRNeDFO'); 

const checkout= async (req, res) => {
    try {
        const { planName, price, userId,subscriptiontype,username } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'inr', // Replace with your currency
                        product_data: {
                            name: planName,
                        },
                        unit_amount: price * 100, // Convert price to cents
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.FRONTEND}/success/{CHECKOUT_SESSION_ID}/${userId}/${subscriptiontype}/${username}`,
            cancel_url: `${process.env.FRONTEND}/cancel`,
        });

        res.status(200).send({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send({ error: error.message });
    }
};

export default checkout;