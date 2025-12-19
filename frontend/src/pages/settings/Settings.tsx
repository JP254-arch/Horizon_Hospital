/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getDashboardRoute } from "../../utils/dashboardRoute";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  contact: string;
  gender: string;
  dob: string;
  age: number;
  bloodType: string;
  height: string;
  weight: string;
  address: string;
  profileImageUrl?: string;
  role: string;
}

const Settings: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      Accept: "application/json",
    },
  });

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch (err: any) {
        console.error("Failed to fetch user:", err);
        setError(err.response?.data?.message || "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  // Persist theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProfileImageFile(e.target.files[0]);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              profileImageUrl: URL.createObjectURL(e.target.files![0]),
            }
          : prev
      );
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("contact", user.contact);
      formData.append("gender", user.gender);
      formData.append("dob", user.dob);
      formData.append("age", String(user.age));
      formData.append("bloodType", user.bloodType);
      formData.append("height", user.height);
      formData.append("weight", user.weight);
      formData.append("address", user.address);
      if (profileImageFile) formData.append("profileImage", profileImageFile);

      await api.patch("/users/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully!");
    } catch (err: any) {
      console.error("Failed to update profile:", err);
      setError(err.response?.data?.message || "Failed to save changes.");
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">User Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link
            to={user ? getDashboardRoute(user.role) : "/settings"}
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Dashboard
          </Link>
          <Link to="/settings" className="bg-gray-700 px-3 py-2 rounded">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-500">Manage your account preferences</p>
          </div>
        </header>

        {loading && <div>Loading user data...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {/* Profile Image */}
        <section className="bg-white dark:bg-gray-200 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Image</h2>
          <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden">
            {profileImageFile ? (
              <img
                src={URL.createObjectURL(profileImageFile)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                No Image
              </div>
            )}
          </div>

          {/* File input */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setProfileImageFile(e.target.files[0]);
                // Optional: update user object for preview purposes
                setUser((prev) => (prev ? { ...prev } : prev));
              }
            }}
          />
        </section>

        {/* Personal Information */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Contact", name: "contact", type: "text" },
              { label: "Date of Birth", name: "dob", type: "date" },
              { label: "Age", name: "age", type: "number" },
              { label: "Blood Type", name: "bloodType", type: "text" },
              { label: "Height (cm)", name: "height", type: "number" },
              { label: "Weight (kg)", name: "weight", type: "number" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm mb-1">{field.label}</label>
                <input
                  type={field.type}
                  className="w-full border p-2 rounded"
                  value={(user as any)?.[field.name] ?? ""}
                  onChange={(e) =>
                    setUser({
                      ...user!,
                      [field.name]:
                        field.type === "number"
                          ? Number(e.target.value)
                          : e.target.value,
                    })
                  }
                  disabled={saving}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm mb-1">Gender</label>
              <select
                className="w-full border p-2 rounded"
                value={user?.gender ?? ""}
                onChange={(e) => setUser({ ...user!, gender: e.target.value })}
                disabled={saving}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Address</label>
              <textarea
                className="w-full border p-2 rounded"
                rows={3}
                value={user?.address ?? ""}
                onChange={(e) => setUser({ ...user!, address: e.target.value })}
                disabled={saving}
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </section>
      </main>
    </div>
  );
};

export default Settings;
