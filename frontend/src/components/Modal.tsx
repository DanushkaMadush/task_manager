interface Props {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ isOpen, title, children, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-xl w-80 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400">
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
