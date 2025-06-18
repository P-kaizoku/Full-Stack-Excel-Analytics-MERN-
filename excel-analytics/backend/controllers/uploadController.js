const Upload = require("../models/Upload");
const XLSX = require("xlsx");
const fs = require("fs");

exports.uploadExcel = async (req, res) => {
  try {
    console.log("📥 Upload request received");
    console.log("File:", req.file);
    console.log("Body:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { xAxis, yAxis, chartType } = req.body;
    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    let rawData = XLSX.utils.sheet_to_json(sheet);
    let jsonData = rawData.map((row) => {
      const cleanedRow = {};
      for (let key in row) {
        cleanedRow[key.trim()] = row[key];
      }
      return cleanedRow;
    });

    const headers = Object.keys(jsonData[0] || {});

    console.log("🧹 Cleaned JSON data preview:", jsonData[0]);

    const upload = new Upload({
      userId: req.user.id,
      fileName: req.file.originalname,
      xAxis,
      yAxis,
      chartType,
    });

    await upload.save();
    fs.unlinkSync(req.file.path); // Clean up the temp file

    res.json({ message: "Upload successful", data: jsonData, headers });
  } catch (error) {
    console.error("❌ Upload failed:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

exports.getUserUploads = async (req, res) => {
  const uploads = await Upload.find({ userId: req.user.id });
  res.json(uploads);
};

exports.getStats = async (req, res) => {
  const uploads = await Upload.find();
  res.json({ totalUploads: uploads.length });
};
