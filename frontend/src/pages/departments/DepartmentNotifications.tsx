// src/pages/departments/DepartmentNotifications.tsx
import React from "react";
import { FaUser, FaTasks, FaBell, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

const DepartmentNotifications: React.FC = () => {
  const department = {
    name: "Cardiology",
    notifications: [
      { id: "1", message: "New patient admitted: John Doe", date: "2025-12-18" },
      { id: "2", message: "Staff meeting scheduled at 10 AM", date: "2025-12-19" },
      { id: "3", message: "Inventory check pending", date: "2025-12-20" },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-xl font-bold border-b">{department.name}</div>
        <nav className="flex-1 p-4 space-y-4">
          <Link
            to="/Profile"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
          >
            <FaUser />
            Profile
          </Link>
          <Link
            to="/Tasks"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
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
            className="flex items-center gap-3 p-2 rounded bg-gray-200 transition"
          >
            <FaBell />
            Notifications
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Department Notifications</h1>
        </header>

        <section>
          <div className="bg-white shadow rounded overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Message</th>
                </tr>
              </thead>
              <tbody>
                {department.notifications.map(notif => (
                  <tr key={notif.id} className="border-t">
                    <td className="p-4">{notif.date}</td>
                    <td className="p-4">{notif.message}</td>
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

export default DepartmentNotifications;
