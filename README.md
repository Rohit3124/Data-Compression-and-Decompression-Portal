# File Compression and Decompression Web Application

## Description

This web application enables users to upload files and apply various data compression algorithms—including **Huffman Coding**, **Run-Length Encoding (RLE)**, and **LZ77**—to reduce file size efficiently. Users can also decompress previously compressed files using the corresponding algorithms.

The application offers a simple and interactive interface where users can:

- Upload files for compression
- Select a preferred compression algorithm
- View and compare compression ratios to evaluate algorithm efficiency
- Download the compressed or decompressed files

By supporting multiple algorithms and showing comparative results, the system provides educational insight into the performance of different compression techniques.

---

## 🚀 Features

- **Universal File Support**  
  Compress any file type — text, images, documents, or binary files — with ease.

- **Detailed Analytics**  
  Get comprehensive statistics including compression ratios, file sizes, and processing times.

- **Easy Download**  
  Download your compressed or decompressed files instantly with a single click.

- **Secure Processing**  
  All file processing happens locally in your browser — your data never leaves your device.

- **Real-time Progress**  
  Monitor compression progress with live updates and processing time estimates.

- **Educational Content**  
  Learn about compression algorithms with detailed explanations and use cases.

---

## Tech Stack

**Frontend:**

- React.js
- Tailwind CSS
- ShadCN UI
- Vite

**Backend:**

- Node.js
- Express.js

**Compression Logic:**

- Custom implementations of:
  - Huffman Coding
  - Run-Length Encoding (RLE)
  - LZ77

**Others:**

- Multer (for file uploads)
- fs module (for server-side file operations)

## Setup Guide (Run Locally)

### Prerequisites

Make sure the following are installed:

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or with a cloud URI)
- **Git**

---

### Installation Steps

1. Clone the Repository
   git clone https://github.com/Rohit3124/Data-Compression-and-Decompression-Portal.git
   cd Data-Compression-and-Decompression-Portal

2. Install Dependencie
   cd backend
   npm install
   cd ../frontend
   npm install

3. Setup Environment Variables
   Create a .env file in the root directory and add the following environment variables:
   PORT=3000
   MONGODB_URL=<your_mongodb_connection_string>
   JWT_SECRET_KEY=<your_secret_key>

4. Run the Frontend
   From the root directory try running
   cd frontend
   npm run dev

5. Run the Backend
   From the root directory try running
   cd backend
   nodemon index.js

The server should start and display:
Connected to MongoDB...
Listening on port 3000...

<pre> <code> ```text Project Structure |--routes/ | |--user.route.js | |--auth.route.js | |--test.route.js | |--question.route.js | |--result.route.js |--index.js |--package.json |--.env ``` </code> </pre>

Basic API Endpoints
• POST /api/user/signup -Register a new user
• POST /api/auth/signin -Login user
• POST /api/file/process -To compress/decompress file

Notes
• Ensure the .env file is correctly set up before running the application.
• Modify PORT in .env if needed.
• If facing MongoDB connection issues, verify MONGODB_URL is correctly set.
