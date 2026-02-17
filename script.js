// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================

// Contact information
const contacts = {
    whatsapp: "+66123456789", // Your WhatsApp number with country code
    line: "kohphanganTea",     // Your LINE ID
    telegram: "kohphanganTea"  // Your Telegram username
};

// Donation configuration
const donationConfig = {
    stripeLink: 'https://donate.stripe.com/test_YOUR_DONATION_LINK', // Create at https://dashboard.stripe.com/payment-links
    defaultAmounts: [100, 250, 500, 1000] // Preset donation amounts in THB
};

// Crypto Wallet Addresses (UPDATE WITH YOUR ACTUAL WALLETS)
const cryptoWallets = {
    btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", // Your Bitcoin address
    usdt: "TYASr5UV6HEcXatwdFQfmLVUqQQQMUxHLS", // Your USDT TRC20 address (Tron network)
    usdtNetwork: "TRC20" // Network: TRC20 (Tron) - lower fees, faster
};

// Crypto prices (will be calculated from THB)
const cryptoPrices = {
    btcRate: 0.000015, // Approximate BTC per THB (update regularly)
    usdtRate: 0.029    // Approximate USDT per THB (1 THB ≈ 0.029 USDT)
};

// Stripe Payment Links (Create these at https://dashboard.stripe.com/payment-links)
// For each product, create a payment link and paste the URL here
const stripePaymentLinks = {
    'gabo-tea': 'https://buy.stripe.com/test_YOUR_GABO_LINK',
    'puer-tea': 'https://buy.stripe.com/test_YOUR_PUER_LINK',
    'red-tea': 'https://buy.stripe.com/test_YOUR_RED_LINK'
};

// Tea products data
const products = [
    {
        id: 'gabo-tea',
        name: "Gabo Tea",
        icon: "🍃",
        price: 450,
        currency: "฿",
        image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80",
        description: "Rare Gabo tea from the highlands of Koh Phangan. Known for its earthy, robust flavor and powerful health benefits.",
        benefits: [
            "Boosts immune system",
            "Rich in antioxidants",
            "Improves digestion",
            "Natural energy boost"
        ]
    },
    {
        id: 'puer-tea',
        name: "Puer Tea",
        icon: "🍂",
        price: 550,
        currency: "฿",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
        description: "Aged Puer tea with deep, complex flavors. Fermented to perfection for a smooth, mellow taste that improves with time.",
        benefits: [
            "Aids weight management",
            "Lowers cholesterol",
            "Promotes heart health",
            "Enhances mental clarity"
        ]
    },
    {
        id: 'red-tea',
        name: "Red Tea",
        icon: "🌺",
        price: 380,
        currency: "฿",
        image: "https://images.unsplash.com/photo-1597318130878-4e47f564e2f3?w=800&q=80",
        description: "Premium red tea with a sweet, full-bodied flavor. Perfect for any time of day with its balanced caffeine content.",
        benefits: [
            "Rich, smooth taste",
            "Supports metabolism",
            "High in polyphenols",
            "Reduces stress"
        ]
    }
];

// ============================================
// SHOPPING CART FUNCTIONALITY
// ============================================

let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    totalAmount.textContent = `฿${total}`;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${item.currency}${item.price} × ${item.quantity}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2d5016;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ============================================
// STRIPE PAYMENT (Using Payment Links)
// ============================================

function handleCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // For single item, redirect to Stripe Payment Link
    if (cart.length === 1) {
        const item = cart[0];
        const paymentLink = stripePaymentLinks[item.id];
        
        if (paymentLink && !paymentLink.includes('YOUR_')) {
            window.location.href = paymentLink;
            return;
        }
    }
    
    // For multiple items or unconfigured payment links, show contact options
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartDetails = cart.map(item => `${item.name} x${item.quantity} = ฿${item.price * item.quantity}`).join('\n');
    
    const message = encodeURIComponent(
        `Hi! I'd like to order:\n\n${cartDetails}\n\nTotal: ฿${total}\n\nPlease send me payment details. Thank you! 🍃`
    );
    
    // Show contact options
    const contactChoice = confirm(
        `Order Summary:\n${cartDetails}\n\nTotal: ฿${total}\n\n` +
        `Click OK to contact us via WhatsApp, or Cancel to use LINE/Telegram`
    );
    
    if (contactChoice) {
        window.open(`https://wa.me/${contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    } else {
        alert('Please contact us via WhatsApp, LINE, or Telegram (buttons below) to complete your order!');
    }
}

// ============================================
// CRYPTO PAYMENT FUNCTIONALITY
// ============================================

let selectedCrypto = null;

function handleCryptoCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Close cart modal
    document.getElementById('cart-modal').classList.remove('active');
    
    // Open crypto modal
    document.getElementById('crypto-modal').classList.add('active');
    
    // Reset crypto selection
    selectedCrypto = null;
    document.getElementById('crypto-details').style.display = 'none';
    document.querySelectorAll('.crypto-option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

function selectCrypto(crypto) {
    selectedCrypto = crypto;
    
    // Update button states
    document.querySelectorAll('.crypto-option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.crypto-option-btn').classList.add('selected');
    
    // Calculate amounts
    const totalTHB = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let cryptoAmount, cryptoSymbol, walletAddress;
    
    if (crypto === 'btc') {
        cryptoAmount = (totalTHB * cryptoPrices.btcRate).toFixed(8);
        cryptoSymbol = 'BTC';
        walletAddress = cryptoWallets.btc;
    } else if (crypto === 'usdt') {
        cryptoAmount = (totalTHB * cryptoPrices.usdtRate).toFixed(2);
        cryptoSymbol = 'USDT';
        walletAddress = cryptoWallets.usdt;
    }
    
    // Show payment details
    document.getElementById('crypto-details').style.display = 'block';
    document.getElementById('crypto-amount-display').textContent = `${cryptoAmount} ${cryptoSymbol}`;
    document.getElementById('wallet-address').value = walletAddress;
    
    // Generate QR code
    generateQRCode(walletAddress, cryptoAmount, cryptoSymbol);
    
    // Setup contact buttons with order details
    setupCryptoContactButtons(totalTHB, cryptoAmount, cryptoSymbol);
    
    // Scroll to details
    document.getElementById('crypto-details').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function generateQRCode(address, amount, symbol) {
    const qrContainer = document.getElementById('qr-code');
    qrContainer.innerHTML = ''; // Clear previous QR code
    
    // Create container for QR code
    const qrWrapper = document.createElement('div');
    qrWrapper.style.cssText = 'display: inline-block; padding: 20px; background: white; border-radius: 10px;';
    qrContainer.appendChild(qrWrapper);
    
    // Generate QR code with the wallet address
    try {
        new QRCode(qrWrapper, {
            text: address,
            width: 250,
            height: 250,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // Add label below QR code
        const label = document.createElement('p');
        label.textContent = `Scan to send ${amount} ${symbol}`;
        label.style.cssText = 'margin-top: 15px; color: #666; font-weight: bold;';
        qrContainer.appendChild(label);
        
        // Add network info for USDT
        if (symbol === 'USDT') {
            const networkInfo = document.createElement('p');
            networkInfo.textContent = `Network: ${cryptoWallets.usdtNetwork} (Tron)`;
            networkInfo.style.cssText = 'margin-top: 5px; color: #f7931a; font-weight: bold; font-size: 0.9rem;';
            qrContainer.appendChild(networkInfo);
        }
    } catch (error) {
        console.error('QR Code generation error:', error);
        qrContainer.innerHTML = `
            <div style="padding: 20px; background: #fff3cd; border-radius: 10px; border: 2px solid #ffc107;">
                <p style="color: #856404; margin-bottom: 10px;">⚠️ QR Code generation failed</p>
                <p style="color: #856404; font-size: 0.9rem;">Please copy the address manually</p>
            </div>
        `;
    }
}

function copyAddress() {
    const addressInput = document.getElementById('wallet-address');
    addressInput.select();
    addressInput.setSelectionRange(0, 99999); // For mobile devices
    
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(addressInput.value).then(() => {
            showCopySuccess();
        }).catch(() => {
            // Fallback to old method
            document.execCommand('copy');
            showCopySuccess();
        });
    } else {
        // Fallback for older browsers
        document.execCommand('copy');
        showCopySuccess();
    }
}

function showCopySuccess() {
    const copyBtn = document.getElementById('copy-address');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✓ Copied!';
    copyBtn.classList.add('copied');
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.classList.remove('copied');
    }, 2000);
    
    showNotification('Address copied to clipboard!');
}

function setupCryptoContactButtons(totalTHB, cryptoAmount, cryptoSymbol) {
    const cartDetails = cart.map(item => `${item.name} x${item.quantity}`).join('\n');
    const message = encodeURIComponent(
        `Hi! I just sent crypto payment:\n\n` +
        `Order:\n${cartDetails}\n\n` +
        `Amount: ${cryptoAmount} ${cryptoSymbol}\n` +
        `(฿${totalTHB})\n\n` +
        `Please confirm my order. Transaction ID: [paste here]\n\n` +
        `Thank you! 🍃`
    );
    
    document.getElementById('whatsapp-crypto').href = 
        `https://wa.me/${contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`;
    document.getElementById('line-crypto').href = 
        `https://line.me/ti/p/~${contacts.line}`;
    document.getElementById('telegram-crypto').href = 
        `https://t.me/${contacts.telegram}`;
}

// ============================================
// UI FUNCTIONS
// ============================================

function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.icon} ${product.name}</h3>
                <div class="product-price">${product.currency}${product.price}</div>
                <p class="product-description">${product.description}</p>
                <ul class="product-benefits">
                    ${product.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
                <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
                    Add to Cart 🛒
                </button>
            </div>
        </div>
    `).join('');
}

function setupContactButtons() {
    const message = encodeURIComponent("Hi! I'm interested in ordering tea from Koh Phangan Chinese Tea 🍃");
    
    document.getElementById('whatsapp-btn').href = 
        `https://wa.me/${contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`;
    
    document.getElementById('line-btn').href = 
        `https://line.me/ti/p/~${contacts.line}`;
    
    document.getElementById('telegram-btn').href = 
        `https://t.me/${contacts.telegram}`;
}

function setupCartModal() {
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cryptoBtn = document.getElementById('crypto-btn');
    const cryptoModal = document.getElementById('crypto-modal');
    const closeCrypto = document.getElementById('close-crypto');
    const copyBtn = document.getElementById('copy-address');
    
    // Cart modal
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });
    
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
    
    checkoutBtn.addEventListener('click', handleCheckout);
    cryptoBtn.addEventListener('click', handleCryptoCheckout);
    
    // Crypto modal
    closeCrypto.addEventListener('click', () => {
        cryptoModal.classList.remove('active');
    });
    
    cryptoModal.addEventListener('click', (e) => {
        if (e.target === cryptoModal) {
            cryptoModal.classList.remove('active');
        }
    });
    
    // Crypto option buttons
    document.querySelectorAll('.crypto-option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const crypto = btn.getAttribute('data-crypto');
            selectCrypto(crypto);
        });
    });
    
    // Copy address button
    copyBtn.addEventListener('click', copyAddress);
    
    // Setup donation modal
    setupDonationModal();
}

// ============================================
// DONATION FUNCTIONALITY
// ============================================

let selectedDonationAmount = null;
let selectedDonationMethod = null;

function setupDonationModal() {
    const donationBtn = document.getElementById('donation-btn');
    const donationModal = document.getElementById('donation-modal');
    const closeDonation = document.getElementById('close-donation');
    const customAmountInput = document.getElementById('custom-amount');
    
    // Open donation modal
    donationBtn.addEventListener('click', () => {
        donationModal.classList.add('active');
        selectedDonationAmount = null;
        selectedDonationMethod = null;
        customAmountInput.value = '';
        
        // Reset selections
        document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('selected'));
        document.querySelectorAll('.donation-method-btn').forEach(btn => btn.classList.remove('selected'));
    });
    
    // Close donation modal
    closeDonation.addEventListener('click', () => {
        donationModal.classList.remove('active');
    });
    
    donationModal.addEventListener('click', (e) => {
        if (e.target === donationModal) {
            donationModal.classList.remove('active');
        }
    });
    
    // Amount selection buttons
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectedDonationAmount = parseInt(btn.getAttribute('data-amount'));
            customAmountInput.value = '';
            
            // Update button states
            document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            
            // If method is selected, process donation
            if (selectedDonationMethod) {
                processDonation();
            }
        });
    });
    
    // Custom amount input
    customAmountInput.addEventListener('input', (e) => {
        selectedDonationAmount = parseInt(e.target.value) || null;
        
        // Deselect preset amounts
        document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('selected'));
        
        // If method is selected and amount is valid, process donation
        if (selectedDonationMethod && selectedDonationAmount > 0) {
            processDonation();
        }
    });
    
    // Donation method buttons
    document.querySelectorAll('.donation-method-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectedDonationMethod = btn.getAttribute('data-method');
            
            // Update button states
            document.querySelectorAll('.donation-method-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            
            // If amount is selected, process donation
            if (selectedDonationAmount > 0) {
                processDonation();
            } else {
                showNotification('Please select or enter a donation amount first');
            }
        });
    });
}

function processDonation() {
    if (!selectedDonationAmount || selectedDonationAmount <= 0) {
        showNotification('Please enter a valid donation amount');
        return;
    }
    
    if (!selectedDonationMethod) {
        showNotification('Please select a payment method');
        return;
    }
    
    if (selectedDonationMethod === 'card') {
        // Redirect to Stripe donation link
        const stripeLink = donationConfig.stripeLink;
        
        if (stripeLink && !stripeLink.includes('YOUR_')) {
            window.location.href = stripeLink;
        } else {
            // Fallback to contact
            const message = encodeURIComponent(
                `Hi! I'd like to make a donation of ฿${selectedDonationAmount} to support your tea community. 💚\n\nPlease send me payment details. Thank you!`
            );
            window.open(`https://wa.me/${contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
        }
    } else if (selectedDonationMethod === 'crypto') {
        // Show crypto payment options
        document.getElementById('donation-modal').classList.remove('active');
        
        // Create temporary cart for donation
        const originalCart = [...cart];
        cart = [{
            id: 'donation',
            name: 'Donation',
            price: selectedDonationAmount,
            quantity: 1,
            currency: '฿'
        }];
        
        // Open crypto modal
        handleCryptoCheckout();
        
        // Restore original cart after a delay
        setTimeout(() => {
            cart = originalCart;
        }, 1000);
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupContactButtons();
    setupCartModal();
    updateCartUI();
});
