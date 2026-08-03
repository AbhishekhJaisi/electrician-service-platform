import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

// Public site
import PublicSite from "./PublicSite";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import WorkGallery from "./pages/WorkGallery";
import Reviews from "./pages/Reviews";
import ServiceAreas from "./pages/ServiceAreas";
import Booking from "./pages/Booking";

import Portal      from "./pages/Portal";
import MyBookings  from "./pages/MyBookings";
import Receipt     from "./pages/Receipt";
import LoginPage     from "./admin/LoginPage";
import AdminLayout   from "./admin/AdminLayout";
import DashboardPage from "./admin/DashboardPage";
import BusinessPage  from "./admin/BusinessPage";
import ServicesPage  from "./admin/ServicesPage";
import ReviewsPage   from "./admin/ReviewsPage";
import AreasPage     from "./admin/AreasPage";
import GalleryPage   from "./admin/GalleryPage";
import BookingsAdmin from "./admin/Booking";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
        <Routes>
          <Route element={<PublicSite />}>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="about" element={<About />} />
              <Route path="work" element={<WorkGallery />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="areas" element={<ServiceAreas />} />
              <Route path="booking" element={<Booking />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>
          {/* Customer portal */}
          <Route path="/portal"                        element={<Portal />} />
          <Route path="/portal/bookings"               element={<MyBookings />} />
          <Route path="/portal/bookings/:id/receipt"   element={<Receipt />} />

          {/* Admin */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="services"  element={<ServicesPage />} />
            <Route path="business"  element={<BusinessPage />} />
            <Route path="reviews"   element={<ReviewsPage />} />
            <Route path="areas"     element={<AreasPage />} />
            <Route path="gallery"   element={<GalleryPage />} />
            <Route path="bookings"  element={<BookingsAdmin />} />
          </Route>
        </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
