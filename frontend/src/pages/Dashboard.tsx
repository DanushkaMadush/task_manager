import { useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";
import Modal from "../components/Modal";

export default function Dashboard() {
  const {
    tasks,
    fetchTasks,
    addTask,
    toggleTask,
    loading,
    updateTask,
    deleteTask,
  } = useAppStore();
  const [title, setTitle] = useState("");
  const [editingTask, setEditingTask] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    if (!title) return;
    await addTask(title);
    setTitle("");
  };

  const handleEdit = (task: any) => {
    setEditingTask(task);
    setEditTitle(task.title);
  };

  const handleUpdate = async () => {
    if (!editingTask) return;

    await updateTask(editingTask.id, editTitle);
    setEditingTask(null);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;

    await deleteTask(deleteId);
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl text-white mb-6">Task Dashboard</h1>

        {/* Filter */}
        <FilterBar />

        {/* Add Task */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="New task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* Loading */}
        {loading && <p className="text-gray-400">Loading...</p>}

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Empty State */}
        {!loading && tasks.length === 0 && (
          <p className="text-gray-500 mt-4 text-center">No tasks yet</p>
        )}
      </div>

      <Modal
        isOpen={!!editingTask}
        title="Edit Task"
        onClose={() => setEditingTask(null)}
      >
        <input
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white border border-gray-600"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Save
        </button>
      </Modal>

      <Modal
        isOpen={deleteId !== null}
        title="Delete Task"
        onClose={() => setDeleteId(null)}
      >
        <p className="text-gray-300 mb-4">
          Are you sure you want to delete this task?
        </p>

        <div className="flex gap-2">
          <button
            onClick={confirmDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          >
            Delete
          </button>

          <button
            onClick={() => setDeleteId(null)}
            className="flex-1 bg-gray-600 text-white py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
