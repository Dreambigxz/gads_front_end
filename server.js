const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const distPath = path.join(__dirname, "dist", "g-ads", "browser");

// 1. Proxy /api requests to your remote backend
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://web-production-64af5.up.railway.app/api",
    changeOrigin: true,
    secure: true,
  })
);

// 2. Serve static Angular frontend files
app.use(express.static(distPath));

// 3. Fallback to index.html for Angular SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
