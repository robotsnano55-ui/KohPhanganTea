# 📦 Upload Instructions for GitHub

## ✅ Archive Created!

File: `KohPhanganTea.zip`
Location: `C:\Users\user\Documents\KIRO\cyber-breakfast-bot\KohPhanganTea.zip`

This archive contains all your tea shop files ready for GitHub.

---

## 🚀 How to Upload to GitHub

### Step 1: Create New Repository

1. Go to: https://github.com/new
2. Fill in:
   - **Repository name**: `KohPhanganTea`
   - **Description**: `E-commerce site for premium Chinese tea from Koh Phangan`
   - **Visibility**: Public
   - ✅ Check "Add a README file" (we'll replace it)
3. Click **"Create repository"**

### Step 2: Upload Files

1. In your new repository, click **"Add file"** → **"Upload files"**
2. Drag and drop `KohPhanganTea.zip` OR click "choose your files"
3. Wait for upload to complete
4. GitHub will automatically extract the ZIP
5. Commit message: "Initial commit: Koh Phangan Chinese Tea shop"
6. Click **"Commit changes"**

### Step 3: Enable GitHub Pages

1. Go to repository **Settings**
2. Scroll to **"Pages"** section (left sidebar)
3. Under "Source":
   - Branch: Select **`main`** (or `master`)
   - Folder: Select **`/ (root)`**
4. Click **"Save"**
5. Wait 1-2 minutes

Your site will be live at:
```
https://robotsnano55-ui.github.io/KohPhanganTea/
```

---

## 📋 What's in the Archive

✅ **Core Files**:
- `index.html` - Main shop page
- `styles.css` - All styling
- `script.js` - Shopping cart & payment logic
- `success.html` - Payment success page

✅ **Backend** (for future use):
- `server.js` - Node.js backend for Stripe
- `package.json` - Dependencies

✅ **Documentation**:
- `README.md` - Project overview
- `ROADMAP.md` - Development plan
- `GITHUB_SETUP.md` - Detailed setup guide
- `create-repo.md` - Quick start guide

✅ **Other**:
- `.gitignore` - Git ignore rules
- `images/` folder with README

---

## 🎨 After Upload - Next Steps

### 1. Add Product Images
- Upload tea photos to `images/` folder
- Name them: `gabo-tea.jpg`, `puer-tea.jpg`, `red-tea.jpg`

### 2. Configure Stripe Payments
- Go to: https://dashboard.stripe.com/payment-links
- Create payment link for each tea
- Edit `script.js` and update the `stripePaymentLinks` object

### 3. Update Contact Info
- Edit `script.js`
- Update WhatsApp number, LINE ID, Telegram username

### 4. Test Your Site
- Visit: https://robotsnano55-ui.github.io/KohPhanganTea/
- Test shopping cart
- Test payment links
- Check on mobile

---

## 🔧 Making Updates Later

To update your site after initial upload:

1. Go to your repository on GitHub
2. Navigate to the file you want to edit
3. Click the pencil icon (Edit)
4. Make changes
5. Commit changes
6. Site updates automatically in 1-2 minutes

---

## 💡 Tips

- **Images**: Use JPG format, 800x800px, under 500KB each
- **Testing**: Use Stripe test card `4242 4242 4242 4242`
- **Mobile**: Test on your phone - most customers will use mobile
- **Speed**: Compress images before uploading for faster loading

---

## 🆘 Troubleshooting

**Site not loading?**
- Wait 2-3 minutes after enabling Pages
- Check Settings → Pages shows green checkmark
- Try incognito/private browsing

**Images not showing?**
- Verify files are in `images/` folder
- Check file names match exactly in `script.js`
- File names are case-sensitive

**Payment not working?**
- Update Stripe payment links in `script.js`
- Test with Stripe test mode first
- Check browser console for errors (F12)

---

## 📞 Ready to Upload?

1. Open https://github.com/new
2. Create repository "KohPhanganTea"
3. Upload `KohPhanganTea.zip`
4. Enable GitHub Pages
5. Your tea shop is live! 🎉

---

**Archive Location**: `C:\Users\user\Documents\KIRO\cyber-breakfast-bot\KohPhanganTea.zip`
