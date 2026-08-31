# 🍴 ForkSavvyRecipes.com — Production Deployment Guide

America's high-speed recipe platform: 15-minute dinners, crispy air fryer classics, viral Ninja Creami pints, and restaurant copycats with instant unit conversions and USDA nutrition facts.

---

## 🚀 Quick Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

---

## 🌐 1-Click Cloudways Production Deployment Guide

### Step 1: Purchase Domain on GoDaddy
1. Go to [GoDaddy.com](https://www.godaddy.com) and buy: **`ForkSavvyRecipes.com`**
2. In GoDaddy DNS Management:
   * Add an **A Record**: Host `@` points to your **Cloudways Server Public IP**.
   * Add a **CNAME Record**: Host `www` points to `forksavvyrecipes.com`.

---

### Step 2: Create Custom PHP/Node Application on Cloudways
1. In Cloudways Dashboard $\rightarrow$ **Applications** $\rightarrow$ **Add Application**.
2. Select **Custom App (PHP/Node.js)** on your server.
3. Set Application Name to `forksavvyrecipes`.
4. In **Domain Management**, add `forksavvyrecipes.com` and `www.forksavvyrecipes.com` as Primary Domain.
5. In **SSL Certificate**, choose **Let's Encrypt** and enter your email address to enable free auto-renewing HTTPS.

---

### Step 3: Deploy Code via Git or SSH
Connect to your Cloudways server via SSH or Git:
```bash
# Navigate to application public directory
cd public_html

# Pull your repository
git clone https://github.com/yourusername/forksavvyrecipes.git .

# Install dependencies and build standalone production bundle
npm install
npm run build
```

---

### Step 4: Keep Process Alive with PM2 (Recommended for 100% Uptime)
Cloudways includes Node.js and PM2 out of the box:
```bash
# Start Next.js standalone server on port 3000 (or custom port)
pm2 start npm --name "forksavvyrecipes" -- run start

# Enable PM2 to restart automatically on server reboot
pm2 startup
pm2 save
```

---

### Step 5: Configure Nginx Reverse Proxy (Cloudways)
In your Cloudways Application settings, point Nginx traffic on port 80/443 to your local Node.js port (e.g. `http://127.0.0.1:3001` or `3000`).

---

## 📈 Strategic Recommendations for Maximum Traffic & Revenue

1. **Pinterest Account Setup**:
   * Create a Pinterest Business account named **ForkSavvy Recipes** (`pinterest.com/forksavvyrecipes`).
   * Claim your domain `ForkSavvyRecipes.com` in Pinterest settings to enable **Rich Recipe Pins** (which pulls our JSON-LD schema automatically).
   * Pin 5-10 recipe pins daily using the 1-Click Pin buttons on your website.

2. **Google Search Console**:
   * Add `https://forksavvyrecipes.com` to Google Search Console.
   * Submit sitemap: `https://forksavvyrecipes.com/sitemap.xml`.
   * All 52 pages and recipes are pre-rendered with Google-compliant `Recipe`, `BreadcrumbList`, and `Organization` schemas.

3. **High-RPM Monetization (Mediavine / Raptive / AdThrive)**:
   * Once you reach 25k-50k monthly sessions (typically 2-3 months of consistent Pinterest pinning), apply to Mediavine Journey or Raptive.
   * Average US food blog RPM: **\$30 – \$50+ per 1,000 pageviews**.
