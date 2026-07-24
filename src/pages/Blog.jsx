// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Calendar, User, ArrowRight, Home } from "lucide-react";
// import { motion } from "framer-motion";
// import GlobalHero from "../utils/GlobalHero";
// import { blogPosts } from "../constants/blog";

// /* ------------------ ANIMATION ------------------ */
// const cardVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.12,
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   }),
// };

// const Blog = () => {
//   const posts = blogPosts;

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Global Hero Section */}
//       <GlobalHero
//         title={"Our Blog"}
//         subtitle={"Ideas Strategy Execution"}
//         description={"Short, tactical articles on strategy, content, and execution—written from the perspective of teams shipping work every week."}
//         breadcrumbs={[
//           { label: "Home", icon: Home, href: "/" },
//           { label: "Blog", href: "/blog", current: true },
//         ]}
//         backgroundImage={"https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
//         centered={true}
//         titleColors={{
//           first: "white",
//           second: "#f13a34",
//         }}
//       />

//       {/* Main Content */}
//       <div className="section-container max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="mb-20 max-w-2xl"
//         >
//           <span className="uppercase tracking-[0.35em] text-sm text-[#D83735] font-semibold">
//             Our Blog
//           </span>
//           <h2 className="mt-6 text-5xl font-bold text-black leading-tight">
//             Thoughts, ideas <br /> & creative stories
//           </h2>
//           <p className="mt-6 text-gray-600">
//             Carefully crafted insights on design, development and modern
//             digital experiences.
//           </p>
//         </motion.div>

//         {/* ---------- BLOG GRID ---------- */}
//         <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
//           {posts.map((blog, i) => (
//             <motion.div
//               key={blog.id || blog.slug || i}
//               custom={i}
//               variants={cardVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//             >
//               <Link
//                 to={`/blog/${blog.slug || blog.id}`}
//                 className="group relative block rounded-3xl overflow-hidden"
//               >
//                 {/* ---------- IMAGE ---------- */}
//                 <div className="relative h-[420px] overflow-hidden">
//                   <img
//                     src={blog.image ? blog.image : "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
//                     alt={blog.title}
//                     className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     loading="lazy"
//                     decoding="async"
//                   />
//                   {/* Gradient Overlay */}
//                   <div className="absolute inset-0 group-hover:bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90" />
//                   {/* Hover Overlay Content */}
//                   <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
//                     <span className="flex items-center text-sm text-white mb-3">
//                       <Calendar size={14} className="mr-2" />
//                       {blog.published_at || blog.date || new Date().toLocaleDateString()}
//                     </span>
//                     <h3 className="text-2xl font-semibold text-white leading-snug">
//                       {blog.title}
//                     </h3>
//                     <p className="mt-3 text-white text-sm leading-relaxed">
//                       {blog.excerpt || blog.summary || ""}
//                     </p>
//                     <div className="mt-8">
//                       <span
//                         className="inline-flex items-center gap-2 rounded-full
//                         bg-[#D83735] px-6 py-3 text-sm font-medium text-white
//                         shadow-lg shadow-[#D83735]/30
//                         transition-all duration-300
//                         group-hover:gap-3 group-hover:shadow-xl"
//                       >
//                         Read Article
//                         <ArrowRight
//                           size={16}
//                           className="transition-transform group-hover:translate-x-1"
//                         />
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 {/* ---------- CARD BASE ---------- */}
//                 <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 group-hover:ring-[#D83735]/40 transition-all" />
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {/* Newsletter Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="mt-20 bg-black rounded-3xl p-10 md:p-14 text-white text-center"
//         >
//           <h2 className="text-3xl md:text-4xl font-semibold mb-4">
//             Get new posts in your inbox
//           </h2>
//           <p className="text-sm md:text-base mb-7 opacity-90 max-w-2xl mx-auto">
//             A short email when we publish new breakdowns, frameworks, and
//             behind-the-scenes looks at our client work.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//             <input
//               type="email"
//               placeholder="you@company.com"
//               className="flex-1 px-6 py-3 rounded-full text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] border border-transparent focus:border-transparent"
//             />
//             <button className="btn-primary whitespace-nowrap justify-center">
//               Subscribe
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Blog;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Home, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import GlobalHero from "../utils/GlobalHero";
import { blogPosts } from "../constants/blog";

/* Reusable Components */
const CornerBrackets = ({ size = "h-3 w-3", borderColor = "border-neutral-300" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

const Tab = ({ label }) => (
  <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-neutral-200 bg-white px-4 py-1.5">
    <span className="h-1.5 w-1.5 rounded-full bg-[#F13A34] motion-safe:animate-pulse" />
    <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500">{label}</span>
  </div>
);

/* Animation */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Blog = () => {
  const posts = blogPosts;
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Global Hero Section */}
      <GlobalHero
        title={"Our Blog"}
        subtitle={"Ideas Strategy Execution"}
        description={"Short, tactical articles on strategy, content, and execution—written from the perspective of teams shipping work every week."}
        breadcrumbs={[
          { label: "Home", icon: Home, href: "/" },
          { label: "Blog", href: "/blog", current: true },
        ]}
        backgroundImage={"https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
        centered={true}
        titleColors={{
          first: "white",
          second: "#f13a34",
        }}
      />

      {/* Main Content */}
      <div className="section-container max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2.5 border-l-2 border-[#F13A34] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-[#F13A34]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
              Our Blog
            </span>
          </div>
          
          <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900 leading-tight ">
            Thoughts, ideas <br />& creative stories
          </h2>
          <p className="mt-4 text-[15px] text-neutral-600 max-w-2xl leading-relaxed">
            Carefully crafted insights on design, development and modern digital experiences.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((blog, i) => (
            <motion.div
              key={blog.id || blog.slug || i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(blog.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link
                to={`/blog/${blog.slug || blog.id}`}
                className="group relative block border border-neutral-200 bg-white transition-all duration-500 hover:border-[#F13A34]/40"
              >
                <CornerBrackets />

                {/* Image */}
                <div className="relative h-[280px] overflow-hidden bg-neutral-100">
                  <img
                    src={blog.image || "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-black/80 backdrop-blur-sm px-3 py-1.5 border border-white/20">
                      <span className="h-1 w-1 rounded-full bg-[#F13A34]" />
                      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
                        {blog.category || "Article"}
                      </span>
                    </span>
                  </div>

                  {/* Read Time */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-white/10">
                      <span className="font-mono text-[9px] text-white/60">
                        {blog.read_time || "5 min read"}
                      </span>
                    </span>
                  </div>

                  {/* Hover Overlay Content */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      opacity: hoveredId === blog.id ? 1 : 0
                    }}
                  >
                    <div className="flex items-center gap-3 text-white/80 mb-2">
                      <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em]">
                        <Calendar size={12} />
                        {blog.published_at || blog.date || new Date().toLocaleDateString()}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                      <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em]">
                        <User size={12} />
                        {blog.author || "Team"}
                      </span>
                    </div>
                    <h3 className="font-mono text-[15px] font-semibold text-white leading-snug">
                      {blog.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-white/70 leading-relaxed line-clamp-2">
                      {blog.excerpt || blog.summary || ""}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white group-hover:text-[#F13A34] transition-colors duration-300">
                        Read Article
                        <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Content - Visible on non-hover */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                      <Calendar size={12} />
                      {blog.published_at || blog.date || new Date().toLocaleDateString()}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-neutral-300" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                      {blog.read_time || "5 min read"}
                    </span>
                  </div>
                  <h3 className="font-mono text-[15px] font-semibold text-neutral-900 group-hover:text-[#F13A34] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-neutral-600 leading-relaxed line-clamp-2">
                    {blog.excerpt || blog.summary || ""}
                  </p>
                  <div className="mt-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F13A34] group-hover:gap-3 transition-all duration-300">
                    Read Article
                    <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section - Studio Monitor Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 relative border border-neutral-200 bg-white p-10 md:p-14 text-center transition-colors duration-500 hover:border-[#F13A34]/40"
        >
          <CornerBrackets size="h-4 w-4" />
          <Tab label="NEWSLETTER" />

          <div className="pt-6">
            <h2 className="font-mono text-[clamp(1.5rem,2.5vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900 mb-4">
              Get new posts in your inbox
            </h2>
            <p className="text-[15px] text-neutral-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              A short email when we publish new breakdowns, frameworks, and behind-the-scenes looks at our client work.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 border border-neutral-300 bg-neutral-50 px-4 py-3 text-[13px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#F13A34] focus:ring-1 focus:ring-[#F13A34] transition-all duration-300 hover:border-neutral-400"
              />
              <button className="group inline-flex items-center justify-center gap-2 bg-[#F13A34] px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#F13A34] hover:border hover:border-[#F13A34] whitespace-nowrap">
                <span className="relative flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
                  Subscribe
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;