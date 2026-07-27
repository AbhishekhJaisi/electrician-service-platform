import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, Settings, Wrench, Star, MapPin, LogOut, Zap, Images, Menu,
} from "lucide-react";
import { Plug } from 'lucide-react';
import { useState } from "react";


const NAV = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Enquiries" },
  { to: "/admin/business", icon: Settings, label: "Business Info" },
  { to: "/admin/services", icon: Wrench, label: "Services" },
  { to: "/admin/reviews", icon: Star, label: "Reviews" },
  { to: "/admin/areas", icon: MapPin, label: "Areas" },
  { to: "/admin/gallery", icon: Images, label: "Gallery" },
  { to: "/admin/bookings", icon: Zap, label: "Bookings" },
];

export default function AdminLayout() {
  const { isLoggedIn, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  if (!isLoggedIn) return <Navigate to="/admin/login" replace />;

  return (
    <div className="h-screen flex overflow-hidden bg-[#F5F6F8]">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-56"} bg-[#0F1420] flex flex-col shrink-0 h-full overflow-y-auto transition-all duration-200`}>
        <div className="flex items-center justify-between px-3 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Plug className="w-5 h-5 text-[#FFC93C]" strokeWidth={2.5} />
            {!collapsed && (
              <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Admin
              </span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white p-1"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                  ? "bg-[#1E56E3] text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-4 text-gray-400 hover:text-white text-sm border-t border-white/10 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
