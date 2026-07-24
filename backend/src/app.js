require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const path    = require("path");

const prisma = require("./lib/prisma");

const authRoutes     = require("./routes/authRoutes");
const businessRoutes = require("./routes/businessRoutes");
const serviceRoutes  = require("./routes/serviceRoutes");
const reviewRoutes   = require("./routes/reviewRoutes");
const enquiryRoutes  = require("./routes/enquiryRoutes");
const areaRoutes     = require("./routes/areaRoutes");
const bookingRoutes  = require("./routes/bookingRoutes");
const galleryRoutes  = require("./routes/galleryRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Middleware ── */
app.use(cors());
app.use(express.json());

// Serve uploaded gallery images as static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* ── Routes ── */
app.use("/api/auth",      authRoutes);
app.use("/api/business",  businessRoutes);
app.use("/api/services",  serviceRoutes);
app.use("/api/reviews",   reviewRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/areas",     areaRoutes);
app.use("/api", bookingRoutes);
app.use("/api", galleryRoutes);

/* ── Health check ── */
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

/* ── Error handling ── */
app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully.");

    const server = app.listen(PORT, () => {
      console.log(`🚀 VoltFix API running at http://localhost:${PORT}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is busy. Kill it with: npx kill-port ${PORT}`);
        process.exit(1);
      }
      throw err;
    });

    // Graceful shutdown — releases the port cleanly so nodemon can restart
    const shutdown = () => {
      server.close(() => {
        prisma.$disconnect();
        process.exit(0);
      });
    };
    process.on("SIGTERM", shutdown);
    process.on("SIGINT",  shutdown);

  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
    process.exit(1);
  }
}

startServer();