# The Basset Family site (Cloudflare Pages)

Static site: `node build.mjs` turns `data/*.json` and `src/pages/*.html` into `dist/`. No dependencies.

## Deploy
1. Put photos in `src/static/images/` (home page expects logo.jpg, hero.jpg, welcome.jpg). Reference others in the JSON as `/images/name.jpg`.
2. Push this folder to a GitHub repo.
3. Cloudflare dashboard > Workers & Pages > Create > Pages > connect the repo. Build command `node build.mjs`, output directory `dist`.
4. Inquiry form: create a Turnstile widget (put its site key in `data/site.json`), then set Pages environment variables `TURNSTILE_SECRET`, `RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL`. Resend (resend.com) needs your domain verified; check its current free limits.
5. Domain: Pages project > Custom domains. Cloudflare will want DNS on Cloudflare. Copy every GoDaddy DNS record first, especially MX records if email runs through GoDaddy. Cloudflare Email Routing can forward sandie@ to your inbox for free if you drop GoDaddy email.
6. Email-list signup: make a free form at MailerLite or Buttondown and paste its embed HTML into `signupEmbed` in `data/site.json`. Deposit popup: set `deposit.cardUrl` in `data/site.json` to a hosted card checkout link (a GoDaddy Pay Link or a Stripe Payment Link for the total including the fee). Venmo and Zelle details sit beside it. Don't add raw card-number fields to the page; use the processor's hosted checkout or hosted fields.

## Editing without code
Sign in at pagescms.org with GitHub and open the repo. `.pages.yml` sets it up to edit site settings, FAQ, litters and puppies (including the Reserved status). Saving commits, and Cloudflare redeploys in about a minute. Confirm the config against the Pages CMS docs, since its syntax changes.

## Pages
`src/pages/*.html` are wrapped in the header and footer automatically (`home.html` is the home page, others become `/name/`). Paste your Training, Gallery, Puppy Prep and Health Guarantee text into those files. A litter's status decides whether it lists under Puppies or Past Litters.

## Preview
`node build.mjs`, then `npx wrangler pages dev dist` (also runs the form function locally).
# basset-site
# basset-site
# basset-site
# basset-site
# basset-site
