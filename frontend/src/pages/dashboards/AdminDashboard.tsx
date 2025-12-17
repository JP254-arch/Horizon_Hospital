// src/pages/dashboards/AdminDashboard.tsx
import { Link } from "react-router-dom";
import { useDepartments } from "../../context/DepartmentContext";

export default function AdminDashboard() {
  const { departments } = useDepartments();

  // Temporary mock users (until UserContext / backend)
  const users = [
    { id: "user1", name: "John Doe", role: "Admin", isActive: true },
    { id: "user2", name: "Jane Smith", role: "Receptionist", isActive: true },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex flex-col gap-4">
          <Link to="/admin-dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
            Dashboard
          </Link>
          <Link to="/departments" className="hover:bg-gray-700 px-3 py-2 rounded">
            Departments
          </Link>
          <Link to="/users" className="hover:bg-gray-700 px-3 py-2 rounded">
            Users
          </Link>
          <Link to="/reports" className="hover:bg-gray-700 px-3 py-2 rounded">
            Reports
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div>Welcome, Admin</div>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <Link to="/departments">
            <div className="p-4 bg-blue-100 rounded-lg shadow">
              Total Departments: {departments.length}
            </div>
          </Link>

          <Link to="/users">
            <div className="p-4 bg-green-100 rounded-lg shadow">
              Total Users: {users.length}
            </div>
          </Link>

          <Link to="/reports">
            <div className="p-4 bg-yellow-100 rounded-lg shadow">
              Pending Approvals: 3
            </div>
          </Link>
        </div>

        {/* Departments Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Department Name</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(dep => (
                <tr key={dep.id} className="border-t">
                  <td className="p-4 font-medium">{dep.name}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        dep.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {dep.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
