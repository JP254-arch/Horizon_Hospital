// src/pages/departments/DepartmentNotifications.tsx
import React, { useEffect, useState } from "react";
import { FaUser, FaTasks, FaBell, FaClipboardList } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface Notification {
  id: string;
  message: string;
  date: string;
}

interface Department {
  id: string;
  name: string;
  notifications: Notification[];
}

const DepartmentNotifications: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      Accept: "application/json",
    },
  });

  const fetchDepartment = async () => {
    if (!departmentId) return;
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/departments/${departmentId}/notifications`);
      setDepartment(res.data);
    } catch (err: any) {
      console.error("Failed to fetch department notifications:", err);
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, [departmentId]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-xl font-bold border-b">
          {department?.name || "Department"}
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <Link
            to={`/department-dashboard`}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
          >
            <FaUser /> Dashboard
          </Link>
          <Link
            to={`/Tasks`}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
          >
            <FaTasks /> Tasks
          </Link>
          <Link
            to={`/Info`}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
          >
            <FaClipboardList /> Department Info
          </Link>
          <Link
            to={`/Notifications`}
            className="flex items-center gap-3 p-2 rounded bg-gray-200 transition"
          >
            <FaBell /> Notifications
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Department Notifications</h1>
        </header>

        {loading && <p className="p-4 text-gray-600">Loading notifications...</p>}
        {error && <p className="p-4 text-red-600">{error}</p>}

        <section>
          <div className="bg-white shadow rounded overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Message</th>
                </tr>
              </thead>
              <tbody>
                {department?.notifications?.length
                  ? department.notifications.map(notif => (
                      <tr key={notif.id} className="border-t">
                        <td className="p-4">{notif.date}</td>
                        <td className="p-4">{notif.message}</td>
                      </tr>
                    ))
                  : (
                    <tr>
                      <td colSpan={2} className="p-4 text-gray-600 text-center">
                        No notifications available.
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DepartmentNotifications;
