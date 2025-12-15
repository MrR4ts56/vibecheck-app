import { useEffect, useState } from 'react';
import App from './App';
import { AdminPanel } from './components/Admin/AdminPanel';

/**
 * Simple Router ที่ใช้ window.location.pathname
 */
export function Router() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    // Listen for popstate (browser back/forward)
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    // Override link clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link && link.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const url = new URL(link.href);
        window.history.pushState({}, '', url.pathname);
        setPathname(url.pathname);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Route matching
  if (pathname === '/admin') {
    return <AdminPanel />;
  }

  // Default route (home)
  return <App />;
}
