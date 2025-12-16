import { Routes, Route, Outlet } from "react-router-dom";
import Layout from "./components/layout";

import Home from "./pages/Home";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Login from "./auth/Login";
import Register from "./auth/Register";
import About from "./pages/About";
import Contact from './pages/Contact';



// Layout wrapper component for nested routes
const LayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

function App() {
  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/About" element={<About />} />
        <Route path="/contact" element={<Contact />} />

      </Route>
    </Routes>
  );
}

export default App;
