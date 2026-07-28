import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { api } from "./lib/api";

import { BUSINESS as FB, SERVICES as FS, REVIEWS as FR, AREAS as FA } from "./data/constants";

import { createContext, useContext } from "react";
export const SiteDataContext = createContext(null);
export const useSiteData = () => useContext(SiteDataContext);

const POLL_INTERVAL = 30000;

export default function PublicSite() {
  const [business, setBusiness] = useState(FB);
  const [services, setServices] = useState(FS);
  const [reviews,  setReviews]  = useState(FR);
  const [areas,    setAreas]    = useState(FA);
  const [gallery,  setGallery]  = useState([]);

  const fetchData = () => {
    Promise.allSettled([
      api.getBusiness(),
      api.getServices(),
      api.getReviews(),
      api.getAreas(),
      api.getGallery(),
    ]).then(([b, s, r, a, g]) => {
      if (b.status === "fulfilled" && b.value.data) setBusiness((prev) => ({ ...prev, ...b.value.data }));
      if (s.status === "fulfilled" && s.value.data?.length > 0) setServices(s.value.data);
      if (r.status === "fulfilled" && r.value.data?.length > 0) setReviews(r.value.data);
      if (a.status === "fulfilled" && a.value.data?.length > 0) setAreas(a.value.data.map((x) => x.name));
      if (g.status === "fulfilled" && g.value.data) setGallery(g.value.data);
    });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = `${business.name} - Licensed Electrician`;
  }, [business.name]);

  const refreshReviews = async () => {
    try {
      const r = await api.getReviews();
      if (r.data?.length > 0) setReviews(r.data);
    } catch {}
  };

  return (
    <SiteDataContext.Provider value={{ business, services, reviews, areas, gallery, refreshReviews }}>
      <Outlet />
    </SiteDataContext.Provider>
  );
}
