import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Public site
import PublicSite from "./PublicSite";

// Admin
import LoginPage     from "./admin/LoginPage";
import AdminLayout   from "./admin/AdminLayout";
import DashboardPage from "./admin/DashboardPage";
import BusinessPage  from "./admin/BusinessPage";
import ServicesPage  from "./admin/ServicesPage";
import ReviewsPage   from "./admin/ReviewsPage";
import AreasPage     from "./admin/AreasPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public site */}
          <Route path="/" element={<PublicSite />} />

          {/* Admin */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="business"  element={<BusinessPage />} />
            <Route path="services"  element={<ServicesPage />} />
            <Route path="reviews"   element={<ReviewsPage />} />
            <Route path="areas"     element={<AreasPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
