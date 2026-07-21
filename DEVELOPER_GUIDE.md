# Developer Guide - Extending the Vintage Project

## Table of Contents

1. [Adding New Features](#adding-new-features)
2. [API Integration](#api-integration)
3. [Component Development](#component-development)
4. [Styling](#styling)
5. [Testing](#testing)
6. [Performance Tips](#performance-tips)

## Adding New Features

### Adding a New Page

**Step 1:** Create a new page component in `src/pages/`

```jsx
// src/pages/NewPage.jsx
import React from 'react';

const NewPage = () => {
  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold">New Page</h1>
      </div>
    </div>
  );
};

export default NewPage;
```

**Step 2:** Add route in `src/App.jsx`

```jsx
import NewPage from './pages/NewPage';

// Inside Routes component
<Route path="/new-page" element={<NewPage />} />
```

**Step 3:** Add navigation link in `src/components/Navbar.jsx`

```jsx
const navLinks = [
  // ... existing links
  { href: '/new-page', label: 'New Page' },
];
```

### Adding a New Service

**Step 1:** Edit `src/constants/services.js`

```javascript
{
  id: 'consulting-services',
  slug: 'consulting-services',
  title: 'Consulting Services',
  description: 'Expert consulting for your business needs.',
  image: 'https://images.unsplash.com/...',
  subServices: [
    {
      id: 'business-consulting',
      slug: 'business-consulting',
      title: 'Business Consulting',
      description: 'Strategic business consultation.',
      fullContent: 'Detailed content about business consulting...',
    },
    {
      id: 'tech-consulting',
      slug: 'tech-consulting',
      title: 'Tech Consulting',
      description: 'Technology solutions consulting.',
      fullContent: 'Detailed content about tech consulting...',
    },
  ],
}
```

**That's it!** The service automatically appears:
- In `/services` page
- Available through `/services/consulting-services`
- Sub-services accessible through `/services/consulting-services/business-consulting`

## API Integration

### Connecting to Real Backend API

**Step 1:** Update `src/api/api.js`

```javascript
// Replace the getServices function
export const getServices = async () => {
  // Remove this line:
  // await delay(API_DELAY);
  
  const response = await fetch('https://api.example.com/services', {
    headers: {
      'Authorization': `Bearer ${process.env.VITE_API_TOKEN}`,
      'Content-Type': 'application/json',
    }
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
};
```

**Step 2:** Create a `.env.local` file

```
VITE_API_URL=https://api.example.com
VITE_API_TOKEN=your_token_here
```

**Step 3:** Use in your API functions

```javascript
const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const getServices = async () => {
  const response = await fetch(`${API_URL}/services`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
    }
  });
  return response.json();
};
```

### Error Handling

```javascript
export const getServices = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch services:', error);
    throw new Error('Failed to load services. Please try again.');
  }
};
```

### Using Custom Hooks in Components

```jsx
import { useServices } from '../hooks/useApi';

export const MyComponent = () => {
  const { data: services, isLoading, error } = useServices();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <div>
      {services?.map(service => (
        <div key={service.id}>{service.title}</div>
      ))}
    </div>
  );
};
```

## Component Development

### Creating a New Component

**Step 1:** Create component file in `src/components/`

```jsx
// src/components/ServiceCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {service.title}
      </h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <Link
        to={`/services/${service.slug}`}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        Learn More
        <ChevronRight size={18} />
      </Link>
    </div>
  );
};

export default ServiceCard;
```

**Step 2:** Use in other components

```jsx
import ServiceCard from '../components/ServiceCard';

export const Services = () => {
  const { data: services } = useServices();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {services?.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};
```

### Component Props Best Practices

```jsx
// Good: Clear prop interface
interface ServiceCardProps {
  service: {
    id: string;
    slug: string;
    title: string;
    description: string;
    image?: string;
  };
  onSelect?: (id: string) => void;
}

export const ServiceCard = ({ service, onSelect }: ServiceCardProps) => {
  // Component code
};
```

## Styling

### Tailwind CSS Best Practices

```jsx
// Good: Use Tailwind utilities
<div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
  <h3 className="text-xl font-bold text-gray-900">Title</h3>
</div>

// Avoid: Inline styles
<div style={{ display: 'flex', padding: '24px' }}>
```

### Creating Reusable Utility Classes

Add to `src/index.css`:

```css
@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold
           hover:bg-blue-700 transition-colors duration-300;
  }
  
  .btn-secondary {
    @apply px-6 py-3 border border-gray-300 text-gray-900 rounded-lg
           font-semibold hover:border-gray-400 transition-colors duration-300;
  }
  
  .card {
    @apply bg-white border border-gray-200 rounded-xl p-6
           hover:shadow-lg transition-shadow duration-300;
  }
}
```

Then use in components:

```jsx
<button className="btn-primary">Click Me</button>
<div className="card">Content</div>
```

### Dark Mode (Optional Enhancement)

Add to `src/index.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}
```

## Testing

### Setting Up Jest (Optional)

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### Example Test

```javascript
// src/components/ServiceCard.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ServiceCard from './ServiceCard';

describe('ServiceCard', () => {
  const mockService = {
    id: '1',
    slug: 'test-service',
    title: 'Test Service',
    description: 'Test description',
  };

  it('renders service title', () => {
    render(
      <BrowserRouter>
        <ServiceCard service={mockService} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Service')).toBeInTheDocument();
  });
});
```

## Performance Tips

### 1. Code Splitting

Routes are automatically code-split by React Router. For additional splitting:

```jsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export const MyPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HeavyComponent />
  </Suspense>
);
```

### 2. Memoization

```jsx
import { memo } from 'react';

const ServiceCard = memo(({ service }) => {
  return <div>{service.title}</div>;
});

export default ServiceCard;
```

### 3. TanStack Query Configuration

```javascript
// In App.jsx, optimize query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### 4. Image Optimization

```jsx
// Use responsive images
<img
  src="image.jpg"
  alt="Description"
  className="w-full h-auto object-cover"
  loading="lazy"
/>

// Or external image service
<img
  src="https://images.unsplash.com/photo-xxx?w=400&q=80"
  alt="Description"
  className="w-full"
/>
```

### 5. Lazy Load Routes

Routes with heavy components can be lazy loaded:

```jsx
import { lazy } from 'react';

const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));

// In routes:
<Suspense fallback={<LoadingPage />}>
  <Route path="/services" element={<Services />} />
</Suspense>
```

## Debugging Tips

### React DevTools

Install: [React DevTools Extension](https://react-devtools-tutorial.vercel.app/)

### TanStack Query DevTools

```bash
npm install @tanstack/react-query-devtools
```

```jsx
// In App.jsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### Console Logging

```javascript
// API debugging
console.log('Fetching services...', { url, params });

// Hook debugging
const { data, isLoading, error } = useServices();
console.log('Services query:', { data, isLoading, error });
```

## Common Issues & Solutions

### Issue: Routes not working
**Solution:** Ensure `Layout` component wraps your routes correctly

### Issue: Slow page loads
**Solution:** 
- Enable production build: `npm run build`
- Check TanStack Query caching
- Optimize images

### Issue: State not updating
**Solution:**
- Use React DevTools to check component state
- Ensure hooks are called at top level
- Check TanStack Query cache invalidation

## Next Steps

1. **Connect to real API** - Follow API Integration section
2. **Add more pages** - Follow Adding New Pages section
3. **Customize styling** - Follow Styling section
4. **Add tests** - Follow Testing section
5. **Deploy** - See PROJECT_DOCUMENTATION.md

---

Happy coding! 🚀
