# Hướng dẫn Internationalization (i18n) - Jobsy

## Tổng quan

Project đã được cấu hình để hỗ trợ đa ngôn ngữ với:
- **Tiếng Đan Mạch (da)** - Ngôn ngữ mặc định
- **Tiếng Anh (en)**

## Cấu trúc URLs

Tất cả URLs giờ đây có prefix locale:
- `/da/` - Tiếng Đan Mạch (mặc định)
- `/en/` - Tiếng Anh

Ví dụ:
- `/da/login` - Trang login tiếng Đan Mạch
- `/en/dashboard` - Trang dashboard tiếng Anh

## Files Translation

Các file translation nằm trong thư mục `messages/`:
- `messages/da.json` - Bản dịch tiếng Đan Mạch
- `messages/en.json` - Bản dịch tiếng Anh

### Cấu trúc Translation Keys

```json
{
  "common": {
    "start": "START",
    "readMore": "Læs mere"
  },
  "hero": {
    "title": "Få {count} tilbud fra lokale fagfolk",
    "titleHighlight": "3 tilbud"
  },
  "whyJobsy": {
    "title": "Hvorfor bruge Jobsy?",
    "features": {
      "moreBids": {
        "title": "Flere tilbud",
        "description": "Sammenlign priser, og lav en {highlight}"
      }
    }
  }
}
```

## Sử dụng Translations trong Components

### 1. Client Components

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations();

  return (
    <div>
      {/* Simple text */}
      <h1>{t("hero.title")}</h1>

      {/* Text with parameters */}
      <p>{t("hero.title", { count: "3" })}</p>

      {/* Rich text with React components */}
      <p>
        {t.rich("hero.description", {
          highlight: () => <b>{t("hero.highlight")}</b>,
        })}
      </p>
    </div>
  );
}
```

### 2. Server Components

```tsx
import { getTranslations } from "next-intl/server";

export default async function MyServerComponent() {
  const t = await getTranslations();

  return <h1>{t("common.title")}</h1>;
}
```

## Language Switcher

Component `LanguageSwitcher` đã được thêm vào Header. Người dùng có thể:
1. Click vào dropdown để xem các ngôn ngữ có sẵn
2. Chọn ngôn ngữ mong muốn
3. URL sẽ tự động cập nhật và trang sẽ reload với ngôn ngữ mới

## Thêm Translation Keys Mới

1. Mở file `messages/da.json` và `messages/en.json`
2. Thêm key mới với format nested:

```json
{
  "myFeature": {
    "title": "Tiêu đề của tôi",
    "description": "Mô tả của tôi"
  }
}
```

3. Sử dụng trong component:

```tsx
const t = useTranslations();
<h1>{t("myFeature.title")}</h1>
```

## Migration Checklist

### Đã hoàn thành ✅
- [x] Cài đặt `next-intl`
- [x] Cấu hình Next.js config
- [x] Tạo middleware cho locale routing
- [x] Cấu trúc lại app directory với `[locale]`
- [x] Tạo file translations (EN & DA)
- [x] Tạo LanguageSwitcher component
- [x] Migrate `WhyJobsy` component
- [x] Migrate `FilterSection` component
- [x] Thêm LanguageSwitcher vào Header

### Cần làm tiếp 🔄
- [ ] Migrate `LoginForm` component
- [ ] Migrate các error messages
- [ ] Migrate các static text còn lại trong Header, Footer
- [ ] Thêm translations cho dashboard pages
- [ ] Thêm translations cho company pages
- [ ] Update navigation links để bao gồm locale prefix

## Tips

### 1. Organize Translation Keys
Nhóm các keys theo tính năng để dễ quản lý:
```json
{
  "auth": { ... },
  "dashboard": { ... },
  "profile": { ... }
}
```

### 2. Use Namespaces
Nếu file quá lớn, có thể tách ra nhiều files:
```
messages/
  en/
    common.json
    auth.json
    dashboard.json
  da/
    common.json
    auth.json
    dashboard.json
```

### 3. TypeScript Support
Có thể tạo types cho translation keys để có autocomplete:

```ts
// src/i18n/types.ts
import type en from "../../messages/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

## Testing

Test các URLs sau để verify i18n hoạt động:
- `http://localhost:3000` → Redirect đến `/da`
- `http://localhost:3000/da` → Trang chủ tiếng Đan Mạch
- `http://localhost:3000/en` → Trang chủ tiếng Anh
- Click Language Switcher để switch giữa các ngôn ngữ

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js i18n Routing](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
