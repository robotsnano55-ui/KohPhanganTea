# GitHub Setup Guide for Koh Phangan Tea

## ✅ Current Status
- Branch `tea-shop` created with all files
- All code committed and ready to push
- 11 files ready for deployment

## 🚀 Steps to Create GitHub Repository

### Option 1: Using GitHub Website (Easiest)

1. **Go to GitHub and create new repository**
   - Visit: https://github.com/new
   - Repository name: `KohPhanganTea` (or `koh-phangan-tea`)
   - Description: "E-commerce site for premium Chinese tea from Koh Phangan"
   - Make it **Public**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Push your code**
   
   After creating the repository, GitHub will show you commands. Use these:

   ```bash
   git remote add tea-origin https://github.com/YOUR_USERNAME/KohPhanganTea.git
   git push -u tea-origin tea-shop
   ```

   Replace `YOUR_USERNAME` with your GitHub username.

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Select branch `tea-shop`
   - Folder: Select `/ (root)`
   - Click Save
   - Your site will be live at: `https://YOUR_USERNAME.github.io/KohPhanganTea/`

### Option 2: Using Git Commands Only

```bash
# Create repository on GitHub first (via website)
# Then run these commands:

# Add new remote
git remote add tea-origin https://github.com/YOUR_USERNAME/KohPhanganTea.git

# Push the tea-shop branch
git push -u tea-origin tea-shop

# Set tea-shop as default branch (optional)
git push tea-origin tea-shop:main
```

## 📁 Files Being Pushed

```
KohPhanganTea/
├── index.html              # Main shop page
├── success.html            # Payment success page
├── styles.css              # All styling
├── script.js               # Shopping cart & payment logic
├── server.js               # Backend (for future use)
├── package.json            # Dependencies
├── README.md               # Project documentation
├── ROADMAP.md              # Development roadmap
├── GITHUB_SETUP.md         # This file
├── .gitignore              # Git ignore rules
└── images/
    └── README.md           # Image instructions
```

## 🎨 After Pushing to GitHub

### 1. Add Product Images
- Upload tea photos to `images/` folder
- Name them: `gabo-tea.jpg`, `puer-tea.jpg`, `red-tea.jpg`
- Commit and push

### 2. Configure Stripe Payment Links
- Go to https://dashboard.stripe.com/payment-links
- Create payment link for each tea product
- Update `script.js` with the URLs

### 3. Update Contact Information
- Edit `script.js`
- Update WhatsApp, LINE, and Telegram details

### 4. Test Your Live Site
- Visit: `https://YOUR_USERNAME.github.io/KohPhanganTea/`
- Test shopping cart
- Test payment links
- Test on mobile devices

## 🔧 Making Updates

After initial push, to update your site:

```bash
# Make your changes to files
git add .
git commit -m "Description of changes"
git push tea-origin tea-shop
```

GitHub Pages will automatically update within 1-2 minutes.

## 📱 Custom Domain (Optional)

To use your own domain (e.g., kohphangantea.com):

1. Buy domain from Namecheap, GoDaddy, etc.
2. Add CNAME file to repository:
   ```
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```
3. Configure DNS settings at your domain registrar:
   - Add CNAME record pointing to: `YOUR_USERNAME.github.io`
4. Enable HTTPS in GitHub Pages settings

## 🐛 Troubleshooting

### Site not loading?
- Check GitHub Pages is enabled in Settings
- Wait 2-3 minutes for deployment
- Check branch name is correct

### Images not showing?
- Verify image files are in `images/` folder
- Check file names match exactly in `script.js`
- Images must be committed and pushed

### Payment not working?
- Verify Stripe payment links are configured
- Check browser console for errors
- Test with Stripe test card: 4242 4242 4242 4242

## 📞 Need Help?

- GitHub Pages Docs: https://docs.github.com/pages
- Stripe Docs: https://stripe.com/docs
- Git Basics: https://git-scm.com/book/en/v2

---

**Ready to push?** Follow Option 1 above to get your site live! 🚀
