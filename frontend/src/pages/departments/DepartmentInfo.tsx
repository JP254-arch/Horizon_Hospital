// src/pages/departments/DepartmentInfo.tsx
import React from "react";
import { FaUser, FaTasks, FaBell, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

const DepartmentInfo: React.FC = () => {
  const department = {
    name: "Cardiology",
    head: "Dr. Jane Smith",
    membersCount: 15,
    location: "Building A, Floor 3",
    contact: "cardiology@hospital.com | +123 456 7890",
    workingHours: "Mon-Fri 8:00 AM - 5:00 PM",
    policies: [
      "All patients must book appointments in advance.",
      "Doctors are available for consultation during working hours.",
      "Emergency cases are prioritized at all times.",
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
            className="flex items-center gap-3 p-2 rounded bg-gray-200 transition"
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
          <h1 className="text-3xl font-bold">Department Info</h1>
        </header>

        {/* Department Details */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <div className="bg-white shadow rounded p-4 space-y-2">
            <p><strong>Name:</strong> {department.name}</p>
            <p><strong>Head:</strong> {department.head}</p>
            <p><strong>Members:</strong> {department.membersCount}</p>
            <p><strong>Location:</strong> {department.location}</p>
            <p><strong>Contact:</strong> {department.contact}</p>
            <p><strong>Working Hours:</strong> {department.workingHours}</p>
          </div>
        </section>

        {/* Policies */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Policies</h2>
          <div className="bg-white shadow rounded p-4 space-y-2">
            <ul className="list-disc list-inside">
              {department.policies.map((policy, index) => (
                <li key={index}>{policy}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DepartmentInfo;
