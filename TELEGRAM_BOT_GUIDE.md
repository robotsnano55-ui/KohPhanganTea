# 🤖 Telegram Bot Setup Guide

Your tea shop now has a fully functional Telegram bot for automated order management!

---

## 🚀 Quick Start

### Step 1: Create Your Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot` command
3. Choose a name: `Koh Phangan Tea Bot`
4. Choose a username: `KohPhanganTeaBot` (must end with 'bot')
5. Copy the bot token (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Configure the Bot

Edit `telegram-bot.js` and replace:
```javascript
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
```

With your actual token:
```javascript
const BOT_TOKEN = '123456789:ABCdefGHIjklMNOpqrsTUVwxyz';
```

### Step 3: Install Dependencies

```bash
npm install node-telegram-bot-api
```

### Step 4: Run the Bot

```bash
node telegram-bot.js
```

The bot is now live! 🎉

---

## 🎯 Bot Features

### Customer Commands

- `/start` - Welcome message and introduction
- `/menu` - View all available teas with prices
- `/order` - Start a new order
- `/cart` - View current cart
- `/help` - Get help and contact information

### Interactive Buttons

- **Add to Cart** - Click to add teas
- **View Cart** - See order summary
- **Checkout** - Complete purchase
- **Payment Methods** - Choose payment option
- **Clear Cart** - Start over

---

## 💬 How It Works

### Customer Journey

1. **Start**: Customer sends `/start` or `/menu`
2. **Browse**: Views tea selection with prices
3. **Add**: Clicks buttons to add teas to cart
4. **Review**: Checks cart with `/cart`
5. **Checkout**: Clicks "Checkout" button
6. **Payment**: Chooses payment method (Card/BTC/USDT/Bank)
7. **Details**: Receives payment address/instructions
8. **Confirm**: Sends transaction ID or payment proof
9. **Address**: Provides delivery address
10. **Done**: Receives order confirmation

### Admin Notifications

When customer completes order:
- Order details sent to admin
- Transaction ID recorded
- Delivery address captured
- Order ID generated

---

## 🔧 Customization

### Update Products

Edit the `products` object in `telegram-bot.js`:

```javascript
const products = {
    gabo: { name: 'Gabo Tea', price: 450, emoji: '🍃' },
    puer: { name: 'Puer Tea', price: 550, emoji: '🍂' },
    red: { name: 'Red Tea', price: 380, emoji: '🌺' }
};
```

### Update Payment Info

Update wallet addresses and bank details in the `showPaymentInfo` function.

### Add More Commands

```javascript
bot.onText(/\/yourcommand/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Your response');
});
```

---

## 🌐 Connect to Website

Update `script.js` with your bot username:

```javascript
const contacts = {
    whatsapp: "+66123456789",
    line: "kohphanganTea",
    telegram: "KohPhanganTeaBot"  // Your bot username
};
```

---

## 📱 Bot Commands Setup

Set bot commands in @BotFather:

1. Send `/setcommands` to @BotFather
2. Select your bot
3. Send this list:

```
start - Start the bot
menu - View tea menu
order - Place an order
cart - View your cart
help - Get help
```

---

## 🎨 Bot Profile

### Set Description

Send `/setdescription` to @BotFather:
```
Order premium Chinese tea from Koh Phangan! 
🍃 Gabo, Puer & Red Tea
💳 Multiple payment options
🚚 Fast delivery
```

### Set About Text

Send `/setabouttext` to @BotFather:
```
Premium Chinese Tea from Koh Phangan
Order directly through Telegram!
```

### Set Profile Picture

1. Send `/setuserpic` to @BotFather
2. Upload a tea-themed image (512x512px recommended)

---

## 🔐 Security

### Protect Your Token

- Never commit bot token to Git
- Use environment variables:

```javascript
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
```

- Set environment variable:
```bash
export TELEGRAM_BOT_TOKEN="your_token_here"
```

### Admin Verification

Add admin check:

```javascript
const ADMIN_IDS = [123456789]; // Your Telegram user ID

function isAdmin(userId) {
    return ADMIN_IDS.includes(userId);
}
```

---

## 🚀 Deployment

### Option 1: Local Server

```bash
node telegram-bot.js
```

Keep terminal open. Bot runs as long as script is running.

### Option 2: PM2 (Recommended)

```bash
npm install -g pm2
pm2 start telegram-bot.js --name tea-bot
pm2 save
pm2 startup
```

Bot runs in background and auto-restarts.

### Option 3: Cloud Hosting

**Heroku:**
```bash
heroku create koh-phangan-tea-bot
git push heroku main
```

**Railway:**
1. Connect GitHub repo
2. Deploy automatically
3. Add environment variables

**DigitalOcean:**
1. Create droplet
2. Install Node.js
3. Run with PM2

---

## 📊 Analytics

### Track Orders

Add to your code:

```javascript
const orders = [];

function saveOrder(chatId, orderData) {
    orders.push({
        chatId,
        ...orderData,
        timestamp: new Date()
    });
    
    // Save to database or file
    fs.writeFileSync('orders.json', JSON.stringify(orders));
}
```

### User Statistics

```javascript
const userStats = {};

bot.on('message', (msg) => {
    const userId = msg.from.id;
    if (!userStats[userId]) {
        userStats[userId] = { messages: 0, orders: 0 };
    }
    userStats[userId].messages++;
});
```

---

## 🔔 Notifications

### Send to Admin

```javascript
const ADMIN_CHAT_ID = 123456789; // Your chat ID

function notifyAdmin(message) {
    bot.sendMessage(ADMIN_CHAT_ID, message, {
        parse_mode: 'Markdown'
    });
}

// Usage
notifyAdmin(`🆕 New order from ${customerName}\nTotal: ฿${total}`);
```

### Order Updates

```javascript
function sendOrderUpdate(chatId, status) {
    const messages = {
        confirmed: '✅ Order confirmed! Preparing your tea...',
        shipped: '📦 Your order has been shipped!',
        delivered: '🎉 Order delivered! Enjoy your tea!'
    };
    
    bot.sendMessage(chatId, messages[status]);
}
```

---

## 🐛 Troubleshooting

### Bot Not Responding

1. Check bot token is correct
2. Verify bot is running (`node telegram-bot.js`)
3. Check internet connection
4. Look for errors in console

### Polling Error

```javascript
bot.on('polling_error', (error) => {
    console.log('Error:', error.code);
    console.log('Message:', error.message);
});
```

### Webhook Issues

If using webhooks instead of polling:

```javascript
const bot = new TelegramBot(BOT_TOKEN, {
    webHook: {
        port: process.env.PORT || 8443
    }
});

bot.setWebHook(`https://yourdomain.com/bot${BOT_TOKEN}`);
```

---

## 📚 Advanced Features

### Inline Keyboards

```javascript
const keyboard = {
    inline_keyboard: [
        [
            { text: 'Button 1', callback_data: 'action1' },
            { text: 'Button 2', callback_data: 'action2' }
        ]
    ]
};
```

### Send Photos

```javascript
bot.sendPhoto(chatId, 'path/to/image.jpg', {
    caption: 'Check out our tea!'
});
```

### Send Location

```javascript
bot.sendLocation(chatId, latitude, longitude);
```

### Request Contact

```javascript
const keyboard = {
    keyboard: [[{
        text: 'Share Contact',
        request_contact: true
    }]],
    resize_keyboard: true,
    one_time_keyboard: true
};
```

---

## 🎯 Best Practices

1. **Quick Responses** - Reply within seconds
2. **Clear Messages** - Use emojis and formatting
3. **Error Handling** - Catch and log errors
4. **User Friendly** - Simple commands and buttons
5. **Test Thoroughly** - Try all features before launch
6. **Monitor Logs** - Check for issues regularly
7. **Update Regularly** - Add features based on feedback

---

## 📞 Support

### Get Your Chat ID

Send `/start` to @userinfobot

### Test Bot

1. Search for your bot in Telegram
2. Send `/start`
3. Try all commands
4. Test ordering flow
5. Verify payment info

---

## ✅ Launch Checklist

- [ ] Created bot with @BotFather
- [ ] Updated bot token in code
- [ ] Installed dependencies
- [ ] Tested locally
- [ ] Set bot commands
- [ ] Added description and profile pic
- [ ] Updated payment addresses
- [ ] Updated contact info
- [ ] Deployed to server
- [ ] Tested live bot
- [ ] Added bot link to website
- [ ] Announced to customers

---

**Your Telegram bot is ready!** 🤖🍃

Customers can now order tea directly through Telegram with a seamless, automated experience!
