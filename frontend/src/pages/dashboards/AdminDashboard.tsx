/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBuilding, FaUsers, FaClipboardList } from "react-icons/fa";
import axios from "axios";

interface Department {
  id: string | number;
  name: string;
  isActive?: boolean;
}

interface User {
  id: string | number;
  name: string;
  role: string;
  isActive?: boolean;
}

interface CurrentUser {
  id: string | number;
  name: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("authToken");

  // Dedicated Axios instance
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      Accept: "application/json",
    },
  });

  // Fetch all necessary data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [userRes, depRes, usersRes] = await Promise.all([
        api.get("/me"),
        api.get("/departments"),
        api.get("/users"),
      ]);

      setCurrentUser(userRes.data.user ?? userRes.data);
      setDepartments(depRes.data ?? []);
      setUsers(usersRes.data ?? []);
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || "Failed to fetch admin data."
          : "Failed to connect to backend."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const pendingApprovals = users.filter(u => !u.isActive).length;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/admin-dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
            Dashboard
          </Link>
          <Link to="/departments" className="hover:bg-gray-700 px-3 py-2 rounded">
            Departments
          </Link>
          <Link to="/users" className="hover:bg-gray-700 px-3 py-2 rounded">
            Users
          </Link>
          <Link to="/reports" className="hover:bg-gray-700 px-3 py-2 rounded">
            Reports
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl text-green-600 font-bold">Admin Dashboard</h1>
            <p className="text-violet-600">Welcome, {currentUser?.name ?? "Admin"}</p>
          </div>
          <Link to="/settings">
            <FaUser className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800" />
          </Link>
        </header>

        {loading && <p className="p-6">Loading dashboard...</p>}
        {error && <p className="p-6 text-red-600">{error}</p>}

        {/* Stats Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-blue-100 rounded-lg shadow flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold mb-1">Departments</h2>
                <p className="text-2xl font-bold">{departments.length}</p>
                <p>Active: {departments.filter(d => d.isActive ?? false).length}</p>
              </div>
              <FaBuilding className="text-3xl text-blue-600" />
            </div>

            <div className="p-4 bg-green-100 rounded-lg shadow flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold mb-1">Users</h2>
                <p className="text-2xl font-bold">{users.length}</p>
                <p>Pending Approvals: {pendingApprovals}</p>
              </div>
              <FaUsers className="text-3xl text-green-600" />
            </div>

            <div className="p-4 bg-yellow-100 rounded-lg shadow flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold mb-1">Reports</h2>
                <p>Check detailed reports</p>
              </div>
              <FaClipboardList className="text-3xl text-yellow-600" />
            </div>
          </div>
        )}

        {/* Departments Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Department Name</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {departments.length > 0 ? (
                  departments.map(dep => (
                    <tr key={dep.id} className="border-t">
                      <td className="p-4 font-medium">{dep.name}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            dep.isActive ?? false
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {dep.isActive ?? false ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="p-4 text-center text-gray-500">
                      No departments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
