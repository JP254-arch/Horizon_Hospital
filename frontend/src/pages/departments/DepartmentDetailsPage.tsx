// src/pages/departments/DepartmentDetailsPage.tsx
import { useState } from "react";

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
  department: Department;
  users: User[];
  onBack: () => void;
}

export default function DepartmentDetailsPage({ department, users, onBack }: Props) {
  const [dept, setDept] = useState<Department>(department);

  const toggleDepartmentStatus = () => {
    setDept(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  return (
    <div className="p-6">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
        &larr; Back
      </button>
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h1 className="text-2xl font-semibold mb-2">{dept.name}</h1>
        <p className="text-gray-700 mb-2">{dept.description}</p>
        <p className="mb-2">Type: {dept.isClinical ? 'Clinical' : 'Non-Clinical'}</p>
        <p className="mb-2">Status: {dept.isActive ? 'Active' : 'Inactive'}</p>
        <button
          onClick={toggleDepartmentStatus}
          className={`px-4 py-2 rounded-lg ${dept.isActive ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
        >
          {dept.isActive ? 'Disable Department' : 'Enable Department'}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Users in this Department</h2>
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t">
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4">{user.isActive ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Notes:
// - Soft-disable/enable department is implemented with toggleDepartmentStatus.
// - Users assigned to the department are listed below.
// - Back button allows navigation back to the Departments page.
// - This is all frontend state-driven; no backend yet.
