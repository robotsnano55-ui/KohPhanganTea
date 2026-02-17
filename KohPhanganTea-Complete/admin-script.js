// ============================================
// DATA STORAGE (LocalStorage)
// ============================================

const DB = {
    orders: 'tea_orders',
    customers: 'tea_customers',
    invoices: 'tea_invoices',
    settings: 'tea_settings',
    products: 'tea_products'
};

// Initialize data
function initializeData() {
    if (!localStorage.getItem(DB.orders)) {
        localStorage.setItem(DB.orders, JSON.stringify([]));
    }
    if (!localStorage.getItem(DB.customers)) {
        localStorage.setItem(DB.customers, JSON.stringify([]));
    }
    if (!localStorage.getItem(DB.invoices)) {
        localStorage.setItem(DB.invoices, JSON.stringify([]));
    }
    if (!localStorage.getItem(DB.settings)) {
        const defaultSettings = {
            businessName: 'Koh Phangan Chinese Tea',
            taxId: '',
            address: 'Koh Phangan, Surat Thani, Thailand',
            phone: '+66 123 456 789',
            email: 'info@kohphangantea.com',
            invoicePrefix: 'INV-',
            nextInvoiceNumber: 1001,
            paymentTerms: 7,
            invoiceNotes: 'Thank you for your business!'
        };
        localStorage.setItem(DB.settings, JSON.stringify(defaultSettings));
    }
    if (!localStorage.getItem(DB.products)) {
        const defaultProducts = [
            { id: 'gabo-tea', name: 'Gabo Tea', price: 450, stock: 100 },
            { id: 'puer-tea', name: 'Puer Tea', price: 550, stock: 80 },
            { id: 'red-tea', name: 'Red Tea', price: 380, stock: 120 }
        ];
        localStorage.setItem(DB.products, JSON.stringify(defaultProducts));
    }
}

// Data operations
function getData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getSettings() {
    return JSON.parse(localStorage.getItem(DB.settings));
}

function saveSettings(settings) {
    localStorage.setItem(DB.settings, JSON.stringify(settings));
}

// ============================================
// NAVIGATION
// ============================================

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    
    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        orders: 'Orders',
        invoices: 'Invoices',
        customers: 'Customers',
        products: 'Products',
        reports: 'Reports',
        settings: 'Settings'
    };
    document.getElementById('page-title').textContent = titles[sectionName];
    
    // Load section data
    loadSectionData(sectionName);
}

function loadSectionData(section) {
    switch(section) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'invoices':
            loadInvoices();
            break;
        case 'customers':
            loadCustomers();
            break;
        case 'products':
            loadProducts();
            break;
    }
}

// ============================================
// DASHBOARD
// ============================================

function loadDashboard() {
    const orders = getData(DB.orders);
    const customers = getData(DB.customers);
    
    // Calculate stats
    const totalRevenue = orders
        .filter(o => o.status === 'paid' || o.status === 'completed')
        .reduce((sum, o) => sum + o.total, 0);
    
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    
    // Update stats
    document.getElementById('total-revenue').textContent = `฿${totalRevenue.toLocaleString()}`;
    document.getElementById('total-orders').textContent = orders.length;
    document.getElementById('pending-orders').textContent = pendingOrders;
    document.getElementById('total-customers').textContent = customers.length;
    
    // Load recent orders
    const recentOrders = orders.slice(-5).reverse();
    const recentOrdersList = document.getElementById('recent-orders-list');
    
    if (recentOrders.length === 0) {
        recentOrdersList.innerHTML = '<p class="empty-state">No orders yet</p>';
    } else {
        recentOrdersList.innerHTML = recentOrders.map(order => `
            <div style="padding: 15px; border-bottom: 1px solid #f0f0f0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <strong>${order.id}</strong>
                    <span class="status-badge status-${order.status}">${order.status}</span>
                </div>
                <div style="color: #666; font-size: 0.9rem;">
                    ${order.customerName} - ฿${order.total}
                </div>
            </div>
        `).join('');
    }
}

// ============================================
// ORDERS MANAGEMENT
// ============================================

function loadOrders() {
    const orders = getData(DB.orders);
    const tbody = document.getElementById('orders-table-body');
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="empty-state">No orders found</td></tr>';
        return;
    }
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>${formatDate(order.date)}</td>
            <td>${order.customerName}</td>
            <td>${order.items.length} items</td>
            <td><strong>฿${order.total}</strong></td>
            <td>${order.paymentMethod}</td>
            <td><span class="status-badge status-${order.status}">${order.status}</span></td>
            <td class="action-btns">
                <button class="btn-icon" onclick="viewOrder('${order.id}')" title="View">👁️</button>
                <button class="btn-icon" onclick="editOrder('${order.id}')" title="Edit">✏️</button>
                <button class="btn-icon" onclick="generateInvoiceForOrder('${order.id}')" title="Invoice">🧾</button>
                <button class="btn-icon" onclick="deleteOrder('${order.id}')" title="Delete">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function createNewOrder() {
    document.getElementById('order-modal').classList.add('active');
    document.getElementById('order-modal-title').textContent = 'New Order';
    document.getElementById('order-form').reset();
    document.getElementById('order-items-list').innerHTML = '';
    addOrderItem();
}

function addOrderItem() {
    const products = getData(DB.products);
    const itemsList = document.getElementById('order-items-list');
    const itemId = Date.now();
    
    const itemHTML = `
        <div class="order-item" data-item-id="${itemId}">
            <select class="item-product" onchange="updateOrderTotal()">
                <option value="">Select product</option>
                ${products.map(p => `<option value="${p.id}" data-price="${p.price}">${p.name} - ฿${p.price}</option>`).join('')}
            </select>
            <input type="number" class="item-quantity" min="1" value="1" placeholder="Qty" onchange="updateOrderTotal()">
            <input type="number" class="item-price" placeholder="Price" readonly>
            <button type="button" class="btn-icon" onclick="removeOrderItem(${itemId})">🗑️</button>
        </div>
    `;
    
    itemsList.insertAdjacentHTML('beforeend', itemHTML);
}

function removeOrderItem(itemId) {
    document.querySelector(`[data-item-id="${itemId}"]`).remove();
    updateOrderTotal();
}

function updateOrderTotal() {
    let total = 0;
    document.querySelectorAll('.order-item').forEach(item => {
        const select = item.querySelector('.item-product');
        const quantity = parseInt(item.querySelector('.item-quantity').value) || 0;
        const priceInput = item.querySelector('.item-price');
        
        if (select.value) {
            const price = parseFloat(select.selectedOptions[0].dataset.price) || 0;
            const itemTotal = price * quantity;
            priceInput.value = itemTotal;
            total += itemTotal;
        }
    });
    
    document.getElementById('order-total-amount').textContent = `฿${total}`;
}

function closeOrderModal() {
    document.getElementById('order-modal').classList.remove('active');
}

// Handle order form submission
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    loadDashboard();
    
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            showSection(section);
        });
    });
    
    // Order form
    document.getElementById('order-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveOrder();
    });
    
    // Settings forms
    document.getElementById('business-info-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveBusinessInfo();
    });
    
    document.getElementById('invoice-settings-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveInvoiceSettings();
    });
    
    // Load settings
    loadSettings();
});

function saveOrder() {
    const orders = getData(DB.orders);
    const products = getData(DB.products);
    
    // Collect order items
    const items = [];
    document.querySelectorAll('.order-item').forEach(item => {
        const productId = item.querySelector('.item-product').value;
        const quantity = parseInt(item.querySelector('.item-quantity').value);
        const price = parseFloat(item.querySelector('.item-price').value);
        
        if (productId && quantity > 0) {
            const product = products.find(p => p.id === productId);
            items.push({
                productId,
                productName: product.name,
                quantity,
                price: product.price,
                total: price
            });
        }
    });
    
    if (items.length === 0) {
        alert('Please add at least one item');
        return;
    }
    
    const total = items.reduce((sum, item) => sum + item.total, 0);
    
    const order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        customerName: document.getElementById('customer-name').value,
        customerContact: document.getElementById('customer-contact').value,
        deliveryAddress: document.getElementById('delivery-address').value,
        items,
        total,
        paymentMethod: document.getElementById('payment-method').value,
        status: document.getElementById('order-status').value
    };
    
    orders.push(order);
    setData(DB.orders, orders);
    
    // Add/update customer
    saveCustomer(order.customerName, order.customerContact);
    
    closeOrderModal();
    showSection('orders');
    alert('Order saved successfully!');
}

function saveCustomer(name, contact) {
    const customers = getData(DB.customers);
    const existing = customers.find(c => c.contact === contact);
    
    if (!existing) {
        customers.push({
            id: `CUST-${Date.now()}`,
            name,
            contact,
            totalOrders: 1,
            totalSpent: 0,
            lastOrder: new Date().toISOString()
        });
        setData(DB.customers, customers);
    }
}

function deleteOrder(orderId) {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    const orders = getData(DB.orders);
    const filtered = orders.filter(o => o.id !== orderId);
    setData(DB.orders, filtered);
    loadOrders();
}

// ============================================
// INVOICE GENERATION
// ============================================

function loadInvoices() {
    const invoices = getData(DB.invoices);
    const tbody = document.getElementById('invoices-table-body');
    
    if (invoices.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No invoices yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = invoices.map(invoice => `
        <tr>
            <td><strong>${invoice.invoiceNumber}</strong></td>
            <td>${formatDate(invoice.date)}</td>
            <td>${invoice.customerName}</td>
            <td><strong>฿${invoice.total}</strong></td>
            <td><span class="status-badge status-${invoice.status}">${invoice.status}</span></td>
            <td class="action-btns">
                <button class="btn-icon" onclick="viewInvoice('${invoice.id}')" title="View">👁️</button>
                <button class="btn-icon" onclick="downloadInvoice('${invoice.id}')" title="Download">📥</button>
                <button class="btn-icon" onclick="printInvoice('${invoice.id}')" title="Print">🖨️</button>
                <button class="btn-icon" onclick="deleteInvoice('${invoice.id}')" title="Delete">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function generateInvoice() {
    const orders = getData(DB.orders);
    const paidOrders = orders.filter(o => o.status === 'paid' || o.status === 'completed');
    
    if (paidOrders.length === 0) {
        alert('No paid orders available to generate invoice');
        return;
    }
    
    // Show order selection dialog
    const orderOptions = paidOrders.map(o => 
        `${o.id} - ${o.customerName} - ฿${o.total}`
    ).join('\n');
    
    const selectedIndex = prompt(`Select order number (0-${paidOrders.length-1}):\n\n${orderOptions}`);
    
    if (selectedIndex === null) return;
    
    const order = paidOrders[parseInt(selectedIndex)];
    if (!order) {
        alert('Invalid selection');
        return;
    }
    
    generateInvoiceForOrder(order.id);
}

function generateInvoiceForOrder(orderId) {
    const orders = getData(DB.orders);
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        alert('Order not found');
        return;
    }
    
    const settings = getSettings();
    const invoices = getData(DB.invoices);
    
    const invoice = {
        id: `INV-${Date.now()}`,
        invoiceNumber: `${settings.invoicePrefix}${settings.nextInvoiceNumber}`,
        orderId: order.id,
        date: new Date().toISOString(),
        dueDate: new Date(Date.now() + settings.paymentTerms * 24 * 60 * 60 * 1000).toISOString(),
        customerName: order.customerName,
        customerContact: order.customerContact,
        deliveryAddress: order.deliveryAddress,
        items: order.items,
        subtotal: order.total,
        tax: 0,
        total: order.total,
        status: order.status === 'paid' || order.status === 'completed' ? 'paid' : 'pending',
        paymentMethod: order.paymentMethod,
        notes: settings.invoiceNotes
    };
    
    invoices.push(invoice);
    setData(DB.invoices, invoices);
    
    // Increment invoice number
    settings.nextInvoiceNumber++;
    saveSettings(settings);
    
    alert(`Invoice ${invoice.invoiceNumber} generated successfully!`);
    showSection('invoices');
}

function viewInvoice(invoiceId) {
    const invoices = getData(DB.invoices);
    const invoice = invoices.find(i => i.id === invoiceId);
    
    if (!invoice) return;
    
    const settings = getSettings();
    
    // Create invoice HTML
    const invoiceHTML = generateInvoiceHTML(invoice, settings);
    
    // Open in new window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
}

function generateInvoiceHTML(invoice, settings) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice ${invoice.invoiceNumber}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            color: #333;
        }
        .invoice-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #2d5016;
        }
        .company-info h1 {
            color: #2d5016;
            margin: 0 0 10px 0;
        }
        .invoice-details {
            text-align: right;
        }
        .invoice-number {
            font-size: 24px;
            font-weight: bold;
            color: #2d5016;
        }
        .customer-info {
            margin: 30px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
        }
        th {
            background: #2d5016;
            color: white;
            padding: 12px;
            text-align: left;
        }
        td {
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
        }
        .text-right {
            text-align: right;
        }
        .totals {
            margin-left: auto;
            width: 300px;
        }
        .totals tr td {
            padding: 8px;
        }
        .total-row {
            font-size: 18px;
            font-weight: bold;
            background: #f0f8f0;
        }
        .notes {
            margin-top: 40px;
            padding: 20px;
            background: #fff8f0;
            border-left: 4px solid #f7931a;
        }
        .footer {
            margin-top: 60px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        @media print {
            body { padding: 20px; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <div class="no-print" style="margin-bottom: 20px;">
        <button onclick="window.print()" style="padding: 10px 20px; background: #2d5016; color: white; border: none; border-radius: 5px; cursor: pointer;">Print Invoice</button>
        <button onclick="window.close()" style="padding: 10px 20px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">Close</button>
    </div>

    <div class="invoice-header">
        <div class="company-info">
            <h1>🍃 ${settings.businessName}</h1>
            <p>${settings.address}</p>
            <p>Phone: ${settings.phone}</p>
            <p>Email: ${settings.email}</p>
            ${settings.taxId ? `<p>Tax ID: ${settings.taxId}</p>` : ''}
        </div>
        <div class="invoice-details">
            <div class="invoice-number">${invoice.invoiceNumber}</div>
            <p><strong>Date:</strong> ${formatDate(invoice.date)}</p>
            <p><strong>Due Date:</strong> ${formatDate(invoice.dueDate)}</p>
            <p><strong>Order ID:</strong> ${invoice.orderId}</p>
        </div>
    </div>

    <div class="customer-info">
        <h3>Bill To:</h3>
        <p><strong>${invoice.customerName}</strong></p>
        <p>${invoice.customerContact}</p>
        ${invoice.deliveryAddress ? `<p>${invoice.deliveryAddress}</p>` : ''}
    </div>

    <table>
        <thead>
            <tr>
                <th>Item</th>
                <th class="text-right">Quantity</th>
                <th class="text-right">Unit Price</th>
                <th class="text-right">Total</th>
            </tr>
        </thead>
        <tbody>
            ${invoice.items.map(item => `
                <tr>
                    <td>${item.productName}</td>
                    <td class="text-right">${item.quantity}</td>
                    <td class="text-right">฿${item.price.toFixed(2)}</td>
                    <td class="text-right">฿${item.total.toFixed(2)}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <table class="totals">
        <tr>
            <td>Subtotal:</td>
            <td class="text-right">฿${invoice.subtotal.toFixed(2)}</td>
        </tr>
        ${invoice.tax > 0 ? `
        <tr>
            <td>Tax:</td>
            <td class="text-right">฿${invoice.tax.toFixed(2)}</td>
        </tr>
        ` : ''}
        <tr class="total-row">
            <td>Total:</td>
            <td class="text-right">฿${invoice.total.toFixed(2)}</td>
        </tr>
    </table>

    <div style="margin: 20px 0;">
        <p><strong>Payment Method:</strong> ${invoice.paymentMethod}</p>
        <p><strong>Status:</strong> <span style="color: ${invoice.status === 'paid' ? '#4caf50' : '#f7931a'}; font-weight: bold;">${invoice.status.toUpperCase()}</span></p>
    </div>

    ${invoice.notes ? `
    <div class="notes">
        <h4>Notes:</h4>
        <p>${invoice.notes}</p>
    </div>
    ` : ''}

    <div class="footer">
        <p>Thank you for your business!</p>
        <p>${settings.businessName} | ${settings.phone} | ${settings.email}</p>
    </div>
</body>
</html>
    `;
}

function downloadInvoice(invoiceId) {
    viewInvoice(invoiceId);
    setTimeout(() => {
        alert('Click Print button and select "Save as PDF" to download');
    }, 500);
}

function printInvoice(invoiceId) {
    viewInvoice(invoiceId);
}

function deleteInvoice(invoiceId) {
    if (!confirm('Are you sure you want to delete this invoice?')) return;
    
    const invoices = getData(DB.invoices);
    const filtered = invoices.filter(i => i.id !== invoiceId);
    setData(DB.invoices, filtered);
    loadInvoices();
}

// ============================================
// CUSTOMERS
// ============================================

function loadCustomers() {
    const customers = getData(DB.customers);
    const orders = getData(DB.orders);
    
    // Update customer stats
    customers.forEach(customer => {
        const customerOrders = orders.filter(o => o.customerContact === customer.contact);
        customer.totalOrders = customerOrders.length;
        customer.totalSpent = customerOrders
            .filter(o => o.status === 'paid' || o.status === 'completed')
            .reduce((sum, o) => sum + o.total, 0);
        if (customerOrders.length > 0) {
            customer.lastOrder = customerOrders[customerOrders.length - 1].date;
        }
    });
    
    setData(DB.customers, customers);
    
    const tbody = document.getElementById('customers-table-body');
    
    if (customers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No customers yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = customers.map(customer => `
        <tr>
            <td><strong>${customer.name}</strong></td>
            <td>${customer.contact}</td>
            <td>${customer.totalOrders}</td>
            <td><strong>฿${customer.totalSpent.toLocaleString()}</strong></td>
            <td>${customer.lastOrder ? formatDate(customer.lastOrder) : 'N/A'}</td>
            <td class="action-btns">
                <button class="btn-icon" onclick="viewCustomer('${customer.id}')" title="View">👁️</button>
                <button class="btn-icon" onclick="deleteCustomer('${customer.id}')" title="Delete">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function deleteCustomer(customerId) {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    
    const customers = getData(DB.customers);
    const filtered = customers.filter(c => c.id !== customerId);
    setData(DB.customers, filtered);
    loadCustomers();
}

// ============================================
// PRODUCTS
// ============================================

function loadProducts() {
    const products = getData(DB.products);
    const grid = document.getElementById('products-grid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p class="empty-state">No products yet</p>';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card-admin">
            <h4>${product.name}</h4>
            <div class="product-price-admin">฿${product.price}</div>
            <p>Stock: ${product.stock} units</p>
            <div class="action-btns" style="margin-top: 15px;">
                <button class="btn-icon" onclick="editProduct('${product.id}')" title="Edit">✏️</button>
                <button class="btn-icon" onclick="deleteProduct('${product.id}')" title="Delete">🗑️</button>
            </div>
        </div>
    `).join('');
}

function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const products = getData(DB.products);
    const filtered = products.filter(p => p.id !== productId);
    setData(DB.products, filtered);
    loadProducts();
}

// ============================================
// REPORTS
// ============================================

function generateReport() {
    const startDate = document.getElementById('report-start-date').value;
    const endDate = document.getElementById('report-end-date').value;
    
    if (!startDate || !endDate) {
        alert('Please select date range');
        return;
    }
    
    const orders = getData(DB.orders);
    const filteredOrders = orders.filter(o => {
        const orderDate = new Date(o.date);
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
    
    // Calculate stats
    const totalSales = filteredOrders
        .filter(o => o.status === 'paid' || o.status === 'completed')
        .reduce((sum, o) => sum + o.total, 0);
    
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    
    // Payment methods breakdown
    const paymentMethods = {};
    filteredOrders.forEach(o => {
        paymentMethods[o.paymentMethod] = (paymentMethods[o.paymentMethod] || 0) + 1;
    });
    
    // Display results
    document.getElementById('sales-summary').innerHTML = `
        <div style="padding: 20px;">
            <h4>Period: ${formatDate(startDate)} to ${formatDate(endDate)}</h4>
            <div style="margin: 20px 0;">
                <p><strong>Total Sales:</strong> ฿${totalSales.toLocaleString()}</p>
                <p><strong>Total Orders:</strong> ${totalOrders}</p>
                <p><strong>Average Order Value:</strong> ฿${avgOrderValue.toFixed(2)}</p>
            </div>
        </div>
    `;
    
    document.getElementById('payment-methods-chart').innerHTML = `
        <div style="padding: 20px;">
            ${Object.entries(paymentMethods).map(([method, count]) => `
                <div style="margin: 10px 0;">
                    <strong>${method}:</strong> ${count} orders (${((count/totalOrders)*100).toFixed(1)}%)
                </div>
            `).join('')}
        </div>
    `;
}

// ============================================
// SETTINGS
// ============================================

function loadSettings() {
    const settings = getSettings();
    
    document.getElementById('business-name').value = settings.businessName;
    document.getElementById('tax-id').value = settings.taxId || '';
    document.getElementById('business-address').value = settings.address;
    document.getElementById('business-phone').value = settings.phone;
    document.getElementById('business-email').value = settings.email;
    document.getElementById('invoice-prefix').value = settings.invoicePrefix;
    document.getElementById('next-invoice-number').value = settings.nextInvoiceNumber;
    document.getElementById('payment-terms').value = settings.paymentTerms;
    document.getElementById('invoice-notes').value = settings.invoiceNotes;
}

function saveBusinessInfo() {
    const settings = getSettings();
    
    settings.businessName = document.getElementById('business-name').value;
    settings.taxId = document.getElementById('tax-id').value;
    settings.address = document.getElementById('business-address').value;
    settings.phone = document.getElementById('business-phone').value;
    settings.email = document.getElementById('business-email').value;
    
    saveSettings(settings);
    alert('Business information saved!');
}

function saveInvoiceSettings() {
    const settings = getSettings();
    
    settings.invoicePrefix = document.getElementById('invoice-prefix').value;
    settings.nextInvoiceNumber = parseInt(document.getElementById('next-invoice-number').value);
    settings.paymentTerms = parseInt(document.getElementById('payment-terms').value);
    settings.invoiceNotes = document.getElementById('invoice-notes').value;
    
    saveSettings(settings);
    alert('Invoice settings saved!');
}

// ============================================
// EXPORT DATA
// ============================================

function exportData() {
    const data = {
        orders: getData(DB.orders),
        customers: getData(DB.customers),
        invoices: getData(DB.invoices),
        products: getData(DB.products),
        settings: getSettings(),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `tea-shop-data-${formatDate(new Date())}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    alert('Data exported successfully!');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDate(date) {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
    });
}

function viewOrder(orderId) {
    const orders = getData(DB.orders);
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    alert(`Order Details:\n\n${JSON.stringify(order, null, 2)}`);
}

function editOrder(orderId) {
    alert('Edit functionality coming soon!');
}

function viewCustomer(customerId) {
    const customers = getData(DB.customers);
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;
    
    alert(`Customer Details:\n\n${JSON.stringify(customer, null, 2)}`);
}

function addCustomer() {
    alert('Add customer functionality coming soon!');
}

function addProduct() {
    alert('Add product functionality coming soon!');
}

function editProduct(productId) {
    alert('Edit product functionality coming soon!');
}
