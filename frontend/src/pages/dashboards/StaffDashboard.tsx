import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaUserMd, FaSignOutAlt } from "react-icons/fa";
import api from "../lib/api";

interface User {
  id: number | string;
  name: string;
  email: string;
  role: "STAFF" | "ADMIN" | "PATIENT";
}

interface Department {
  id: number | string;
  name: string;
  description?: string;
}

interface MedicalRecord {
  id: number | string;
  patient_name?: string;
  diagnosis?: string;
  created_at?: string;
}

export default function StaffDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meRes, depRes, recRes] = await Promise.all([
          api.get("/me"),
          api.get("/departments"),
          api.get("/medical-records"),
        ]);

        setUser(meRes.data);
        setDepartments(depRes.data);
        setRecords(recRes.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load staff dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading staff dashboard...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  if (!user || user.role !== "STAFF") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Staff Panel</h2>
        <nav className="flex flex-col gap-4 flex-1">
          <Link to="/staff-dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
            Dashboard
          </Link>
          <Link to="/medical-records" className="hover:bg-gray-700 px-3 py-2 rounded">
            Medical Records
          </Link>
          <Link to="/departments" className="hover:bg-gray-700 px-3 py-2 rounded">
            Departments
          </Link>
        </nav>
        <button
          onClick={() => {
            localStorage.removeItem("authToken");
            window.location.href = "/login";
          }}
          className="flex items-center gap-2 text-red-400 hover:text-red-300"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-600">Staff Dashboard</h1>
            <p className="text-gray-600">Welcome, {user.name}</p>
          </div>
          <FaUserMd className="text-4xl text-gray-500" />
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">Departments</p>
            <p className="text-2xl">{departments.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">Medical Records</p>
            <p className="text-2xl">{records.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">Role</p>
            <p className="text-2xl">STAFF</p>
          </div>
        </div>

        {/* Medical Records Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Patient</th>
                <th className="p-4">Diagnosis</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id} className="border-t">
                  <td className="p-4">{rec.patient_name || "—"}</td>
                  <td className="p-4">{rec.diagnosis || "—"}</td>
                  <td className="p-4">{rec.created_at ? new Date(rec.created_at).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    No medical records found.
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
