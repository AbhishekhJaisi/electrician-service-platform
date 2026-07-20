const bcrypt = require("bcryptjs");
const jwt    = require("jsonwebtoken");
const prisma = require("../lib/prisma");

/**
 * POST /api/auth/login
 */
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  return res.json({ success: true, token });
};

/**
 * PUT /api/auth/password  (protected)
 * Body: { currentPassword, newPassword }
 */
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: "Both current and new password required" });
  }
  if (newPassword.length < 8) {
    return res.status(422).json({ success: false, message: "New password must be at least 8 characters" });
  }

  const admin = await prisma.admin.findUnique({ where: { id: req.admin.id } });
  const match = await bcrypt.compare(currentPassword, admin.password);
  if (!match) {
    return res.status(401).json({ success: false, message: "Current password is incorrect" });
  }

  const hash = await bcrypt.hash(newPassword, 12);
  await prisma.admin.update({ where: { id: req.admin.id }, data: { password: hash } });

  return res.json({ success: true, message: "Password updated" });
};

module.exports = { login, changePassword };
