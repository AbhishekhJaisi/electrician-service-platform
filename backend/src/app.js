require("dotenv").config();
const express = require("express");
const cors    = require("cors");

const prisma = require("./lib/prisma");

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

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`🚀 VoltFix API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database.");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();