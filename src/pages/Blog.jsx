import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Home, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import GlobalHero from "../utils/GlobalHero";
import { blogPosts } from "../constants/blog";

/* Reusable Components */
const CornerBrackets = ({ size = "h-3 w-3", borderColor = "border-gray-300" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

const Tab = ({ label }) => (
  <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-gray-200 bg-white px-4 py-1.5">
    <span className="h-1.5 w-1.5 rounded-full bg-[#4db9e0] motion-safe:animate-pulse" />
    <span className="font-mono text-[9px] tracking-[0.2em] text-gray-500">{label}</span>
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
          second: "#4db9e0",
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
          <div className="inline-flex items-center gap-2.5 border-l-2 border-[#4db9e0] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-[#4db9e0]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-700">
              Our Blog
            </span>
          </div>
          
          <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black uppercase tracking-tight text-gray-900 leading-tight ">
            Thoughts, ideas <br />& creative stories
          </h2>
          <p className="mt-4 text-[15px] text-gray-600 max-w-2xl leading-relaxed">
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
                className="group relative block border border-gray-200 bg-white transition-all duration-500 hover:border-[#4db9e0]/40"
              >
                <CornerBrackets />

                {/* Image */}
                <div className="relative h-[280px] overflow-hidden bg-gray-100">
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
                      <span className="h-1 w-1 rounded-full bg-[#4db9e0]" />
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

                  {/* Hover Overlay Content - Different from default */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      opacity: hoveredId === blog.id ? 1 : 0
                    }}
                  >
                    <div className="flex items-center gap-3 text-white/80 mb-2">
                      {/* <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em]">
                        <Calendar size={12} />
                        {blog.published_at || blog.date || new Date().toLocaleDateString()}
                      </span> */}
                      {/* <span className="h-1 w-1 rounded-full bg-white/30" />
                      <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em]">
                        <User size={12} />
                        {blog.author || "Team"}
                      </span> */}
                    </div>
                    {/* <h3 className="font-mono text-[15px] font-semibold text-white leading-snug">
                      {blog.title}
                    </h3> */}
                    {/* Hover Description - Different from default */}
                    <p className="mt-2 text-[13px] text-white/70 leading-relaxed line-clamp-3">
                      {blog.hover_description || blog.excerpt || blog.summary || ""}
                    </p>
                    {/* <div className="mt-4">
                      <span className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white group-hover:text-[#4db9e0] transition-colors duration-300">
                        Read Article
                        <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div> */}
                  </motion.div>
                </div>

                {/* Content - Default View */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-gray-400">
                      <Calendar size={12} />
                      {blog.published_at || blog.date || new Date().toLocaleDateString()}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-400">
                      {blog.read_time || "5 min read"}
                    </span>
                  </div>
                  <h3 className="font-mono text-[15px] font-semibold text-gray-900 group-hover:text-[#4db9e0] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  {/* Default Description */}
                  <p className="mt-2 text-[13px] text-gray-600 leading-relaxed line-clamp-2">
                    {blog.excerpt || blog.summary || ""}
                  </p>
                  <div className="mt-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4db9e0] group-hover:gap-3 transition-all duration-300">
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
          className="mt-20 relative border border-gray-200 bg-white p-10 md:p-14 text-center transition-colors duration-500 hover:border-[#4db9e0]/40"
        >
          <CornerBrackets size="h-4 w-4" />
          <Tab label="NEWSLETTER" />

          <div className="pt-6">
            <h2 className="font-mono text-[clamp(1.5rem,2.5vw,2.8rem)] font-black uppercase tracking-tight text-gray-900 mb-4">
              Get new posts in your inbox
            </h2>
            <p className="text-[15px] text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              A short email when we publish new breakdowns, frameworks, and behind-the-scenes looks at our client work.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 border border-gray-300 bg-gray-50 px-4 py-3 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4db9e0] focus:ring-1 focus:ring-[#4db9e0] transition-all duration-300 hover:border-gray-400"
              />
              <button className="group inline-flex items-center justify-center gap-2 bg-[#4db9e0] px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#4db9e0] hover:border hover:border-[#4db9e0] whitespace-nowrap">
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