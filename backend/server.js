const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/error-middleware");

const port = process.env.PORT || 5000;
const app = express();
// Middleware - Accessing Request Body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Middleware - Error Handling
app.use(errorHandler);
// Routing
app.use("/api/goals", require("./routes/goal-routes"));
// Receive incoming requests on a port
app.listen(port, () => console.log(`server started on port ${port}`));
