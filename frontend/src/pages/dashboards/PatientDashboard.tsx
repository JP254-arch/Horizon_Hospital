import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import axios from "axios";

interface Appointment {
  id: string;
  date: string;
  doctor: string;
  status: string;
}

interface MedicalRecord {
  id: string;
  type: string;
  date: string;
}

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(res.data);
    } catch (err) {
      console.error("Failed to fetch current user", err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/api/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };

  const fetchMedicalRecords = async () => {
    try {
      const res = await axios.get("/api/medical-records", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedicalRecords(res.data);
    } catch (err) {
      console.error("Failed to fetch medical records", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchCurrentUser(), fetchAppointments(), fetchMedicalRecords()]);
      setLoading(false);
    };
    init();
  }, []);

  if (loading || !currentUser) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  const upcomingAppointments = appointments.filter(a => a.status === "Upcoming").length;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Patient Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/patient-dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
            Dashboard
          </Link>
          <Link to="/appointments" className="hover:bg-gray-700 px-3 py-2 rounded">
            My Appointments
          </Link>
          <Link to="/medical-records" className="hover:bg-gray-700 px-3 py-2 rounded">
            Medical Records
          </Link>
          <Link to="/billing" className="hover:bg-gray-700 px-3 py-2 rounded">
            Billing
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl text-yellow-600 font-bold">Patient Dashboard</h1>
            <p className="text-violet-600">Welcome, {currentUser.name}</p>
          </div>
          <Link to="/settings">
            <FaUser className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800" />
          </Link>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-blue-100 rounded-lg shadow">
            Upcoming Appointments: {upcomingAppointments}
          </div>
          <div className="p-4 bg-green-100 rounded-lg shadow">
            Medical Records: {medicalRecords.length}
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg shadow">
            Outstanding Bills: $200
          </div>
        </div>

        {/* Appointments Table */}
        <section className="bg-white rounded-lg shadow overflow-x-auto mb-6">
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
        </section>

        {/* Medical Records Table */}
        <section className="bg-white rounded-lg shadow overflow-x-auto">
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
        </section>
      </main>
    </div>
  );
}
