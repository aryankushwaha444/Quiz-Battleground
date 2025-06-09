import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "./Auth/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/user/login", {
        email,
        password,
      });

      // Extract user from response
      const { user } = res.data;

      login(user); // Update auth context
      console.log("Login successful:", res.data);
      setMessage("✅ Login successful");
      navigate("/");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      setMessage(`❌ ${errorMsg}`);
      console.error("Login error:", errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-purple-100 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Login to Your Account
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label className="block mb-1 text-xl text-gray-600">
              Email <sup className="text-red-600">*</sup>
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 text-xl text-gray-600">
              Password <sup className="text-red-600">*</sup>
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-full hover:bg-red-400 transition"
          >
            Login
          </button>

          {/* Message */}
          {message && (
            <p className="text-center text-red-600 font-semibold">{message}</p>
          )}
        </form>

        {/* Signup Link */}
        <p className="text-center text-xl text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline hover:text-red-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
