import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Home } from "lucide-react";
import { motion } from "framer-motion";
import GlobalHero from "../utils/GlobalHero";
import { blogPosts } from "../constants/blog";

/* ------------------ ANIMATION ------------------ */
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
          className="mb-20 max-w-2xl"
        >
          <span className="uppercase tracking-[0.35em] text-sm text-[#D83735] font-semibold">
            Our Blog
          </span>
          <h2 className="mt-6 text-5xl font-bold text-black leading-tight">
            Thoughts, ideas <br /> & creative stories
          </h2>
          <p className="mt-6 text-gray-600">
            Carefully crafted insights on design, development and modern
            digital experiences.
          </p>
        </motion.div>

        {/* ---------- BLOG GRID ---------- */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((blog, i) => (
            <motion.div
              key={blog.id || blog.slug || i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link
                to={`/blog/${blog.slug || blog.id}`}
                className="group relative block rounded-3xl overflow-hidden"
              >
                {/* ---------- IMAGE ---------- */}
                <div className="relative h-[420px] overflow-hidden">
                  <img
                    src={blog.image ? blog.image : "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    alt={blog.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 group-hover:bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90" />
                  {/* Hover Overlay Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="flex items-center text-sm text-white mb-3">
                      <Calendar size={14} className="mr-2" />
                      {blog.published_at || blog.date || new Date().toLocaleDateString()}
                    </span>
                    <h3 className="text-2xl font-semibold text-white leading-snug">
                      {blog.title}
                    </h3>
                    <p className="mt-3 text-white text-sm leading-relaxed">
                      {blog.excerpt || blog.summary || ""}
                    </p>
                    <div className="mt-8">
                      <span
                        className="inline-flex items-center gap-2 rounded-full
                        bg-[#D83735] px-6 py-3 text-sm font-medium text-white
                        shadow-lg shadow-[#D83735]/30
                        transition-all duration-300
                        group-hover:gap-3 group-hover:shadow-xl"
                      >
                        Read Article
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                {/* ---------- CARD BASE ---------- */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 group-hover:ring-[#D83735]/40 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-black rounded-3xl p-10 md:p-14 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Get new posts in your inbox
          </h2>
          <p className="text-sm md:text-base mb-7 opacity-90 max-w-2xl mx-auto">
            A short email when we publish new breakdowns, frameworks, and
            behind-the-scenes looks at our client work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 px-6 py-3 rounded-full text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] border border-transparent focus:border-transparent"
            />
            <button className="btn-primary whitespace-nowrap justify-center">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;