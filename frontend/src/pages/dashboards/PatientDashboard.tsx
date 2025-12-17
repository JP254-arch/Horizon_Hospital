// src/pages/dashboards/PatientDashboard.tsx
import { useState } from "react";

export default function PatientDashboard() {
  const [appointments] = useState([
    { id: 'app1', date: '2025-12-20', doctor: 'Dr. Smith', status: 'Upcoming' },
    { id: 'app2', date: '2025-12-10', doctor: 'Dr. Jane', status: 'Completed' },
  ]);

  const [medicalRecords] = useState([
    { id: 'rec1', type: 'Blood Test', date: '2025-11-15' },
    { id: 'rec2', type: 'X-Ray', date: '2025-10-30' },
  ]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Patient Panel</h2>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Dashboard</a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">My Appointments</a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Medical Records</a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Billing</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div>Welcome, Patient</div>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-blue-100 rounded-lg shadow">Upcoming Appointments: {appointments.filter(a => a.status === 'Upcoming').length}</div>
          <div className="p-4 bg-green-100 rounded-lg shadow">Medical Records: {medicalRecords.length}</div>
          <div className="p-4 bg-yellow-100 rounded-lg shadow">Outstanding Bills: $200</div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto mb-6">
          <h2 className="p-4 font-semibold text-xl">Appointments</h2>
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Doctor</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app.id} className="border-t">
                  <td className="p-4">{app.date}</td>
                  <td className="p-4">{app.doctor}</td>
                  <td className="p-4">{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Medical Records Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <h2 className="p-4 font-semibold text-xl">Medical Records</h2>
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Type</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {medicalRecords.map(rec => (
                <tr key={rec.id} className="border-t">
                  <td className="p-4">{rec.type}</td>
                  <td className="p-4">{rec.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}