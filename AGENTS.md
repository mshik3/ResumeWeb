# ResumeWeb

Personal site (mustafashikora.com), static HTML on GitHub Pages (`gh-pages` branch, no build step). The resume PDF is generated from YAML and linked from the site.

## Files
- `index.html`: the site. Experience timeline is hand-written HTML.
- `assets/Resume/resume.yaml`: resume source of truth. Edit this, never the PDF.
- `assets/Resume/MustafaShikoraResume.pdf`: generated output, linked by the "resume" button on the site.
- `happy-hour/`: unrelated menu page.

## Regenerate the resume
Needs RenderCV (`uv tool install "rendercv[full]"`). From `assets/Resume/`:
`rendercv render resume.yaml -pdf MustafaShikoraResume.pdf -o /tmp/resume-out`
Extra outputs (png, html, md) land in `/tmp/resume-out`. Do not pass all four `-no*` flags; the render silently produces nothing. Theme is `engineeringresumes`; check the page count after rendering, it must stay at 1.

## Resume rules
- One page. Experience, Skills, Education order.
- Bullets group work by theme, each with its best example. Do not list every project.
- Plain, short wording. Outcome first, strong verb, "Led" only where Mustafa led.
- No dollar amounts, revenue figures, or fraud details (legal). No invented metrics; rough sizes only ("tens of thousands").
- No ongoing or unreleased projects.
- No em dashes or double hyphens.
- Discord is two roles: Senior Software Engineer, Tech Lead (Apr 2024 to present) and Software Engineer (May 2022 to Apr 2024). Emphasize tech lead and point-of-contact/SME for mobile revenue platform.
- Venmo and Amazon bullets are older original wording, not yet rewritten.

## Site rules
- Keep `index.html` Discord bullets in sync with `resume.yaml` but much shorter: 3 bullets per role, dry and casual tone, no punctuation at the end, as few words as possible.
- Site date ranges use an em dash; leave them.
- Capless and the CME Group internship appear on the site but not the resume; that is intentional.
