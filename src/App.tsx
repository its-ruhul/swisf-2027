import { lazy, Suspense, useCallback, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/layout/Footer';
import MobileSidebar from './components/layout/MobileSidebar';
import Navbar from './components/layout/Navbar';
import Home from './routes/Home';

// Secondary pages load on demand to keep the first visit fast.
const Experience = lazy(() => import('./routes/Experience'));
const ProjectSunray = lazy(() => import('./routes/ProjectSunray'));
const Sponsors = lazy(() => import('./routes/Sponsors'));
const Team = lazy(() => import('./routes/Team'));
const NotFound = lazy(() => import('./routes/NotFound'));

function Lazy({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh]" aria-busy="true">
          <span className="sr-only">Loading…</span>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export default function App() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <Navbar menuOpen={menuOpen} onOpenMenu={openMenu} menuButtonRef={menuButtonRef} />
      <MobileSidebar open={menuOpen} onClose={closeMenu} returnFocusRef={menuButtonRef} />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Lazy><Experience /></Lazy>} />
          <Route path="/project-sunray" element={<Lazy><ProjectSunray /></Lazy>} />
          <Route path="/sponsors" element={<Lazy><Sponsors /></Lazy>} />
          <Route path="/team" element={<Lazy><Team /></Lazy>} />
          <Route path="/404" element={<Lazy><NotFound /></Lazy>} />
          <Route path="*" element={<Lazy><NotFound /></Lazy>} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </MotionConfig>
  );
}
