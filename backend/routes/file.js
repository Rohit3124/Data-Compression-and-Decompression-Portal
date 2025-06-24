const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  huffmanCompress,
  huffmanDecompress,
  rleCompress,
  rleDecompress,
  lz77Compress,
  lz77Decompress,
} = require("../compressor");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/process", upload.single("file"), async (req, res) => {
  const { operation, algorithm } = req.body;
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).send("No file uploaded");
  }

  const inputFilePath = uploadedFile.path;
  const outputFilePath = `${uploadedFile.path}_output`;

  try {
    if (algorithm === "huffman") {
      operation === "compress"
        ? huffmanCompress(inputFilePath, outputFilePath)
        : huffmanDecompress(inputFilePath, outputFilePath);
    } else if (algorithm === "rle") {
      operation === "compress"
        ? rleCompress(inputFilePath, outputFilePath)
        : rleDecompress(inputFilePath, outputFilePath);
    } else if (algorithm === "lz77") {
      operation === "compress"
        ? lz77Compress(inputFilePath, outputFilePath)
        : lz77Decompress(inputFilePath, outputFilePath);
    } else {
      throw new Error("Invalid algorithm");
    }

    res.download(outputFilePath, (err) => {
      fs.unlinkSync(inputFilePath);
      fs.unlinkSync(outputFilePath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing file");
  }
});

module.exports = router;
