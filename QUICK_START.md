# ⚡ Quick Start Guide - Get Your Website Live in 10 Minutes

## 🎯 Two Main Steps:
1. **Make Contact Form Work** → Set up EmailJS
2. **Deploy Website** → Upload to hosting service

---

## 📧 Step 1: Contact Form Setup (5 minutes)

### Using EmailJS (Recommended):
1. **Go to [EmailJS.com](https://www.emailjs.com/)** and sign up
2. **Create email service** (Gmail, Outlook, etc.)
3. **Create email template** (copy from DEPLOYMENT_GUIDE.md)
4. **Get your credentials:** Public Key, Service ID, Template ID
5. **Update `script.js`** - replace placeholder values in `EMAILJS_CONFIG`

### Alternative (Even Easier):
- **Use Netlify Forms** - just add `data-netlify="true"` to your form
- **Use Formspree** - point your form to their endpoint

---

## 🚀 Step 2: Deploy Website (5 minutes)

### Option A: Netlify (Easiest)
1. **Go to [Netlify.com](https://www.netlify.com/)**
2. **Drag & drop your website folder**
3. **Done!** You get a live URL instantly

### Option B: GitHub Pages (Free Forever)
1. **Run the PowerShell script:** `.\deploy.ps1`
2. **Follow the prompts**
3. **Enable GitHub Pages** in repository settings
4. **Your URL:** `https://YOUR_USERNAME.github.io/REPO_NAME`

### Option C: Vercel (Developer Friendly)
1. **Connect your GitHub account**
2. **Import your repository**
3. **Auto-deploy on every change**

---

## 🔧 Quick Troubleshooting

### Contact Form Issues:
- **Check browser console** for errors
- **Test with different emails**
- **Verify EmailJS credentials**

### Website Not Loading:
- **Check file upload** - all files present?
- **Wait 5-10 minutes** for DNS propagation
- **Try incognito mode** to bypass cache

---

## 📋 Deployment Checklist

- [ ] EmailJS account created
- [ ] Email service configured  
- [ ] Template created
- [ ] Credentials added to script.js
- [ ] Website deployed to hosting
- [ ] Contact form tested
- [ ] Website works on mobile

---

## 🎉 You're Done!

Your website is now live and fully functional!

**For detailed instructions, see `DEPLOYMENT_GUIDE.md`**

---

### 🔗 Your Website Files:
- `index.html` - Main website
- `style.css` - All styling
- `script.js` - Interactive features
- `DEPLOYMENT_GUIDE.md` - Detailed instructions
- `deploy.ps1` - PowerShell deployment script 