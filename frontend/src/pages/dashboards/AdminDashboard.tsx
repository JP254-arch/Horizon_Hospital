import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

interface Department {
  id: string | number;
  name: string;
  isActive?: boolean; // optional in case API doesn’t send it
}

interface User {
  id: string | number;
  name: string;
  role: string;
  isActive?: boolean; // optional
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [userRes, depRes, usersRes] = await Promise.all([
          axios.get("/api/me", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/departments", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/users", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        // Safely assign data with fallbacks
        setCurrentUser(userRes.data || null);
        setDepartments(depRes.data || []);
        setUsers(usersRes.data || []);
      } catch (err: any) {
        console.error("Dashboard fetch error:", err);

        // Check if API returned a response
        if (err.response) {
          setError(err.response.data?.message || "Failed to fetch dashboard data.");
        } else {
          setError("Failed to connect to backend.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

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

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl text-green-600 font-bold">Admin Dashboard</h1>
            <p className="text-violet-600">
              Welcome, {currentUser?.name || "Admin"}
            </p>
          </div>
          <Link to="/settings">
            <FaUser className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800" />
          </Link>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-blue-100 rounded-lg shadow">
            <p className="font-bold">Total Departments</p>
            <p>{departments.length}</p>
            <p>Active: {departments.filter(d => d.isActive ?? false).length}</p>
          </div>

          <div className="p-4 bg-green-100 rounded-lg shadow">
            <p className="font-bold">Total Users</p>
            <p>{users.length}</p>
            <p>Pending Approvals: {pendingApprovals}</p>
          </div>

          <div className="p-4 bg-yellow-100 rounded-lg shadow">
            <p className="font-bold">Reports</p>
            <p>Check detailed reports</p>
          </div>
        </div>

        {/* Departments Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Department Name</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(dep => (
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
              ))}
              {departments.length === 0 && (
                <tr>
                  <td colSpan={2} className="p-4 text-center text-gray-500">
                    No departments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
