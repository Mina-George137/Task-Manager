import { useEffect, useState } from "react";
import type { CreateTaskPayload, Task, UpdateTaskPayload } from "../types";
import { AxiosError } from 'axios';

type Props = {
  initial?: Task | null;
  onSubmit: (payload: CreateTaskPayload | UpdateTaskPayload) => Promise<void>;
  onCancel?: () => void;
};

export default function TaskForm({ initial, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(initial?.title ?? "");
    setDescription(initial?.description ?? "");
  }, [initial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setLoading(true);
    try {
      await onSubmit({ title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setError(axiosErr.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="label">Title</label>
        <input
          className="input mt-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
      </div>
      <div>
        <label className="label">Description</label>
        <textarea
          className="input mt-1 min-h-[90px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Details (optional)"
        />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="flex items-center gap-2">
        <button
          disabled={loading}
          className="btn-primary disabled:opacity-50"
          type="submit"
        >
          {initial ? "Save changes" : "Add task"}
        </button>
        {onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
