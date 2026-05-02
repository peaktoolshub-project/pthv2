# Peak Tools Hub — Complete Deployment Guide
## Production Utility Calculator Platform (Global)

---

## 🗂️ Project Structure

```
calcwise-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, SEO, schemas
│   │   ├── page.tsx            # Homepage with tool grid
│   │   ├── sitemap.ts          # Dynamic XML sitemap
│   │   ├── robots.ts           # robots.txt
│   │   ├── globals.css         # Global styles
│   │   ├── tools/
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Dynamic tool pages (ISR)
│   │   ├── category/
│   │   │   └── [category]/
│   │   │       └── page.tsx    # Category listing pages
│   │   ├── convert/
│   │   │   └── [pair]/
│   │   │       └── page.tsx    # Programmatic currency pages
│   │   └── api/
│   │       └── rates/
│   │           └── route.ts    # Exchange rate API (Edge)
│   ├── components/
│   │   ├── tools/              # Individual calculator components
│   │   │   ├── SalaryCalculator.tsx
│   │   │   ├── LoanCalculator.tsx
│   │   │   ├── BMICalculator.tsx
│   │   │   └── ...
│   │   ├── ui/
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── ResultCard.tsx
│   │   │   └── Chart.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Sidebar.tsx
│   ├── lib/
│   │   ├── calculators.ts      # All formula engines
│   │   ├── tools.ts            # Tool registry & SEO metadata
│   │   └── utils.ts            # Formatting helpers
│   ├── hooks/
│   │   ├── useExchangeRates.ts
│   │   └── useDebounce.ts
│   └── types/
│       └── index.ts
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   ├── manifest.json
│   └── icons/
├── .env.example
├── next.config.js
├── tailwind.config.js
├── package.json
└── tsconfig.json
```

---

## 🚀 Deployment: Cloudflare Pages via GitHub

### Step 1: Prepare Repository

```bash
# Initialize git
git init
git add .
git commit -m "feat: initial CalcWise platform"

# Push to GitHub
gh repo create calcwise --public
git remote add origin https://github.com/YOUR_USERNAME/calcwise.git
git push -u origin main
```

### Step 2: Cloudflare Pages Setup

1. Go to **Cloudflare Dashboard** → Pages → Create a project
2. Connect to **GitHub** → Select your `calcwise` repo
3. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Node.js version**: 20.x

4. Add environment variables (from `.env.example`):
   ```
   NEXT_PUBLIC_EXCHANGE_RATE_API_KEY = your_key
   NEXT_PUBLIC_SITE_URL = https://calcwise.my
   NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
   ```

5. Click **Save and Deploy**

### Step 3: Custom Domain

1. Cloudflare Pages → Custom domains → Add domain
2. Enter `calcwise.my` (or your domain)
3. Update your domain's DNS nameservers to Cloudflare
4. SSL/TLS automatically provisioned

### Step 4: Verify Deployment

```bash
# Check Core Web Vitals
npx lighthouse https://calcwise.my --view

# Test sitemap
curl https://calcwise.my/sitemap.xml

# Validate structured data
# Use: https://search.google.com/test/rich-results
```

---

## 📋 Environment Variables Reference

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://calcwise.my

# Exchange Rates (pick one)
# Option A: Open Exchange Rates (free, no API key for hourly)
NEXT_PUBLIC_FALLBACK_RATE_API=https://open.er-api.com/v6/latest

# Option B: ExchangeRate-API (free tier 1,500 req/month)
NEXT_PUBLIC_EXCHANGE_RATE_API_KEY=your_key_here

# Optional: Analytics & Ads
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=verification_token
```

---

## 🔍 SEO Checklist

### Technical SEO ✅
- [x] Dynamic `sitemap.xml` covering all tool pages + programmatic pages
- [x] Optimized `robots.txt` with proper crawl directives
- [x] Canonical tags on every page
- [x] Proper meta titles (unique per page, ≤60 chars)
- [x] Meta descriptions (unique per page, ≤160 chars)
- [x] H1 → H2 → H3 heading hierarchy
- [x] Next.js `<Image>` for optimized images
- [x] Google Fonts with `display=swap` (no render-blocking)
- [x] Static generation (SSG) for all tool pages
- [x] ISR (Incremental Static Regeneration) for fresh content

### Structured Data ✅
- [x] `WebSite` schema with SearchAction
- [x] `Organization` schema
- [x] `WebApplication` schema (per tool page)
- [x] `FAQPage` schema (for tools with FAQs)
- [x] `HowTo` schema (per tool page)
- [x] `BreadcrumbList` schema

### On-Page SEO ✅
- [x] Keyword-optimized page titles
- [x] Comprehensive meta descriptions
- [x] Internal linking between related tools
- [x] FAQ sections for featured snippets
- [x] Long-form content below calculators
- [x] Programmatic pages (currency pairs, BMI variations)

### Performance ✅
- [x] Edge runtime for API routes (fastest global TTFB)
- [x] `Cache-Control` headers on all API responses
- [x] Code splitting per page
- [x] Lazy loading below-fold components
- [x] Font preloading

---

## 📈 Scaling to 1000+ Pages

### Programmatic SEO Strategy

```typescript
// 1. Currency Converter Pages
// /convert/usd-to-myr, /convert/eur-to-myr (90+ pages)
generateCurrencyPages(currencies, "MYR")

// 2. BMI Variations
// /bmi-calculator-women, /bmi-calculator-men, /bmi-calculator-child
generateBMIVariants(["women", "men", "children", "teens"])

// 3. Salary by Role
// /salary-calculator-engineer-malaysia, /salary-calculator-teacher-malaysia
generateSalaryPages(jobRoles, "malaysia")

// 4. Loan by Type
// /car-loan-calculator-malaysia, /personal-loan-calculator
generateLoanPages(loanTypes)

// 5. City-specific tools
// /cost-of-living-kuala-lumpur, /cost-of-living-penang
generateCityPages(malaysiaCities)
```

### Content Strategy
```
Tools                 → 40+ pages     (done)
Currency pairs        → 90+ pages     (MYR × G20 currencies)
Tool variations       → 100+ pages    (by gender, age, location)
Salary by profession  → 200+ pages
Loan by bank          → 50+ pages
City cost of living   → 20+ pages
TOTAL                 → 500–1000+ pages
```

---

## 💰 Monetization Implementation

### Google AdSense (Zero CLS approach)
```tsx
// components/AdUnit.tsx
// Pre-reserve ad space with min-height to prevent CLS
<div style={{ minHeight: 250 }}>
  <ins className="adsbygoogle" data-ad-slot="XXXXXXXXX" />
</div>
```

### Affiliate Placements
```
Finance tools  → RinggitPlus (loans, credit cards)
Property tools → iProperty, PropertyGuru
Insurance      → PolicyStreet, GoBear
Travel         → Agoda, AirAsia
```

---

## 🛡️ Security Notes

- All calculations run **client-side** — no user data sent to servers
- Password generator uses `crypto.getRandomValues()` (CSPRNG)
- No localStorage for sensitive data
- CSP headers configured
- Input validation on all calculator inputs (NaN guards, range checks)

---

## 🔧 Adding New Tools

1. Add formula to `src/lib/calculators.ts`
2. Add metadata to `TOOLS` array in `src/lib/tools.ts`
3. Create component in `src/components/tools/`
4. Register in tool component map
5. Deploy — sitemap auto-updates

That's it. No config changes needed.
