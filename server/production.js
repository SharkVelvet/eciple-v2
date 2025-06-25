import express from "express";
import { createServer } from "http";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from dist/public
const distPath = resolve(process.cwd(), "dist", "public");

if (!fs.existsSync(distPath)) {
  console.error(`Build directory not found: ${distPath}`);
  console.error(`Current working directory: ${process.cwd()}`);
  console.error(`Looking for: ${distPath}`);
  
  // Try alternative paths
  const altPath1 = resolve(__dirname, "public");
  const altPath2 = resolve(process.cwd(), "public");
  
  console.error(`Alternative path 1: ${altPath1} exists: ${fs.existsSync(altPath1)}`);
  console.error(`Alternative path 2: ${altPath2} exists: ${fs.existsSync(altPath2)}`);
  
  process.exit(1);
}

app.use(express.static(distPath));

// Fall through to index.html for client-side routing
app.use("*", (_req, res) => {
  res.sendFile(resolve(distPath, "index.html"));
});

const port = process.env.PORT || 5000;
const server = createServer(app);

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
  console.log(`Serving static files from: ${distPath}`);
});