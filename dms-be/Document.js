const mongoose = require("mongoose");

const VersionSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  updatedAt: { type: Date, default: Date.now },
  updatedBy: String,
});

const DocumentSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  uploadedAt: { type: Date, default: Date.now },
  versions: [VersionSchema],
});

module.exports = mongoose.model("Document", DocumentSchema);
