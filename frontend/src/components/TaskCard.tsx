import Checkbox from "./Checkbox";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
  onToggle: (id: number) => void;
  onEdit: (task: { id: number; title: string }) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onToggle, onEdit, onDelete }: Props) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">

      <div className="flex items-center gap-3">

        <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />

        <span
          className={`text-white ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </span>

      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={() => onEdit(task)}
          className="text-gray-400 hover:text-green-400 transition"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-400 transition"
        >

          <Trash2 size={18} />

        </button>

      </div>
      
    </div>
  );
}