import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      if (!token || !user) {
        alert("Invalid credentials.");
        setLoading(false);
        return;
      }

      // Save JWT token to localStorage or cookie
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userEmail", user.email);

      // Redirect based on role
      switch (user.role.toLowerCase()) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "staff":
          navigate("/department-dashboard");
          break;
        case "patient":
          navigate("/patient-dashboard");
          break;
        default:
          alert("Unknown user role.");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-10">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Login Card */}
        <div className="bg-white/90 shadow-2xl rounded-3xl p-10 backdrop-blur-md border border-blue-100">
          <div className="flex justify-center mb-6">
            <img
              src="/logo.avif"
              alt="Horizon Hospital Logo"
              className="h-16 w-16 rounded-full shadow-lg"
            />
          </div>

          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
            Login to Horizon Hospital
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
                placeholder="you@horizonhospital.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-200"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <div className="text-gray-800 space-y-6 px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 leading-tight">
            Welcome Back to <span className="text-blue-600">Horizon Hospital</span>
          </h1>
          <p className="text-lg text-gray-600">
            Secure access to hospital systems, patient data, and appointments.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>🏥 Trusted clinical access</li>
            <li>📅 Appointment and record management</li>
            <li>🔒 Enterprise-grade security</li>
          </ul>
          <p className="pt-4 text-indigo-700 font-semibold">
            Caring for you, every step of the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
