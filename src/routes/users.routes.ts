import { Router, Request, Response } from "express";
import { User } from "../types/user";

const router = Router();

let users: User[] = [];

// GET all users
router.get("/", (req: Request, res: Response) => {
  res.json({ users });
});

// POST add user
router.post("/", (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      error: "Name is required and must be a string"
    });
  }

  const newUser: User = {
    id: users.length + 1,
    name
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    user: newUser
  });
});

// DELETE user
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Invalid user id"
    });
  }

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  users.splice(index, 1);

  res.json({
    message: "User deleted successfully"
  });
});

export default router;
