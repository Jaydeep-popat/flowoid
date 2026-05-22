import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect, useState, useEffect,lazy,Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <BrowserRouter>
        <Suspense fallback={<Preloader />}>
          <ScrollToTop />
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/about"        element={<About />} />
            <Route path="/services"     element={<Services />} />
            <Route path="/projects"     element={<Projects />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact"      element={<Contact />} />
            {/* Catch-all → redirect home */}
            <Route path="*"             element={<Home />} />
          </Routes>
        </Suspense>
        </BrowserRouter>
      )}
    </>
  );
}
