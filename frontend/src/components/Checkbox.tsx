interface Props {
  checked: boolean;
  onChange: () => void;
}

export default function Checkbox({ checked, onChange }: Props) {
  return (
    <button
      onClick={onChange}
      className={`w-5 h-5 rounded border flex items-center justify-center
        ${checked ? "bg-green-500 border-green-500" : "border-gray-500"}
      `}
    >
      {checked && <span className="text-white text-xs">✓</span>}
    </button>
  );
}