import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
} from "../api/tasks";
import { AxiosError } from "axios";
import type { CreateTaskPayload, Task, UpdateTaskPayload } from "../types";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Task | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        const axiosErr = err as AxiosError<{ message: string }>;
        setError(axiosErr.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description || "").toLowerCase().includes(q)
    );
  }, [tasks, query]);

  const handleAdd = async (payload: CreateTaskPayload | UpdateTaskPayload) => {
    const created = await createTask(payload as CreateTaskPayload);
    setTasks((prev) => [created, ...prev]);
  };

  const handleSaveEdit = async (
    payload: CreateTaskPayload | UpdateTaskPayload
  ) => {
    if (!editing) return;
    const updated = await updateTask(editing.id, payload as UpdateTaskPayload);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setEditing(null);
  };

  const handleToggle = async (id: number, next: boolean) => {
    const updated = await toggleTask(id, next);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const doLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome{user ? `, ${user.fullName}` : ""}
          </h1>
          <p className="text-sm text-zinc-600">Manage your tasks below.</p>
        </div>
        <button onClick={doLogout} className="btn-secondary">
          Logout
        </button>
      </div>

      <div className="card p-4">
        <h2 className="font-medium mb-3">
          {editing ? "Edit task" : "Add a new task"}
        </h2>
        <TaskForm
          initial={editing}
          onSubmit={editing ? handleSaveEdit : handleAdd}
          onCancel={() => setEditing(null)}
        />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-medium">Your tasks</h2>
        <input
          className="input w-64"
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-zinc-600">No tasks yet.</p>
      ) : (
        <div className="grid gap-3">
          {filtered.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
