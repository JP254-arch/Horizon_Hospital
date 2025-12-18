import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaTasks, FaBell, FaClipboardList } from "react-icons/fa";
import axios from "axios";

interface Department {
  id: string;
  name: string;
  head: string;
  membersCount: number;
  features: {
    tasks: boolean;
    approvals: boolean;
    notifications: boolean;
  };
}

interface CurrentUser {
  id: string;
  name: string;
  role: string;
  departmentId?: string;
}

interface DepartmentStats {
  myTasks: number;
  pendingApprovals: number;
  notifications: number;
}

export default function DepartmentDashboard() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [department, setDepartment] = useState<Department | null>(null);
  const [stats, setStats] = useState<DepartmentStats>({
    myTasks: 0,
    pendingApprovals: 0,
    notifications: 0,
  });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  // Fetch logged-in user info
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  // Fetch department info
  const fetchDepartment = async (departmentId: string) => {
    try {
      const res = await axios.get(`/api/departments/${departmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartment(res.data);
    } catch (err) {
      console.error("Failed to fetch department:", err);
    }
  };

  // Fetch department stats for logged-in user
  const fetchStats = async (departmentId: string, userId: string) => {
    try {
      const [tasksRes, approvalsRes, notificationsRes] = await Promise.all([
        axios.get(`/api/departments/${departmentId}/tasks?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`/api/departments/${departmentId}/approvals?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`/api/departments/${departmentId}/notifications?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setStats({
        myTasks: tasksRes.data.length,
        pendingApprovals: approvalsRes.data.length,
        notifications: notificationsRes.data.length,
      });
    } catch (err) {
      console.error("Failed to fetch department stats:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchUser();
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (user?.departmentId) {
      fetchDepartment(user.departmentId);
      fetchStats(user.departmentId, user.id);
    }
  }, [user]);

  if (loading || !user || !department) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">{department.name}</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/department-dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
            Dashboard
          </Link>
          <Link to="/profile" className="hover:bg-gray-700 px-3 py-2 rounded">
            Profile
          </Link>
          {department.features.tasks && (
            <Link to="/tasks" className="hover:bg-gray-700 px-3 py-2 rounded">
              Tasks
            </Link>
          )}
          <Link to="/department-info" className="hover:bg-gray-700 px-3 py-2 rounded">
            Department Info
          </Link>
          {department.features.notifications && (
            <Link to="/notifications" className="hover:bg-gray-700 px-3 py-2 rounded">
              Notifications
            </Link>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl text-orange-600 font-bold">{department.name} Dashboard</h1>
            <p className="text-violet-600">Welcome, {user.name}</p>
          </div>
          <Link to="/settings">
            <FaUser className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800" />
          </Link>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                  <h2 className="text-lg font-semibold mb-1">Pending Approvals</h2>
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
              <p className="font-medium text-blue-600">{department.name}</p>
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
}
