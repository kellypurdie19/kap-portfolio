# kelly.ahola — portfolio

Portfolio site for Kelly Ahola-Purdie, graphic and web designer for small businesses.

**Design idea:** "I bring the chaos into focus." A calm canvas with one bold, liquid moment.

## What's on the page
- Hero with morphing glassy bubbles that follow the mouse
- A glowing path that draws itself as you scroll, plus a side index that lights up each section
- Services with starting prices, recent work, and a five-step process that lights up when you reach it
- A playable Guess the Number game in the "Take a Break" section
- A small corner ball that bounces when you scroll and becomes a back-to-top arrow on hover

## Files
- `index.html` — the page
- `assets/css/site.css` — all styles
- `assets/js/site.js` — scroll effects, bubble interaction, and the game
- `sounds/` — game sound effects

Static HTML, CSS, and JavaScript. No build step.

## Preview locally
```bash
python3 -m http.server 5500
# then open http://localhost:5500
```

## Deploy
Hosted on Cloudflare Pages, connected to this repo. Pushing to `main` updates the live site; other branches get their own preview link.
