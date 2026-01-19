# Language Selector - Dropdown Design

## Overview

Language selector in profile menu now uses a **dropdown/popup design** instead of side-by-side buttons. This design is more scalable and follows industry best practices.

## Benefits

### 1. **Scalability** 🚀
- Easy to add more languages without layout issues
- Can support 10+ languages without UI breaking
- No need to redesign when adding new languages

### 2. **Clean UI** ✨
- Takes less vertical space in menu
- Looks more professional
- Follows common UX patterns (Gmail, Facebook, etc.)

### 3. **Better UX** 👍
- Shows current language clearly
- Flag emoji makes it visually appealing
- Checkmark indicates active selection
- Hover states for better feedback

## Design Specs

### Current Language Button
```
┌─────────────────────────────┐
│ 🇩🇰 Dansk               ▼  │  ← Trigger button
└─────────────────────────────┘
```

### Expanded Dropdown
```
┌─────────────────────────────┐
│ 🇩🇰 Dansk               ▲  │  ← Trigger (active)
└─────────────────────────────┘
  ┌───────────────────────────┐
  │ 🇬🇧 English            │  ← Hover state
  ├───────────────────────────┤
  │ 🇩🇰 Dansk            ✓ │  ← Selected (green bg + checkmark)
  └───────────────────────────┘
```

## Component Structure

```tsx
<LanguageMenuItem>
  {/* Trigger Button */}
  <button>
    🇩🇰 Dansk ▼
  </button>

  {/* Dropdown (shown when clicked) */}
  {isOpen && (
    <>
      <Overlay onClick={close} />
      <Menu>
        {locales.map(locale => (
          <MenuItem active={locale === current}>
            {flag} {name} {active && <CheckIcon />}
          </MenuItem>
        ))}
      </Menu>
    </>
  )}
</LanguageMenuItem>
```

## States

### 1. Closed (Default)
- Shows current language with flag
- Down arrow (▼) indicates expandable
- Hover: Light gray background

### 2. Open
- Up arrow (▲) indicates can collapse
- Shows all available languages
- Overlay behind to close on outside click

### 3. Language Options
- **Active**: Green background (primaryGreen/10), green text, checkmark
- **Inactive**: White background, black text
- **Hover**: Light gray background

## Adding New Languages

Super easy! Just update `src/i18n/request.ts`:

```ts
// Add to locales array
export const locales = ['en', 'da', 'sv', 'no'] as const;

// Add translations to localeNames
const localeNames: Record<Locale, string> = {
  en: "English",
  da: "Dansk",
  sv: "Svenska",    // ← New
  no: "Norsk",      // ← New
};

// Add flags to localeFlags
const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  da: "🇩🇰",
  sv: "🇸🇪",  // ← New
  no: "🇳🇴",  // ← New
};
```

That's it! The dropdown automatically adjusts.

## Menu Structure in UserAvatarMenu

```
┌──────────────────────────────────┐
│ ⭐ Basis - opgrader nu           │
├──────────────────────────────────┤
│ 👤 Din profilsiden               │
│ 💬 Support                       │
├──────────────────────────────────┤
│ 🌐 🇩🇰 Dansk               ▼    │  ← Language dropdown
├──────────────────────────────────┤
│ 🚪 Log ud                        │
├──────────────────────────────────┤
│ [Kundebruger] [Firmabruger]     │
└──────────────────────────────────┘
```

## Technical Details

### Z-Index Management
- Overlay: `z-[100]`
- Dropdown menu: `z-[101]`
- Ensures dropdown appears above all menu items

### Click Outside to Close
- Invisible overlay captures clicks
- Auto-closes dropdown when clicking outside

### Loading State
- Button disabled while switching language
- Prevents double-clicks

### Positioning
- Dropdown is `absolute` positioned
- Aligned to left edge of trigger button
- Full width of parent container

## Comparison with Old Design

### Old (Side-by-side buttons)
```
┌─────────────────────────────────┐
│ Vælg sprog / Choose language    │
│                                  │
│ [🇬🇧 English] [🇩🇰 Dansk]       │  ← Takes lots of space
└─────────────────────────────────┘
```
**Issues:**
- ❌ Takes lots of vertical space
- ❌ Not scalable (max 2-3 languages)
- ❌ Wastes horizontal space
- ❌ Label needed for context

### New (Dropdown)
```
┌─────────────────────────────────┐
│ 🌐 🇩🇰 Dansk               ▼   │  ← Compact, self-explanatory
└─────────────────────────────────┘
```
**Benefits:**
- ✅ Compact (1 line)
- ✅ Scalable (10+ languages)
- ✅ Professional look
- ✅ No label needed (icon + flag explain it)

## Future Enhancements

Possible improvements:
- [ ] Add language names in their native script (e.g., "English", "Dansk", "Español")
- [ ] Add search for long language lists (when 10+ languages)
- [ ] Add keyboard navigation (Arrow keys + Enter)
- [ ] Add language region variants (en-US, en-GB)
- [ ] Show language completion % for incomplete translations

## Similar Implementations

This pattern is used by:
- **Gmail** - Globe icon → dropdown with flags
- **Facebook** - Language selector in settings
- **Twitter** - Account settings language selector
- **LinkedIn** - Profile language preferences
- **YouTube** - Video language options

## Accessibility

- ✅ Keyboard accessible (Tab to focus)
- ✅ Click outside to close
- ✅ Visual feedback (hover, active states)
- ✅ Clear selected state (checkmark + color)
- ⚠️ TODO: Add ARIA labels for screen readers
- ⚠️ TODO: Add keyboard navigation (Arrow keys)

## Mobile Considerations

On mobile devices:
- Dropdown appears as overlay
- Large touch targets (py-2)
- Flags are large enough (text-xl)
- Easy to tap and select
