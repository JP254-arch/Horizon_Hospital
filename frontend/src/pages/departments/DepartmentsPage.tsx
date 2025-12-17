// src/pages/departments/DepartmentsPage.tsx
import { useState } from "react";
import DepartmentForm from "../../components/departments/DepartmentForm";
// import { useDepartments, Department } from "../../context/DepartmentContext";
import { useDepartments, type Department } from "../../context/DepartmentContext";

export default function DepartmentsPage() {
  const { departments, toggleDepartmentStatus } = useDepartments();

  const [localDepartments, setLocalDepartments] = useState<Department[]>(departments);
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const handleAdd = () => {
    setEditingDepartment(null);
    setShowForm(true);
  };

  const handleEdit = (dept: Department) => {
    setEditingDepartment(dept);
    setShowForm(true);
  };

  const handleSave = (data: Omit<Department, "id">) => {
    if (editingDepartment) {
      // Update locally
      setLocalDepartments(prev =>
        prev.map(d => (d.id === editingDepartment.id ? { ...d, ...data } : d))
      );
    } else {
      // Add new department locally
      setLocalDepartments(prev => [
        ...prev,
        { id: `dep_${Date.now()}`, ...data },
      ]);
    }
    setShowForm(false);
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
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localDepartments.map(dept => (
              <tr key={dept.id} className="border-t">
                <td className="p-4 font-medium">{dept.name}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      dept.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {dept.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-4 flex gap-4">
                  <button
                    onClick={() => handleEdit(dept)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleDepartmentStatus(dept.id)}
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
