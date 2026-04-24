import { useAppStore } from "../store/useAppStore";

const filters = ["all", "completed", "pending"] as const;

export default function FilterBar() {
  const { filter, setFilter } = useAppStore();

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((item) => (
        <button
          key={item}
          onClick={() => setFilter(item)}
          className={`px-3 py-1 rounded text-sm transition
            ${
              filter === item
                ? "bg-green-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }
          `}
        >
          {item}
        </button>
      ))}
    </div>
  );
}