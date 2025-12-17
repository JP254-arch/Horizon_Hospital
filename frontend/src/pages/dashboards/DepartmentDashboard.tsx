// src/pages/DepartmentMemberDashboard.tsx
import React from "react";
import { FaUser, FaTasks, FaBell, FaClipboardList } from "react-icons/fa";

const DepartmentDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-2xl font-bold border-b">Horizon Hospital</div>
        <nav className="flex-1 p-4 space-y-4">
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
          >
            <FaUser /> Profile
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
          >
            <FaTasks /> Tasks
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
          >
            <FaClipboardList /> Department Info
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-200 transition"
          >
            <FaBell /> Notifications
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <FaBell className="text-xl cursor-pointer" />
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        {/* Dashboard Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold mb-2">My Tasks</h2>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold mb-2">Pending Approvals</h2>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold mb-2">Notifications</h2>
            <p className="text-2xl font-bold">3</p>
          </div>
        </section>

        {/* Recent Activities */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
          <div className="bg-white shadow rounded p-4">
            <ul className="space-y-2">
              <li className="border-b py-2">
                Updated patient records for John Doe
              </li>
              <li className="border-b py-2">
                Reviewed lab results for department A
              </li>
              <li className="border-b py-2">
                Scheduled meeting for team discussion
              </li>
              <li className="py-2">Completed assigned tasks for the day</li>
            </ul>
          </div>
        </section>

        {/* Department Info */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Department Info</h2>
          <div className="bg-white shadow rounded p-4">
            <p>
              Department Name: Cardiology
            </p>
            <p>
              Members: 15
            </p>
            <p>
              Head of Department: Dr. Jane Smith
            </p>
            <p>
              Active Tasks: 12
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DepartmentDashboard;
