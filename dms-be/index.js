const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const Document = require("./Document");
const fs = require("fs");

// Connect MongoDB
mongoose
  .connect("mongodb://localhost:27017/dms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Upload new document
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });

  const newDoc = new Document({
    filename: req.file.filename,
    originalname: req.file.originalname,
  });

  await newDoc.save();
  res.json({ success: true, message: "Document uploaded successfully" });
});

// Update (edit/replace) document
app.put("/documents/:id", upload.single("file"), async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) return res.status(404).send("Document not found");

  doc.versions.push({
    filename: doc.filename,
    originalname: doc.originalname,
    updatedBy: req.body.updatedBy || "Unknown",
    updatedAt: new Date(),
  });

  if (req.file) {
    doc.filename = req.file.filename;
    doc.originalname = req.file.originalname;
  }

  await doc.save();
  res.json({ success: true, message: "Document updated successfully" });
});

// Delete document
app.delete("/documents/:id", async (req, res) => {
  const doc = await Document.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).send("Document not found");
  res.json({ success: true, message: "Document deleted successfully" });
});

// Get all documents
app.get("/documents", async (req, res) => {
  const docs = await Document.find().sort({ uploadedAt: -1 });
  res.json(docs);
});

// Download document with original name
app.get("/documents/download/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).send("Document not found");

    const filePath = path.join(__dirname, "uploads", doc.filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File missing on server");
    }

    res.download(filePath, doc.originalname);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("Server error during download");
  }
});

// Start server
app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
