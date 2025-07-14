# Cinova Website Deployment Script for GitHub Pages
# Run this script from PowerShell in your website directory

Write-Host "🚀 Cinova Website Deployment Script" -ForegroundColor Green
Write-Host "This script will help you deploy your website to GitHub Pages" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first:" -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Check if we're in the right directory
if (!(Test-Path "index.html")) {
    Write-Host "❌ index.html not found. Please run this script from your website directory." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found index.html - you're in the right directory" -ForegroundColor Green

# Get user input
Write-Host ""
$githubUsername = Read-Host "Enter your GitHub username"
$repoName = Read-Host "Enter repository name (e.g., cinova-website)"

if ([string]::IsNullOrWhiteSpace($githubUsername) -or [string]::IsNullOrWhiteSpace($repoName)) {
    Write-Host "❌ Username and repository name are required." -ForegroundColor Red
    exit 1
}

# Initialize Git repository
Write-Host ""
Write-Host "🔄 Initializing Git repository..." -ForegroundColor Cyan

if (!(Test-Path ".git")) {
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already exists" -ForegroundColor Green
}

# Add all files
Write-Host "🔄 Adding files to Git..." -ForegroundColor Cyan
git add .

# Create initial commit
Write-Host "🔄 Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial website deployment - Cinova Video Editing Agency"

# Add remote origin
$remoteUrl = "https://github.com/$githubUsername/$repoName.git"
Write-Host "🔄 Adding remote origin: $remoteUrl" -ForegroundColor Cyan

try {
    git remote add origin $remoteUrl
    Write-Host "✅ Remote origin added" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Remote origin might already exist, updating..." -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
}

# Push to GitHub
Write-Host "🔄 Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "⚠️ You may need to authenticate with GitHub" -ForegroundColor Yellow

try {
    git push -u origin main
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to push to GitHub. This might be because:" -ForegroundColor Red
    Write-Host "1. The repository doesn't exist on GitHub yet" -ForegroundColor Yellow
    Write-Host "2. You need to authenticate with GitHub" -ForegroundColor Yellow
    Write-Host "3. You don't have permission to push to this repository" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Cyan
    Write-Host "1. Go to https://github.com/$githubUsername" -ForegroundColor Cyan
    Write-Host "2. Create a new repository named '$repoName'" -ForegroundColor Cyan
    Write-Host "3. Make it public" -ForegroundColor Cyan
    Write-Host "4. Don't add README, .gitignore, or license" -ForegroundColor Cyan
    Write-Host "5. Run this script again" -ForegroundColor Cyan
    exit 1
}

# Success message
Write-Host ""
Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to https://github.com/$githubUsername/$repoName" -ForegroundColor White
Write-Host "2. Click 'Settings' tab" -ForegroundColor White
Write-Host "3. Scroll down to 'Pages' section" -ForegroundColor White
Write-Host "4. Under 'Source', select 'Deploy from a branch'" -ForegroundColor White
Write-Host "5. Select 'main' branch and '/ (root)'" -ForegroundColor White
Write-Host "6. Click 'Save'" -ForegroundColor White
Write-Host ""
Write-Host "Your website will be available at:" -ForegroundColor Green
Write-Host "https://$githubUsername.github.io/$repoName" -ForegroundColor Yellow
Write-Host ""
Write-Host "⏰ It may take a few minutes to become available." -ForegroundColor Cyan
Write-Host ""
Write-Host "📧 Don't forget to set up your EmailJS configuration!" -ForegroundColor Magenta
Write-Host "📖 Check the DEPLOYMENT_GUIDE.md for detailed instructions." -ForegroundColor Magenta 