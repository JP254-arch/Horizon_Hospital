// src/pages/users/UsersPage.tsx
import { useState } from "react";

type UserRole = "admin" | "staff" | "patient";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string; // optional because patients don't belong to departments
  isActive: boolean;
}

interface Department {
  id: string;
  name: string;
}

const initialDepartments: Department[] = [
  { id: "dep_admin", name: "Administration & Management" },
  { id: "dep_front_office", name: "Front Office / Patient Services" },
];

const initialUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    departmentId: "dep_admin",
    isActive: true,
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "staff",
    departmentId: "dep_front_office",
    isActive: true,
  },
  {
    id: "user3",
    name: "Mark Patient",
    email: "mark@patient.com",
    role: "patient",
    isActive: true,
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [departments] = useState<Department[]>(initialDepartments);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const toggleUserStatus = (id: string) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;

    setUsers(prev =>
      prev.map(u => (u.id === editingUser.id ? editingUser : u))
    );

    setEditingUser(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Users Management</h1>

      <table className="w-full text-left bg-white rounded-2xl shadow overflow-x-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Department</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-4 font-medium">{user.name}</td>
              <td className="p-4 text-gray-600">{user.email}</td>
              <td className="p-4 capitalize">{user.role}</td>
              <td className="p-4">
                {user.role === "patient"
                  ? "—"
                  : departments.find(d => d.id === user.departmentId)?.name}
              </td>
              <td className="p-4">
                {user.isActive ? "Active" : "Inactive"}
              </td>
              <td className="p-4 flex gap-4">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setEditingUser(user)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => toggleUserStatus(user.id)}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  className="w-full mt-1 border rounded-xl p-2"
                  value={editingUser.name}
                  onChange={e =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  className="w-full mt-1 border rounded-xl p-2"
                  value={editingUser.email}
                  onChange={e =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Role</label>
                <select
                  className="w-full mt-1 border rounded-xl p-2"
                  value={editingUser.role}
                  onChange={e =>
                    setEditingUser({
                      ...editingUser,
                      role: e.target.value as UserRole,
                      departmentId:
                        e.target.value === "patient"
                          ? undefined
                          : editingUser.departmentId,
                    })
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="patient">Patient</option>
                </select>
              </div>

              {editingUser.role !== "patient" && (
                <div>
                  <label className="block text-sm font-medium">Department</label>
                  <select
                    className="w-full mt-1 border rounded-xl p-2"
                    value={editingUser.departmentId}
                    onChange={e =>
                      setEditingUser({
                        ...editingUser,
                        departmentId: e.target.value,
                      })
                    }
                  >
                    {departments.map(dep => (
                      <option key={dep.id} value={dep.id}>
                        {dep.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingUser.isActive}
                  onChange={e =>
                    setEditingUser({
                      ...editingUser,
                      isActive: e.target.checked,
                    })
                  }
                />
                <span>Active</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 rounded-xl border"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-xl bg-blue-600 text-white"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
