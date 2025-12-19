/* eslint-disable react-hooks/exhaustive-deps */
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
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("authToken");

  // Dedicated Axios instance
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      Accept: "application/json",
    },
  });

  // Fetch user
  const fetchUser = async () => {
    try {
      const res = await api.get("/me");
      setUser(res.data.user ?? res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setError("Failed to fetch user info.");
    }
  };

  // Fetch department
  const fetchDepartment = async (departmentId: string) => {
    try {
      const res = await api.get(`/departments/${departmentId}`);
      setDepartment(res.data);
    } catch (err) {
      console.error("Failed to fetch department:", err);
      setError("Failed to fetch department info.");
    }
  };

  // Fetch stats
  const fetchStats = async (departmentId: string, userId: string) => {
    try {
      const [tasksRes, approvalsRes, notificationsRes] = await Promise.all([
        api.get(`/departments/${departmentId}/tasks?userId=${userId}`),
        api.get(`/departments/${departmentId}/approvals?userId=${userId}`),
        api.get(`/departments/${departmentId}/notifications?userId=${userId}`),
      ]);
      setStats({
        myTasks: tasksRes.data.length ?? 0,
        pendingApprovals: approvalsRes.data.length ?? 0,
        notifications: notificationsRes.data.length ?? 0,
      });
    } catch (err) {
      console.error("Failed to fetch stats:", err);
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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">{department?.name ?? "Department"}</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/department-dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
            Dashboard
          </Link>
          <Link to="/Profile" className="hover:bg-gray-700 px-3 py-2 rounded">
            Profile
          </Link>
          {department?.features?.tasks && (
            <Link to="/Tasks" className="hover:bg-gray-700 px-3 py-2 rounded">
              Tasks
            </Link>
          )}
          <Link to="/Info" className="hover:bg-gray-700 px-3 py-2 rounded">
            Department Info
          </Link>
          {department?.features?.notifications && (
            <Link to="/Notifications" className="hover:bg-gray-700 px-3 py-2 rounded">
              Notifications
            </Link>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl text-orange-600 font-bold">
              {department?.name ?? "Department"} Dashboard
            </h1>
            <p className="text-violet-600">Welcome, {user?.name ?? "Staff"}</p>
          </div>
          <Link to="/settings">
            <FaUser className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800" />
          </Link>
        </header>

        {error && <p className="text-red-600 mb-4">{error}</p>}

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

          {department?.features?.approvals && (
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

          {department?.features?.notifications && (
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
          {department ? (
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
                <p className="font-medium">{user?.name}</p>
              </div>
            </div>
          ) : (
            <p>No department data available.</p>
          )}
        </section>
      </main>
    </div>
  );
}
