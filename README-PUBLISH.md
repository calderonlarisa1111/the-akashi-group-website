# The Akashi Group Static Site

This repository is the publish-ready website for The Akashi Group.

Upload the contents of this folder as the public site root. There is no build step.

## Included Files

- `index.html` - the full one-page site
- `styles.css` - site styling
- `script.js` - animated hero canvas and mobile navigation
- `assets/` - logo, hero artwork, and favicons
- `robots.txt` and `sitemap.xml` - search engine files
- `CNAME` - custom domain file for hosts that use it
- `_headers` - security and cache headers for Cloudflare Pages and Netlify
- `vercel.json` - equivalent headers for Vercel
- `PROJECT-BRIEF.md` - brand and section notes

## Domain

Primary URL: `https://www.theakashigroup.com/`

The site metadata, sitemap, robots file, and `CNAME` are already set for `www.theakashigroup.com`.

## Contact

- Email: `info@akashigroup.com`
- Phone: `(571) 456-0838`

Used in `index.html` (contact section, footer, and structured data).

## Recommended Path

Cloudflare Pages is the cleanest choice if the domain DNS is already managed in Cloudflare or if you are willing to move nameservers there. It will read `_headers`, issue HTTPS, and can automatically create the needed DNS record after the custom domain is attached.

Netlify is the fastest manual upload path. Drag this folder into a new Netlify site, assign `www.theakashigroup.com`, then update DNS to Netlify's target.

Vercel is also suitable for static hosting. Import or upload this folder as a static project with no build command; `vercel.json` carries the security and asset cache headers.

GitHub Pages is fine if the site should live in a repository. Publish from the repository root and keep the included `CNAME` file.

## DNS Notes

Add the custom domain inside the host dashboard before changing DNS.

For `www.theakashigroup.com`, create the CNAME record your host asks for:

- Cloudflare Pages: `www` -> your `*.pages.dev` project target
- Netlify: `www` -> your `*.netlify.app` site target
- Vercel: follow the Vercel dashboard's assigned DNS value
- GitHub Pages: `www` -> your GitHub Pages hostname

If you also want `theakashigroup.com` without `www`, add it as a second domain in the host dashboard and configure the apex/root DNS record using that host's instructions. Then set the host to redirect the apex domain to `www.theakashigroup.com`.

## Launch Check

After DNS and HTTPS are active:

1. Visit `https://www.theakashigroup.com/`.
2. Test desktop and mobile layouts, including the mobile menu.
3. Confirm the header logo, favicon, and hero image load.
4. Confirm the contact email and phone number work.
5. Check `https://www.theakashigroup.com/sitemap.xml`.
6. Submit the sitemap in Google Search Console when ready.
