import { useState } from "react";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-600 flex items-center justify-center px-4">
      <div className=" bg-purple-100 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform  p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Login to Your Account
        </h2>

        <form className="space-y-5 ">
          {/* Email */}
          <div>
            <label className="block mb-1 text-xl text-gray-600">
              Email <span><sup className="text-xl text-red-600">*</sup></span>
            </label>
            <input required
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password with Toggle */}
          
          <div>
            <label className="block mb-1 text-xl text-gray-600">
              Password <span><sup className="text-xl text-red-600">*</sup></span>
            </label>
            <div className="relative">
              <input required
                type={showPassword ? "text" : "password"}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-red-400 transition"
          >
            Login
          </button>
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
