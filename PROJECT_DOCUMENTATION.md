# Vintage - Production-Ready React/Vite Project

## Project Overview

This is a fully configured, production-ready React application built with Vite, featuring complete routing, responsive UI design, and a scalable API architecture using TanStack Query.

## Tech Stack

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **TanStack Query (@tanstack/react-query)** - Server state management
- **Lucide React** - Icon library

## Project Structure

```
src/
├── api/
│   └── api.js                 # Centralized API functions
├── constants/
│   └── services.js            # Static services data
├── hooks/
│   └── useApi.js              # TanStack Query hooks
├── components/
│   ├── Layout.jsx             # Shared layout wrapper
│   ├── Navbar.jsx             # Navigation with active states
│   ├── Footer.jsx             # Footer component
│   ├── Hero.jsx               # Hero section
│   ├── VerticalStackSlider.jsx # Vertical slider component
│   └── ProcessSection.jsx      # Process section
├── pages/
│   ├── Home.jsx               # Home page
│   ├── About.jsx              # About page
│   ├── Services.jsx           # Services listing
│   ├── ServiceDetail.jsx      # Service detail page
│   ├── SubServiceDetail.jsx   # Sub-service detail page
│   ├── Portfolio.jsx          # Portfolio page
│   ├── Blog.jsx               # Blog page
│   └── Contact.jsx            # Contact form page
├── App.jsx                    # Main app with routing setup
├── main.jsx                   # React entry point
└── index.css                  # Global styles with custom animations
```

## Routing Structure

### Main Routes

- `/` - Home (displays Hero, VerticalStackSlider, ProcessSection)
- `/about` - About Us page
- `/services` - Services listing with all services and sub-services
- `/services/:slug` - Individual service detail page
- `/services/:slug/:subSlug` - Sub-service detail page
- `/portfolio` - Portfolio showcase
- `/blog` - Blog articles listing
- `/contact` - Contact form

### Shared Layout

All pages use a shared `Layout` component that includes:
- **Navbar** - With active route highlighting and mobile menu
- **Footer** - With company info, links, and social media
- **Main Content** - Outlet for page-specific content

## Data Architecture

### Static Data (`constants/services.js`)

The services data structure includes:
- Digital Marketing Services
- Creative Design Services
- Video Production
- Design & Development Services
- Professional Photography Services
- AI Videos & Images
- Event Management

Each service contains:
- `id`, `slug`, `title`, `description`, `image`
- `subServices` array with detailed information

### API Layer (`api/api.js`)

Centralized API functions that:
- Return static/dummy data with simulated delays
- Can be easily replaced with real backend APIs
- Include validation and error handling
- Provide functions for:
  - `getServices()` - Get all services
  - `getServiceBySlug(slug)` - Get service by slug
  - `getSubServiceBySlug(serviceSlug, subServiceSlug)` - Get sub-service
  - `getRelatedServices(serviceSlug)` - Get related services
  - `getPageContent(page)` - Get page content
  - `submitContactForm(formData)` - Form submission

### Hooks Layer (`hooks/useApi.js`)

TanStack Query hooks that:
- Wrap API functions with caching and state management
- Include proper loading and error handling
- Provide automatic refetching and revalidation
- Available hooks:
  - `useServices()` - Fetch all services
  - `useService(slug)` - Fetch single service
  - `useSubService(serviceSlug, subServiceSlug)` - Fetch sub-service
  - `useRelatedServices(serviceSlug)` - Fetch related services
  - `usePageContent(page)` - Fetch page content
  - `useContactForm()` - Submit contact form

## Data Flow

**Complete data flow from API to UI:**

```
Static Data (services.js)
    ↓
API Functions (api.js)
    ↓
TanStack Query Hooks (useApi.js)
    ↓
React Components (pages/components)
    ↓
User Interface
```

**Rules:**
- Components must NOT use static data directly
- All data flows through `api.js` → `useApi.js` → components
- Easy to replace static data with real APIs without refactoring components

## Key Features

### 1. Complete Routing
- Client-side routing with React Router
- Active route states in navigation
- Breadcrumb navigation in detail pages
- Mobile-responsive navigation menu

### 2. Scalable API Architecture
- Centralized API setup with `api.js`
- TanStack Query for state management
- Caching and automatic refetching
- Easy to transition from static data to real APIs

### 3. Services Structure
- Hierarchical service organization
- Service listing page with expandable sub-services
- Individual service detail pages
- Sub-service detail pages with FAQs and process info
- Related services suggestions

### 4. Responsive Design
- Mobile-first approach
- Tailwind CSS utilities
- Flexible layouts for all screen sizes
- Touch-friendly navigation

### 5. Production-Ready UI
- Consistent spacing and typography
- Smooth animations and transitions
- Loading and error states
- Form validation

### 6. Component Library
- Reusable components
- Custom animations
- Lucide React icons
- Tailwind CSS styling

## Development

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Server runs on `http://localhost:5174` (or next available port)

### Build for Production
```bash
npm run build
```
Output: `dist/` folder

### Lint Code
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## Customization Guide

### Adding a New Service

1. **Edit `src/constants/services.js`:**
   ```javascript
   {
     id: 'service-id',
     slug: 'service-slug',
     title: 'Service Title',
     description: 'Service description',
     image: 'image-url',
     subServices: [
       {
         id: 'sub-service-id',
         slug: 'sub-service-slug',
         title: 'Sub-Service Title',
         description: 'Description',
         fullContent: 'Detailed content',
       }
     ],
   }
   ```

2. Services are automatically available through:
   - `getServices()` API function
   - `useServices()` hook
   - Services listing page
   - Service detail pages

### Connecting to Real Backend API

1. **Update `src/api/api.js`:**
   ```javascript
   export const getServices = async () => {
     const response = await fetch('https://api.example.com/services');
     return response.json();
   };
   ```

2. **No changes needed in components!** - They automatically work with the new API

### Adding a New Page

1. **Create page component** in `src/pages/YourPage.jsx`
2. **Add route** in `src/App.jsx`:
   ```javascript
   <Route path="/your-route" element={<YourPage />} />
   ```
3. **Add navigation link** in `src/components/Navbar.jsx`

### Customizing Styles

- **Global styles:** `src/index.css`
- **Component styles:** Use Tailwind CSS classes
- **Custom animations:** Defined in component `<style jsx>` or global CSS

## API Response Examples

### Service Response
```javascript
{
  id: 'digital-marketing',
  slug: 'digital-marketing',
  title: 'Digital Marketing Services',
  description: 'Comprehensive digital marketing solutions...',
  image: 'https://...',
  subServices: [...]
}
```

### Sub-Service Response
```javascript
{
  id: 'social-media-management',
  slug: 'social-media-management',
  title: 'Social Media Management',
  description: 'Strategic social media management...',
  fullContent: 'Our social media management service...',
  parentService: {
    slug: 'digital-marketing',
    title: 'Digital Marketing Services'
  }
}
```

## Performance Optimizations

- **Code Splitting:** Automatic route-based code splitting
- **Caching:** TanStack Query caching for all data
- **Lazy Loading:** Routes are lazy-loaded
- **Image Optimization:** Uses responsive image URLs
- **CSS Minification:** Tailwind CSS handles unused CSS removal

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- ES6+ JavaScript features

## Deployment

### Build
```bash
npm run build
```

### Deploy `dist/` folder to:
- **Vercel** - `vercel deploy`
- **Netlify** - Drag and drop `dist/` folder
- **AWS S3 + CloudFront**
- **GitHub Pages**
- **Traditional hosting** (copy `dist/` files via FTP)

### Environment Variables
Create `.env.production` for production-specific settings:
```
VITE_API_URL=https://api.example.com
```

## Best Practices Implemented

✅ Component-based architecture
✅ Separation of concerns (API, hooks, components)
✅ DRY (Don't Repeat Yourself) principles
✅ Responsive design
✅ SEO-friendly structure
✅ Proper error handling
✅ Loading states
✅ Clean, readable code
✅ Scalable folder structure
✅ Future-ready API integration

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Clear Node Modules
```bash
rm -r node_modules package-lock.json
npm install
```

### Build Issues
```bash
npm run build -- --debug
```

## License

This project is production-ready and can be used as a foundation for commercial projects.

## Support

For updates and issues, refer to component documentation in the code comments.

---

**Project Status:** ✅ Production-Ready
**Last Updated:** January 2025
