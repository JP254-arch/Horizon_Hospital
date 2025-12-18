import { useState, useEffect } from "react";
import axios from "axios";
import DepartmentForm from "../../components/departments/DepartmentForm";

export interface Department {
  id: string;
  code: string;
  name: string;
  description: string;
  isClinical: boolean;
  isActive: boolean;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const token = localStorage.getItem("authToken");

  // Fetch all departments from backend
  const fetchDepartments = async () => {
    try {
      const res = await axios.get("/api/departments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(res.data);
    } catch (err) {
      console.error("Failed to fetch departments:", err);
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

  const handleToggleStatus = async (id: string) => {
    try {
      const dept = departments.find(d => d.id === id);
      if (!dept) return;

      const updatedDept = { ...dept, isActive: !dept.isActive };

      await axios.put(`/api/departments/${id}`, updatedDept, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDepartments(prev =>
        prev.map(d => (d.id === id ? updatedDept : d))
      );
    } catch (err) {
      console.error("Failed to toggle department status:", err);
    }
  };

  const handleSave = async (data: Omit<Department, "id">) => {
    try {
      if (editingDepartment) {
        const updatedDept = { ...editingDepartment, ...data };
        await axios.put(`/api/departments/${editingDepartment.id}`, updatedDept, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDepartments(prev =>
          prev.map(d => (d.id === editingDepartment.id ? updatedDept : d))
        );
      } else {
        const res = await axios.post("/api/departments", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDepartments(prev => [...prev, res.data]);
      }
      setShowForm(false);
    } catch (err) {
      console.error("Failed to save department:", err);
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

      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Code</th>
              <th className="p-4">Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(dept => (
              <tr key={dept.id} className="border-t">
                <td className="p-4 font-medium">{dept.name}</td>
                <td className="p-4 text-gray-600">{dept.code}</td>
                <td className="p-4">{dept.isClinical ? "Clinical" : "Non-Clinical"}</td>
                <td className="p-4">{dept.isActive ? "Active" : "Inactive"}</td>
                <td className="p-4 flex gap-4">
                  <button
                    onClick={() => handleEdit(dept)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(dept.id)}
                    className="text-red-600 hover:underline"
                  >
                    {dept.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
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
