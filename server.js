// Simple Node.js backend for Stripe payment processing
// Run with: node server.js

const express = require('express');
const stripe = require('stripe')('sk_test_51T1sQxKL1oY4szixnNtNggTTSsi5Pkkf95BfY6ohbE71r43xQgW4BpYx0NWN8Fl4xrRi3bioka5SvXoqDTCbaYBo00VCBTy3Xe');
const app = express();

app.use(express.json());
app.use(express.static('.')); // Serve static files

// Create Stripe Checkout Session
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { cart } = req.body;
        
        // Convert cart items to Stripe line items
        const lineItems = cart.map(item => ({
            price_data: {
                currency: 'thb',
                product_data: {
                    name: item.name,
                    description: item.description,
                },
                unit_amount: item.price * 100, // Stripe uses cents/smallest currency unit
            },
            quantity: item.quantity,
        }));
        
        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/index.html`,
            shipping_address_collection: {
                allowed_countries: ['TH'], // Thailand
            },
        });
        
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

// Webhook to handle successful payments
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = 'whsec_YOUR_WEBHOOK_SECRET'; // Get from Stripe Dashboard
    
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log('Payment successful:', session.id);
        
        // TODO: Fulfill the order
        // - Send confirmation email
        // - Update inventory
        // - Notify via WhatsApp/LINE/Telegram
    }
    
    res.json({ received: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Make sure to update your Stripe keys!');
});
