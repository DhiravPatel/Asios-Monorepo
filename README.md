# ASIOS

A production monorepo for the Asios platform — public landing site, admin panel, and REST API — organised as **npm workspaces** (no Turborepo, no Nx, no Lerna).

## Repository Layout

```
asios/
├── apps/
│   ├── web/          # Public landing website  — @asios/web   (Vite + React 18)
│   ├── admin/        # Admin panel             — @asios/admin (CRA + React 18)
│   └── api/          # REST API                — @asios/api   (Express + MongoDB)
├── packages/         # Reserved for shared code (empty for now)
├── .github/
│   └── workflows/    # CI: install + lint + build all workspaces
├── .editorconfig
├── .env.example      # Catalog of every env var across all apps
├── .gitignore
├── .nvmrc            # Node 20
└── package.json      # Workspaces root
```

One root, one `package-lock.json`, one git history — and every app still deployable on its own.

## Quick Start

```bash
# 1. Install Node 20 (match .nvmrc)
nvm use

# 2. Install all workspace deps (single lockfile at root)
npm install

# 3. Copy env templates and fill in values
cp .env.example               .env                # optional — root catalog only
cp apps/api/.env.example      apps/api/.env
cp apps/web/.env.example      apps/web/.env
cp apps/admin/.env.example    apps/admin/.env

# 4. Start all three apps in parallel
npm run dev
```

Default dev ports:

| App          | Port | URL                       |
| ------------ | ---- | ------------------------- |
| `@asios/api` | 4000 | http://localhost:4000     |
| `@asios/admin` | 3000 | http://localhost:3000   |
| `@asios/web` | 5173 | http://localhost:5173     |

## Root Scripts

```bash
npm run dev           # run api + web + admin concurrently (labelled output)
npm run dev:api       # run backend only
npm run dev:web       # run landing site only
npm run dev:admin     # run admin panel only

npm run build         # build every workspace that defines a build script
npm run build:web
npm run build:admin

npm run lint          # lint every workspace that defines a lint script
npm run clean         # wipe node_modules and build output everywhere
```

Workspace-scoped runs use npm's native flags:

```bash
npm run <script> --workspace=@asios/web     # one workspace
npm run <script> --workspaces --if-present  # every workspace with that script
npm install <pkg>  --workspace=@asios/api   # add a dep to one workspace
npm install <pkg>  --workspaces             # add a dep to all workspaces
```

## Apps

### @asios/web — Public Landing Site ([apps/web/](apps/web/))

Customer-facing site: Home, About, Products, Blog, Catalogue, Contact, Export, Information.

- **Stack:** React 18, Vite, Tailwind CSS, React Router, Framer Motion, GSAP, Swiper, Axios
- **Env:** `VITE_API_BASE_URL`
- **Scripts (workspace):** `dev`, `build`, `preview`, `lint`

### @asios/admin — Admin Panel ([apps/admin/](apps/admin/))

Internal panel that manages products, categories, subcategories, catalogues, blogs, and inquiries.

- **Stack:** React 18, Create React App, Ant Design, Radix UI, Tailwind CSS, React Quill, Axios
- **Env:** `REACT_APP_BASE_URL`, `REACT_APP_EMAIL_SERVER`
- **Scripts (workspace):** `start`, `build`, `test`

### @asios/api — REST API ([apps/api/](apps/api/))

Express backend serving both frontends. Auth, data persistence, uploads, email, and Gemini integration.

- **Stack:** Node.js, Express 4, MongoDB + Mongoose, JWT, Multer + Cloudinary, Nodemailer, Appwrite, Google Generative AI
- **Structure:** `Routes/`, `Controller/`, `Model/`, `Middleware/`, `Connection/`
- **Entry:** [apps/api/index.js](apps/api/index.js)

**Routes:**

| Route                         | Purpose                    |
| ----------------------------- | -------------------------- |
| `/api/user`                   | Auth and user management   |
| `/api/product`                | Products                   |
| `/api/category`               | Product categories         |
| `/api/subcategory`            | Product subcategories      |
| `/api/catalogue`              | Catalogues                 |
| `/api/catalogue-category`     | Catalogue categories       |
| `/api/catalogue-subcategory`  | Catalogue subcategories    |
| `/api/blog`                   | Blog posts                 |
| `/api/inquiry`                | General inquiries          |
| `/api/product-inquiry`        | Product-specific inquiries |
| `/api/protected`              | JWT-guarded test endpoint  |

## Environment Variables

Every app reads from its own `apps/<app>/.env` (gitignored). Each app ships a committed `.env.example` describing the vars it needs. The root [.env.example](.env.example) is a catalog of all vars across the monorepo for quick reference.

## Deployment (Vercel)

Each workspace deploys as a separate Vercel project from this single repo. In each Vercel project's settings:

- **Root Directory:** `apps/web`, `apps/admin`, or `apps/api`
- **Install Command:** leave default (`npm install` — Vercel will run it from repo root and hoist via workspaces)
- **Build Command:** default from each workspace's `vercel.json` and `package.json`

## CI

[.github/workflows/ci.yml](.github/workflows/ci.yml) runs on every PR and push to `main`: checkout → Node from `.nvmrc` → `npm ci` → `npm run lint` → `npm run build`.

## Requirements

- Node.js 20+
- npm 10+
- MongoDB (Atlas or local) for the API
- Cloudinary account for media uploads
