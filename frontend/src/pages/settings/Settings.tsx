import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

const Settings: React.FC = () => {
  // ---------------------------
  // Hardcoded user data
  // ---------------------------
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "+31 612 345 678",
    gender: "Male",
    dob: "1995-06-15",
    age: 29,
    bloodType: "O+",
    height: "175",
    weight: "72",
    address: "Amsterdam, Netherlands",
  });

  // ---------------------------
  // Theme (Light / Dark)
  // ---------------------------
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ---------------------------
  // Profile image
  // ---------------------------
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className={`flex h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">User Panel</h2>

        <nav className="flex flex-col gap-4">
          <Link to="/department-dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
            Dashboard
          </Link>

          <Link to="/settings" className="bg-gray-700 px-3 py-2 rounded">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-500">Manage your account preferences</p>
          </div>
        </header>

        {/* Profile Image */}
        <section className="bg-white dark:bg-gray-200 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Image</h2>

          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}
            </div>

            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        </section>

        {/* Personal Information */}
        <section className="bg-white  rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                className="w-full border p-2 rounded"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full border p-2 rounded"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Contact</label>
              <input
                className="w-full border p-2 rounded"
                value={user.contact}
                onChange={(e) => setUser({ ...user, contact: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Gender</label>
              <select
                className="w-full border p-2 rounded"
                value={user.gender}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Date of Birth</label>
              <input
                type="date"
                className="w-full border p-2 rounded"
                value={user.dob}
                onChange={(e) => setUser({ ...user, dob: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Age</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={user.age}
                onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Blood Type</label>
              <input
                className="w-full border p-2 rounded"
                value={user.bloodType}
                onChange={(e) => setUser({ ...user, bloodType: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Height (cm)</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={user.height}
                onChange={(e) => setUser({ ...user, height: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Weight (kg)</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={user.weight}
                onChange={(e) => setUser({ ...user, weight: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Address</label>
              <textarea
                className="w-full border p-2 rounded"
                rows={3}
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </div>
          </div>

          <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Save Changes
          </button>
        </section>
      </main>
    </div>
  );
};

export default Settings;
