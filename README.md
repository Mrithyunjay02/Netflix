## Netflix Landing Page Clone (React + Vite)

A production-ready Netflix landing page clone built with **React**, **Vite**, **Axios**, and **CSS Modules**, using **TMDB** as the data source.

### 1. Tech Stack

- **React 18** with **Vite**
- **Axios** for HTTP requests
- **CSS Modules** for scoped styling
- **React Hooks** and functional components
- **TMDB API** with environment-based API key (`VITE_TMDB_API_KEY`)

### 2. Project Structure

```text
src/
  components/
    Nav.jsx
    Nav.module.css
    Banner.jsx
    Banner.module.css
    Row.jsx
    Row.module.css
  services/
    api.js
    requests.js
  App.jsx
  main.jsx
  index.css
```

### 3. Getting Started (Local Development)

1. **Install dependencies**

```bash
npm install
```

2. **Create your `.env` file**

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then set your TMDB API key:

```bash
VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY_HERE
```

3. **Run the dev server**

```bash
npm run dev
```

The app will be available at the URL printed in your terminal (by default `http://localhost:5173`).

### 4. Production Build

```bash
npm run build
npm run preview
```

### 5. Environment Variables

- The TMDB API key is accessed via `import.meta.env.VITE_TMDB_API_KEY`.
- **Important**: The variable name **must** start with `VITE_` for Vite to expose it to the client.

### 6. Deployment

#### 6.1 Deploy to Netlify

1. **Create a new site**
   - Go to Netlify dashboard.
   - Click **Add new site** → **Import from Git** (or **Deploy manually** if you upload a zipped build).

2. **Build settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

3. **Environment variable**
   - In **Site settings** → **Environment variables**, add:
     - **Key**: `VITE_TMDB_API_KEY`
     - **Value**: your TMDB API key
   - Re-deploy the site after changing environment variables.

4. Netlify will install dependencies, run the build, and host your production bundle.

#### 6.2 Deploy to Vercel

1. **Create a new project**
   - Go to Vercel dashboard.
   - Click **New Project** and import your Git repository (or use the CLI to link).

2. **Framework preset**
   - Choose **Vite** or **Other** and set:
     - **Build command**: `npm run build`
     - **Output directory**: `dist`

3. **Environment variable**
   - In the project **Settings** → **Environment Variables**, add:
     - **Name**: `VITE_TMDB_API_KEY`
     - **Value**: your TMDB API key
     - Scope: at least **Production** (and optionally Preview/Development).

4. Trigger a deployment (new commit or manual redeploy). Vercel will build and host the optimized production app.

### 7. Notes & Best Practices

- API requests are centralized via `src/services/api.js` using a reusable Axios instance.
- TMDB endpoints are defined in `src/services/requests.js` to keep URLs declarative and reusable.
- All layout and component styles use **CSS Modules** for isolation (`*.module.css`).
- The **Navbar** becomes solid black on scroll; the **Banner** uses a random Netflix Original as background; **Rows** are horizontally scrollable, with hover scale effects and optional YouTube trailers.

