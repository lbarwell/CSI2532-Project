// Imports
const express = require("express");
const cors = require("cors");
const pool = require("./db");

// Port to listen on
const port = 5000;

// App setup
const app = express();
app.use(cors());
app.use(express.json());

// ROUTES //



// Listen for requests
app.listen(port, () => {
    console.log("Server has started on port", port)
})