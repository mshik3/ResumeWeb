# ResumeWeb

Personal site (mustafashikora.com), static HTML on GitHub Pages (`gh-pages` branch, no build step). Goal: get Mustafa known and bring staff+/principal-level opportunities, mostly through writing over time.

## Files
- `index.html`: homepage. Intro (plain role line, then side projects in one sentence) → At Discord (the leadership story) → Things I build outside work (trading feature, cards with plain-English taglines) → Experience. Work first because it proves level; projects show range and personality.
- `trading/index.html`: trading bot deep-dive. Numbers and the chart SVG paths are baked in: refresh from `curl https://algotrading.mshik3.workers.dev/status`, `portfolio_snapshots` in D1 (read-only), and SPY closes then update both pages.
- `assets/images/projects/`: 1000x640 JPEG screenshots of live projects (headless Playwright).
- `assets/fonts/`: self-hosted Latin woff2 (Fraunces, Inter, JetBrains Mono); `@font-face` rules sit at the top of `style.css`. No Google Fonts requests.
- `assets/css/style.css`: the only stylesheet. Dark-only palette, tokens on `:root`. Cards get a colored top strip via `--strip`.
- `assets/js/motion.js`: the only script. Three live pieces on the homepage: trading chart draws on scroll, bot-vs-bot super tic-tac-toe, Team Rocket card shelf (`assets/images/cards/`). Motion only where it explains the thing; everything else is a real screenshot or real data. Respects reduced motion.
- `assets/images/og.png`: 1200x630 share image. Regenerate if the headline changes.
- `assets/Resume/resume.yaml`: resume source of truth. Edit this, never the PDF.
- `happy-hour/`: unrelated menu page, `noindex`.
- `notes/` (gitignored): plan, LinkedIn copy, raw material for posts. Never published.

## Regenerate the resume
Needs RenderCV (`uv tool install "rendercv[full]"`). From `assets/Resume/`:
`rendercv render resume.yaml -pdf MustafaShikoraResume.pdf -o /tmp/resume-out`
Do not pass all four `-no*` flags; the render silently produces nothing. Theme is `engineeringresumes`; it must stay 1 page.

## Resume rules
- One page. Experience, Skills, Education order. Plain, short wording, outcome first.
- No dollar amounts, revenue figures, or fraud details (legal). No invented metrics; rough sizes only.
- No ongoing or unreleased projects. No em dashes or double hyphens.
- Discord is two roles: Senior Software Engineer, Tech Lead (Apr 2024 to present) and Software Engineer (May 2022 to Apr 2024).

## Voice (site, posts, LinkedIn)
- Dry, casual, specific. Describe the work and the things he builds, not his virtues. The old site's "I build things that scale to millions and try not to break them" is the register.
- Banned: taglines about himself, principle or maxim lists, rule-of-three sentences, aphorisms, "lessons learned" listicles, closing pitches ("If you're working on something hard..."), em dashes, hype.
- Posts start from Mustafa's raw words (voice memo, chat dump). Edit those; never write connective prose or anecdotes he didn't say.
- Never Discord internals, never criticism of any person, team, or company. Check: fine if his manager and a future CEO read it?
