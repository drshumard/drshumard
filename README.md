# Dr Shumard — static site

Static HTML/CSS site for DrShumard.com (rebuilt from the former taylazhealth.com WordPress + Bricks site, then rebranded). No build step: every file in this folder is served as-is.

## Structure

```
index.html                     Home
about/index.html               About us
faq/index.html                 FAQs
contact-us/index.html          Contact (native form; posts JSON to a webhook — see below)
weight-loss-intake/index.html  Intake (WhiteLabelMD JotForm embed + checkout SKU map)
terms/  privacy/  hipaa/  ccpa/  returns-refund-policy/  sms-terms-and-conditions/
order-processing/  order-receipt/   Post-checkout pages used by the WhiteLabelMD flow
404.html                       Not-found page (Vercel serves it automatically)
assets/css/style.css           All styles (1rem = 10px); brand colours are the tokens at the top
assets/js/main.js              Mobile menu, FAQ accordions, sticky header
assets/img/                    Images (logo.png plus webp photos)
assets/fonts/                  Self-hosted Inter variable font
wp-content/uploads/common/wlmd-intake-default.js
                               WhiteLabelMD intake script, kept at its original path
vercel.json  robots.txt  sitemap.xml
```

Each page is a full HTML file, so the header and footer markup is repeated in every file. When you change the navigation or footer, apply the change to all pages (a find-and-replace across `**/index.html` works well).

## Brand

- Blue `#256AF4` (main, `--brand`), yellow `#FFC24A` (buttons, `--accent`), deep navy-blue `#0A2463` (`--dark-bg`) for the hero, page-title bands and pricing section, white navigation bar. All colours are CSS variables at the top of `assets/css/style.css`.
- Logo: `assets/img/logo.png` is the wordmark from portal-drshumard.b-cdn.net recoloured to the brand blue so it reads on the white navigation bar and light footer. The original light-blue version is kept as `assets/img/logo-light.png` for use on blue backgrounds.
- Address, phone and email: 740 Nordahl Rd, Suite 294, San Marcos, CA 92069 · (858) 564-7081 · support@drshumard.com (contact page, FAQ and legal pages).

- "Log in" button → `https://drshumard.practicebetter.io/#/signin` (Practice Better member portal).

Still pointing at the old Taylaz Health services, because no replacements were provided yet:

- Checkout links in the intake page's SKU map → `https://checkout.taylazhealth.com/`
- The WhiteLabelMD JotForm IDs and site configuration (`site_id` 412) embedded in the intake and contact pages
- The support hours on the contact page (9:00am – 6:00pm, Mon to Sun)

The legal pages (terms, privacy, HIPAA, CCPA, returns, SMS terms) had "Taylaz Health" swapped for "Dr Shumard" and the address updated, but the wording is otherwise the original Taylaz text and should be reviewed.

## Deploy to Vercel

1. Push this folder to a Git repository (GitHub, GitLab or Bitbucket).
2. In Vercel, click **Add New Project**, import the repository, leave the framework preset as **Other**, and deploy. No build command or output directory is needed.
3. Add `drshumard.com` and `www.drshumard.com` under **Settings → Domains** and update DNS as Vercel instructs. Canonical URLs and the sitemap use `https://drshumard.com`.

Or deploy from this folder with the CLI:

```bash
npx vercel --prod
```

URLs keep their trailing slashes (`/about/`), via `trailingSlash: true` in `vercel.json`.

## Optional styles

A commented block at the end of `assets/css/style.css` holds decorative effects (hero gradient, glows, highlighted words) that the original builder site defined but never displayed. Uncomment it if you want them.

## Third-party pieces

- The intake questionnaire is a JotForm served by WhiteLabelMD (`forms.whitelabelmd.com`); its surrounding scripts came from the original pages unchanged.
- The contact page's native form mirrors the original WhiteLabelMD form: Name, E-mail, Phone, Message, DOB (month/day/year), the 18+ representation, and the SMS consent text (rebranded from TaylazHealth to Dr Shumard). Submissions POST JSON to the `WEBHOOK_URL` constant at the top of the inline script in `contact-us/index.html` — payload keys: name, email, phone, message, dob (MM/DD/YYYY), age_consent, sms_consent, page, submitted_at. While `WEBHOOK_URL` is empty, submitting falls back to composing an email to support@drshumard.com. The markup has a commented slot for a Cloudflare Turnstile widget; the webhook receiver must verify the Turnstile token server-side, or the widget only decorates. (Direct posts to WhiteLabelMD's own endpoint fail their captcha check with HTTP 400, which is why the form doesn't submit there.) The original embed is preserved in `assets/wlmd-contact-embed.txt`.
- Pinegrow project files (`pinegrow.json`, `_pgbackup/`, `_pginfo/`) are editor metadata and are not needed for deployment.
