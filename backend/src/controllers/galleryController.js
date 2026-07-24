const path = require("path");
const fs   = require("fs");
const GalleryModel = require("../models/galleryModel");

const GalleryController = {
  // Public — list all images
  async getAll(req, res, next) {
    try {
      const images = await GalleryModel.findAll();
      res.json({ success: true, data: images });
    } catch (err) {
      next(err);
    }
  },

  // Admin — upload a new image
  async upload(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const caption = req.body.caption || "";

      // Count existing to set order
      const all   = await GalleryModel.findAll();
      const order = all.length;

      const image = await GalleryModel.create({
        filename: req.file.filename,
        caption,
        order,
      });

      res.status(201).json({ success: true, data: image });
    } catch (err) {
      next(err);
    }
  },

  // Admin — delete an image
  async remove(req, res, next) {
    try {
      const image = await GalleryModel.delete(req.params.id);

      // Remove physical file
      const filepath = path.join(__dirname, "../../uploads/gallery", image.filename);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }

      res.json({ success: true });
    } catch (err) {
      if (err.code === "P2025") {
        return res.status(404).json({ error: "Image not found" });
      }
      next(err);
    }
  },
};

module.exports = GalleryController;
