import { useState, useEffect } from "react";
import axios from "axios";

type UserRole = "admin" | "staff" | "patient";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string;
  isActive: boolean;
}

interface Department {
  id: string;
  name: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "admin",
    departmentId: undefined,
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("authToken");
  const api = axios.create({
    baseURL: "/api",
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });

  // Fetch users and departments
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersRes, depsRes] = await Promise.all([
          api.get("/users"),
          api.get("/departments"),
        ]);
        setUsers(usersRes.data);
        setDepartments(depsRes.data);
        if (depsRes.data.length > 0) {
          setNewUser(prev => ({ ...prev, departmentId: depsRes.data[0].id }));
        }
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleUserStatus = async (id: string) => {
    const user = users.find(u => u.id === id);
    if (!user) return;
    const updated = { ...user, isActive: !user.isActive };
    try {
      await api.patch(`/users/${id}`, { isActive: updated.isActive });
      setUsers(prev => prev.map(u => (u.id === id ? updated : u)));
    } catch (err) {
      console.error(err);
      alert("Failed to update user status");
    }
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    try {
      await api.put(`/users/${editingUser.id}`, editingUser);
      setUsers(prev => prev.map(u => (u.id === editingUser.id ? editingUser : u)));
      setEditingUser(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save user");
    }
  };

  const handleAddUser = async () => {
    try {
      const res = await api.post("/users", newUser);
      setUsers(prev => [...prev, res.data]);
      setIsAddModalOpen(false);
      setNewUser({
        name: "",
        email: "",
        role: "admin",
        departmentId: departments[0]?.id,
        isActive: true,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add user");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Users Management</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-xl"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add User
        </button>
      </div>

      {/* USERS TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="w-full text-left">
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
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-600">
                  No users available.
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id} className="border-t">
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4">
                    {user.role === "patient"
                      ? "—"
                      : departments.find(d => d.id === user.departmentId)?.name || "—"}
                  </td>
                  <td className="p-4">{user.isActive ? "Active" : "Inactive"}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD USER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  className="w-full mt-1 border rounded-xl p-2"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  className="w-full mt-1 border rounded-xl p-2"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Role</label>
                <select
                  className="w-full mt-1 border rounded-xl p-2"
                  value={newUser.role}
                  onChange={e =>
                    setNewUser({
                      ...newUser,
                      role: e.target.value as UserRole,
                      departmentId:
                        e.target.value === "patient"
                          ? undefined
                          : newUser.departmentId || departments[0]?.id,
                    })
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="patient">Patient</option>
                </select>
              </div>
              {newUser.role !== "patient" && (
                <div>
                  <label className="block text-sm font-medium">Department</label>
                  <select
                    className="w-full mt-1 border rounded-xl p-2"
                    value={newUser.departmentId}
                    onChange={e => setNewUser({ ...newUser, departmentId: e.target.value })}
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
                  checked={newUser.isActive}
                  onChange={e => setNewUser({ ...newUser, isActive: e.target.checked })}
                />
                <span>Active</span>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 rounded-xl border"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-xl bg-blue-600 text-white"
                onClick={handleAddUser}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

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
                  onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  className="w-full mt-1 border rounded-xl p-2"
                  value={editingUser.email}
                  onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
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
                        e.target.value === "patient" ? undefined : editingUser.departmentId,
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
                    onChange={e => setEditingUser({ ...editingUser, departmentId: e.target.value })}
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
                  onChange={e => setEditingUser({ ...editingUser, isActive: e.target.checked })}
                />
                <span>Active</span>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button className="px-4 py-2 rounded-xl border" onClick={() => setEditingUser(null)}>
                Cancel
              </button>
              <button className="px-4 py-2 rounded-xl bg-blue-600 text-white" onClick={handleSaveEdit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
