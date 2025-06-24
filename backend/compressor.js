const fs = require("fs");

// ========================
// Huffman Coding
// ========================

// Build frequency map
function getFrequencyMap(data) {
  const freq = {};
  for (const char of data) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}

// Build Huffman Tree
function buildTree(freq) {
  const nodes = Object.entries(freq).map(([char, freq]) => ({ char, freq }));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const left = nodes.shift();
    const right = nodes.shift();
    nodes.push({
      left,
      right,
      freq: left.freq + right.freq,
    });
  }

  return nodes[0];
}

// Generate code map
function generateCodes(node, prefix = "", map = {}) {
  if (node.char) {
    map[node.char] = prefix;
  } else {
    generateCodes(node.left, prefix + "0", map);
    generateCodes(node.right, prefix + "1", map);
  }
  return map;
}

// Encode Huffman
function huffmanCompress(inputFile, outputFile) {
  const data = fs.readFileSync(inputFile, "utf-8");
  const freq = getFrequencyMap(data);
  const tree = buildTree(freq);
  const codes = generateCodes(tree);

  // Encode data
  let encoded = "";
  for (const char of data) {
    encoded += codes[char];
  }

  // Save tree & encoded string
  fs.writeFileSync(outputFile, JSON.stringify({ freq, encoded }));
}

// Decode Huffman
function huffmanDecompress(inputFile, outputFile) {
  const { freq, encoded } = JSON.parse(fs.readFileSync(inputFile, "utf-8"));
  const tree = buildTree(freq);

  let result = "";
  let node = tree;
  for (const bit of encoded) {
    node = bit === "0" ? node.left : node.right;
    if (node.char) {
      result += node.char;
      node = tree;
    }
  }

  fs.writeFileSync(outputFile, result, "utf-8");
}

// ========================
// Run-Length Encoding (RLE)
// ========================

function rleCompress(inputFile, outputFile) {
  const data = fs.readFileSync(inputFile, "utf-8");
  let encoded = "";
  let count = 1;
  for (let i = 1; i <= data.length; i++) {
    if (data[i] === data[i - 1]) {
      count++;
    } else {
      encoded += data[i - 1] + count;
      count = 1;
    }
  }
  fs.writeFileSync(outputFile, encoded, "utf-8");
}

function rleDecompress(inputFile, outputFile) {
  const data = fs.readFileSync(inputFile, "utf-8");
  let decoded = "";
  for (let i = 0; i < data.length; i += 2) {
    const char = data[i];
    const count = parseInt(data[i + 1], 10);
    decoded += char.repeat(count);
  }
  fs.writeFileSync(outputFile, decoded, "utf-8");
}

// ========================
// LZ77 (simplified)
// ========================

function lz77Compress(inputFile, outputFile) {
  const data = fs.readFileSync(inputFile, "utf-8");
  const windowSize = 20;
  const encoded = [];
  let cursor = 0;

  while (cursor < data.length) {
    let matchLength = 0;
    let matchDistance = 0;
    const end = Math.min(cursor + windowSize, data.length);

    for (let i = Math.max(0, cursor - windowSize); i < cursor; i++) {
      let length = 0;
      while (
        length < windowSize &&
        data[i + length] === data[cursor + length]
      ) {
        length++;
      }
      if (length > matchLength) {
        matchLength = length;
        matchDistance = cursor - i;
      }
    }

    const nextChar = data[cursor + matchLength] || "";
    encoded.push([matchDistance, matchLength, nextChar]);
    cursor += matchLength + 1;
  }

  fs.writeFileSync(outputFile, JSON.stringify(encoded));
}

function lz77Decompress(inputFile, outputFile) {
  const encoded = JSON.parse(fs.readFileSync(inputFile, "utf-8"));
  let result = "";

  for (const [distance, length, nextChar] of encoded) {
    if (distance === 0) {
      result += nextChar;
    } else {
      const start = result.length - distance;
      const match = result.slice(start, start + length);
      result += match + nextChar;
    }
  }

  fs.writeFileSync(outputFile, result, "utf-8");
}

// ========================
// Exports
// ========================

module.exports = {
  huffmanCompress,
  huffmanDecompress,
  rleCompress,
  rleDecompress,
  lz77Compress,
  lz77Decompress,
};
