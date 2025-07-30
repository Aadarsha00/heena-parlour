/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const response = await axios.post(
        "https://api-beautiful-eyebrow.ctrlbits.xyz/api/auth/jwt/create/",
        {
          email,
          password,
        }
      );

      localStorage.setItem("accessToken", response.data.access);
      setMessage("✅ Login successful!");
    } catch (error: any) {
      setMessage("❌ Login failed. Check credentials.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Login
        </button>

        {message && (
          <div className="mt-4 text-sm text-center text-gray-600">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
