# 🚀 Deployment Guide - Cinova Website

This guide will help you deploy your website and make the contact form functional.

## 📧 Part 1: Setting Up Contact Form (EmailJS)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Note down your Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Submission - {{from_name}}

From: {{from_name}} ({{from_email}})
Project Type: {{project_type}}

Message:
{{message}}

---
Reply to: {{from_email}}
```

4. **Note down your Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `abcdef123456`)

### Step 5: Update Your Website Code
1. Open `script.js` in your website files
2. Replace the placeholder values in the `EMAILJS_CONFIG` object:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_ACTUAL_PUBLIC_KEY',
    serviceId: 'YOUR_ACTUAL_SERVICE_ID',
    templateId: 'YOUR_ACTUAL_TEMPLATE_ID'
};
```

## 🌐 Part 2: Deploying Your Website

### Option 1: GitHub Pages (Recommended - Free)

#### Prerequisites:
- GitHub account
- Git installed on your computer

#### Steps:
1. **Create a GitHub repository:**
   ```bash
   # Navigate to your website folder
   cd "C:\Projects\Agency website"
   
   # Initialize Git
   git init
   
   # Add all files
   git add .
   
   # Create first commit
   git commit -m "Initial website deployment"
   ```

2. **Create repository on GitHub:**
   - Go to [GitHub.com](https://github.com)
   - Click "New repository"
   - Name it `cinova-website` (or any name you prefer)
   - Make it public
   - Don't add README, .gitignore, or license

3. **Push to GitHub:**
   ```bash
   # Add your GitHub repository as origin
   git remote add origin https://github.com/YOUR_USERNAME/cinova-website.git
   
   # Push to GitHub
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/ (root)"
   - Click "Save"

5. **Access your website:**
   - Your website will be available at: `https://YOUR_USERNAME.github.io/cinova-website`
   - It may take a few minutes to become available

### Option 2: Netlify (Easy Drag & Drop)

1. **Go to [Netlify.com](https://www.netlify.com/)**
2. **Sign up for free account**
3. **Deploy your site:**
   - Click "Add new site" → "Deploy manually"
   - Drag and drop your website folder (containing index.html, style.css, script.js)
   - Netlify will automatically deploy your site

4. **Get your URL:**
   - You'll get a random URL like `https://amazing-site-123456.netlify.app`
   - You can change this to a custom name in Site settings

### Option 3: Vercel (Developer-Friendly)

1. **Go to [Vercel.com](https://vercel.com/)**
2. **Sign up with GitHub account**
3. **Deploy:**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a static site
   - Click "Deploy"

4. **Access your site:**
   - You'll get a URL like `https://your-project.vercel.app`

### Option 4: Traditional Web Hosting

If you have a web hosting service (like Hostgator, Bluehost, etc.):

1. **Using File Manager:**
   - Log into your hosting control panel
   - Open File Manager
   - Navigate to `public_html` folder
   - Upload all your files (index.html, style.css, script.js)

2. **Using FTP:**
   - Use an FTP client like FileZilla
   - Connect to your hosting server
   - Upload files to the root directory

## 🔧 Alternative Contact Form Solutions

### Option A: Netlify Forms (If using Netlify)

1. **Update your HTML form:**
   ```html
   <form class="contact-form" id="contact-form" name="contact" method="POST" data-netlify="true">
       <input type="hidden" name="form-name" value="contact">
       <!-- rest of your form fields -->
   </form>
   ```

2. **Remove EmailJS code** from `script.js`
3. **Submissions will appear** in your Netlify dashboard

### Option B: Formspree (Simple Alternative)

1. **Go to [Formspree.io](https://formspree.io/)**
2. **Sign up for free account**
3. **Create a new form** and get your form URL
4. **Update your HTML:**
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
       <!-- your form fields -->
   </form>
   ```

### Option C: Custom Backend (Advanced)

For a custom backend solution, you would need:
- Node.js server with Express
- Email service (Nodemailer)
- Hosting service that supports Node.js

## 📝 Testing Your Deployment

### Test Contact Form:
1. **Fill out the contact form** on your live website
2. **Submit the form**
3. **Check your email** for the message
4. **Check browser console** for any errors

### Test Website Performance:
1. **Test on different devices** (mobile, tablet, desktop)
2. **Check loading speed** using [PageSpeed Insights](https://pagespeed.web.dev/)
3. **Verify all links work** correctly

## 🎯 Next Steps After Deployment

1. **Set up Google Analytics** (optional)
2. **Add your domain** (if you have one)
3. **Set up SSL certificate** (usually automatic)
4. **Submit to Google Search Console**
5. **Test contact form thoroughly**

## 🔍 Troubleshooting

### Contact Form Not Working:
- Check browser console for errors
- Verify EmailJS configuration
- Test with different email addresses
- Check spam folder

### Website Not Loading:
- Check if files uploaded correctly
- Verify file names match exactly
- Check hosting service status
- Clear browser cache

### Mobile Issues:
- Test on real devices
- Check responsive design
- Verify touch interactions work

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Test in different browsers
3. Verify all configuration steps were followed
4. Contact your hosting provider if needed

---

**Your website is now ready to go live! 🎉** 