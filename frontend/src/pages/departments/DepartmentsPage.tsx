/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import DepartmentForm from "../../components/departments/DepartmentForm";

export interface Department {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
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

  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch (err: any) {
      console.error("Failed to fetch departments:", err);
      setError(err.response?.data?.message || "Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAdd = () => {
    setEditingDepartment(null);
    setShowForm(true);
  };

  const handleEdit = (dept: Department) => {
    setEditingDepartment(dept);
    setShowForm(true);
  };

  const handleSave = async (data: Omit<Department, "id" | "created_at" | "updated_at">) => {
    try {
      if (editingDepartment) {
        // Edit existing department
        const updatedDept = { ...editingDepartment, ...data };
        const res = await api.put(`/departments/${editingDepartment.id}`, updatedDept);
        setDepartments(prev =>
          prev.map(d => (d.id === editingDepartment.id ? res.data : d))
        );
      } else {
        // Add new department
        const res = await api.post("/departments", data);
        setDepartments(prev => [...prev, res.data]);
      }
      setShowForm(false);
    } catch (err: any) {
      console.error("Failed to save department:", err);
      setError(err.response?.data?.message || "Failed to save department");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this department?")) return;
    try {
      await api.delete(`/departments/${id}`);
      setDepartments(prev => prev.filter(d => d.id !== id));
    } catch (err: any) {
      console.error("Failed to delete department:", err);
      setError(err.response?.data?.message || "Failed to delete department");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Departments</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Department
        </button>
      </div>

      {loading && <p className="p-4 text-gray-600">Loading departments...</p>}
      {error && <p className="p-4 text-red-600">{error}</p>}

      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Created At</th>
              <th className="p-4">Updated At</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.length === 0 && !loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No departments found.
                </td>
              </tr>
            ) : (
              departments.map(dept => (
                <tr key={dept.id} className="border-t">
                  <td className="p-4 font-medium">{dept.name}</td>
                  <td className="p-4">{dept.description}</td>
                  <td className="p-4">{new Date(dept.created_at).toLocaleString()}</td>
                  <td className="p-4">{new Date(dept.updated_at).toLocaleString()}</td>
                  <td className="p-4 flex gap-4">
                    <button
                      onClick={() => handleEdit(dept)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dept.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <DepartmentForm
          initialData={editingDepartment ?? undefined}
          onSubmit={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
