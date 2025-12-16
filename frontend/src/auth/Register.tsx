// src/pages/Register.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Paper } from "@mui/material";

interface FormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!form.fullName) newErrors.fullName = "Full name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Registering user:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side Info */}
        <div className="space-y-6 px-6">
          <Typography variant="h3" className="text-rose-700 font-extrabold">
            Welcome to Horizon Hospital
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            Register to access our health services, manage appointments, and
            stay connected with our care team.
          </Typography>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>✅ Book appointments online quickly</li>
            <li>🔥 Access personalized health information</li>
            <li>💬 Securely chat with doctors and staff</li>
          </ul>
          <Typography className="text-rose-600 font-semibold">
            Your health, our priority.
          </Typography>
        </div>

        {/* Right Side Registration Form */}
        <Paper
          elevation={12}
          className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-2xl"
        >
          <div className="flex justify-center mb-6">
            <img
              src="/public/logo.avif"
              alt="Horizon Hospital Logo"
              className="h-20 w-20 rounded-full shadow-lg"
            />
          </div>

          <Typography
            variant="h4"
            className="text-center text-rose-700 font-extrabold mb-6"
          >
            Create Your Account
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Full Name"
              name="fullName"
              fullWidth
              value={form.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              value={form.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />

            <Button
              type="submit"
              variant="contained"
              color="error"
              fullWidth
              className="py-3 mt-2 rounded-xl shadow-md hover:shadow-lg transition"
            >
              Register
            </Button>

            <Typography
              variant="body2"
              className="text-center mt-4 text-gray-700"
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-rose-600 font-medium hover:underline"
              >
                Sign in
              </Link>
            </Typography>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default Register;
