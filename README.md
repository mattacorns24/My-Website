# Personal Project Showcase

Static single-page site to showcase personal projects. Plain HTML/CSS/JS, no build step. Project data lives in `projects.json`.

## Structure
- `index.html` — Home (hero + one-liner), About, Projects sections.
- `styles.css` — Minimal baseline styles.
- `script.js` — Fetches `projects.json` and renders project cards.
- `projects.json` — Project data. Add/edit a card by editing this file.
- `.nojekyll` — Tells GitHub Pages to serve files as-is (no Jekyll).

## Adding a project
Add an object to the array in `projects.json`:

```json
{
  "name": "My Project",
  "description": "What it does.",
  "link": "https://live-demo.example.com",
  "repo": "https://github.com/you/my-project",
  "tags": ["react", "api"],
  "image": "images/my-project.png"
}
```

Only `name` and `description` are required; the rest are optional.

## Local preview
`fetch` needs an HTTP server (opening the file directly via `file://` won't work):

```bash
python3 -m http.server
# then open http://localhost:8000
```

or `npx serve`.

## Deploy (GitHub Pages)
1. Create a GitHub repo and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. Repo **Settings → Pages → Source**: deploy from branch `main`, folder `/ (root)`.
3. Site goes live at `https://<you>.github.io/<repo>/`.
# My-Website
