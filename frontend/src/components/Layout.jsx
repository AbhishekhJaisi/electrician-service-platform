import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="min-h-screen w-full bg-white font-body">
      <Nav />
      <div className="h-[60px] md:h-[64px]" aria-hidden="true" />
      <Outlet />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
