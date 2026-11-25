# 🚨 AlertFlow

**AlertFlow** is a modern, responsive **Alert Operations & Incident Management Console** built with Angular. It provides real-time visibility, filtering, lifecycle tracking, and resolution workflows for alerts across distributed services (e.g., `tracking-svc`, `billing-svc`, `auth-svc`).

---

## 📸 Key Features

- **Alert Console Dashboard**: Real-time aggregation of alerts categorized by severity (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`) and lifecycle status (`OPEN`, `ESCALATED`, `AUTO_CLOSED`, `RESOLVED`).
- **Advanced Filtering & Search**: Multi-dimensional filtering by service source, severity, and resolution state with instant search capability.
- **Incident Inspection & Details**: Drawer / detail panel to inspect incident metadata, descriptions, timestamps, and service ownership.
- **Audit & State Timeline**: Full event history tracking state transitions and resolution notes.
- **Incident Resolution**: Fast resolution action workflow with audit note logging.
- **Modern UI / Responsive Design**: Clean SaaS interface powered by SCSS custom components, FontAwesome icons, and accessible layouts.

---

## 🛠️ Tech Stack

- **Framework**: [Angular 22](https://angular.dev/) (Standalone components architecture)
- **Styling**: SCSS (CSS variables, responsive design, custom design system)
- **Icons**: [@fortawesome/fontawesome-free](https://fontawesome.com/)
- **State & Reactive Streams**: [RxJS](https://rxjs.dev/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Deployment**: [Vercel](https://vercel.com/) / Static SPA hosting

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── core/                      # Core singletons, services, layout components
│   │   ├── layout/                # Main layout shell, sidebar, headers
│   │   ├── models/                # Global core models
│   │   └── services/              # Core application services
│   ├── features/                  # Domain-driven feature modules
│   │   └── alerts/                # Alert operations feature
│   │       ├── components/        # Alert table, filters, detail drawer, timeline
│   │       │   ├── alert-details/
│   │       │   ├── alert-filters/
│   │       │   ├── alert-table/
│   │       │   └── alert-timeline/
│   │       ├── data/              # Mock dataset & seed data
│   │       ├── models/            # Alert models, types, and interfaces
│   │       ├── pages/             # Alert console page view
│   │       │   └── alert-console/
│   │       └── services/          # Alert data service & state management
│   └── shared/                    # Reusable dumb components, directives, pipes
│       ├── components/            # Badges, search inputs, buttons
│       ├── directives/
│       └── pipes/
├── public/                        # Static assets
└── styles.scss                    # Global style definitions and theme tokens
```

---

## 🚀 Getting Started Locally

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **npm**: `v10.x` or higher

### 1. Clone the repository

```bash
git clone https://github.com/dev-anirban01/Alert-Flow.git
cd Alert-Flow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the local development server

```bash
npm start
# or: npx ng serve
```

Navigate to **`http://localhost:4200/`** in your browser. The application will hot-reload automatically on code changes.

---

## 🧪 Testing & Quality Checks

### Run Unit Tests
```bash
npm test
```
Tests are powered by [Vitest](https://vitest.dev/) for fast feedback.

### Format Code
```bash
npx prettier --write .
```

---

## 🏗️ Production Build

To compile a production-ready static bundle:

```bash
npm run build
```

The output artifacts will be created in `dist/alertflow/browser/`.

---

## 🌐 Deployment (Vercel)

The repository is pre-configured with `vercel.json` for single-page application (SPA) routing.

### Deploy using Vercel CLI:
```bash
# 1. Login to Vercel (one-time)
npx vercel login

# 2. Deploy to production
npx vercel --prod
```

### Or Deploy using Git (CI/CD):
1. Push your code to GitHub: `git push origin main`.
2. Connect the repository in the [Vercel Dashboard](https://vercel.com/new).
3. Set the build output directory to: `dist/alertflow/browser`.
4. Every push to `main` will automatically build and deploy!

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
