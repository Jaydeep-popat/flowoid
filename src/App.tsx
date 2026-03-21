import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import './styles/global.css';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
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
  );
}
