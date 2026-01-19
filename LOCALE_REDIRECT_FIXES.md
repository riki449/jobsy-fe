# Locale Prefix Redirect Fixes

## Issue
After login, redirects were missing the locale prefix, causing 307 redirects:
- `/dashboard` → 307 redirect to `/da/dashboard`
- `/company` → 307 redirect to `/da/company`
- `/login` → 307 redirect to `/da/login`

This caused unnecessary redirects and potential state loss.

## Root Cause
All `router.push()` and `window.location.href` calls were using hardcoded paths without locale prefix.

## Files Fixed

### 1. Login Page (src/app/[locale]/login/page.tsx)
**Changes:**
- Added `useParams` to get current locale
- Updated redirects to include locale prefix

```ts
// Before
router.push("/dashboard")

// After
const locale = params?.locale || "da";
router.push(`/${locale}/dashboard`)
```

**Lines affected:** 49, 52

### 2. Logo Component (src/components/common/Logo.tsx)
**Changes:**
- Added `useParams` to get current locale
- Updated home redirect to include locale prefix

```ts
// Before
router.push("/")

// After
const locale = params?.locale || "da";
router.push(`/${locale}`)
```

**Lines affected:** 24

### 3. Header Component (src/components/layout/Header.tsx)
**Changes:**
- Added `useParams` to get current locale
- Updated login redirect to include locale prefix

```ts
// Before
router.push("/login")

// After
const locale = params?.locale || "da";
router.push(`/${locale}/login`)
```

**Lines affected:** 64

### 4. Login Modal (src/features/auth/components/LoginModal.tsx)
**Changes:**
- Added `useParams` to get current locale
- Updated all redirects to include locale prefix

```ts
// Before
router.push("/dashboard")
router.replace("/")

// After
const locale = params?.locale || "da";
router.push(`/${locale}/dashboard`)
router.replace(`/${locale}`)
```

**Lines affected:** 49, 51, 55

### 5. User Avatar Menu (src/features/auth/components/UserAvatarMenu.tsx)
**Changes:**
- Added `useParams` to get current locale
- Updated logout redirect to include locale prefix

```ts
// Before
window.location.href = "/login"

// After
const locale = params?.locale || "da";
window.location.href = `/${locale}/login`
```

**Lines affected:** 82

### 6. Login Form (src/features/auth/components/LoginForm.tsx)
**Changes:**
- Added `useParams` to get current locale
- Updated logo click redirect to include locale prefix

```ts
// Before
window.location.href = "/"

// After
const locale = params?.locale || "da";
window.location.href = `/${locale}`
```

**Lines affected:** 36

## Pattern Used

All fixes follow the same pattern:

```ts
import { useParams } from "next/navigation";

export default function Component() {
  const params = useParams();
  const locale = params?.locale || "da";

  // Use locale in redirects
  router.push(`/${locale}/path`);
  // or
  window.location.href = `/${locale}/path`;
}
```

## Default Locale

All components default to `"da"` (Danish) if locale is not available in params, matching the app's default locale setting.

## Testing

### Before Fix
```
Login → Redirect to /dashboard → 307 to /da/dashboard
Click Logo → Redirect to / → 307 to /da
Logout → Redirect to /login → 307 to /da/login
```

### After Fix
```
Login → Direct to /da/dashboard (or /en/dashboard)
Click Logo → Direct to /da (or /en)
Logout → Direct to /da/login (or /en/login)
```

## Build Status
✅ Build successful
✅ TypeScript compilation passed
✅ All routes generated correctly

## URLs Now Support

All routes now properly maintain locale:
- `/da/` - Danish homepage
- `/da/login` - Danish login
- `/da/dashboard` - Danish dashboard
- `/da/company` - Danish company view
- `/en/` - English homepage
- `/en/login` - English login
- `/en/dashboard` - English dashboard
- `/en/company` - English company view

## Related
- i18n implementation (I18N_GUIDE.md)
- localStorage language preference (LOCALSTORAGE_LANGUAGE.md)
- Middleware locale routing (middleware.ts)
