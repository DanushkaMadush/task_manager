import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();
  const { login, loading, error } = useAppStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) return;

    const success = await login(username, password);

    if (success) {
      navigate("/tasks");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl text-white mb-6 text-center">Login</h2>

        {/* Username */}
        <input
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}