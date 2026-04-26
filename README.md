This is a [Next.js](https://nextjs.org) marketing site for Zucarto. It does not redirect visitors to the CarbonMRV product; access is handled through verification and follow-up.

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

## Integration Setup

1. Create a local `.env` file in project root.
2. Set these values:
   - `NEXT_PUBLIC_DEMO_EMAIL` -> sales/support contact mailbox
   - `MONGODB_URL` -> MongoDB connection string (server-side only)
   - `MONGODB_DB_NAME` -> database name (example: `zucarto_production`)
3. Restart the dev server after changing env vars.

## Access Request Storage

- **Request access** form: `POST /api/connect-requests` -> `connect_requests` collection.
- **Sign-in page** at `/login`: `POST /api/website-login` -> `websitelogin` (email and name only; the password field is not stored or transmitted).
- After a successful sign-in request, the user sees a thank-you message and is not redirected to the product.

## Key and Secret Handling

- Only expose browser-safe values with `NEXT_PUBLIC_` variables.
- Never store private API keys, DB credentials, or signing secrets in the landing page repo.
- Keep private secrets in server-side environments only (backend service, serverless routes, or deployment secret manager).
- If the landing page needs a protected integration, proxy via backend endpoints instead of calling third-party providers directly from the browser.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
