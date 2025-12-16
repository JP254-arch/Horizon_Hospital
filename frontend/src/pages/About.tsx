import { motion } from "framer-motion";
import { Button } from "@mui/material";

const team = [
  {
    name: "Dr. Jane Doe",
    role: "Chief Medical Officer",
    description: "Leading Horizon Hospital with vision, compassion, and expertise.",
    img: "/images/jane.jpg",
    bg: "bg-red-50",
    border: "border-red-400",
  },
  {
    name: "JP Mbaga",
    role: "Lead Developer",
    description: "Turning ideas into code and experiences — digital magic behind Horizon Hospital.",
    img: "/images/jp.jpg",
    bg: "bg-indigo-50",
    border: "border-indigo-400",
  },
  {
    name: "Shirly Marion",
    role: "Community Manager",
    description: "Connecting patients, families, and staff to create a caring environment.",
    img: "/images/manager.jpg",
    bg: "bg-red-100",
    border: "border-red-400",
  },
];

const services = [
  { title: "Emergency & Trauma Care", icon: "🚑" },
  { title: "Outpatient Consultations", icon: "🩺" },
  { title: "Inpatient Ward Services", icon: "🛏️" },
];

export default function About() {
  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-red-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-red-700 mb-4">
            About <span className="text-red-900">Horizon Hospital</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Horizon Hospital provides world-class medical care with compassion, innovation, and patient-centered excellence.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <motion.div
            className="floating-card bg-white shadow-lg rounded-2xl p-8 border-t-4 border-red-400"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-red-600 mb-4">🎯 Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To deliver high-quality, patient-focused healthcare using state-of-the-art technology and compassionate care.
            </p>
          </motion.div>
          <motion.div
            className="floating-card bg-white shadow-lg rounded-2xl p-8 border-t-4 border-indigo-400"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">🌍 Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To be a center of excellence in healthcare, where innovation meets compassion, and every patient feels valued and cared for.
            </p>
          </motion.div>
        </div>

        {/* Our Story */}
        <motion.div
          className="floating-card bg-gradient-to-r from-red-100 to-red-200 rounded-2xl shadow-xl p-10 mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-extrabold text-center text-red-700 mb-6">📖 Our Story</h2>
          <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed text-center">
            Horizon Hospital was founded to provide compassionate, modern healthcare. From humble beginnings to becoming a leading hospital,
            we have prioritized patient care, safety, and innovation. Our team works tirelessly to ensure every patient receives personalized attention.
          </p>
        </motion.div>

        {/* What We Offer */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-extrabold text-red-700 mb-10">💎 What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                className="floating-card bg-white rounded-2xl shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-red-700 mb-2">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  Professional, high-quality medical services for all patients.
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Meet the Team */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-extrabold text-red-900 mb-10">👥 Meet the Horizon Team</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            Behind Horizon Hospital is a team of passionate professionals dedicated to patient care and innovation.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                className={`team-card ${member.bg} rounded-2xl shadow-lg p-6`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className={`w-32 h-32 mx-auto rounded-full object-cover border-4 ${member.border} mb-4`}
                />
                <h3 className="text-xl font-semibold text-red-700">{member.name}</h3>
                <p className="text-gray-500 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-red-700 mb-4">Join Horizon Hospital</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Experience compassionate, high-quality healthcare and become part of our community.
          </p>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#d9534f",
              color: "white",
              px: 6,
              py: 2,
              borderRadius: 3,
              fontWeight: 700,
              "&:hover": { backgroundColor: "#c14442" },
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
