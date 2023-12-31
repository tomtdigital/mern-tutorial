const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/error-middleware");
const { connectDB } = require("./config/db");

connectDB();

const port = process.env.PORT || 5000;
const app = express();
// Middleware - Accessing Request Body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Routing
app.use("/api/goals", require("./routes/goal-routes"));
app.use("/api/users", require("./routes/user-routes"));
// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}
// Middleware - Error Handling
app.use(errorHandler);
// Receive incoming requests on a port
app.listen(port, () => console.log(`server started on port ${port}`));
