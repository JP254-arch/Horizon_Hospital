// src/pages/departments/DepartmentProfile.tsx
import React from "react";
import { FaUser, FaTasks, FaBell, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

const DepartmentProfile: React.FC = () => {
  const department = {
    name: "Cardiology",
    head: "Dr. Jane Smith",
    membersCount: 15,
    description: "Responsible for heart-related treatments and patient care.",
    members: [
      { id: "1", name: "Dr. Alice", role: "Doctor", status: "Active" },
      { id: "2", name: "Nurse Bob", role: "Nurse", status: "Active" },
      { id: "3", name: "Clerk Charlie", role: "Admin", status: "Inactive" },
      { id: "4", name: "Dr. David", role: "Doctor", status: "Active" },
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
            className="flex items-center gap-3 p-2 rounded bg-gray-200 transition"
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
          <h1 className="text-3xl font-bold">Department Profile</h1>
        </header>

        {/* Overview */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <div className="bg-white shadow rounded p-4 space-y-2">
            <p><strong>Name:</strong> {department.name}</p>
            <p><strong>Head:</strong> {department.head}</p>
            <p><strong>Members:</strong> {department.membersCount}</p>
            <p><strong>Description:</strong> {department.description}</p>
          </div>
        </section>

        {/* Members */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Members</h2>
          <div className="bg-white shadow rounded overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {department.members.map((member) => (
                  <tr key={member.id} className="border-t">
                    <td className="p-4">{member.name}</td>
                    <td className="p-4">{member.role}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          member.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {member.status}
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

export default DepartmentProfile;
