# Quick Implementation Reference Guide

## Key Files Modified

### 1. Routing
**src/App.jsx**
- Added `PortfolioDetail` import
- Added route: `<Route path="portfolio/:id" element={<PortfolioDetail />} />`

### 2. Portfolio
**src/pages/PortfolioDetail.jsx** (NEW)
- Complete portfolio detail page with full features
- Located at `/portfolio/{id}`
- Includes gallery, results, team info, and CTAs

**src/pages/Portfolio.jsx**
- Updated card component from `<div>` to `<Link to={/portfolio/${project.id}}>`
- Added GlobalHero integration

### 3. Services Routing
**src/pages/Services.jsx**
- Vertical slider displaying all services
- Click service → navigate to `/services/{slug}`

**src/pages/ServiceDetail.jsx**
- Display service details and sub-services
- Sub-services display with links to `/services/{slug}/{subSlug}`
- Added GlobalHero integration

**src/pages/SubServiceDetail.jsx**
- Full sub-service detail page
- Process steps, FAQ, benefits
- Added GlobalHero integration

### 4. Navigation
**src/utils/GlobalHero.jsx** (ENHANCED)
- Now includes integrated navbar
- Vertical nav on desktop, hamburger on mobile
- Renders navbar automatically on all pages using GlobalHero
- No need to import Navbar separately

### 5. Typography & Styling
**src/index.css** (ENHANCED)
- CSS variables for all font sizes
- Consistent line heights (--line-height-*)
- Unified font family: Plus Jakarta Sans
- Form element styling
- Code element styling

### 6. Additional Pages
**src/pages/Blog.jsx**
- Added GlobalHero integration

**src/pages/Contact.jsx**
- Already well-implemented, includes GlobalHero

---

## Component Usage

### GlobalHero Component Props
```jsx
<GlobalHero
  title="Page Title"
  subtitle="Subtitle with two words"
  description="Full page description"
  breadcrumbs={[
    { label: "Home", icon: Home, href: "/" },
    { label: "Current", href: "#", current: true },
  ]}
  backgroundImage="URL"
  centered={true}
  titleColors={{
    first: "white",
    second: "#f13a34"
  }}
/>
```

### Navigation Pattern
Pages using GlobalHero automatically get:
- Integrated navbar (vertical on desktop, hamburger on mobile)
- Consistent hero section styling
- Breadcrumb navigation
- Professional header presentation

---

## Route Map

```
HOME
├── / → Home page
├── /about → About page
├── /services → Services (vertical slider)
│   ├── /services/:slug → Service detail
│   │   └── /services/:slug/:subSlug → Sub-service detail
├── /portfolio → Portfolio grid
│   └── /portfolio/:id → Portfolio detail
├── /blog → Blog page
└── /contact → Contact form
```

---

## Mobile Responsive Breakpoints

- **Mobile**: < 768px
  - Hamburger menu navigation
  - Single column layouts
  - Optimized font sizes
  - Touch-friendly buttons

- **Tablet**: 768px - 1024px
  - Transitional layouts
  - Grid adjustments

- **Desktop**: > 1024px
  - Vertical navigation
  - Multi-column layouts
  - Full feature set

---

## Typography Sizes

### Headings
- H1: 3.75rem → 2.25rem (mobile)
- H2: 3rem → 1.875rem (mobile)
- H3: 1.875rem → 1.5rem (mobile)
- H4: 1.25rem
- Body: 1rem
- Small: 0.875rem
- Extra Small: 0.75rem

### Line Heights
- Tight: 1.25 (headings)
- Snug: 1.375
- Normal: 1.5 (body)
- Relaxed: 1.625
- Loose: 2

---

## Color System

### Primary Colors
- Primary Red: `#f13a34`
- Primary Dark: `#6a070e`
- Black: `#000000`
- Secondary Soft: `#4a4a4a`

### Gradients
- Red Gradient: `linear-gradient(135deg, #f13a34, #6a070e)`
- Black Gradient: `linear-gradient(135deg, #000000, #4a4a4a)`

---

## Key Features Implemented

### ✅ Portfolio System
- Detail page with gallery
- Results showcase
- Team and timeline information
- Next/Previous project navigation
- Production-ready component

### ✅ Navbar Integration
- Unified across all pages
- Consistent styling
- Mobile hamburger menu
- Accessibility features
- No duplicate code

### ✅ Services Routing
- Three-level hierarchy
- Vertical slider on main page
- Grid layout on detail pages
- Sub-service individual pages
- Related services recommendations

### ✅ Global Typography
- Single font family used everywhere
- Consistent heading sizes
- Proper line heights
- Mobile-optimized text
- Accessible contrast ratios

### ✅ Contact Page
- Professional form
- Multiple contact methods
- Map integration
- Success/error messages
- Loading states

---

## Performance Metrics

- Build Size: ~520KB (gzip: ~154KB)
- Modules Transformed: 2174
- CSS Bundle: 84KB (gzip: 12KB)
- JS Bundle: 519KB (gzip: 154KB)
- Build Time: ~21 seconds

---

## Deployment Instructions

1. Build the project:
   ```bash
   npm run build
   ```

2. Output is in `dist/` folder

3. Deploy to your hosting provider

4. Ensure all routes are properly configured in your server

5. Test all routes in production:
   - `/portfolio/:id`
   - `/services/:slug`
   - `/services/:slug/:subSlug`

---

## Troubleshooting

### Portfolio Details Not Loading
- Verify `src/pages/PortfolioDetail.jsx` exists
- Check route in `App.jsx`: `/portfolio/:id`
- Confirm portfolio data is available

### Navbar Not Appearing
- Check page uses `<GlobalHero />` component
- Verify imports are correct
- Clear browser cache

### Typography Inconsistent
- Verify CSS variables loaded from `src/index.css`
- Check no inline styles override classes
- Inspect element to verify applied styles

---

## Support & Maintenance

All components are modular and follow React best practices. For updates:

1. Update data sources (constants files)
2. Modify component logic (pages/components folders)
3. Adjust styles (index.css or component className)
4. Test on mobile and desktop
5. Run build to verify no errors

---

**Last Updated:** January 15, 2026
**Build Status:** ✅ Successful
**Production Ready:** ✅ Yes
