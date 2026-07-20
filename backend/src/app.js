require("dotenv").config();
const express = require("express");
const cors    = require("cors");

const authRoutes     = require("./routes/authRoutes");
const businessRoutes = require("./routes/businessRoutes");
const serviceRoutes  = require("./routes/serviceRoutes");
const reviewRoutes   = require("./routes/reviewRoutes");
const enquiryRoutes  = require("./routes/enquiryRoutes");
const areaRoutes     = require("./routes/areaRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Middleware ── */
app.use(cors());
app.use(express.json());

/* ── Routes ── */
app.use("/api/auth",      authRoutes);
app.use("/api/business",  businessRoutes);
app.use("/api/services",  serviceRoutes);
app.use("/api/reviews",   reviewRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/areas",     areaRoutes);

/* ── Health check ── */
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

/* ── Error handling ── */
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`VoltFix API running on http://localhost:${PORT}`);
});
