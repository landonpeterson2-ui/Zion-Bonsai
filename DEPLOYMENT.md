# Deployment Guide - Zion Bonsai

## Quick Start: Deploy to Vercel in 5 Minutes

### Prerequisites
- GitHub account
- Vercel account (free - sign up with GitHub)

---

## Step 1: Push to GitHub

### Option A: Create Repository via GitHub Website

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `zion-bonsai`
3. Description: "Zion Bonsai e-commerce and workshop platform"
4. Set to **Public** or **Private** (your choice)
5. **Do NOT** check "Initialize with README" (we already have one)
6. Click **Create repository**

### Option B: Use GitHub CLI (if installed)

```bash
gh repo create zion-bonsai --public --source=. --remote=origin --push
```

### Push Your Code

After creating the repository, run these commands:

```bash
# Add GitHub as remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/zion-bonsai.git

# Push to GitHub
git branch -M main
git push -u origin main
```

✅ Your code is now on GitHub!

---

## Step 2: Deploy to Vercel

### 2.1 Sign Up for Vercel

1. Go to [vercel.com/signup](https://vercel.com/signup)
2. Click **Continue with GitHub**
3. Authorize Vercel to access your GitHub account

### 2.2 Import Your Project

1. From Vercel dashboard, click **Add New...** → **Project**
2. Find your `zion-bonsai` repository in the list
3. Click **Import**

### 2.3 Configure Project (Auto-Detected)

Vercel will automatically detect:
- ✅ Framework: Next.js
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

**Don't change these settings** - they're already correct!

### 2.4 Add Environment Variables (Optional for Now)

For now, skip environment variables. You can add these later when you set up:
- Stripe for payments
- Resend for emails

Click **Deploy** to continue.

### 2.5 Wait for Build

- Build takes 1-2 minutes
- You'll see a progress screen
- When complete, you'll see: 🎉 **Congratulations!**

### 2.6 View Your Live Site

Your site is now live at:
```
https://zion-bonsai.vercel.app
```
(or similar URL - Vercel will show you the exact URL)

---

## Step 3: Add Custom Domain (Optional)

### If You Own a Domain (e.g., zionbonsai.com)

1. In Vercel project, go to **Settings** → **Domains**
2. Enter your domain: `zionbonsai.com`
3. Click **Add**
4. Follow instructions to update DNS records with your domain provider
5. Vercel automatically provisions SSL certificate

### DNS Configuration Example

Add these records to your domain provider:

**For Apex Domain (zionbonsai.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

SSL certificate is automatic - site will have HTTPS within minutes!

---

## Automatic Deployments

Once connected, every time you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Updated product prices"
git push
```

Vercel automatically:
1. Detects the push
2. Builds your site
3. Deploys to production
4. Updates live site in ~2 minutes

### Preview Deployments

- Every commit gets a unique preview URL
- Test changes before they go live
- Share previews with team/clients

---

## Adding Environment Variables Later

When you're ready to add Stripe, Resend, etc:

1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add each variable:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_...
   STRIPE_SECRET_KEY = sk_live_...
   NEXT_PUBLIC_APP_URL = https://zionbonsai.com
   ```
3. Click **Save**
4. Redeploy: **Deployments** → latest → **⋯** → **Redeploy**

---

## Troubleshooting

### Build Failed?

**Check Build Logs:**
1. Go to **Deployments** tab
2. Click on failed deployment
3. View build logs for errors

**Common Issues:**
- **TypeScript errors**: Fix errors shown in logs
- **Missing dependencies**: Check `package.json`
- **Environment variables**: Some features need env vars

### Site Not Updating?

1. Check if push reached GitHub (view commits on GitHub)
2. Check Vercel deployments tab
3. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Clear browser cache

### Need Help?

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: Available in dashboard
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

---

## Vercel Free Tier Includes

✅ Unlimited personal projects
✅ 100GB bandwidth per month
✅ Automatic HTTPS
✅ Edge network (global CDN)
✅ Automatic deployments
✅ Preview deployments
✅ Web analytics
✅ Custom domains

**Perfect for Zion Bonsai!**

---

## What's Next?

After deployment:

1. **Test your live site** - click through all pages
2. **Add your custom domain** (if you have one)
3. **Set up Stripe** for payments
4. **Add real product images**
5. **Configure email** notifications
6. **Connect a database** for dynamic content

---

## Quick Reference Commands

```bash
# Make changes
git add .
git commit -m "Your message"
git push

# Check git status
git status

# View commit history
git log --oneline

# Create new branch for testing
git checkout -b new-feature
```

---

Your Zion Bonsai site is now live! 🌿✨

Questions? Check the main [README.md](README.md) for more details.
