import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Corner Brackets Component
const CornerBrackets = ({ size = "h-3 w-3", borderColor = "border-neutral-400" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

const HomeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-20 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2.5 border-l-2 border-[#F13A34] bg-black/[0.03] py-2 pl-4 pr-5">
            <Sparkles className="h-3.5 w-3.5 text-[#F13A34]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
              Start a project
            </span>
          </div>

          <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900">
            Tell us what you're building
          </h2>
          <p className="text-[15px] text-neutral-600 max-w-xl leading-relaxed">
            Share a bit about your brand, timelines, and goals. We'll come back
            with a clear plan, transparent pricing, and the right next step.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            <div className="relative border border-neutral-200 bg-white p-4">
              <CornerBrackets size="h-2 w-2" />
              <div className="font-mono text-[clamp(1.5rem,2vw,2.2rem)] font-black tracking-tight text-neutral-900">500+</div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mt-1">
                projects shipped
              </div>
            </div>
            <div className="relative border border-neutral-200 bg-white p-4">
              <CornerBrackets size="h-2 w-2" />
              <div className="font-mono text-[clamp(1.5rem,2vw,2.2rem)] font-black tracking-tight text-neutral-900">98%</div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mt-1">
                client satisfaction
              </div>
            </div>
            <div className="relative border border-neutral-200 bg-white p-4">
              <CornerBrackets size="h-2 w-2" />
              <div className="font-mono text-[clamp(1.5rem,2vw,2.2rem)] font-black tracking-tight text-neutral-900">24h</div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mt-1">
                avg response time
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
          <div className="relative border border-neutral-200 bg-white p-6 md:p-8">
            <CornerBrackets />

            {/* Tab */}
            {/* <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-neutral-200 bg-white px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500">
                CONTACT
              </span>
            </div> */}

            <div className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alex Smith"
                    className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-[13px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#F13A34] focus:ring-1 focus:ring-[#F13A34] transition-all duration-300 hover:border-neutral-400"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Work email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-[13px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#F13A34] focus:ring-1 focus:ring-[#F13A34] transition-all duration-300 hover:border-neutral-400"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Project details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share a short overview of your brand, timeline, and what success looks like..."
                    rows="4"
                    className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-[13px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#F13A34] focus:ring-1 focus:ring-[#F13A34] transition-all duration-300 hover:border-neutral-400 resize-none"
                    required
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreement"
                    className="mt-1 border border-neutral-300 text-[#F13A34] focus:ring-[#F13A34] rounded-none"
                    required
                  />
                  <label htmlFor="agreement" className="text-[12px] text-neutral-600 leading-relaxed">
                    I agree to be contacted and understand that my information will
                    be handled in line with the privacy policy.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-1">
                  <button 
                    type="submit" 
                    className="group relative inline-flex w-full items-center justify-center gap-2 bg-[#F13A34] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#F13A34] hover:border hover:border-[#F13A34] cursor-pointer"
                  >
                    <span className="relative flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
                      Request a strategy call
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>

                <p className="pt-2 text-center text-[11px] text-neutral-500">
                  We typically reply within one business day. No spam—ever.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .section-container {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        @media (min-width: 640px) {
          .section-container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
        
        @media (min-width: 1024px) {
          .section-container {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
      `}</style>
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
