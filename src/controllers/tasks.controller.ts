import { Request, Response } from "express";
import pool from "../db";

// CREATE
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const result = await pool.query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Failed to create task" });
  }
};

// READ
export const getTasks = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// UPDATE
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET title=$1, description=$2, completed=$3
       WHERE id=$4 RETURNING *`,
      [title, description, completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// DELETE
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM tasks WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
