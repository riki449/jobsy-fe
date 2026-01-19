# Login Redirect Fix - Company Dashboard Route

## Issue
After successful login, the page was not redirecting. User stayed on login page.

## Root Cause
The redirect URLs in login code were **incorrect**:
- Code was redirecting to: `/${locale}/company` ❌
- Actual company route is: `/${locale}/home` ✅

This mismatch caused the redirect to fail silently because the route didn't exist.

## Route Structure

According to `src/config/auth.config.ts`:

```ts
export const APP_ROUTES = {
  COMPANY_DASHBOARD: "/home",      // Company users → /home
  USER_DASHBOARD: "/dashboard",    // Regular users → /dashboard
} as const;
```

Actual file structure:
```
src/app/[locale]/
├── (portal)/
│   ├── dashboard/    ← User dashboard
│   └── home/         ← Company dashboard
└── login/
```

## Files Fixed

### 1. Login Page (src/app/[locale]/login/page.tsx)

**Before:**
```ts
const isCompany = Number(data.default_company_view || 0) !== 0;
router.push(isCompany ? `/${locale}/company` : `/${locale}/dashboard`);
//                                  ^^^^^^^^ Wrong route!
```

**After:**
```ts
const isCompany = Number(data.default_company_view || 0) !== 0;
const redirectUrl = isCompany ? `/${locale}/home` : `/${locale}/dashboard`;
//                                          ^^^^ Correct route!
console.log('🚀 Redirecting to:', redirectUrl);
router.push(redirectUrl);
```

**Lines changed:** 51-56

### 2. Login Modal (src/features/auth/components/LoginModal.tsx)

**Before:**
```ts
router.push(isCompany ? `/${locale}/company` : `/${locale}/dashboard`);
//                                  ^^^^^^^^ Wrong route!
```

**After:**
```ts
router.push(isCompany ? `/${locale}/home` : `/${locale}/dashboard`);
//                                  ^^^^ Correct route!
```

**Lines changed:** 51

## Additional Improvements

### 1. Fixed Loading State
Previously, when login had an error, `setLoading(false)` wasn't called, leaving the loading overlay stuck.

**Fixed:**
```ts
if (res.error) {
  message.error(res.error);
  setLoading(false);  // ← Added this
  return;
}
```

### 2. Added Debug Logging
Added console.log statements to track redirects:
```ts
console.log('🚀 Redirecting to:', redirectUrl);
console.error('❌ Login error:', err);
```

This helps debugging in production when things go wrong.

## Login Flow (Corrected)

```
User submits login form
  ↓
1. Call loginAction (set cookie)
  ↓
2. Update client state (Zustand store)
  ↓
3. Check user type (API call)
  ↓
4. Determine redirect URL:
   - If company (default_company_view !== 0) → /da/home
   - If user (default_company_view === 0)    → /da/dashboard
  ↓
5. router.push(redirectUrl)
  ↓
6. Middleware validates and allows access
  ↓
7. User sees dashboard! ✅
```

## Testing Checklist

- [x] User login → Redirects to `/da/dashboard` ✅
- [x] Company login → Redirects to `/da/home` ✅
- [x] English locale → Redirects to `/en/dashboard` or `/en/home` ✅
- [x] Error handling → Shows error, stops loading ✅
- [x] Build passes ✅

## Redirect URL Mapping

| User Type | Route in Code | Actual File Path | URL Example |
|-----------|--------------|------------------|-------------|
| Regular User | `/dashboard` | `app/[locale]/(portal)/dashboard/` | `/da/dashboard` |
| Company User | `/home` | `app/[locale]/(portal)/home/` | `/da/home` |

## Why This Naming?

The route names might seem confusing:
- **Company dashboard** = `/home`
- **User dashboard** = `/dashboard`

This is because:
1. `/home` is the company's "home" view (their main dashboard)
2. `/dashboard` is the regular user's dashboard
3. Both are inside the `(portal)` route group

This is a legacy naming convention from the original codebase.

## Related Files
- `middleware.ts` - Handles authentication and redirects
- `src/config/auth.config.ts` - Defines route constants
- `src/app/[locale]/(portal)/dashboard/page.tsx` - User dashboard
- `src/app/[locale]/(portal)/home/page.tsx` - Company dashboard

## Build Status
✅ Build successful
✅ All routes working
✅ Redirects functioning correctly
