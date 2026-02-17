# Koh Phangan Chinese Tea - E-Commerce Website

A professional e-commerce website for selling premium Gabo, Puer, and Red Tea from Koh Phangan with integrated shopping cart, Stripe card payments, and cryptocurrency payments (BTC & USDT).

## Features

- Beautiful landing page with hero section
- 3 premium tea products (Gabo, Puer, Red Tea)
- Shopping cart functionality
- **Dual payment options:**
  - 💳 Card payments via Stripe
  - ₿ Crypto payments (Bitcoin & USDT)
- WhatsApp, LINE, and Telegram contact buttons
- Fully responsive design
- Product images support

## Quick Start (Frontend Only)

1. Open `index.html` in your browser to see the site
2. Update contact info in `script.js`:
   ```javascript
   const contacts = {
       whatsapp: "+66123456789",
       line: "yourLineID",
       telegram: "yourTelegramUsername"
   };
   ```

## Full Setup with Stripe Payments

### Step 1: Get Stripe Account

1. Sign up at https://stripe.com
2. Get your API keys from https://dashboard.stripe.com/apikeys
3. You'll need:
   - Publishable key (starts with `pk_test_` or `pk_live_`)
   - Secret key (starts with `sk_test_` or `sk_live_`)

### Step 2: Update Configuration

1. In `script.js`, update:
   ```javascript
   const STRIPE_PUBLIC_KEY = 'pk_test_YOUR_KEY_HERE';
   ```

2. In `server.js`, update:
   ```javascript
   const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY_HERE');
   ```

### Step 3: Install Backend Dependencies

```bash
npm install
```

### Step 4: Run the Server

```bash
npm start
```

The site will be available at http://localhost:3000

### Step 5: Test Payment

1. Use Stripe test card: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC
4. Any billing details

## Customization

### Update Tea Products

Edit the `products` array in `script.js`:

```javascript
const products = [
    {
        id: 'gabo-tea',
        name: "Gabo Tea",
        price: 450,
        description: "Your description...",
        benefits: ["Benefit 1", "Benefit 2"]
    }
];
```

### Add Your Own Images

Replace the Unsplash URLs in `script.js` with your own image URLs:

```javascript
image: "path/to/your/image.jpg"
```

### Change Colors

Edit `styles.css` - main color is `#2d5016` (tea green)

## Deployment

### Option 1: Frontend Only (No Payments)
Deploy to:
- GitHub Pages
- Netlify
- Vercel

### Option 2: Full Stack (With Payments)
Deploy to:
- Heroku
- Railway
- DigitalOcean
- AWS/Google Cloud

## File Structure

```
├── index.html          # Main page
├── success.html        # Payment success page
├── styles.css          # All styles
├── script.js           # Frontend logic & cart
├── server.js           # Backend for Stripe
├── package.json        # Node dependencies
└── README.md          # This file
```

## How Payments Work

1. Customer adds items to cart
2. Clicks "Checkout with Card"
3. Redirected to Stripe's secure checkout page
4. Enters card details on Stripe (not your site)
5. Payment processed by Stripe
6. Customer redirected back to success page
7. You receive payment in your Stripe account

## Security Notes

- Never commit your Secret Key to Git
- Use environment variables for production
- Enable Stripe webhooks for order fulfillment
- Use HTTPS in production

## Support

For questions about:
- Stripe setup: https://stripe.com/docs
- Deployment: Check your hosting provider's docs
- Customization: Edit the files as needed

## License

MIT License - feel free to use for your business!
