# Quick Steps to Push to GitHub

Your code is ready on branch `tea-shop`. Here's how to get it on GitHub:

## Method 1: Create Repository via GitHub Website (Recommended)

1. **Go to GitHub**: https://github.com/new

2. **Fill in details**:
   - Repository name: `KohPhanganTea`
   - Description: `E-commerce site for premium Chinese tea from Koh Phangan`
   - Public repository
   - **DO NOT** check any boxes (no README, no .gitignore, no license)

3. **Click "Create repository"**

4. **Run these commands in your terminal**:
   ```bash
   git remote add tea https://github.com/robotsnano55-ui/KohPhanganTea.git
   git push -u tea tea-shop
   ```

5. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Branch `tea-shop`, folder `/ (root)`
   - Save
   - Your site will be live at: https://robotsnano55-ui.github.io/KohPhanganTea/

## Method 2: Use Existing Repository

If you want to push to the current repository instead:

```bash
git push origin tea-shop
```

Then enable GitHub Pages on the `tea-shop` branch.

---

## What's Ready to Push

✅ 12 files committed on branch `tea-shop`:
- index.html (main shop page)
- styles.css (styling)
- script.js (shopping cart & payments)
- success.html (success page)
- server.js (backend for future)
- package.json (dependencies)
- README.md (documentation)
- ROADMAP.md (project plan)
- GITHUB_SETUP.md (setup guide)
- .gitignore (git rules)
- images/README.md (image instructions)

## After Pushing

1. Add product images to `images/` folder
2. Update Stripe payment links in `script.js`
3. Update contact info (WhatsApp/LINE/Telegram)
4. Test your live site!

---

**Ready?** Go to https://github.com/new and create the repository now! 🚀
