import { useEffect, useState } from "react";
import { api } from "./lib/api";

// Static data fallbacks (used while loading OR if API not connected yet)
import { BUSINESS as FB, SERVICES as FS, REVIEWS as FR, AREAS as FA } from "./data/constants";

import Nav              from "./components/Nav";
import Hero             from "./components/Hero";
import About            from "./components/About";
import WireDivider      from "./components/WireDivider";
import WhyChooseUs      from "./components/WhyChooseUs";
import Services         from "./components/Services";
import PreviousWork     from "./components/PreviousWork";
import Reviews          from "./components/Reviews";
import ServiceAreas     from "./components/ServiceAreas";
import Contact          from "./components/Contact";
import Footer           from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

// Context so child components can read live data without prop drilling
import { createContext, useContext } from "react";
export const SiteDataContext = createContext(null);
export const useSiteData = () => useContext(SiteDataContext);

export default function PublicSite() {
  const [business, setBusiness] = useState(FB);
  const [services, setServices] = useState(FS);
  const [reviews,  setReviews]  = useState(FR);
  const [areas,    setAreas]    = useState(FA);

  useEffect(() => {
    // Fetch live data; silently fall back to constants if API is unreachable
    Promise.allSettled([
      api.getBusiness(),
      api.getServices(),
      api.getReviews(),
      api.getAreas(),
    ]).then(([b, s, r, a]) => {
      if (b.status === "fulfilled" && b.value.data) setBusiness(b.value.data);
      if (s.status === "fulfilled" && s.value.data) setServices(s.value.data);
      if (r.status === "fulfilled" && r.value.data) setReviews(r.value.data);
      if (a.status === "fulfilled" && a.value.data) setAreas(a.value.data.map((x) => x.name));
    });
  }, []);

  useEffect(() => {
    document.title = `${business.name} — Licensed Electrician`;
  }, [business.name]);

  return (
    <SiteDataContext.Provider value={{ business, services, reviews, areas }}>
      <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Nav />
        <Hero />
        <About />
        <WireDivider />
        <WhyChooseUs />
        <Services />
        <PreviousWork />
        <Reviews />
        <ServiceAreas />
        <Contact />
        <Footer />
        <FloatingWhatsApp />
      </div>
    </SiteDataContext.Provider>
  );
}
