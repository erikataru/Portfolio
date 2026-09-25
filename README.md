# Erika Ojanperä — Portfolio

A one-page portfolio site built with [Hugo](https://gohugo.io/), designed to
be published for free on GitHub Pages. All the page's text lives in plain
data files, so you can update the site without touching any HTML or code.

## Where things are

```
data/
  profile.yaml        ← Name, hero text, bio paragraphs, "super powers" notes, key stats
  vision.yaml         ← The three beliefs + closing statement
  projects.yaml       ← Projects & Achievements (Consulting, Business Development, Marketing)
  testimonials.yaml   ← "In their own words" quotes
  contact.yaml        ← Contact details shown in the closing section

static/
  images/profile.jpg  ← Profile photo shown in the hero
  css/style.css       ← Colors, fonts, spacing — the visual design
  js/site.js          ← The background line-drawing effect + mobile menu behavior

content/_index.md     ← Page title (front matter only, no visible text)
hugo.toml             ← Site title, description, and base URL
layouts/              ← HTML templates (only edit these to change structure, not text)
.github/workflows/    ← Automatic publishing to GitHub Pages
```

**To update the words on the page, you only ever need to edit the files in
`data/`.** They're YAML files: plain text with a `key: "value"` on each line,
or a list of `- "items"`. Indentation matters — keep new lines aligned with
the ones around them.

## Editing content

### Name, hero text, bio, and key stats

Edit `data/profile.yaml`:

- `name_lines` — the two lines of the big hero title (first name / last name).
- `tagline` — the line under the name (e.g. "Human-Centered Strategist").
- `hero_cta` — the button text and which section it scrolls to.
- `nav` — the menu at the top. Each entry needs a `label` and an `anchor`
  matching a section id (`bio`, `vision`, `projects`, `about`, `contact`).
- `bio_paragraphs` — the introduction text. Add or remove `- "..."` lines to
  add or remove paragraphs.
- `field_notes` — the "Any super powers?" / "How about work-life balance?"
  notes. Add a new `question` / `answer` pair to add another one.
- `key_stats` — the big numbers (e.g. "10+ Organizations transformed"). Add,
  remove, or edit entries freely.

### The "Vision" section (three beliefs)

Edit `data/vision.yaml`. Each belief has a `number`, `title`, and `text`.
Add, remove, or reorder them, and edit `closing` for the line shown below.

### The "Projects & Achievements" section

Edit `data/projects.yaml`. Each entry under `categories` is one numbered
block. Inside a category you can use:

- `cases` — a detailed write-up with **Challenge / My role / Impact** (used
  for the Consulting category).
- `achievements` — a simpler entry with just a `name` and one paragraph of
  `text` (used for Business Development and Marketing).
- `additional` — an optional short list of extra `company` + `description`
  pairs, shown at the end of the category.

A category doesn't need all three — leave out whichever it doesn't use. To
add a fourth category, copy an existing one (from `- number: "0X"` to the
next `- number:`) and edit its contents; give it a new `number`.

### Testimonials

Edit `data/testimonials.yaml`. Add or remove a `- "..."` line under `quotes`
for each testimonial. They're shown in the order listed.

### Contact details

Edit `data/contact.yaml` — email, phone, LinkedIn, the heading, and the short
line above it.

### Profile photo

Replace `static/images/profile.jpg` with a new image (keep the same file
name, or update `photo:` in `data/profile.yaml` if you rename it). A portrait
(taller than wide) photo works best — the frame crops to a 3:4 shape.

### Colors and fonts

Open `static/css/style.css` and look at the top of the file, inside `:root`.
Every color used on the site is defined once there as a named value (e.g.
`--brand`, `--accent`, `--surface`) — change a value there and it updates
everywhere it's used. There's a second set of colors further down for dark
mode (`prefers-color-scheme: dark`), used automatically when a visitor's
device is set to dark mode.

## Previewing locally

Install Hugo (on macOS: `brew install hugo`), then from this folder run:

```bash
hugo server
```

Open the address it prints (e.g. `http://localhost:1313/erika-portfolio/`).
The page reloads automatically whenever you save a file.

## Publishing to GitHub Pages

This repo already includes a GitHub Actions workflow
(`.github/workflows/hugo.yml`) that builds and publishes the site
automatically. One-time setup:

1. Create a new, empty repository on GitHub — for example `erika-portfolio`.
2. In this folder, initialize git and push:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/USERNAME/erika-portfolio.git
   git push -u origin main
   ```
3. On GitHub, open the repository's **Settings → Pages**, and under
   **Build and deployment → Source**, choose **GitHub Actions**.

That's it — every push to `main` rebuilds and republishes the site within a
minute or two (progress is visible under the repository's **Actions** tab).
The site will be live at `https://USERNAME.github.io/erika-portfolio/`.

The workflow automatically sets the correct site address at build time, so
you don't need to touch `baseURL` in `hugo.toml` for this to work. It's only
used for local `hugo` builds outside of GitHub Actions — update it if you
ever set up a custom domain (see below).

**Editing directly on GitHub also works:** open a file (e.g.
`data/profile.yaml`) on github.com, click the pencil icon to edit it, and
commit the change — the site rebuilds and updates automatically.

### Custom domain (optional)

Add the domain under **Settings → Pages → Custom domain**, and update
`baseURL` in `hugo.toml` to match, e.g. `baseURL = "https://erikaojanpera.com/"`.
