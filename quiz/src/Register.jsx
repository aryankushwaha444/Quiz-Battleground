import { Visibility , VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-600 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-red-800 mb-6">Login to Your Account</h2>
  
          <form className="space-y-5">
            <div>
              <label className="block mb-1 text-xl text-gray-600">Email <span><sup className="text-xl text-red-600">*</sup></span></label>
              <input required
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
  
            <div>
              <label className="block mb-1 text-xl text-gray-600">User Name<span><sup className="text-xl text-red-600">*</sup></span></label>
              <input required
                type="text"
                placeholder="example"
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
  
          
          <div>
            <label className="block mb-1 text-xl text-gray-600">
              Confirm Password <span><sup className="text-xl text-red-600">*</sup></span>
            </label>
            <div className="relative">
              <input required
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
          </div>
  
            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="text-indigo-600 hover:underline hover:text-red-600">Forgot password?</a>
            </div>
  
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-red-400 transition"
            >
              Register
            </button>
          </form>
  
        </div>
      </div>
    );
  }
  
  export default Register;
  