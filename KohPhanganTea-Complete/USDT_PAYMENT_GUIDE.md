# 💰 USDT TRC-20 Payment Guide

## ✅ What's Configured

Your tea shop now accepts USDT payments on the TRC-20 (Tron) network with automatic QR code generation!

### Features:
- ✅ QR code generation for easy scanning
- ✅ One-click address copying
- ✅ Automatic amount calculation
- ✅ TRC-20 network (low fees ~$1)
- ✅ Fast transactions (3-5 minutes)
- ✅ Direct contact after payment

---

## 🔧 Setup Your USDT Wallet

### Step 1: Get a TRC-20 Compatible Wallet

**Recommended Wallets:**

1. **TronLink** (Most Popular)
   - Download: https://www.tronlink.org/
   - Available: Chrome extension, iOS, Android
   - Easy to use, secure

2. **Trust Wallet**
   - Download: https://trustwallet.com/
   - Available: iOS, Android
   - Multi-currency support

3. **Klever Wallet**
   - Download: https://klever.io/
   - Available: iOS, Android, Browser
   - User-friendly interface

### Step 2: Create Your Wallet

1. Download and install your chosen wallet
2. Create new wallet (save recovery phrase securely!)
3. Find your USDT TRC-20 address
4. Copy the address

### Step 3: Update Your Website

Edit `script.js` and replace the USDT address:

```javascript
const cryptoWallets = {
    btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    usdt: "YOUR_TRON_ADDRESS_HERE", // Replace this!
    usdtNetwork: "TRC20"
};
```

**Your Tron address should:**
- Start with "T" (e.g., TYASr5UV6HEcXatwdFQfmLVUqQQQMUxHLS)
- Be 34 characters long
- Support TRC-20 tokens

---

## 💳 How Customers Pay

### Customer Experience:

1. **Add items to cart**
2. **Click "Pay with Crypto"**
3. **Select "USDT (TRC20)"** (marked as Recommended)
4. **See payment details:**
   - Exact USDT amount
   - Your wallet address
   - QR code to scan
5. **Two payment options:**
   - **Option A:** Scan QR code with wallet app
   - **Option B:** Copy address and send manually
6. **Send payment** from their wallet
7. **Contact you** via WhatsApp/LINE/Telegram with transaction ID

---

## 📱 Payment Methods

### Method 1: Scan QR Code (Easiest)

1. Customer opens their TronLink/Trust Wallet app
2. Taps "Send" or "Transfer"
3. Selects USDT (TRC-20)
4. Scans QR code from your website
5. Confirms amount
6. Sends payment

### Method 2: Manual Entry

1. Customer copies your wallet address
2. Opens wallet app
3. Pastes address
4. Enters amount
5. Selects TRC-20 network
6. Sends payment

---

## ✅ Verifying Payments

### Check Your Wallet:

1. Open your TronLink/Trust Wallet
2. Check USDT balance
3. View transaction history
4. Verify amount received

### Using Blockchain Explorer:

Visit: https://tronscan.org/

1. Enter your wallet address
2. See all incoming transactions
3. Verify transaction details:
   - Amount
   - Sender address
   - Timestamp
   - Confirmations

### Transaction Confirmations:

- **1 confirmation:** Usually sufficient (~3 seconds)
- **19 confirmations:** Fully confirmed (~1 minute)
- TRC-20 is very fast!

---

## 💰 Exchange Rates

### Current Rate (Update Daily):

```javascript
const cryptoPrices = {
    usdtRate: 0.029  // 1 THB ≈ 0.029 USDT
};
```

### How to Calculate:

If 1 USDT = 34 THB:
- 1 THB = 1 ÷ 34 = 0.0294 USDT

**Check current rates:**
- https://www.coingecko.com/en/coins/tether
- https://www.binance.com/en/price/tether
- https://coinmarketcap.com/currencies/tether/

### Update Frequency:
- **Minimum:** Once per day
- **Recommended:** Every few hours
- **Best:** Use price API for real-time rates

---

## 🔄 Converting USDT to Thai Baht

### Thai Crypto Exchanges:

1. **Bitkub** (Most Popular)
   - Website: https://www.bitkub.com/
   - Supports USDT
   - Direct THB withdrawal

2. **Satang Pro**
   - Website: https://satangcorp.com/
   - Low fees
   - Fast withdrawals

3. **Zipmex**
   - Website: https://zipmex.com/
   - User-friendly
   - Good support

### Conversion Process:

1. **Receive USDT** in your TronLink wallet
2. **Transfer to exchange** (Bitkub, etc.)
3. **Sell USDT** for THB
4. **Withdraw THB** to your bank account

### Fees:
- Network fee (TRC-20): ~$1
- Exchange trading fee: 0.25% - 1%
- Withdrawal fee: 10-20 THB

---

## 🛡️ Security Tips

### Protect Your Wallet:

1. ✅ **Never share** your private key or seed phrase
2. ✅ **Enable 2FA** on exchange accounts
3. ✅ **Use strong passwords**
4. ✅ **Backup** recovery phrase offline
5. ✅ **Verify addresses** before sending
6. ✅ **Start with small amounts** for testing

### Avoid Scams:

❌ Don't click suspicious links
❌ Don't share screen with strangers
❌ Don't trust "support" asking for keys
❌ Don't use public WiFi for transactions
❌ Don't rush - verify everything

---

## 🧪 Testing

### Before Going Live:

1. **Get test USDT** (ask a friend or buy small amount)
2. **Test the payment flow:**
   - Add item to cart
   - Click "Pay with Crypto"
   - Select USDT
   - Verify QR code appears
   - Test copying address
3. **Send yourself** a small test payment (1-5 USDT)
4. **Verify** you receive it
5. **Test contact buttons** work

### Test Checklist:

- [ ] Wallet address updated in script.js
- [ ] QR code generates correctly
- [ ] Copy button works
- [ ] Amount calculation is correct
- [ ] Exchange rate is current
- [ ] Contact buttons work
- [ ] Received test payment successfully
- [ ] Can verify transaction on TronScan

---

## 📊 Customer Support

### Common Questions:

**Q: What network should I use?**
A: TRC-20 (Tron network) - it's faster and cheaper!

**Q: How long does it take?**
A: Usually 3-5 minutes for confirmation.

**Q: What if I sent on wrong network?**
A: Contact us immediately with transaction details.

**Q: Can I get a refund?**
A: Crypto transactions are irreversible. Contact us to resolve issues.

**Q: Do you accept other cryptocurrencies?**
A: Currently BTC and USDT. More coming soon!

---

## 📞 After Payment

### Customer Should:

1. ✅ Take screenshot of transaction
2. ✅ Note transaction ID/hash
3. ✅ Contact you via WhatsApp/LINE/Telegram
4. ✅ Provide transaction details
5. ✅ Wait for confirmation

### You Should:

1. ✅ Check wallet for incoming payment
2. ✅ Verify amount matches order
3. ✅ Confirm with customer (within 1 hour)
4. ✅ Process and ship order
5. ✅ Provide tracking number

---

## 🎯 Advantages of USDT TRC-20

### Why TRC-20?

✅ **Low Fees:** ~$1 per transaction
✅ **Fast:** 3-5 minutes confirmation
✅ **Stable:** Pegged to USD (1 USDT ≈ $1)
✅ **Popular:** Widely used in Asia
✅ **Easy:** Simple to use and convert

### vs Other Options:

| Feature | TRC-20 | ERC-20 | Bitcoin |
|---------|--------|--------|---------|
| Fee | ~$1 | $5-50 | $1-5 |
| Speed | 3-5 min | 10-30 min | 30-60 min |
| Stable | Yes | Yes | No |
| Popular | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🚀 Ready to Accept USDT?

### Final Checklist:

1. [ ] Created TronLink or Trust Wallet
2. [ ] Copied your TRC-20 USDT address
3. [ ] Updated address in `script.js`
4. [ ] Updated exchange rate
5. [ ] Tested QR code generation
6. [ ] Tested with small payment
7. [ ] Set up exchange account (Bitkub, etc.)
8. [ ] Prepared customer support process
9. [ ] Uploaded to GitHub
10. [ ] Site is live!

---

**Your USDT payment system is ready!** 🎉

Customers can now scan QR codes and pay instantly with USDT on TRC-20 network!
