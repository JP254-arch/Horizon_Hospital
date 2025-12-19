// src/pages/departments/DepartmentTasks.tsx
import React from "react";
import { FaUser, FaTasks, FaBell, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

const DepartmentTasks: React.FC = () => {
  const department = {
    name: "Cardiology",
    tasks: [
      { id: "1", title: "Check patient reports", assignedTo: "Dr. Alice", status: "Pending" },
      { id: "2", title: "Update patient database", assignedTo: "Clerk Charlie", status: "Completed" },
      { id: "3", title: "Schedule surgeries", assignedTo: "Dr. David", status: "Pending" },
      { id: "4", title: "Inventory check", assignedTo: "Nurse Bob", status: "In Progress" },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-xl font-bold border-b">{department.name}</div>
        <nav className="flex-1 p-4 space-y-4">
          <Link
            to="/department-dashboard"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
          >
            <FaUser />
            Dashboard
          </Link>
          <Link
            to="/Tasks"
            className="flex items-center gap-3 p-2 rounded bg-gray-200 transition"
          >
            <FaTasks />
            Tasks
          </Link>
          <Link
            to="/Info"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
          >
            <FaClipboardList />
            Department Info
          </Link>
          <Link
            to="/Notifications"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
          >
            <FaBell />
            Notifications
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Department Tasks</h1>
        </header>

        <section>
          <div className="bg-white shadow rounded overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Task</th>
                  <th className="p-4">Assigned To</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {department.tasks.map(task => (
                  <tr key={task.id} className="border-t">
                    <td className="p-4">{task.title}</td>
                    <td className="p-4">{task.assignedTo}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : task.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DepartmentTasks;
