import type { Task } from '../types'

type Props = {
  task: Task
  onToggle: (id: number, next: boolean) => void
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  return (
    <div className="card p-4 flex items-start gap-3">
      <input
        type="checkbox"
        className="mt-1 h-5 w-5"
        checked={task.completed}
        onChange={(e) => onToggle(task.id, e.target.checked)}
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`font-medium ${task.completed ? 'line-through text-zinc-500' : ''}`}>{task.title}</h3>
            {task.description && (
              <p className={`text-sm text-zinc-600 dark:text-zinc-300 ${task.completed ? 'line-through' : ''}`}>{task.description}</p>
            )}
          </div>
          <div className="space-x-2">
            <button className="btn-secondary text-sm" onClick={() => onEdit(task)}>Edit</button>
            <button className="btn-secondary text-sm" onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}