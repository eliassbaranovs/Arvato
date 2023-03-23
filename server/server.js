//Dependencies
const express = require("express");
const path = require("path");
require("dotenv").config();
const errorHandler = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 3500;
const colors = require("colors");
const connectDB = require("./config/db");
const cors = require("cors");
// Connect to database
connectDB();

//Initialize express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Admin routes

//Resource routes
app.use("/api/resources", require("./routes/resourceRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// Server frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Please set mode to production");
  });
}

//Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(colors.yellow.underline(`Server is running on port ${PORT}`));
});
