import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";

export default function Contact() {
  const [formStatus, setFormStatus] = useState({ msg: "", type: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mkgkwvdj", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setFormStatus({
          msg: "✅ Message sent successfully!",
          type: "bg-green-500",
        });
        form.reset();
      } else {
        const result = await response.json();
        setFormStatus({
          msg:
            result?.errors
              ?.map((err: any) => (err as any).message)
              .join(", ") || "❌ Oops! Something went wrong.",
          type: "bg-red-500",
        });
      }
    } catch {
      setFormStatus({
        msg: "❌ Oops! Something went wrong.",
        type: "bg-red-500",
      });
    }

    setTimeout(() => setFormStatus({ msg: "", type: "" }), 4000);
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 mb-4">
            Contact <span className="text-indigo-700">Horizon Hospital</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question, suggestion, or need assistance? We’re here to help!
          </p>
        </motion.div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left: Contact Form */}
          <motion.div
            className="lg:w-1/2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-red-700 mb-6 text-center">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="e.g. John Doe"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-500 transition"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="e.g. john@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-500 transition"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  placeholder="Type your message here..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-500 transition"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  background: "linear-gradient(to right, #ef4444, #b91c1c)",
                  "&:hover": {
                    background: "linear-gradient(to right, #b91c1c, #991b1b)",
                  },
                  fontWeight: 700,
                  px: 6,
                  py: 2,
                  borderRadius: 2,
                }}
              >
                ✉️ Send Message
              </Button>

              {formStatus.msg && (
                <div
                  className={`${formStatus.type} mt-6 text-center text-white font-semibold px-4 py-3 rounded-lg transition-all duration-700`}
                >
                  {formStatus.msg}
                </div>
              )}
            </form>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            className="lg:w-1/2 flex flex-col justify-center bg-gradient-to-br from-indigo-50 to-rose-50 p-10 rounded-2xl shadow-inner border border-gray-100"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">
              Or Reach Us Directly
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-medium text-red-600">📧 Email:</span>{" "}
                <a
                  href="mailto:info@horizon.com"
                  className="text-indigo-600 hover:underline"
                >
                  info@horizon.com
                </a>
              </p>
              <p>
                <span className="font-medium text-red-600">📞 Phone:</span>{" "}
                <a
                  href="tel:+1234567890"
                  className="text-indigo-600 hover:underline"
                >
                  +1 (234) 567-890
                </a>
              </p>
              <p>
                <span className="font-medium text-red-600">📌 Address:</span>{" "}
                123 Horizon St, Health City
              </p>
            </div>
            <div className="mt-8 text-gray-500 text-sm italic border-t border-gray-200 pt-4">
              “Horizon Hospital — providing care, compassion, and excellence
              every day.”
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
