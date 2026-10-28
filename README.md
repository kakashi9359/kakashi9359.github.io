# Akash — Portfolio

Plain HTML, CSS and a little JavaScript. No build step.

## Files

```
content.js          ← YOUR CONTENT. Edit this to add or change work.
index.html          homepage (hero, two work tiles, about, contact)
case-studies.html   list of case studies (fills itself from content.js)
projects.html       list of projects (fills itself from content.js)
work/case-study.html  template for a full case study write-up
work/nudge.html       template for a full project page
style.css           all styles (colours and fonts are the tokens at the top)
render.js           builds the lists from content.js — no need to edit
images/             your photo and screenshots
resume.pdf          add your CV here
```

## Adding a case study

1. Copy `work/case-study.html`, rename it (e.g. `work/churn.html`), and write it up.
2. Save a 4:3 screenshot of the artefact as `images/churn.jpg`.
3. Open `content.js`, copy the block inside `caseStudies: [ ... ]`, paste it below, and change the text.
   Set `page` to `work/churn.html` and `image` to `images/churn.jpg`.

The homepage count and the Case studies page update automatically.

## Adding a project

Same steps, using `work/nudge.html` as the template and the `projects: [ ... ]` list in `content.js`.

## Common mistakes in content.js

- A missing comma between blocks. Every `}` needs a `,` after it.
- A missing quote. Text must be inside `"double quotes"`.
- If the list goes blank after an edit, one of these is the cause. Undo your last change and try again.

## Before you publish

1. Add your photo as `images/profile.jpg` (portrait, 4:5, at least 1000×1250px).
2. Add your CV as `resume.pdf`.
3. Search for `TODO` in `index.html` and fill in your email, LinkedIn and GitHub.

## Preview locally

Double-click `index.html` to open it in your browser.

## Publish on GitHub Pages

1. Create a public repo called `<your-github-username>.github.io`.
2. Upload these files so `index.html` sits at the top level of the repo.
3. Repo → Settings → Pages → Source: "Deploy from a branch" → `main` / root.
4. Your site is live at `https://<your-github-username>.github.io` within a few minutes.
