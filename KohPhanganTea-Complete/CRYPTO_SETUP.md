# 🪙 Crypto Payment Setup Guide

Your tea shop now accepts Bitcoin (BTC) and USDT payments alongside card payments!

---

## 🔧 Configuration Required

### 1. Update Wallet Addresses

Edit `script.js` and update your crypto wallet addresses:

```javascript
const cryptoWallets = {
    btc: "YOUR_BITCOIN_ADDRESS_HERE",        // Bitcoin wallet
    usdt: "YOUR_USDT_ADDRESS_HERE",          // USDT wallet (TRC20 or ERC20)
    usdtNetwork: "TRC20"                     // Network: TRC20 (Tron) or ERC20 (Ethereum)
};
```

### 2. Update Exchange Rates

Update these rates regularly (daily recommended):

```javascript
const cryptoPrices = {
    btcRate: 0.000015,  // BTC per THB (check current rate)
    usdtRate: 0.029     // USDT per THB (1 THB ≈ 0.029 USDT)
};
```

**Where to get current rates:**
- Bitcoin: https://www.coinbase.com/price/bitcoin
- USDT: https://www.coinbase.com/price/tether
- Or use: https://www.coingecko.com

---

## 💰 How It Works

### Customer Flow:

1. Customer adds items to cart
2. Clicks "Pay with Crypto" button
3. Selects BTC or USDT
4. Sees:
   - Exact crypto amount to send
   - Your wallet address
   - QR code (optional)
   - Payment instructions
5. Sends payment from their wallet
6. Contacts you via WhatsApp/LINE/Telegram with transaction ID
7. You verify payment and ship order

### Your Process:

1. Receive message from customer with transaction ID
2. Check your wallet for incoming transaction
3. Verify amount matches order
4. Confirm order with customer
5. Ship the tea!

---

## 🔐 Security Best Practices

### Wallet Setup:

1. **Use dedicated wallets** for business
2. **Never share private keys** - only share public addresses
3. **Enable 2FA** on your wallet accounts
4. **Keep backup** of wallet recovery phrases (offline, secure location)
5. **Use hardware wallet** for large amounts (Ledger, Trezor)

### Recommended Wallets:

**Bitcoin (BTC):**
- Electrum (desktop)
- BlueWallet (mobile)
- Ledger/Trezor (hardware)

**USDT (TRC20 - Tron Network):**
- TronLink (mobile/browser)
- Trust Wallet (mobile)
- Ledger (hardware)

**USDT (ERC20 - Ethereum Network):**
- MetaMask (browser/mobile)
- Trust Wallet (mobile)
- Ledger (hardware)

---

## 💡 Network Choice: TRC20 vs ERC20

### TRC20 (Tron Network) - RECOMMENDED
✅ Very low fees (~$1)
✅ Fast transactions (3-5 minutes)
✅ Popular in Asia
❌ Less widely supported

### ERC20 (Ethereum Network)
✅ Most widely supported
✅ Very secure
❌ High fees ($5-50+)
❌ Slower (10-30 minutes)

**Recommendation:** Use TRC20 for lower fees and faster transactions.

---

## 📊 Exchange Rate Updates

### Manual Update (Simple):
1. Check current rates daily
2. Edit `script.js`
3. Update `btcRate` and `usdtRate`
4. Save and push to GitHub

### Example Calculation:
```
If 1 BTC = 1,500,000 THB
Then 1 THB = 1 / 1,500,000 = 0.00000067 BTC

If 1 USDT = 34 THB
Then 1 THB = 1 / 34 = 0.029 USDT
```

### Automatic Update (Advanced):
Use a price API service:
- CoinGecko API (free)
- CoinMarketCap API
- Binance API

---

## 🎨 Optional: Add Real QR Codes

To show scannable QR codes:

1. Add QR code library to `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
```

2. Update `generateQRCode()` function in `script.js`:
```javascript
function generateQRCode(address, amount, symbol) {
    const qrContainer = document.getElementById('qr-code');
    qrContainer.innerHTML = ''; // Clear previous
    
    new QRCode(qrContainer, {
        text: address,
        width: 250,
        height: 250,
        colorDark: "#000000",
        colorLight: "#ffffff",
    });
}
```

---

## ⚠️ Important Notes

### Transaction Verification:
- **Always verify** transactions in your wallet before shipping
- Wait for **confirmations** (BTC: 1-3, USDT: 1-2)
- Check **exact amount** matches order
- Verify **correct wallet address** received payment

### Customer Support:
- Respond quickly to payment confirmations
- Keep transaction records
- Provide clear instructions
- Be available on WhatsApp/LINE/Telegram

### Legal Compliance:
- Check local regulations for crypto payments
- Keep records for tax purposes
- Consider consulting with accountant
- May need business license for crypto transactions

---

## 🧪 Testing

### Test Before Going Live:

1. **Test with small amounts** first
2. Send yourself a test transaction
3. Verify you receive it correctly
4. Test the customer flow
5. Make sure contact buttons work

### Test Wallets:
- Use testnet wallets for practice
- Bitcoin Testnet: https://testnet.help
- Never use real money for testing

---

## 📱 Customer Instructions

When customer clicks "Pay with Crypto", they see:

1. **Choose cryptocurrency** (BTC or USDT)
2. **See exact amount** to send
3. **Copy wallet address** (or scan QR)
4. **Send payment** from their wallet
5. **Contact you** with transaction ID

Make sure to:
- Respond within 1 hour
- Verify payment
- Confirm order
- Provide tracking number

---

## 🔄 Conversion to Fiat

If you want to convert crypto to Thai Baht:

### Exchanges in Thailand:
- Bitkub (most popular)
- Satang Pro
- Zipmex

### Process:
1. Receive crypto payment
2. Transfer to exchange
3. Sell for THB
4. Withdraw to bank account

### Fees:
- Exchange fees: 0.25% - 1%
- Withdrawal fees: vary by exchange
- Consider holding crypto if you believe in long-term value

---

## 📞 Support Resources

- **Bitcoin:** https://bitcoin.org
- **USDT:** https://tether.to
- **Tron Network:** https://tron.network
- **Ethereum:** https://ethereum.org

---

## ✅ Checklist Before Launch

- [ ] Created BTC wallet
- [ ] Created USDT wallet (TRC20 or ERC20)
- [ ] Updated wallet addresses in `script.js`
- [ ] Updated exchange rates
- [ ] Tested sending/receiving small amount
- [ ] Verified contact buttons work
- [ ] Prepared customer support process
- [ ] Checked local regulations
- [ ] Set up exchange account (if converting to fiat)
- [ ] Documented process for team

---

**Ready to accept crypto?** Update your wallet addresses and exchange rates in `script.js`! 🚀
