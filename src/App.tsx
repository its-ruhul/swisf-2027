import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/layout/Footer';
import MobileSidebar from './components/layout/MobileSidebar';
import Navbar from './components/layout/Navbar';
import Home from './routes/Home';

// Secondary pages load on demand to keep the first visit fast.
const routeImports = {
  experience: () => import('./routes/Experience'),
  sunray: () => import('./routes/ProjectSunray'),
  sponsors: () => import('./routes/Sponsors'),
  team: () => import('./routes/Team'),
  notFound: () => import('./routes/NotFound'),
};
const Experience = lazy(routeImports.experience);
const ProjectSunray = lazy(routeImports.sunray);
const Sponsors = lazy(routeImports.sponsors);
const Team = lazy(routeImports.team);
const NotFound = lazy(routeImports.notFound);

/** Once the first page is idle, fetch the other route chunks so navigation is instant. */
function usePrefetchRoutes() {
  useEffect(() => {
    const run = () => {
      Object.values(routeImports).forEach((load) => {
        load().catch(() => {});
      });
    };
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(run, 2500);
    return () => clearTimeout(id);
  }, []);
}

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
  usePrefetchRoutes();

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
