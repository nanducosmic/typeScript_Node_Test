import express from "express";
import pool from "./db";
import cors from "cors";
import tasksRoutes from "./routes/tasks.routes";
import usersRoutes from "./routes/users.routes";
import dotenv from "dotenv";
dotenv.config(); // 👈 Loads .env variables

const app = express();
const PORT = process.env.PORT||3000;


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express + TypeScript is working 🚀");
});

app.use("/users", usersRoutes);

app.use("/tasks", tasksRoutes);


app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
