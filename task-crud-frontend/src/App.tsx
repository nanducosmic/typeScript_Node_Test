import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "./api/tasks";

type Task = {
  id: number;
  title: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await createTask(title);
    setTitle("");
    loadTasks();
  };

  const removeTask = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  const startEdit = (task: Task) => {
    setEditId(task.id);
    setEditTitle(task.title);
  };

  const saveEdit = async () => {
    if (editId === null) return;
    await updateTask(editId, editTitle);
    setEditId(null);
    setEditTitle("");
    loadTasks();
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="add-task">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editId === task.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => removeTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
