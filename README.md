# Jobsy - Modern Job Board Platform

Welcome to the Jobsy frontend repository. This application is built with **Next.js 15+ (App Router)** and follows a modern, scalable **Feature-based Architecture**.

## 🚀 Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (with Persist middleware)
- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Vanilla CSS
- **UI Components:** [Ant Design](https://ant.design/)
- **Authentication:** JWT (HttpOnly Cookies via Middleware + Server Actions)
- **Icons:** [Ant Design Icons](https://ant.design/components/icon)

## 📂 Project Architecture

The project adopts a **Feature-based Architecture**, grouping files by business domain rather than technical type. This ensures scalability and maintainability.

```
src/
├── app/                  # Next.js App Router (Routes & Layouts)
│   ├── (portal)/         # Authenticated routes group
│   │   ├── dashboard/    # User Dashboard
│   │   └── home/         # Company Dashboard
│   ├── login/            # Login Page
│   └── page.tsx          # Landing Page
│
├── features/             # Business Logic (The Core)
│   ├── auth/             # Authentication Feature
│   │   ├── api/          # Auth API calls
│   │   ├── components/   # Auth UI (LoginForm, UserAvatarMenu)
│   │   ├── hooks/        # Auth hooks (useAuth)
│   │   ├── store/        # Zustand Auth Store
│   │   └── types/        # Auth Types
│   ├── jobs/             # Jobs Logic
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── screens/  # Entire reusable screens
│   │   │   └── ...
│   │   ├── hooks/
│   │   └── types/
│   └── landing/          # Landing Page Feature
│
├── components/           # Shared/Generic UI Components
│   ├── common/           # Dumb components (Button, Logo, Inputs)
│   └── layout/           # Layout blocks (Header, Sidebar, Footer)
│
├── lib/                  # Library configurations (axios, queryClient)
├── config/               # Constants & Env config (api.config, auth.config)
└── middleware.ts         # Route protection & Redirection logic
```

## 🛠️ Key Conventions

### 1. State Management
- **Global Auth State:** Managed by **Zustand** (`useAuthStore`).
- **Server State:** Managed by **React Query** (`useQuery`, `useMutation`).
- **Local State:** `useState`.

### 2. Authentication Flow
- **Login:** Server Action (`loginAction`) sets HttpOnly Cookie.
- **Client Sync:** Token is also returned to Client to sync with Zustand (for Axios client-side usage).
- **Protection:** `middleware.ts` checks cookies and redirects based on Role.
  - **User** -> `/dashboard`
  - **Company** -> `/home`

### 3. API Calls
- All API calls are localized in `features/{feature}/api`.
- Use the configured `api` instance from `@/src/lib/axios`.
- Custom hooks (e.g. `useGetJobList`) wrap React Query logic in `features/{feature}/hooks`.

## 🚦 Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

2.  **Environment Setup:**
    Create a `.env.local` file:
    ```env
    NEXT_PUBLIC_API_URL=http://.../api
    JWT_SECRET=your_jwt_secret_for_middleware
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

4.  **Build for Production:**
    ```bash
    npm run build
    npm start
    ```

## 🧹 Maintenance

- **Adding a Feature:** Create a new folder in `src/features/`. Do not bloat `src/components`.
- **Modifying Layout:** Check `src/components/layout/AppLayout.tsx` for Dashboard layout.
- **Refactoring:** Keep `src/app` thin. Move logic to `features`.

---
*Built with ❤️ by Jobsy Team*
