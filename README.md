# Navamya Technology Website

A modern, responsive website for Navamya Technology - now converted to run without XAMPP!

## 🚀 Quick Start

### Option 1: With SQL Database (Recommended for Data Storage)
1. **Double-click** `start_with_database.bat` (Windows)
2. The website opens at `http://localhost:8000`
3. **Admin panel** at `http://localhost:8000/admin` to view contact submissions
4. **Database file:** `contact_data.db` (SQLite)

### Option 2: Simple Static Version
1. **Double-click** `start_website.bat` (Windows)
2. The website opens automatically in your browser at `http://localhost:8000`
3. Contact form opens email client (no database)

### Option 3: Node.js Database Server
1. Install Node.js from [nodejs.org](https://nodejs.org)
2. Open terminal/command prompt in this folder
3. Run: `npm install`
4. Run: `npm start`
5. Website with database opens at `http://localhost:8000`

### Option 4: Manual Python (Simple)
```bash
python start_server.py
```

## 📋 What's Available

### ✅ Database Version Features
- 💾 **SQLite Database** - Contact form data saved to `contact_data.db`
- 👤 **Admin Panel** - View all submissions at `/admin`
- 📊 **Data Storage** - All contact form submissions stored locally
- 🔍 **Easy Access** - Browse submissions with timestamps
- 📧 **Email Links** - Click to email contacts directly from admin panel

### ✅ Simple Static Version Features
- 🌐 Static website (runs anywhere)
- 📧 Email contact form (opens mail client)
- 🚀 Built-in local server options
- 📱 Mobile-responsive design preserved
- ⚡ Fast loading (no server processing)

## 📁 File Structure
```
navamya-company-website/
├── index.html              # Homepage
├── about.html              # About page
├── contact.html            # Contact page (updated)
├── services.html           # Services page
├── products.html           # Products page
├── style.css               # Styles
├── script.js               # JavaScript (updated)
├── start_with_database.bat   # Database version launcher
├── start_website.bat       # Simple version launcher
├── server_with_db.js       # Node.js server with SQLite
├── server.js               # Simple Node.js server
├── start_server.py         # Python server
├── contact_data.db         # SQLite database (created automatically)
├── package.json            # Node.js config
└── assets/                 # Images and media
```

## 📞 Contact Form Options

### Option 1: Database Storage (Recommended)
1. **Fill out the form** on the contact page
2. **Click Submit** - data is saved to SQLite database
3. **View submissions** at `http://localhost:8000/admin`
4. **Data persists** - all submissions saved permanently

### Option 2: Email Client (Simple)
1. **Fill out the form** on the contact page
2. **Click Submit** - your default email client opens
3. **Send the email** with pre-filled content

### 🔧 EmailJS Setup (Optional)
To enable automatic email sending:

1. Sign up at [EmailJS](https://emailjs.com)
2. Get your service ID, template ID, and public key
3. Update `script.js` with your credentials:
```javascript
// Replace these in script.js
emailjs.init("YOUR_PUBLIC_KEY");
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
```

## 🌐 Deployment Options

### GitHub Pages
1. Push to GitHub repository
2. Enable Pages in repository settings
3. Your site will be live at `username.github.io/repo-name`

### Netlify
1. Drag and drop the entire folder to [netlify.com](https://netlify.com)
2. Your site will be live instantly with a custom URL

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the project folder
3. Follow the prompts

## 🛠️ Customization

### Update Company Information
- Edit contact details in `contact.html`
- Update social media links in footer sections
- Modify email address in `script.js` (mailto link)

### Add New Pages
1. Create new HTML file
2. Copy navigation structure from existing pages
3. Add link to navigation in all pages

### Styling
- All styles are in `style.css`
- Bootstrap 5 is included for responsive design
- Custom CSS for Navamya branding

## 🐛 Troubleshooting

### Port Already in Use
If port 8000 is busy:
- Change PORT in `start_server.py` (line 12)
- Or close other applications using port 8000

### Python Not Found
- Install Python from [python.org](https://python.org/downloads)
- Make sure "Add Python to PATH" is checked during installation
- Restart command prompt after installation

### Email Form Not Working
- Ensure default email client is set up
- For automatic sending, set up EmailJS (see above)
- Check browser popup blockers

## 📊 Browser Support
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📝 License
© 2025 Navamya Technology. All rights reserved.

## 🤝 Support
For technical support or questions:
- Email: info@navamya.com
- Website: [Add your domain here]