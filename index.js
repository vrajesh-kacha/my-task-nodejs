import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import { initializeDatabase } from "./config/sql.js";
import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();

const app = express();
app.use(cors({
    "origin":"http://localhost:3000",
    "credentials": true,
    allowedHeaders: ["content-type","Authorization"]
}))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});


initializeDatabase();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/employee",employeeRoutes );