// src/App.tsx
import { Routes, Route, Outlet } from "react-router-dom";
import Layout from "./components/layout";
import { DepartmentProvider } from "./context/DepartmentContext"; // <-- wrap the app


import Home from "./pages/Home";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Login from "./auth/Login";
import Register from "./auth/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Dashboard imports
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import DepartmentDashboard from "./pages/dashboards/DepartmentDashboard";
import PatientDashboard from "./pages/dashboards/PatientDashboard";
import DepartmentsPage from "./pages/departments/DepartmentsPage";
import UsersPage from "./pages/users/UsersPage";
import ReportsPage from "./pages/reports/ReportsPage";


// Layout wrapper component for nested routes
const LayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

function App() {
  return (
    <DepartmentProvider> {/* <-- Wrap the app so all components can use the context */}
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


          {/* Users */}
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </DepartmentProvider>
  );
}

export default App;
