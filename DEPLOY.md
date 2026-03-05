# Deployment Guide

## Building for Production

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Build production CSS** (minified, no source maps):
   ```bash
   npm run build-prod
   ```

## Deploying to FTP

### Files to Upload:

✅ **Upload these files/folders:**
- `index.html` and all `.html` files
- `css/` folder (with compiled CSS)
- `js/` folder
- `images/` folder
- `favicon/` folder (inside images)
- `index.php` (if needed)

❌ **Don't upload:**
- `node_modules/` folder
- `scss/` folder (source files)
- `package.json`, `package-lock.json`
- `.git/` folder
- `README.md`, `DEPLOY.md`
- `vercel.json` (unless using Vercel)

### Using FTP Client:

1. Connect to your FTP server
2. Navigate to your website root directory (usually `public_html`, `www`, or `htdocs`)
3. Upload all files from the list above
4. Make sure file permissions are correct (usually 644 for files, 755 for folders)

### Using Command Line (if you have FTP access):

```bash
# Using lftp (install with: brew install lftp)
lftp -c "open -u USERNAME,PASSWORD ftp.yoursite.com; mirror -R --exclude-glob='node_modules/*' --exclude-glob='scss/*' --exclude-glob='.git/*' . /public_html"

# Or using rsync over SSH (if you have SSH access)
rsync -avz --exclude 'node_modules' --exclude 'scss' --exclude '.git' ./ user@server:/path/to/public_html/
```

## Quick Build & Deploy Script

You can also create a deploy script. See `package.json` for available commands.

