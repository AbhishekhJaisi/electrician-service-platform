import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, Settings, Wrench, Star, MapPin, LogOut, Zap, Images, CalendarCheck,
} from "lucide-react";

const NAV = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Enquiries" },
  { to: "/admin/bookings",  icon: CalendarCheck,   label: "Bookings" },
  { to: "/admin/business",  icon: Settings,         label: "Business Info" },
  { to: "/admin/services",  icon: Wrench,           label: "Services" },
  { to: "/admin/reviews",   icon: Star,             label: "Reviews" },
  { to: "/admin/areas",     icon: MapPin,           label: "Areas" },
  { to: "/admin/gallery",   icon: Images,           label: "Gallery" },
];

export default function AdminLayout() {
  const { isLoggedIn, logout } = useAuth();
  if (!isLoggedIn) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-[#F5F6F8]">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0F1420] flex flex-col shrink-0">
        <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
          <Zap className="w-5 h-5 text-[#FFC93C]" fill="#FFC93C" />
          <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            VoltFix Admin
          </span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-[#1E56E3] text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Icon className="w-4 h-4" /> {label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-6 py-4 text-gray-400 hover:text-white text-sm border-t border-white/10 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
