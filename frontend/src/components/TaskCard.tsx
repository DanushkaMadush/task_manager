import Checkbox from "./Checkbox";

interface Props {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
  onToggle: (id: number) => void;
}

export default function TaskCard({ task, onToggle }: Props) {
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
    </div>
  );
}
