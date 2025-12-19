/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

interface Department {
  id: string;
  name: string;
  description: string;
  isClinical: boolean;
  isActive: boolean;
}

interface Props {
  departmentId: string;
  onBack: () => void;
}

export default function DepartmentDetailsPage({ departmentId, onBack }: Props) {
  const [dept, setDept] = useState<Department | null>(null);
  const [users, setUsers] = useState<User[]>([]);
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

  const fetchDepartmentData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [deptRes, usersRes] = await Promise.all([
        api.get(`/departments/${departmentId}`),
        api.get(`/departments/${departmentId}/users`),
      ]);

      setDept(deptRes.data);
      setUsers(usersRes.data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load department data");
    } finally {
      setLoading(false);
    }
  };

  const toggleDepartmentStatus = async () => {
    if (!dept) return;
    try {
      const res = await api.patch(`/departments/${dept.id}`, {
        isActive: !dept.isActive,
      });

      setDept((prev) => (prev ? { ...prev, isActive: res.data.isActive ?? !prev.isActive } : prev));
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update department status");
    }
  };

  useEffect(() => {
    fetchDepartmentData();
  }, [departmentId]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!dept) return <div className="p-6">Department not found</div>;

  return (
    <div className="p-6">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
        &larr; Back
      </button>

      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h1 className="text-2xl font-semibold mb-2">{dept.name}</h1>
        <p className="text-gray-700 mb-2">{dept.description}</p>
        <p className="mb-2">Type: {dept.isClinical ? "Clinical" : "Non-Clinical"}</p>
        <p className="mb-2">Status: {dept.isActive ? "Active" : "Inactive"}</p>
        <button
          onClick={toggleDepartmentStatus}
          className={`px-4 py-2 rounded-lg ${
            dept.isActive ? "bg-red-600 text-white" : "bg-green-600 text-white"
          }`}
        >
          {dept.isActive ? "Disable Department" : "Enable Department"}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Users in this Department</h2>
        {users.length === 0 ? (
          <p className="text-gray-600">No users assigned to this department.</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4">{user.isActive ? "Active" : "Inactive"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
