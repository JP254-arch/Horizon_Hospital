import { Button } from "@mui/material";

function Home() {
  return (
    <div className="pt-20 font-sans">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-red-100 py-28 rounded-3xl shadow-md mx-4 md:mx-12 text-center overflow-hidden">

        {/* Floating Decorative Circle */}
        <div className="absolute top-10 right-16 w-40 h-40 bg-red-300 rounded-full opacity-20 blur-2xl"></div>

        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          <div className="h-40 w-40 mb-6 rounded-full shadow-lg ring-4 ring-red-300 bg-red-100 floating-logo"></div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 text-red-700 leading-tight">
            Welcome to <span className="text-red-900">Mozone Horizon Hospital</span>
          </h1>

          <p className="text-gray-700 max-w-3xl mb-10 text-lg md:text-xl leading-relaxed">
            Compassionate care, advanced treatments, and world-class medical expertise for your wellness and recovery.
          </p>

          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#d9534f",
              color: "white",
              fontWeight: 700,
              px: 6,
              py: 2,
              borderRadius: 10,
              "&:hover": { backgroundColor: "#c14442" },
            }}
          >
            Book an Appointment
          </Button>
        </div>
      </section>

      {/* =====================================================
          ABOUT SECTION
      ====================================================== */}
      <section className="max-w-6xl mx-auto py-28 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-700">
          Who We Are
        </h2>

        <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed text-lg md:text-xl">
          Mozone Horizon Hospital provides patient-centered healthcare using
          modern medical technology and highly experienced professionals.
          Our mission is to deliver safe, effective, and compassionate care
          to every individual and family we serve.
        </p>
      </section>

      {/* =====================================================
          SERVICES SECTION
      ====================================================== */}
      <section className="bg-gray-50 py-28 px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-red-700">
          Our Medical Services
        </h2>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Emergency & Trauma Care",
            "Outpatient Consultations",
            "Inpatient Ward Services",
            "Pharmacy & Laboratory",
            "Radiology & Imaging",
            "Surgical & Theatre Services",
          ].map((service) => (
            <div
              key={service}
              className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-red-600 transform transition duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              <h3 className="text-xl font-semibold mb-3 text-red-700">
                {service}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                High-quality medical solutions delivered by specialists committed to your health.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          DEPARTMENTS SECTION
      ====================================================== */}
      <section className="max-w-6xl mx-auto py-28 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-red-700">
          Hospital Departments
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Cardiology",
            "Orthopedics",
            "Pediatrics",
            "General Surgery",
            "Gynecology",
            "Internal Medicine",
            "ENT (Ear, Nose & Throat)",
          ].map((dept) => (
            <div
              key={dept}
              className="bg-white rounded-2xl shadow-md py-8 px-6 transform transition duration-500 hover:scale-105 hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-red-600">{dept}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CTA SECTION
      ====================================================== */}
      <section className="relative py-28 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white text-center rounded-3xl mx-4 md:mx-12 shadow-2xl overflow-hidden">

        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white opacity-10 rounded-full animate-pulse-slow"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white opacity-10 rounded-full animate-pulse-slow"></div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Need Immediate Medical Assistance?
        </h2>

        <p className="mb-8 opacity-95 text-lg md:text-xl max-w-3xl mx-auto">
          Our emergency response and specialist teams are available 24/7
          to provide urgent and life-saving support.
        </p>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "white",
            color: "#b83232",
            fontWeight: 700,
            px: 6,
            py: 2,
            borderRadius: 10,
            "&:hover": { backgroundColor: "#efefef" },
          }}
        >
          Contact Us Now
        </Button>
      </section>

      {/* =====================================================
          CUSTOM ANIMATIONS
      ====================================================== */}
      <style>
        {`
          @keyframes floatLogo {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
          .floating-logo {
            animation: floatLogo 3.5s ease-in-out infinite;
          }

          @keyframes pulseSlow {
            0%,100% { transform: scale(1); opacity: 0.1; }
            50% { transform: scale(1.2); opacity: 0.15; }
          }
          .animate-pulse-slow {
            animation: pulseSlow 6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

export default Home;
