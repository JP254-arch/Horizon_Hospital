import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaTasks, FaBell, FaClipboardList } from "react-icons/fa";
// import { useUserContext } from "../../context/UserContext";

const DepartmentDashboard: React.FC = () => {
  // const { user } = useUserContext();
  const user = {
    id: "user-001",
    name: "Dr. Emily Smith",
    role: "DepartmentMember",
    departmentId: "dep-001",
  };

  // Fallback safety
  if (!user) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  // Mock department data (replace with API/context later)
  const department = {
    name: "Cardiology",
    head: "Dr. John Adams",
    user: "Dr. Emily Smith",
    membersCount: 12,
    features: {
      tasks: true,
      approvals: true,
      notifications: true,
    },
  };

  const stats = {
    myTasks: 5,
    pendingApprovals: 3,
    notifications: 2,
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">{department.name}</h2>

        <nav className="flex flex-col gap-4">
          <Link
            to="/department-dashboard"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Dashboard
          </Link>

          <Link to="/Profile" className="hover:bg-gray-700 px-3 py-2 rounded">
            Profile
          </Link>

          {department.features.tasks && (
            <Link to="/Tasks" className="hover:bg-gray-700 px-3 py-2 rounded">
              Tasks
            </Link>
          )}

          <Link to="/Info" className="hover:bg-gray-700 px-3 py-2 rounded">
            Department Info
          </Link>

          {department.features.notifications && (
            <Link
              to="/Notifications"
              className="hover:bg-gray-700 px-3 py-2 rounded"
            >
              Notifications
            </Link>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {/* Header (Admin-style) */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl text-orange-600 font-bold">
              {department.name} Dashboard
            </h1>
            <p className="text-violet-600">Welcome, {user.name}</p>
          </div>

          {/* <FaUser className="text-2xl text-gray-600" /> */}
          <Link to="/settings">
            <FaUser className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800" />
          </Link>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-blue-100 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold mb-1">Tasks</h2>
                <p className="text-2xl font-bold">{stats.myTasks}</p>
              </div>
              <FaTasks className="text-3xl text-blue-600" />
            </div>
          </div>

          {department.features.approvals && (
            <div className="p-4 bg-yellow-100 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold mb-1">
                    Pending Approvals
                  </h2>
                  <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
                </div>
                <FaClipboardList className="text-3xl text-yellow-600" />
              </div>
            </div>
          )}

          {department.features.notifications && (
            <div className="p-4 bg-green-100 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold mb-1">Notifications</h2>
                  <p className="text-2xl font-bold">{stats.notifications}</p>
                </div>
                <FaBell className="text-3xl text-green-600" />
              </div>
            </div>
          )}
        </div>

        {/* Department Information */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Department Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Department</p>
              <Link
                to="/departmentProfile"
                className="font-medium text-blue-600 hover:underline"
              >
                {department.name}
              </Link>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Head of Department</p>
              <p className="font-medium">{department.head}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Logged-in Staff</p>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DepartmentDashboard;
