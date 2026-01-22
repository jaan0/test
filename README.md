Here are your instructions to run and deploy the project.

## Local development

1. Open a terminal and go to the frontend:

```bash
cd test/frontend
npm install
npm run dev
```

2. App will be available at `http://localhost:3000`.
   - Marketing site: `/`
   - Admin dashboard: `/admin`

To use the admin to control services, configure MongoDB:

- Create a MongoDB database (Atlas or any Mongo instance).
- Add environment variables in Vercel or a local `.env` file inside `test/frontend`:

```bash
MONGO_URL="your-mongodb-connection-string"
DB_NAME="your-database-name"
```

## EmailJS (contact form)

The contact form uses EmailJS. Set these environment variables locally (in `test/frontend/.env`) and in Vercel:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_pxi4rey"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="template_tebyfak"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="gkbm64MKEgVjRDpIz"
```

## Auth / Admin

Add these to `test/frontend/.env` and Vercel:

```bash
MONGO_URL="your-mongodb-connection-string"
DB_NAME="your-database-name"
NEXTAUTH_SECRET="generate_a_strong_secret"
NEXTAUTH_URL="https://your-vercel-url" # in Vercel, set to your site URL
ADMIN_BOOTSTRAP_TOKEN="one-time-token-to-create-first-admin"
```

To create the first admin, call:

```bash
curl -X POST https://your-site.vercel.app/api/admin/bootstrap \
  -H "x-bootstrap-token: $ADMIN_BOOTSTRAP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"StrongPass123","role":"admin"}'
```

## Vercel deployment

1. Push this project to GitHub/GitLab/Bitbucket.
2. In Vercel dashboard, create a new project and select this repository.
3. In the project settings, set **Root Directory** to `test/frontend` (or use the provided `test/vercel.json`).
4. Set the following environment variables in Vercel:
   - `MONGO_URL`
   - `DB_NAME`
5. Vercel will auto-detect **Next.js** and build with:
   - Build Command: `npm run build`
   - Output Directory: `.vercel/output` (handled by Next.js automatically)

After deployment:

- Public site is available at your Vercel URL `/`.
- Admin dashboard for editing services is at `/admin` on the same domain.
