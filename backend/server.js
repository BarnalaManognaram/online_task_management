const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const projectRoutes = require("./routes/projectRoutes");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());


connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});