import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import TeamPage from './pages/TeamPage';
import TeamMemoriesPage from './pages/TeamMemoriesPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import AdminPage from './pages/AdminPage';

/* Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

/* Global Secret Shortcut: Ctrl + Shift + A (or Cmd + Shift + A on Mac) */
function GlobalAdminShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalAdminShortcut />
      <Routes>
        <Route path="/"              element={<HomePage />}         />
        <Route path="/about"         element={<AboutPage />}        />
        <Route path="/events"        element={<EventsPage />}       />
        <Route path="/gallery"       element={<GalleryPage />}      />
        <Route path="/team"          element={<TeamPage />}         />
        <Route path="/team/memories" element={<TeamMemoriesPage />} />
        <Route path="/contact"       element={<ContactPage />}      />
        <Route path="/admin"         element={<AdminPage />}        />
      </Routes>
    </BrowserRouter>
  );
}

