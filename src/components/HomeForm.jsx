import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
const HomeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, integrate with your backend or a service like Formspree
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="section-padding bg-gradient-to-br from-white to-[#F6F4EF]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 section-container max-w-7xl mx-auto items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* <p className="section-eyebrow mb-2 text-neutral-500">
            Start a project
          </p> */}
           <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(241,58,52,0.25)] bg-[rgba(241,58,52,0.07)] px-4 py-2">
                    <Sparkles className="h-3 w-3 text-[var(--color-primary)]" />
                    <span className="section-eyebrow text-[var(--color-primary)]">
                       Start a project
                    </span>
                  </div>
          <h2 className="section-heading text-neutral-900 mb-3">
            Tell us what you’re building
          </h2>
          <p className="section-subtitle max-w-xl">
            Share a bit about your brand, timelines, and goals. We’ll come back
            with a clear plan, transparent pricing, and the right next step.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 text-sm">
            <div className="rounded-2xl bg-white shadow-sm border border-neutral-200 px-4 py-4">
              <div className="text-xl font-semibold text-neutral-900">500+</div>
              <div className="text-xs text-neutral-500 mt-1">
                projects shipped
              </div>
            </div>
            <div className="rounded-2xl bg-white shadow-sm border border-neutral-200 px-4 py-4">
              <div className="text-xl font-semibold text-neutral-900">98%</div>
              <div className="text-xs text-neutral-500 mt-1">
                client satisfaction
              </div>
            </div>
            <div className="rounded-2xl bg-white shadow-sm border border-neutral-200 px-4 py-4">
              <div className="text-xl font-semibold text-neutral-900">24h</div>
              <div className="text-xs text-neutral-500 mt-1">
                average response time
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="w-full max-w-lg lg:ml-auto"
        >
          <div className="bg-white rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.12)] border border-neutral-100 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold tracking-[0.18em] uppercase text-neutral-600 mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Smith"
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold tracking-[0.18em] uppercase text-neutral-600 mb-2">
                  Work email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold tracking-[0.18em] uppercase text-neutral-600 mb-2">
                  Project details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share a short overview of your brand, timeline, and what success looks like..."
                  rows="4"
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all resize-none"
                  required
                />
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3 text-xs text-neutral-600">
                <input
                  type="checkbox"
                  id="agreement"
                  className="mt-1 rounded border-neutral-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  required
                />
                <label htmlFor="agreement">
                  I agree to be contacted and understand that my information will
                  be handled in line with the privacy policy.
                </label>
              </div>

              {/* Submit */}
              <div className="pt-1">
                <button type="submit" className="btn-primary w-full justify-center">
                  <span className="flex items-center gap-2 text-sm">
                    Request a strategy call
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </button>
              </div>

              <p className="pt-2 text-center text-xs text-neutral-500">
                We typically reply within one business day. No spam—ever.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeForm;


















// import { useState } from "react";
// import { motion } from "framer-motion";

// const HomeForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//     projectType: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 grid grid-cols-1 lg:grid-cols-2">
      
//       {/* LEFT IMAGE SECTION */}
//       <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-black">
//         <div
//           className="absolute inset-0 bg-cover bg-center opacity-40"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2400')",
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative z-10 max-w-xl text-center text-white px-12"
//         >
//           <h2 className="text-5xl font-bold leading-tight mb-6">
//             Transform Your Vision Into Digital Reality
//           </h2>
//           <p className="text-gray-300 text-lg">
//             From concept to launch, we build experiences that convert and scale.
//           </p>
//         </motion.div>
//       </div>

//       {/* RIGHT FORM SECTION */}
//       <div className="flex items-center justify-center px-4 sm:px-6 lg:px-20 py-16">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 sm:p-10"
//         >
//           {/* HEADER */}
//           <div className="text-center mb-10">
//             <h1 className="text-4xl font-bold text-gray-900">
//               Let’s Build Something
//               <span className="block text-gray-700">Amazing Together</span>
//             </h1>
//             <p className="text-gray-600 mt-4">
//               Tell us about your idea and we’ll take care of the rest.
//             </p>
//           </div>

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* NAME */}
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Your Name"
//               className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:outline-none"
//             />

//             {/* EMAIL */}
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email Address"
//               className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:outline-none"
//             />

//             {/* MESSAGE */}
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               placeholder="Tell us about your project..."
//               rows="4"
//               className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:outline-none resize-none"
//             />

//             {/* CHECKBOX */}
//             <div className="flex items-start gap-3 text-sm text-gray-600">
//               <input type="checkbox" className="mt-1" />
//               <p>
//                 I agree to receive communication and accept the privacy policy.
//               </p>
//             </div>

//             {/* BUTTON */}
//             <button
//               type="submit"
//               className="w-full bg-black text-white py-4 rounded-xl font-medium hover:scale-[1.02] transition-transform shadow-lg"
//             >
//               Start Your Project
//             </button>

//             <p className="text-center text-xs text-gray-500 pt-3">
//               Response within 2 hours • No spam
//             </p>
//           </form>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HomeForm;
