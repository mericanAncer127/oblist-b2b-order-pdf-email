"use strict";

const express = require("express");

const proxyRoutes = require("./routes/invoice");

// Constants
const PORT = 3000;
const HOST = "0.0.0.0";

async function start() {
  // Seed the database
  // App
  const app = express();

  // Health check
  app.get("/health", (req, res) => {
    res.send("Hello World");
  });

  // Write your endpoints here

  // Register routes
  app.use("/api/invoice", proxyRoutes); // User-Group routes

  app.listen(PORT, HOST);
  console.log(`Server is running on http://${HOST}:${PORT}`);
}

start();
