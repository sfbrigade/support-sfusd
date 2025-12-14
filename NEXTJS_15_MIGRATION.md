# Next.js 15 Migration Guide for Pages Router

This document outlines the required changes to make this project compatible with Next.js 15 (Pages Router). Focus is on deprecated features and architectural changes, not code quality improvements.

## Current Status
- **Next.js Version**: 15.5.3 ✅
- **React Version**: 19.1.1 ✅
- **Router**: Pages Router

---

## Required Changes

### 1. Remove `passHref` from `next/link` (DEPRECATED)

**Status**: ⚠️ **REQUIRED** - Found 1 instance

The `passHref` prop is deprecated in Next.js 15. When using `Link` with a child component, the child should accept `href` directly or you should wrap it differently.

**Location**: `src/pages/map.tsx:307`

**Current Code**:
```tsx
<Link
  href={...}
  className="block md:hidden"
  passHref
>
  <SelectedSchoolCard school={selectedSchool} />
</Link>
```

**Fix Options**:
- **Option A**: Remove `passHref` and ensure `SelectedSchoolCard` (or its wrapper) accepts `href` as a prop
- **Option B**: Wrap the card content directly in the Link:
```tsx
<Link
  href={...}
  className="block md:hidden"
>
  <div>
    <SchoolCard ... />
  </div>
</Link>
```

**Note**: Since `SchoolCard` doesn't appear to be a link component, Option B is recommended.

---

### 2. API Route Caching Configuration (BREAKING CHANGE)

**Status**: ⚠️ **REQUIRED** - Affects all GET API routes

In Next.js 15, GET Route Handlers are **no longer cached by default**. You must explicitly opt into caching if you want static responses.

**Affected Files**:
- `src/pages/api/searchSchools.ts`
- `src/pages/api/school/[stub].ts`

**Current Behavior**: These routes may have been cached before, but now they won't be.

**Required Changes**:

#### For `src/pages/api/searchSchools.ts`:
Add explicit caching configuration:

```typescript
// Add at the top of the file, before the handler
export const dynamic = 'force-dynamic'; // or 'force-static' if you want caching
```

**Recommendation**: Use `'force-dynamic'` since this is a search endpoint that should always fetch fresh data.

#### For `src/pages/api/school/[stub].ts`:
Add explicit caching configuration:

```typescript
// Add at the top of the file, before the handler
export const dynamic = 'force-dynamic'; // or 'force-static' if you want caching
```

**Recommendation**: Use `'force-dynamic'` since school data may change and should be fresh.

**Alternative**: If you want to cache these routes, use:
```typescript
export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'force-static';
```

---

### 3. `getStaticProps` Caching Behavior

**Status**: ℹ️ **INFORMATIONAL** - May need configuration

**Location**: `src/pages/map.tsx:20`

`getStaticProps` still works in Next.js 15, but the default caching behavior may have changed. If you want to ensure ISR (Incremental Static Regeneration), explicitly add:

```typescript
export const getStaticProps: GetStaticProps = async () => {
  const schools = await prisma.school.findMany({
    include: {
      metrics: true,
      programs: true,
    },
  });
  return {
    props: { schools },
    revalidate: 3600, // Optional: Revalidate every hour
  };
};
```

**Current Status**: Your current implementation should work, but adding `revalidate` is recommended for data that changes.

---

### 4. Client Router Cache (INFORMATIONAL)

**Status**: ℹ️ **OPTIONAL** - Only if you notice caching issues

Next.js 15 changed the default client router cache behavior. Page components are no longer cached by default. If you want to restore previous caching behavior, add to `next.config.js`:

```javascript
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30, // seconds
      static: 180, // seconds
    },
  },
  // ... rest of config
};
```

**Note**: This is only needed if you experience issues with client-side navigation caching.

---

### 5. Image Component Quality Settings (FUTURE DEPRECATION)

**Status**: ℹ️ **INFORMATIONAL** - Not immediately required

In future Next.js versions, `next/image` quality settings will require explicit configuration. However, since your `next.config.js` has `images: { unoptimized: true }`, this may not apply to your setup.

**No action needed** unless you remove `unoptimized: true` in the future.

---

## Summary of Required Actions

### High Priority (Must Fix)
1. ✅ Remove `passHref` from `src/pages/map.tsx:307`
2. ✅ Add `export const dynamic = 'force-dynamic'` to:
   - `src/pages/api/searchSchools.ts`
   - `src/pages/api/school/[stub].ts`

### Medium Priority (Recommended)
3. ⚠️ Add `revalidate` to `getStaticProps` in `src/pages/map.tsx` if you want ISR

### Low Priority (Optional)
4. ℹ️ Configure `staleTimes` in `next.config.js` if you notice client-side caching issues

---

## Testing Checklist

After making changes, test:
- [ ] Map page loads correctly (getStaticProps)
- [ ] School search API returns results
- [ ] Individual school API route works
- [ ] Links on map page navigate correctly (passHref fix)
- [ ] No console warnings about deprecated features

---

## Additional Notes

### What's NOT Required
- ❌ **`next/head`**: Still works in Pages Router (metadata API is for App Router only)
- ❌ **`getStaticProps`/`getServerSideProps`**: Still fully supported
- ❌ **API Routes structure**: No changes needed to the handler pattern
- ❌ **React 19 migration**: Already on React 19.1.1 ✅

### Deprecated but Not Yet Breaking
- `next lint` command (deprecated in 15.5, will be removed in 16)
- AMP support (deprecated, but you're not using it)

---

## Migration Commands

You can use Next.js codemods to help with some migrations:

```bash
# Run the async request API codemod (if you use cookies/headers in the future)
npx @next/codemod@canary next-async-request-api

# General upgrade helper
npx @next/codemod@canary upgrade latest
```

**Note**: The codemods are primarily for App Router. For Pages Router, manual changes are typically needed.
