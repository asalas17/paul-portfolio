This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Cloudflare

Production runs on the Cloudflare Worker `paul-portfolio` at [paulc.dev](https://paulc.dev), the canonical domain. The current production release was uploaded directly to Cloudflare; automatic GitHub-to-Cloudflare builds are not configured.

With dependencies installed and an existing Cloudflare login that can access this Worker, run:

```bash
npx wrangler deploy
```

`wrangler.jsonc` runs `npm run build` to export the site, then deploys the static files in `./out`. It also configures `paulc.dev` and `www.paulc.dev` as custom domains. Use `npx wrangler login` first if needed.

`vercel.json` permanently redirects the old `paulcohen.vercel.app` hostname to `https://paulc.dev`, preserving paths and query parameters. This takes effect when a Git push is deployed through the existing GitHub-to-Vercel integration.
