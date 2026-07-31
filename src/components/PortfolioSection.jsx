import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";
import PortfolioCard from "./PortfolioCard";
import WebDevelopment from "../Portfolio/WebDevelopment";
import MobileDevelopment from "../Portfolio/MobileDevelopment";
import GraphicDesigning from "../Portfolio/GraphicDesigning";
import VideoEditing from "../Portfolio/VideoEditing";

const CATEGORIES = [
  "All",
  "Web Development",
  "Mobile Development",
  "Graphic Designing",
  "Video Editing",
];

const ALL_PROJECTS = [
  ...WebDevelopment,
  ...MobileDevelopment,
  ...GraphicDesigning,
  ...VideoEditing,
];

const PortfolioSection = ({ limit, initialFilter = "All", itemsPerPage = 6 }) => {
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  const [currentPage, setCurrentPage] = useState(1);
  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);
  // Determine displayed projects based on limit or pagination
  const filtered =
    activeFilter === "All"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === activeFilter);

  const displayed = limit ? filtered.slice(0, limit) : filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = limit ? 1 : Math.ceil(filtered.length / itemsPerPage);


  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#4db9e0 1px, transparent 1px), linear-gradient(90deg, #4db9e0 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="inline-flex items-center gap-2.5 border-l-2 border-[#4db9e0] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
              <Sparkles className="h-3.5 w-3.5 text-[#4db9e0]" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                Featured Projects
              </span>
            </div>

            <h2 className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900 mb-3">
              Case Studies & Client Success
            </h2>
            <p className="text-[15px] text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Real results from real clients. See how we've helped businesses grow and achieve their goals through strategic work and creative excellence.
            </p>
          </motion.div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-12 "
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`group relative px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? "bg-[#4db9e0] text-white"
                  : "bg-transparent text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:border-[#4db9e0]/40"
              }`}
            >
              {cat}
              {activeFilter === cat && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-6 bg-white" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {displayed.map((project, i) => (
            <PortfolioCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* Pagination Controls */}
        {!limit && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>
            <span className="font-mono text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-[13px] text-neutral-400 font-mono uppercase tracking-[0.18em] mb-5">
            Want to see more of our work?
          </p>
           <Link
                to="/portfolio"
                // onClick={onClose}
                className="group flex w-[20vw] mx-auto items-center  justify-around gap-2 bg-[#4db9e0] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300  hover:bg-white hover:text-[#4db9e0] hover:border-1 hover:border-[#4db9e0]"
              >


                <BriefcaseBusiness size={13} className="opacity-70" />
                View Full Portfolio
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
        
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
