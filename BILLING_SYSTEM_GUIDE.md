# 📊 Billing System Guide

## Overview

Your Koh Phangan Chinese Tea shop now has a complete billing and admin system for managing orders, generating invoices, tracking customers, and analyzing sales.

---

## 🚀 Quick Start

### Access Admin Dashboard

1. Open `admin.html` in your browser
2. You'll see the admin dashboard with:
   - Sales statistics
   - Recent orders
   - Quick actions

### Default Login
- No password required (add authentication for production)
- All data stored locally in browser

---

## 📦 Features

### 1. Dashboard
- **Total Revenue** - Sum of all paid orders
- **Total Orders** - Count of all orders
- **Pending Orders** - Orders awaiting payment
- **Total Customers** - Unique customers
- **Recent Orders** - Last 5 orders
- **Quick Actions** - Fast access to common tasks

### 2. Orders Management
- Create new orders manually
- View all orders with filters
- Edit order details
- Update order status
- Delete orders
- Generate invoices from orders

### 3. Invoice Generation
- Automatic invoice numbering
- Professional invoice layout
- Print/PDF export
- Track invoice status
- Customizable invoice settings

### 4. Customer Management
- Track customer information
- View order history per customer
- Calculate total spent
- Last order date

### 5. Products Management
- View all products
- Edit product details
- Track stock levels
- Update pricing

### 6. Reports
- Sales reports by date range
- Payment method breakdown
- Revenue analytics
- Order statistics

### 7. Settings
- Business information
- Tax ID/Registration
- Invoice customization
- Payment terms

---

## 💼 How to Use

### Creating an Order

1. Click **"+ New Order"** button
2. Fill in customer details:
   - Name (required)
   - Contact (phone/email)
   - Delivery address
3. Add order items:
   - Select product
   - Enter quantity
   - Price auto-calculates
4. Select payment method:
   - Card (Stripe)
   - Bitcoin (BTC)
   - USDT (TRC20)
   - Bank Transfer
   - Cash
5. Set order status:
   - Pending Payment
   - Paid
   - Shipped
   - Completed
6. Click **"Save Order"**

### Generating an Invoice

**Method 1: From Orders Page**
1. Go to Orders section
2. Find the order
3. Click invoice icon (🧾)
4. Invoice generated automatically

**Method 2: From Invoices Page**
1. Go to Invoices section
2. Click **"+ Generate Invoice"**
3. Select order from list
4. Invoice created

### Invoice Features

- **View**: Opens invoice in new window
- **Download**: Save as PDF (use Print → Save as PDF)
- **Print**: Direct printing
- **Professional Layout**:
  - Company header
  - Customer details
  - Itemized list
  - Totals and tax
  - Payment info
  - Custom notes

---

## 🧾 Invoice Customization

### Business Information
```
Settings → Business Information
- Business Name
- Tax ID
- Address
- Phone
- Email
```

### Invoice Settings
```
Settings → Invoice Settings
- Invoice Prefix (e.g., "INV-")
- Starting Number (e.g., 1001)
- Payment Terms (days)
- Invoice Notes
```

### Example Invoice Number
- Prefix: `INV-`
- Number: `1001`
- Result: `INV-1001`

Next invoice: `INV-1002` (auto-increments)

---

## 📊 Reports & Analytics

### Sales Report

1. Go to Reports section
2. Select date range:
   - Start date
   - End date
3. Click **"Generate"**
4. View:
   - Total sales
   - Total orders
   - Average order value
   - Payment methods breakdown

### Export Data

1. Dashboard → Quick Actions
2. Click **"Export Data"**
3. Downloads JSON file with:
   - All orders
   - All customers
   - All invoices
   - Products
   - Settings

### Data Backup

- Export data regularly
- Save JSON file securely
- Can import later if needed

---

## 💾 Data Storage

### LocalStorage
- All data stored in browser
- No server required
- Persists between sessions
- Per-browser storage

### Data Structure

```javascript
{
  orders: [],      // All orders
  customers: [],   // Customer database
  invoices: [],    // Generated invoices
  products: [],    // Product catalog
  settings: {}     // Business settings
}
```

### Important Notes

⚠️ **Data is browser-specific**
- Different browsers = different data
- Clear browser data = lose all data
- Export regularly for backup

⚠️ **No cloud sync**
- Data not synced across devices
- Use export/import for transfer

---

## 🔐 Security Considerations

### For Production Use

1. **Add Authentication**
   - Password protection
   - User roles (admin, staff)
   - Session management

2. **Use Backend Database**
   - MySQL, PostgreSQL
   - MongoDB
   - Firebase

3. **Secure Data**
   - HTTPS only
   - Encrypt sensitive data
   - Regular backups

4. **Access Control**
   - Limit admin access
   - Audit logs
   - IP restrictions

---

## 📱 Mobile Access

The admin dashboard is responsive:
- Works on tablets
- Works on phones
- Touch-friendly interface
- Optimized layouts

---

## 🎯 Workflow Examples

### Daily Operations

**Morning:**
1. Check Dashboard for new orders
2. Review pending payments
3. Generate invoices for paid orders

**During Day:**
4. Create orders as they come in
5. Update order status
6. Send invoices to customers

**Evening:**
7. Review daily sales
8. Export data backup
9. Check inventory

### Monthly Tasks

1. Generate monthly sales report
2. Review customer data
3. Update product prices
4. Backup all data
5. Reconcile payments

---

## 🧮 Tax & Accounting

### Invoice Records

All invoices include:
- Invoice number
- Date issued
- Due date
- Customer details
- Itemized products
- Subtotal
- Tax (if applicable)
- Total amount
- Payment method

### For Accountant

Export data monthly:
1. Go to Dashboard
2. Click "Export Data"
3. Send JSON file to accountant
4. Contains all transactions

### Tax Compliance

- Add Tax ID in settings
- Include tax rate if needed
- Keep invoice records
- Export for tax filing

---

## 🔄 Integration with Shop

### Automatic Order Creation

When customer pays on website:
1. Order data captured
2. Manually create in admin
3. Generate invoice
4. Send to customer

### Future Enhancement

Connect shop to admin:
- Auto-create orders
- Real-time sync
- Email invoices
- SMS notifications

---

## 📞 Customer Communication

### After Order

1. Generate invoice
2. Print or save as PDF
3. Send via:
   - Email
   - WhatsApp
   - LINE
   - Telegram

### Invoice Delivery

**Email Template:**
```
Subject: Invoice INV-1001 - Koh Phangan Chinese Tea

Dear [Customer Name],

Thank you for your order!

Please find attached your invoice INV-1001 for ฿450.

Order Details:
- Gabo Tea x 1 = ฿450

Payment Method: USDT (TRC20)
Status: Paid

Your order will be shipped within 24 hours.

Best regards,
Koh Phangan Chinese Tea
```

---

## 🛠️ Troubleshooting

### Data Not Saving
- Check browser console for errors
- Ensure LocalStorage enabled
- Try different browser

### Invoice Not Generating
- Ensure order status is "Paid"
- Check invoice settings
- Verify invoice number

### Export Not Working
- Check browser download settings
- Allow pop-ups
- Try different browser

---

## 📈 Best Practices

### Order Management
✅ Update status promptly
✅ Add delivery address
✅ Note payment method
✅ Generate invoice after payment

### Invoice Management
✅ Generate immediately after payment
✅ Send to customer within 24h
✅ Keep sequential numbering
✅ Archive old invoices

### Data Management
✅ Export weekly backups
✅ Review monthly reports
✅ Clean old data annually
✅ Update product prices regularly

---

## 🚀 Future Enhancements

### Planned Features
- [ ] Email integration
- [ ] SMS notifications
- [ ] Inventory management
- [ ] Barcode scanning
- [ ] Multi-currency support
- [ ] Recurring invoices
- [ ] Payment reminders
- [ ] Customer portal
- [ ] Mobile app
- [ ] Cloud sync

---

## 📞 Support

### Need Help?

1. Check this guide
2. Review ROADMAP.md
3. Check browser console
4. Export data before changes

### Customization

Want to customize?
- Edit `admin-script.js` for functionality
- Edit `admin-styles.css` for styling
- Edit `admin.html` for layout

---

## ✅ Quick Reference

### Keyboard Shortcuts
- None currently (coming soon)

### Common Tasks

| Task | Steps |
|------|-------|
| New Order | Dashboard → + New Order |
| Generate Invoice | Orders → 🧾 icon |
| View Invoice | Invoices → 👁️ icon |
| Export Data | Dashboard → Export Data |
| Sales Report | Reports → Select dates → Generate |
| Update Settings | Settings → Edit → Save |

---

**Your billing system is ready!** 🎉

Start managing orders, generating invoices, and tracking your tea business efficiently!
