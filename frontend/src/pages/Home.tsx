import { Button } from "@mui/material";
import { motion } from "framer-motion";
import {
  Ambulance,
  Stethoscope,
  BedDouble,
  Pill,
  Scan,
  Scissors,
} from "lucide-react";

const services = [
  {
    title: "Emergency & Trauma Care",
    icon: Ambulance,
    color: "border-red-600 text-red-600",
  },
  {
    title: "Outpatient Consultations",
    icon: Stethoscope,
    color: "border-blue-600 text-blue-600",
  },
  {
    title: "Inpatient Ward Services",
    icon: BedDouble,
    color: "border-green-600 text-green-600",
  },
  {
    title: "Pharmacy & Laboratory",
    icon: Pill,
    color: "border-purple-600 text-purple-600",
  },
  {
    title: "Radiology & Imaging",
    icon: Scan,
    color: "border-amber-600 text-amber-600",
  },
  {
    title: "Surgical & Theatre Services",
    icon: Scissors,
    color: "border-rose-600 text-rose-600",
  },
];

function Home() {
  return (
    <div className="pt-20 font-sans bg-white">
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-red-100 py-28 rounded-3xl shadow-md mx-4 md:mx-12 text-center overflow-hidden">
        <div className="absolute top-10 right-16 w-40 h-40 bg-red-300 rounded-full opacity-20 blur-2xl" />

        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-red-700">
          Welcome to{" "}
          <span className="text-red-900">Mozone Horizon Hospital</span>
        </h1>

        <p className="text-gray-700 max-w-3xl mx-auto mb-10 text-lg md:text-xl">
          Compassionate care, advanced treatments, and world-class medical
          expertise for your wellness and recovery.
        </p>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#d9534f",
            px: 6,
            py: 2,
            fontWeight: 700,
            borderRadius: 3,
            "&:hover": { backgroundColor: "#c14442" },
          }}
        >
          Book an Appointment
        </Button>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="max-w-6xl mx-auto py-28 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-700">
          Who We Are
        </h2>
        <p className="text-gray-700 max-w-4xl mx-auto text-lg md:text-xl leading-relaxed">
          Mozone Horizon Hospital delivers patient-centered healthcare using
          modern medical technology and highly experienced professionals,
          ensuring safe, effective, and compassionate care.
        </p>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="text-center bg-gray-50 py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-red-700 mb-14">
          💎 Our Medical Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mx-auto max-w-6xl">
          {services.map(({ title, icon: Icon, color }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`floating-card bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition-transform duration-300`}
            >
              <div className={`text-4xl mb-4 ${color}`}>
                <Icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                High-quality medical solutions delivered by experienced
                specialists.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= DEPARTMENTS ================= */}
      <section className="text-center py-28 px-6 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-red-700">
          Hospital Departments
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mx-auto max-w-6xl">
          {[
            "Cardiology",
            "Orthopedics",
            "Pediatrics",
            "General Surgery",
            "Gynecology",
            "Internal Medicine",
            "ENT (Ear, Nose & Throat)",
          ].map((dept, index) => (
            <motion.div
              key={dept}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="floating-card bg-white rounded-2xl shadow-md py-10 px-6 hover:shadow-xl hover:-translate-y-2 transition-transform"
            >
              <h3 className="text-xl font-semibold text-red-600">{dept}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-28 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white text-center rounded-3xl mx-4 md:mx-12 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white opacity-10 rounded-full animate-pulse-slow" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white opacity-10 rounded-full animate-pulse-slow" />

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Need Immediate Medical Assistance?
        </h2>

        <p className="mb-8 text-lg md:text-xl max-w-3xl mx-auto opacity-95">
          Our emergency and specialist teams are available 24/7 to provide
          life-saving care.
        </p>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#ffffff",
            color: "#b83232",
            px: 6,
            py: 2,
            fontWeight: 700,
            borderRadius: 3,
            "&:hover": { backgroundColor: "#f2f2f2" },
          }}
        >
          Contact Us Now
        </Button>
      </section>

      {/* ================= ANIMATIONS ================= */}
      <style jsx>{`
        @keyframes pulseSlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.15;
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;
