// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================

// Contact information
const contacts = {
    whatsapp: "+66123456789", // Your WhatsApp number with country code
    line: "kohphanganTea",     // Your LINE ID
    telegram: "kohphanganTea"  // Your Telegram username
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
        image: "images/gabo-tea.jpg",
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
        image: "images/puer-tea.jpg",
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
        image: "images/red-tea.jpg",
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
            // Add quantity parameter if supported
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
        // Show modal with all contact options
        alert('Please contact us via WhatsApp, LINE, or Telegram (buttons below) to complete your order!');
    }
}

// ============================================
// UI FUNCTIONS
// ============================================

function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center;">
                ${!product.image.includes('unsplash') ? product.icon : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
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
