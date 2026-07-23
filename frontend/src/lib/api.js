const BASE = "/api";

function getToken() {
  return localStorage.getItem("vf_token");
}

async function request(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...options.headers };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE}${path}`, { ...options, headers });
  } catch {
    // Network error — backend not running
    throw new Error("Cannot reach the server. Make sure the backend is running.");
  }

  // Safe JSON parse — some responses (204, empty body) have no content
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    // Server returned non-JSON (HTML error page, etc.)
    throw new Error(`Server error (${res.status}) — check that the backend is running.`);
  }

  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}

export const api = {
  // Auth
  login:          (body)     => request("/auth/login",    { method: "POST", body: JSON.stringify(body) }),
  changePassword: (body)     => request("/auth/password", { method: "PUT",  body: JSON.stringify(body) }),

  // Public
  getBusiness:    ()         => request("/business"),
  getServices:    ()         => request("/services"),
  getReviews:     ()         => request("/reviews"),
  getAreas:       ()         => request("/areas"),
  submitEnquiry:  (body)     => request("/enquiries", { method: "POST", body: JSON.stringify(body) }),

  // Admin — business
  updateBusiness: (body)     => request("/business",      { method: "PUT",    body: JSON.stringify(body) }),

  // Admin — services
  createService:  (body)     => request("/services",      { method: "POST",   body: JSON.stringify(body) }),
  updateService:  (id, body) => request(`/services/${id}`,{ method: "PUT",    body: JSON.stringify(body) }),
  deleteService:  (id)       => request(`/services/${id}`,{ method: "DELETE" }),

  // Admin — reviews
  getReviewsAll:    ()       => request("/reviews/admin/all"),
  createReview:   (body)     => request("/reviews",       { method: "POST",   body: JSON.stringify(body) }),
  submitReview:   (body)     => request("/reviews/public", { method: "POST",   body: JSON.stringify(body) }),
  updateReview:   (id, body) => request(`/reviews/${id}`, { method: "PUT",    body: JSON.stringify(body) }),
  deleteReview:   (id)       => request(`/reviews/${id}`, { method: "DELETE" }),
  toggleReviewActive: (id)  => request(`/reviews/${id}/toggle`, { method: "PATCH" }),

  // Admin — areas
  createArea:     (body)     => request("/areas",         { method: "POST",   body: JSON.stringify(body) }),
  updateArea:     (id, body) => request(`/areas/${id}`,   { method: "PUT",    body: JSON.stringify(body) }),
  deleteArea:     (id)       => request(`/areas/${id}`,   { method: "DELETE" }),

  // Admin — enquiries
  getEnquiries:   ()         => request("/enquiries"),
  updateEnquiryStatus: (id, status) =>
    request(`/enquiries/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
};
