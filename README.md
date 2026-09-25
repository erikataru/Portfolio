# Erika's portfolio

A simple portfolio website built with [Hugo](https://gohugo.io/) and published
on GitHub Pages. All text lives in plain Markdown files, so you can update the
site without touching any code.

## Where things are

```
hugo.toml                  ← Site settings: name, tagline, email, social links, menu
content/
  _index.md                ← Front page heading and intro text
  about.md                 ← About page
  contact.md               ← Contact page
  projects/
    _index.md              ← Intro text on the "Work" page
    sample-project-one/    ← One folder per project
      index.md             ←   project text and settings
      cover.svg            ←   project images (cover and any others)
static/images/avatar.svg   ← Profile picture on the front page
assets/css/main.css        ← Colours, fonts and layout
layouts/                   ← HTML templates (no need to edit for content changes)
.github/workflows/hugo.yml ← Automatic publishing to GitHub Pages
```

## Editing content

Each Markdown file starts with a settings block between `---` lines (called
"front matter"), followed by the page text written in
[Markdown](https://www.markdownguide.org/cheat-sheet/).

### Change your name, tagline, email or social links

Edit `hugo.toml`. Every setting has a comment explaining it. To add another
social link, copy a `[[params.social]]` block and change the `name` and `url`.

### Change the front page text

Edit `content/_index.md`. `heading` is the big title; the text below the
`---` is the introduction. `featuredCount` sets how many projects are shown.

### Change the profile picture

Put your photo in `static/images/` (e.g. `static/images/erika.jpg`) and update
`avatar = "images/erika.jpg"` in `hugo.toml`. A square image works best.

### Edit the About or Contact page

Edit `content/about.md` or `content/contact.md`. The email button on the
Contact page uses the `email` in `hugo.toml`.

### Add a new project

1. Create a new folder in `content/projects/`, e.g. `content/projects/cafe-branding/`.
   The folder name becomes the page address (`/projects/cafe-branding/`), so use
   lowercase letters and hyphens.
2. Copy `index.md` from one of the sample projects into it (or run
   `hugo new content projects/cafe-branding/index.md`).
3. Put the images in the same folder, e.g. `cover.jpg`, `photo-1.jpg`.
4. Edit `index.md`:
   - `title` – project name
   - `summary` – one line shown on the project card
   - `tags` – labels, e.g. `["Branding", "Print"]`
   - `cover` – file name of the cover image in this folder
   - `weight` – display order (1 is shown first)
   - `draft: true` hides the project from the published site
5. Add more images in the text with `![Description of image](photo-1.jpg)`.

Cover images are shown in a 3:2 ratio. Keep images under ~500 KB (around
2000 px wide is plenty) so the site stays fast.

### Remove a project

Delete its folder in `content/projects/`, or set `draft: true` to hide it.
Remember to delete the three sample projects once you've added real ones.

### Change the menu

Edit the `[[menus.main]]` blocks in `hugo.toml`. To add a new page, create
`content/my-page.md` and add a menu entry with `pageRef = "/my-page"`.

### Change colours and fonts

Edit the variables at the top of `assets/css/main.css`. The first block is the
light theme, the second is used when the visitor's device is in dark mode.
Fonts are loaded from Google Fonts in `layouts/baseof.html`.

## Previewing locally

Install Hugo (on macOS: `brew install hugo`), then run in this folder:

```bash
hugo server
```

Open the address it prints (e.g. http://localhost:1313/erika-portfolio/). The
page reloads automatically when you save a file. Press `Ctrl+C` to stop.
Drafts can be previewed with `hugo server -D`.

## Publishing to GitHub Pages

One-time setup:

1. Create a new repository on GitHub (e.g. `erika-portfolio`).
2. In this folder, run:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/USERNAME/erika-portfolio.git
   git push -u origin main
   ```
3. On GitHub, open the repository's **Settings → Pages** and under
   **Build and deployment → Source** choose **GitHub Actions**.

After that, every push to the `main` branch publishes the site automatically
in a minute or two (progress is visible under the repository's **Actions**
tab). The site will be at `https://USERNAME.github.io/erika-portfolio/`.

Editing directly on GitHub also works: open a file on github.com, click the
pencil icon, edit and commit — the site updates automatically. You can also
drag and drop images into a project folder with **Add file → Upload files**.

### Custom domain (optional)

Add the domain under **Settings → Pages → Custom domain** and set `baseURL` in
`hugo.toml` to your domain, e.g. `baseURL = "https://erika.com/"`.
