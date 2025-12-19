/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaUser, FaTasks, FaBell, FaClipboardList } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface Department {
  id: string;
  name: string;
  head: string;
  membersCount: number;
  location: string;
  contact: string;
  workingHours: string;
  policies: string[];
}

const DepartmentInfo: React.FC = () => {
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
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/departments/${departmentId}`);
      setDepartment(res.data);
    } catch (err: any) {
      console.error("Failed to fetch department info:", err);
      setError(err.response?.data?.message || "Failed to load department info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (departmentId) fetchDepartment();
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
            className="flex items-center gap-3 p-2 rounded bg-gray-200 transition"
          >
            <FaClipboardList /> Department Info
          </Link>
          <Link
            to={`/Notifications`}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
          >
            <FaBell /> Notifications
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Department Info</h1>
        </header>

        {/* Loading / Error */}
        {loading && <p className="p-4 text-gray-600">Loading department info...</p>}
        {error && <p className="p-4 text-red-600">{error}</p>}

        {/* Department Details */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <div className="bg-white shadow rounded p-4 space-y-2">
            <p><strong>Name:</strong> {department?.name || "—"}</p>
            <p><strong>Head:</strong> {department?.head || "—"}</p>
            <p><strong>Members:</strong> {department?.membersCount ?? "—"}</p>
            <p><strong>Location:</strong> {department?.location || "—"}</p>
            <p><strong>Contact:</strong> {department?.contact || "—"}</p>
            <p><strong>Working Hours:</strong> {department?.workingHours || "—"}</p>
          </div>
        </section>

        {/* Policies */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Policies</h2>
          <div className="bg-white shadow rounded p-4 space-y-2">
            {department?.policies?.length === 0 || !department ? (
              <p className="text-gray-600">No policies available.</p>
            ) : (
              <ul className="list-disc list-inside">
                {department.policies.map((policy, index) => (
                  <li key={index}>{policy}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DepartmentInfo;
