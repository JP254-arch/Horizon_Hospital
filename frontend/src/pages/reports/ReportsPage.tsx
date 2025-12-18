// src/pages/reports/ReportsPage.tsx
import { useDepartments } from "../../context/DepartmentContext";
import { useEffect, useState } from "react";
import axios from "axios";

// Types
interface User {
  id: string;
  name: string;
  role: string;
  isActive: boolean;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  status: string;
}

interface Order {
  id: string;
  branch: string;
  item: string;
  status: string;
}

export default function ReportsPage() {
  const { departments } = useDepartments();

  const [users, setUsers] = useState<User[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [usersRes, patientsRes, ordersRes] = await Promise.all([
          axios.get<User[]>("/api/users"),
          axios.get<Patient[]>("/api/patients"),
          axios.get<Order[]>("/api/orders"),
        ]);

        setUsers(usersRes.data);
        setPatients(patientsRes.data);
        setOrders(ordersRes.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch reports data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading reports...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Reports</h1>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6 md:grid-cols-2 sm:grid-cols-1">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h2 className="font-bold mb-2">Users</h2>
          <p>Total: {users.length}</p>
          <p>Active: {users.filter(u => u.isActive).length}</p>
        </div>

        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h2 className="font-bold mb-2">Departments</h2>
          <p>Total: {departments.length}</p>
          <p>Active: {departments.filter(d => d.isActive).length}</p>
        </div>

        <div className="p-4 bg-yellow-100 rounded-lg shadow">
          <h2 className="font-bold mb-2">Patients</h2>
          <p>Total: {patients.length}</p>
          <p>Admitted: {patients.filter(p => p.status === "Admitted").length}</p>
        </div>

        <div className="p-4 bg-purple-100 rounded-lg shadow">
          <h2 className="font-bold mb-2">Orders / Branches</h2>
          <p>Total: {orders.length}</p>
          <p>Pending: {orders.filter(o => o.status === "Pending").length}</p>
        </div>
      </div>

      {/* Users Table */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">User Report</h2>
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="p-4 font-medium">{u.name}</td>
                  <td className="p-4">{u.role}</td>
                  <td className="p-4">{u.isActive ? "Active" : "Inactive"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Departments Table */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Department Report</h2>
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Department</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(d => (
                <tr key={d.id} className="border-t">
                  <td className="p-4 font-medium">{d.name}</td>
                  <td className="p-4">{d.isActive ? "Active" : "Inactive"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Patients Table */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Patient Report</h2>
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Age</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4">{p.age}</td>
                  <td className="p-4">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Orders / Branches Table */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Orders / Branch Report</h2>
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Branch</th>
                <th className="p-4">Item</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-t">
                  <td className="p-4 font-medium">{o.branch}</td>
                  <td className="p-4">{o.item}</td>
                  <td className="p-4">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
