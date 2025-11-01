# kap-portfolio
> A dual-theme, interactive portfolio (Modern ↔ Arcade) with a silky animated background, a scroll-reactive “pinball” ball, and a playful Guess-the-Number mini-game.

<!-- // note: The one-liner above is your “value proposition.” Keep it crisp and specific. -->

## ✨ Features
- **Two themes**: _Modern_ (default, sleek) and _Arcade_ (neon, playful)
- **Silk background** in both themes (subtle in Modern, vibrant in Arcade)
- **Scroll pinball**: a floating ball that reacts to scroll + taps to “Back to Top”
- **Mini-game**: Guess the Number (vanilla JavaScript)
- **Dot-nav**: section indicator/jumps (lightweight, Resn-inspired)
- Built with **Bootstrap 5** + **vanilla JS** (no build step)

<!-- // note: Bullet lists help clients scan quickly. -->

## 📁 Project Structure

<!-- // note: Keep tree tiny; it should match your repo exactly. -->

## 🧰 Requirements
- A web browser (Chrome, Edge, Safari, Firefox)
- Optional: Python 3 (for a quick local server)
- Git + GitHub (to publish and deploy)
- Cloudflare Pages account (for hosting)

<!-- // note: No Node needed; this is a static site. -->

## 🚀 Quick Start (Local)
Option A — **Open the HTML file**  
- Double-click `index.html` (works, but some features are better on a server)

Option B — **Run a tiny local server**  
```bash
# From inside the kap-portfolio folder
python3 -m http.server 5500
# Then visit http://localhost:5500
# 1) Initialize a repo
git init

# 2) Add files
git add .

# 3) Commit
git commit -m "feat: initial kap-portfolio with dual theme and interactive elements"

# 4) Create a GitHub repo named kap-portfolio (on github.com)
#    Then connect your local folder to it:
git remote add origin https://github.com/kellypurdie19/kap-portfolio.git

# 5) Push code
git branch -M main
git push -u origin main

