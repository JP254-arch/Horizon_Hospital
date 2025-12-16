import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-200 mt-auto overflow-hidden">
      <div className="container mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        {/* Left: Logo */}
        <div className="text-center md:text-left">
          <a href="/" className="flex items-center justify-center md:justify-start mb-4">
            <img
              src="/public/logo.avif"
              alt="Logo"
              className="rounded-full w-20 h-20 md:w-24 md:h-24 shadow-lg"
            />
            <span className="ml-3 text-xl md:text-2xl font-bold text-orange-400">H - Hospital</span>
          </a>
          <p className="text-orange-400 opacity-80 animate-pulse-slow">Excellence in Modern Healthcare</p>
        </div>

        {/* Center: Contact */}
        <div className="text-center md:text-left">
          <h5 className="text-orange-500 font-semibold mb-2">Address</h5>
          <p>123 Horizon St, Healthcare City</p>

          <h5 className="text-orange-500 font-semibold mt-4 mb-2">Contact</h5>
          <div className="flex flex-col space-y-1">
            <a href="tel:+1234567890" className="hover:text-orange-600 transition">+1 234 567 890</a>
            <a href="mailto:info@horizonhospital.com" className="hover:text-orange-600 transition">info@horizonhospital.com</a>
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="text-center md:text-left">
          <h5 className="text-orange-500 font-semibold mb-2">Quick Links</h5>
          <div className="flex flex-col space-y-1 mb-4">
            <a href="/" className="hover:text-orange-600 transition">Home</a>
            <a href="/patients" className="hover:text-orange-600 transition">Patients</a>
            <a href="/doctors" className="hover:text-orange-600 transition">Doctors</a>
            <a href="/appointments" className="hover:text-orange-600 transition">Appointments</a>
          </div>

          <div className="flex justify-center md:justify-start space-x-4 mt-2 text-xl">
            <a href="#" className="hover:text-orange-600"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-orange-600"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-orange-600"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-4" />

      <div className="text-center text-gray-400 text-sm pb-4">
        <p>© 2025 H - Hospital. All rights reserved.</p>
      </div>

      <style>{`
        @keyframes pulseSlow {
          0%,100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
      `}</style>
    </footer>
  );
};

export default Footer;
