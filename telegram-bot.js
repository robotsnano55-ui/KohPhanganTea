// Telegram Bot for Koh Phangan Chinese Tea
// Install: npm install node-telegram-bot-api

const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token from @BotFather
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';

// Create bot instance
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Product catalog
const products = {
    gabo: { name: 'Gabo Tea', price: 450, emoji: '🍃' },
    puer: { name: 'Puer Tea', price: 550, emoji: '🍂' },
    red: { name: 'Red Tea', price: 380, emoji: '🌺' }
};

// User sessions to track orders
const userSessions = {};

// Start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = `
🍃 *Welcome to Koh Phangan Chinese Tea!*

I'm your personal tea ordering assistant. Here's what I can help you with:

🛍️ Browse our premium teas
🛒 Place orders easily
💳 Get payment information
📦 Track your order

*Available Commands:*
/menu - View our tea selection
/order - Start a new order
/cart - View your cart
/help - Get assistance

Let's find your perfect tea! 🍵
    `;
    
    bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
});

// Menu command
bot.onText(/\/menu/, (msg) => {
    const chatId = msg.chat.id;
    
    const menuMessage = `
🍵 *Our Premium Tea Collection*

${products.gabo.emoji} *${products.gabo.name}*
฿${products.gabo.price}
Rare Gabo tea with earthy, robust flavor
_Rich in antioxidants, boosts immunity_

${products.puer.emoji} *${products.puer.name}*
฿${products.puer.price}
Aged Puer with deep, complex flavors
_Aids digestion, promotes heart health_

${products.red.emoji} *${products.red.name}*
฿${products.red.price}
Premium red tea, sweet and full-bodied
_Supports metabolism, reduces stress_

*Ready to order?* Use /order to start!
    `;
    
    const keyboard = {
        inline_keyboard: [
            [
                { text: '🍃 Order Gabo Tea', callback_data: 'add_gabo' },
                { text: '🍂 Order Puer Tea', callback_data: 'add_puer' }
            ],
            [
                { text: '🌺 Order Red Tea', callback_data: 'add_red' }
            ],
            [
                { text: '🛒 View Cart', callback_data: 'view_cart' }
            ]
        ]
    };
    
    bot.sendMessage(chatId, menuMessage, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
    });
});

// Order command
bot.onText(/\/order/, (msg) => {
    const chatId = msg.chat.id;
    
    if (!userSessions[chatId]) {
        userSessions[chatId] = { cart: [] };
    }
    
    const orderMessage = `
🛒 *Start Your Order*

Select the teas you'd like to order:
    `;
    
    const keyboard = {
        inline_keyboard: [
            [
                { text: '🍃 Gabo Tea - ฿450', callback_data: 'add_gabo' }
            ],
            [
                { text: '🍂 Puer Tea - ฿550', callback_data: 'add_puer' }
            ],
            [
                { text: '🌺 Red Tea - ฿380', callback_data: 'add_red' }
            ],
            [
                { text: '✅ Complete Order', callback_data: 'checkout' },
                { text: '🗑️ Clear Cart', callback_data: 'clear_cart' }
            ]
        ]
    };
    
    bot.sendMessage(chatId, orderMessage, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
    });
});

// Cart command
bot.onText(/\/cart/, (msg) => {
    const chatId = msg.chat.id;
    showCart(chatId);
});

// Help command
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    
    const helpMessage = `
❓ *How to Order*

1️⃣ Use /menu to see our teas
2️⃣ Click on the tea you want
3️⃣ Choose quantity
4️⃣ Complete your order
5️⃣ Get payment details
6️⃣ Send payment confirmation

*Payment Methods:*
💳 Card (Stripe)
₿ Bitcoin (BTC)
₮ USDT (TRC-20)

*Delivery:*
🚚 Ships within 24 hours
📦 Free shipping on orders over ฿1000

*Contact:*
📱 WhatsApp: +66 123 456 789
💬 LINE: @kohphangantea
✈️ Telegram: Right here!

Need help? Just ask! 😊
    `;
    
    bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
});

// Handle callback queries (button clicks)
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    
    // Initialize session if needed
    if (!userSessions[chatId]) {
        userSessions[chatId] = { cart: [] };
    }
    
    // Handle different actions
    if (data.startsWith('add_')) {
        const productKey = data.replace('add_', '');
        addToCart(chatId, productKey);
        bot.answerCallbackQuery(query.id, {
            text: `✅ ${products[productKey].name} added to cart!`
        });
    } else if (data === 'view_cart') {
        showCart(chatId);
        bot.answerCallbackQuery(query.id);
    } else if (data === 'checkout') {
        checkout(chatId);
        bot.answerCallbackQuery(query.id);
    } else if (data === 'clear_cart') {
        userSessions[chatId].cart = [];
        bot.answerCallbackQuery(query.id, { text: '🗑️ Cart cleared!' });
        bot.sendMessage(chatId, 'Your cart has been cleared. Use /order to start again.');
    } else if (data.startsWith('pay_')) {
        const method = data.replace('pay_', '');
        showPaymentInfo(chatId, method);
        bot.answerCallbackQuery(query.id);
    }
});

// Add item to cart
function addToCart(chatId, productKey) {
    const product = products[productKey];
    const session = userSessions[chatId];
    
    const existingItem = session.cart.find(item => item.key === productKey);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        session.cart.push({
            key: productKey,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1
        });
    }
    
    showCart(chatId);
}

// Show cart
function showCart(chatId) {
    const session = userSessions[chatId];
    
    if (!session || session.cart.length === 0) {
        bot.sendMessage(chatId, '🛒 Your cart is empty.\n\nUse /order to start shopping!');
        return;
    }
    
    let cartMessage = '🛒 *Your Cart*\n\n';
    let total = 0;
    
    session.cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartMessage += `${item.emoji} *${item.name}*\n`;
        cartMessage += `   ฿${item.price} × ${item.quantity} = ฿${itemTotal}\n\n`;
    });
    
    cartMessage += `━━━━━━━━━━━━━━━━\n`;
    cartMessage += `*Total: ฿${total}*\n\n`;
    cartMessage += `Ready to checkout? Click below! 👇`;
    
    const keyboard = {
        inline_keyboard: [
            [
                { text: '✅ Checkout', callback_data: 'checkout' }
            ],
            [
                { text: '➕ Add More', callback_data: 'view_cart' },
                { text: '🗑️ Clear Cart', callback_data: 'clear_cart' }
            ]
        ]
    };
    
    bot.sendMessage(chatId, cartMessage, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
    });
}

// Checkout
function checkout(chatId) {
    const session = userSessions[chatId];
    
    if (!session || session.cart.length === 0) {
        bot.sendMessage(chatId, '🛒 Your cart is empty!');
        return;
    }
    
    const total = session.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const checkoutMessage = `
✅ *Order Summary*

${session.cart.map(item => 
    `${item.emoji} ${item.name} × ${item.quantity} = ฿${item.price * item.quantity}`
).join('\n')}

━━━━━━━━━━━━━━━━
*Total: ฿${total}*

*Choose Payment Method:*
    `;
    
    const keyboard = {
        inline_keyboard: [
            [
                { text: '💳 Card Payment', callback_data: 'pay_card' }
            ],
            [
                { text: '₿ Bitcoin (BTC)', callback_data: 'pay_btc' },
                { text: '₮ USDT (TRC-20)', callback_data: 'pay_usdt' }
            ],
            [
                { text: '🏦 Bank Transfer', callback_data: 'pay_bank' }
            ]
        ]
    };
    
    bot.sendMessage(chatId, checkoutMessage, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
    });
}

// Show payment information
function showPaymentInfo(chatId, method) {
    const session = userSessions[chatId];
    const total = session.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let paymentMessage = '';
    
    switch(method) {
        case 'card':
            paymentMessage = `
💳 *Card Payment*

Total: ฿${total}

Visit our website to complete payment:
🌐 https://kohphangantea.com

Or contact us for payment link:
📱 WhatsApp: +66 123 456 789
            `;
            break;
            
        case 'btc':
            paymentMessage = `
₿ *Bitcoin Payment*

Amount: ฿${total}
BTC: ${(total * 0.000015).toFixed(8)} BTC

*Send to:*
\`bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh\`

After payment, send transaction ID here!
            `;
            break;
            
        case 'usdt':
            paymentMessage = `
₮ *USDT Payment (TRC-20)*

Amount: ฿${total}
USDT: ${(total * 0.029).toFixed(2)} USDT

*Send to:*
\`TYASr5UV6HEcXatwdFQfmLVUqQQQMUxHLS\`

⚠️ *Important:* Use TRC-20 network only!

After payment, send transaction ID here!
            `;
            break;
            
        case 'bank':
            paymentMessage = `
🏦 *Bank Transfer*

Amount: ฿${total}

*Bank Details:*
Bank: Bangkok Bank
Account: 123-456-7890
Name: Koh Phangan Tea Co.

After transfer, send slip here!
            `;
            break;
    }
    
    bot.sendMessage(chatId, paymentMessage, { parse_mode: 'Markdown' });
    
    // Ask for delivery address
    setTimeout(() => {
        bot.sendMessage(chatId, `
📦 *Delivery Information*

Please provide your delivery address:

Example:
Name: John Doe
Phone: +66 123 456 789
Address: 123 Beach Road, Koh Phangan, Surat Thani 84280
        `, { parse_mode: 'Markdown' });
    }, 2000);
}

// Handle text messages (for addresses, transaction IDs, etc.)
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    // Ignore commands
    if (text && text.startsWith('/')) return;
    
    // Check if it looks like a transaction ID or address
    if (text && text.length > 20) {
        bot.sendMessage(chatId, `
✅ *Information Received!*

Thank you! We've received your information.

Our team will verify and confirm your order within 1 hour.

Order ID: #${Date.now().toString().slice(-6)}

You'll receive updates here on Telegram! 📱
        `, { parse_mode: 'Markdown' });
        
        // Clear cart after order
        if (userSessions[chatId]) {
            userSessions[chatId].cart = [];
        }
    }
});

// Error handling
bot.on('polling_error', (error) => {
    console.log('Polling error:', error);
});

console.log('🤖 Telegram bot is running...');
console.log('Bot username: @YourBotUsername');
console.log('Waiting for messages...');
