// src/pages/departments/DepartmentsPage.tsx
import { useState } from "react";
import DepartmentForm from "../../components/departments/DepartmentForm";

export interface Department {
  id: string;
  code: string;
  name: string;
  description: string;
  isClinical: boolean;
  isActive: boolean;
}

const initialDepartments: Department[] = [
  {
    id: "dep_admin",
    code: "ADMIN",
    name: "Administration & Management",
    description: "Overall hospital governance and operations",
    isClinical: false,
    isActive: true,
  },
  {
    id: "dep_front_office",
    code: "FRONT_OFFICE",
    name: "Front Office / Patient Services",
    description: "Patient registration and appointments",
    isClinical: false,
    isActive: true,
  },
];

export default function DepartmentsPage() {
  const [departments, setDepartments] =
    useState<Department[]>(initialDepartments);
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] =
    useState<Department | null>(null);

  const handleAdd = () => {
    setEditingDepartment(null);
    setShowForm(true);
  };

  const handleEdit = (dept: Department) => {
    setEditingDepartment(dept);
    setShowForm(true);
  };

  const handleToggleStatus = (id: string) => {
    setDepartments(prev =>
      prev.map(d =>
        d.id === id ? { ...d, isActive: !d.isActive } : d
      )
    );
  };

  const handleSave = (data: Omit<Department, "id">) => {
    if (editingDepartment) {
      setDepartments(prev =>
        prev.map(d =>
          d.id === editingDepartment.id
            ? { ...editingDepartment, ...data }
            : d
        )
      );
    } else {
      setDepartments(prev => [
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
                <td className="p-4">
                  {dept.isClinical ? "Clinical" : "Non-Clinical"}
                </td>
                <td className="p-4">
                  {dept.isActive ? "Active" : "Inactive"}
                </td>
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
