import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';

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
        </BrowserRouter>
      )}
    </>
  );
}
