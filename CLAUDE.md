# Akash's portfolio

Personal portfolio site, hosted on GitHub Pages. The owner is a data analyst and does not write frontend code, so explain every change in plain words and keep things simple.

## How the site works

- Plain HTML, CSS and JavaScript. No frameworks, no build step, no npm packages. Keep it that way unless the owner asks.
- `content.js` holds all case studies and projects as a list. `case-studies.html`, `projects.html` and the counts on `index.html` are built from it by `render.js`.
- To add work: create a page in `work/` (copy `work/case-study.html` or `work/nudge.html`), add an image to `images/`, then add an entry to `content.js`.
- `index.html` has the hero, the two work tiles, About and Contact.

## Design rules

- Clean and minimal: lots of white space, little text, large images.
- All colours and fonts are tokens in `:root` at the top of `style.css`. Use the tokens, never hard-coded colours.
- Every colour token has a light and a dark value. Keep both in sync.
- Must work on phones (about 390px wide) with no sideways scrolling.
- Fonts: Geist and Geist Mono from Google Fonts.

## Working with the owner

- Before a big change, say what you plan to do in a few lines.
- After a change, say which files changed and how to preview it (Live Server, or open `index.html`).
- Don't commit or push unless asked.
- Never put client names or real client data from past jobs on the site.
