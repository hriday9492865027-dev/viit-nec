import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
