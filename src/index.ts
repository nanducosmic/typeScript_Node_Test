import express from "express";
import usersRoutes from "./routes/users.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express + TypeScript is working 🚀");
});

app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
