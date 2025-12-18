import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Layout from "./components/layout";
import { UserProvider } from "./context/UserContext";
import { DepartmentProvider } from "./context/DepartmentContext";

// Pages
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Login from "./auth/Login";
import Register from "./auth/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Dashboards
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import DepartmentDashboard from "./pages/dashboards/DepartmentDashboard";
import PatientDashboard from "./pages/dashboards/PatientDashboard";

// Other Pages
import DepartmentsPage from "./pages/departments/DepartmentsPage";
import UsersPage from "./pages/users/UsersPage";
import ReportsPage from "./pages/reports/ReportsPage";
import DepartmentProfile from "./pages/departments/DepartmentProfile";
import DepartmentInfo from "./pages/departments/DepartmentInfo";
import DepartmentTasks from "./pages/departments/DepartmrntTasks";
import DepartmentNotifications from "./pages/departments/DepartmentNotifications";
import Settings from "./pages/settings/Settings";


// Layout wrapper component for nested routes
const LayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

function App() {
  return (
    <UserProvider>
      <DepartmentProvider>
        <Routes>
          <Route element={<LayoutWrapper />}>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Login />} />

            {/* Dashboards */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/department-dashboard" element={<DepartmentDashboard />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />

            {/* Departments */}
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/department-details" element={<DepartmentDashboard />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/Profile" element={<DepartmentProfile />} />
            <Route path="/Info" element={<DepartmentInfo />} />
            <Route path="/Tasks" element={<DepartmentTasks />} />
            <Route path="/Notifications" element={<DepartmentNotifications />} />

            {/* Settings */}
            <Route path="/settings" element={<Settings />} />


            {/* Users */}
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Routes>
      </DepartmentProvider>
    </UserProvider>
  );
}

export default App;
