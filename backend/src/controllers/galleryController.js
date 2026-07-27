const cloudinary   = require("../lib/cloudinary");
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

      // multer-storage-cloudinary puts the public URL in req.file.path
      // and the Cloudinary public_id in req.file.filename
      const url      = req.file.path;       // secure_url
      const publicId = req.file.filename;   // public_id (used for deletion)

      // Count existing to set order
      const all   = await GalleryModel.findAll();
      const order = all.length;

      const image = await GalleryModel.create({
        filename: publicId, // store public_id so we can delete from Cloudinary later
        url,
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

      // Delete from Cloudinary using the stored public_id
      if (image.filename) {
        await cloudinary.uploader.destroy(image.filename);
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
