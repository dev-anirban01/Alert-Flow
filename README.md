# 🚨 AlertFlow

**AlertFlow** is a responsive **Alert Operations & Incident Management Console** built with **Angular 22** (Standalone Components + Signals). It provides real-time monitoring, multi-dimensional filtering, lifecycle timeline inspection, and an asynchronous resolution workflow for distributed service alerts (`tracking-svc`, `billing-svc`, `auth-svc`).

---

## ✨ Key Features

- **Summary KPI Cards**: Live signal-computed counts for **Total**, **Open**, **Escalated**, and **Resolved / Auto-Closed** alerts.
- **Filterable Alert Table**:
  - Displays `ID`, `SOURCE`, `SEVERITY` (color-coded chip: `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`), `STATUS`, and `CREATED AT`.
  - Sorted **newest-first** by `createdAt`.
  - **10 items per page** pagination with page numbers and range indicator (`Showing 1–10 of 60`).
- **Combinable Filters & Full-Text Search (AND semantics)**:
  - Filter simultaneously by **Status**, **Severity**, **Source**, and multi-word **Search** (searches across ID, source, severity, status, timestamps, and history notes/descriptions).
  - Live `"N of 60"` result counter, one-click **Clear** button, and an explicit **Empty State** when zero alerts match.
- **Detail Panel & State Timeline**:
  - Clicking (or pressing `Enter`/`Space` on) a row highlights it and opens/updates the detail panel with alert metadata and its chronological **Alert History** timeline.
  - Responsive slide-over drawer on smaller screens with backdrop support.
- **Resolution Workflow & Edge-Case Handling**:
  - **Resolve** form appears only for `OPEN` or `ESCALATED` alerts (`RESOLVED` and `AUTO_CLOSED` show a closed indicator instead).
  - Blocks empty or whitespace-only notes with an inline validation message.
  - Simulates an **800 ms** async save via `Promise` + `setTimeout`, disables the submit button & textarea to prevent double-submits, updates the alert status to `RESOLVED`, and appends the new entry with the note to the timeline while keeping the table and detail panel in sync (even if filters are changed while saving).

---

## 🛠️ Tech Stack

- **Framework**: [Angular 22](https://angular.dev/) (Standalone components, Angular Signals, `@if` / `@for` control flow)
- **Styling**: SCSS with CSS custom properties (`:root` design tokens) and responsive breakpoints
- **Icons**: [@fortawesome/fontawesome-free](https://fontawesome.com/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Deployment**: [Vercel](https://vercel.com/) (`vercel.json` configured for SPA routing)

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── core/
│   │   └── layout/
│   │       ├── header/            # Top bar (mobile menu trigger, breadcrumb, system status)
│   │       ├── main-layout/       # Shell layout (header + sidebar + router-outlet)
│   │       └── sidebar/           # Navigation sidebar with mobile drawer state
│   ├── features/
│   │   └── alerts/
│   │       ├── data/              # Mock generator (60 alerts + AL-042 assignment example)
│   │       ├── models/            # Alert, AlertHistory, AlertSeverity, AlertStatus, AlertSource
│   │       ├── pages/
│   │       │   └── alert-console/ # Alert Console page (KPIs, filters, table, pagination, detail & resolve)
│   │       └── services/          # AlertService (Signal state + simulated 800ms resolveAlert)
│   ├── app.config.ts              # Application providers (Router, global error listeners)
│   ├── app.html                   # Root router outlet
│   ├── app.routes.ts              # Route definitions (redirects '' and '**' to '/alerts')
│   └── app.ts                     # Root App component
├── index.html
├── main.ts
└── styles.scss                    # Global design tokens, reset, and responsive breakpoints
```

---

## 🚀 Getting Started Locally

### Prerequisites

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **npm**: `v10.x` or higher

### 1. Clone & Install

```bash
git clone https://github.com/dev-anirban01/Alert-Flow.git
cd Alert-Flow
npm install
```

### 2. Start Development Server

```bash
npm start
# or: npx ng serve
```

Open **`http://localhost:4200/`** in your browser (automatically redirects to `/alerts`).

---

## 🧪 Testing & Build

```bash
# Run unit tests (Vitest)
npm test

# Production build (outputs to dist/alertflow/browser/)
npm run build

# Format code with Prettier
npx prettier --write .
```
