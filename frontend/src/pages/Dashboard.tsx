import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar';

export default function Dashboard() {

  const { tasks, fetchTasks, addTask, toggleTask, loading } = useAppStore();
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    if (!title) return;
    await addTask(title);
    setTitle('');
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
        {loading && (
          <p className="text-gray-400">Loading...</p>
        )}

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
            />
          ))}
        </div>

        {/* Empty State */}
        {!loading && tasks.length === 0 && (
          <p className="text-gray-500 mt-4 text-center">
            No tasks yet
          </p>
        )}
      </div>
    </div>
  );
}