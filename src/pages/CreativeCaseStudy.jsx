import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Target,
  Layers,
  X,
  ZoomIn,
  Palette,
  Film,
  Home,
} from "lucide-react";
import GraphicDesigning from "../Portfolio/GraphicDesigning";
import VideoEditing from "../Portfolio/VideoEditing";

// ─── Sub-components ────────────────────────────────────────────────────────────

const CornerBrackets = ({ size = "h-3 w-3", borderColor = "border-gray-200" }) => (
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

// ─── Lightbox ──────────────────────────────────────────────────────────────────

const Lightbox = ({ images, initialIndex, onClose }) => {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          key="lightbox-content"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-5xl w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[current]}
            alt={`Gallery image ${current + 1}`}
            className="w-full max-h-[80vh] object-contain rounded"
          />
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white/60 hover:text-white transition-colors"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white/60 hover:text-white transition-colors"
              >
                <ChevronRight size={28} />
              </button>
              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === current ? "w-6 bg-[#4db9e0]" : "w-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

const CreativeCaseStudy = ({ type }) => {
  const { slug } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Determine data source
  const allProjects = type === "graphic" ? GraphicDesigning : VideoEditing;
  const project = allProjects.find((p) => p.slug === slug);

  const isVideo = type === "video";
  const accentColor = isVideo ? "text-rose-500" : "text-purple-500";
  const accentBorder = isVideo ? "border-rose-500" : "border-purple-500";
  const accentBg = isVideo ? "bg-rose-500/10" : "bg-purple-500/10";
  const accentDot = isVideo ? "bg-rose-400" : "bg-purple-400";
  const CategoryIcon = isVideo ? Film : Palette;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="font-mono text-2xl font-bold text-neutral-900 mb-4">Project Not Found</h2>
          <Link to="/portfolio" className="text-[#4db9e0] hover:underline font-mono text-sm">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const gallery = project.gallery || [project.image];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-neutral-950 text-white overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#4db9e0 1px, transparent 1px), linear-gradient(90deg, #4db9e0 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-950 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-10 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500"
          >
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Home size={10} />
              Home
            </Link>
            <span>/</span>
            <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-neutral-300">{project.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Category + subcategory */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`inline-flex items-center gap-2 border-l-2 ${accentBorder} pl-3 py-1`}>
                  <CategoryIcon className={`h-3.5 w-3.5 ${accentColor}`} />
                  <span className={`font-mono text-[10px] font-semibold uppercase tracking-[0.2em] ${accentColor}`}>
                    {project.category}
                  </span>
                </span>
                {project.subcategory && (
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.15em]">
                    {project.subcategory}
                  </span>
                )}
              </div>

              <h1 className="font-mono text-[clamp(1.8rem,4vw,3rem)] font-black uppercase tracking-tight text-white mb-5 leading-tight">
                {project.title}
              </h1>

              <p className="text-[15px] text-neutral-400 leading-relaxed max-w-lg">
                {project.description}
              </p>

              {/* Quick stats row */}
              {project.service && (
                <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/10">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-600 block mb-1">Service</span>
                    <span className="font-mono text-[12px] font-semibold text-white">{project.service}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-600 block mb-1">Category</span>
                    <span className="font-mono text-[12px] font-semibold text-white">{project.category}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-600 block mb-1">Tools</span>
                    <span className="font-mono text-[12px] font-semibold text-white">
                      {project.technologies.slice(0, 2).join(", ")}
                      {project.technologies.length > 2 ? ` +${project.technologies.length - 2}` : ""}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right: Hero thumbnail */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div
                className="relative border border-white/10 overflow-hidden rounded cursor-pointer group"
                onClick={() => setLightboxIndex(0)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-video object-cover group-hover:scale-102 transition-transform duration-700"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.style.background =
                      isVideo
                        ? "linear-gradient(135deg, #0d0620 0%, #1a0a3a 50%, #0a0d20 100%)"
                        : "linear-gradient(135deg, #0a0f1e 0%, #1a1050 50%, #0a1628 100%)";
                    e.target.parentElement.style.minHeight = "250px";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={28} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Main content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Full Description */}
            {project.fullDescription && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative border border-neutral-200 p-8"
              >
                <CornerBrackets />
                <Tab label="Project Overview" />
                <div className="pt-4">
                  <div className="flex items-center gap-3 mb-5">
                    <Sparkles className="h-4 w-4 text-[#4db9e0]" />
                    <h2 className="font-mono text-[13px] font-bold uppercase tracking-[0.18em] text-neutral-900">
                      Project Overview
                    </h2>
                  </div>
                  <p className="text-[14px] text-neutral-600 leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Challenge & Solution */}
            {(project.challenge || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.challenge && (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative border border-neutral-200 p-7"
                  >
                    <CornerBrackets />
                    <div className={`inline-flex items-center gap-2 mb-5 px-3 py-1.5 ${accentBg} border ${accentBorder} border-opacity-30`}>
                      <Target className={`h-3.5 w-3.5 ${accentColor}`} />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-700">Challenge</span>
                    </div>
                    <p className="text-[13px] text-neutral-600 leading-relaxed">{project.challenge}</p>
                  </motion.div>
                )}
                {project.solution && (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="relative border border-neutral-200 p-7"
                  >
                    <CornerBrackets />
                    <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 bg-[#4db9e0]/10 border border-[#4db9e0]/30">
                      <Lightbulb className="h-3.5 w-3.5 text-[#4db9e0]" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-700">Solution</span>
                    </div>
                    <p className="text-[13px] text-neutral-600 leading-relaxed">{project.solution}</p>
                  </motion.div>
                )}
              </div>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative border border-neutral-200 p-8"
              >
                <CornerBrackets />
                <Tab label="Deliverables" />
                <div className="pt-4">
                  <div className="flex items-center gap-3 mb-6">
                    <Layers className="h-4 w-4 text-[#4db9e0]" />
                    <h2 className="font-mono text-[13px] font-bold uppercase tracking-[0.18em] text-neutral-900">
                      Key Deliverables
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-[#4db9e0] mt-0.5 flex-shrink-0" />
                        <span className="text-[13px] text-neutral-700 leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <ZoomIn className="h-4 w-4 text-[#4db9e0]" />
                  <h2 className="font-mono text-[13px] font-bold uppercase tracking-[0.18em] text-neutral-900">
                    Project Gallery
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery.map((img, i) => (
                    <div
                      key={i}
                      className="relative border border-neutral-200 overflow-hidden cursor-pointer group"
                      onClick={() => setLightboxIndex(i)}
                    >
                      <img
                        src={img}
                        alt={`${project.title} — Gallery ${i + 1}`}
                        className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.style.background =
                            "linear-gradient(135deg, #0f2942 0%, #1a4a6e 50%, #0f2942 100%)";
                          e.target.parentElement.style.minHeight = "200px";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={22} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative border border-neutral-200 p-6"
            >
              <CornerBrackets />
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
                Tools & Software
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-200 bg-neutral-50 text-neutral-700 text-[10px] font-mono font-medium uppercase tracking-[0.1em]"
                  >
                    <span className={`h-1 w-1 rounded-full ${accentDot}`} />
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Category info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`relative border ${accentBorder} border-opacity-40 p-6 ${accentBg}`}
            >
              <CornerBrackets borderColor={accentBorder} />
              <div className="flex items-center gap-2 mb-3">
                <CategoryIcon className={`h-4 w-4 ${accentColor}`} />
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-700">
                  {project.category}
                </h3>
              </div>
              {project.subcategory && (
                <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.15em]">
                  {project.subcategory}
                </p>
              )}
              {project.service && (
                <p className={`mt-3 font-mono text-[11px] font-semibold ${accentColor}`}>
                  {project.service}
                </p>
              )}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative border border-neutral-200 p-6 bg-neutral-950 text-white"
            >
              <CornerBrackets borderColor="border-white/10" />
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">
                Interested?
              </h3>
              <p className="text-[12px] text-neutral-400 leading-relaxed mb-5">
                Need {isVideo ? "video production" : "graphic design"} for your brand? Let's create something exceptional.
              </p>
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 bg-[#4db9e0] px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#4db9e0]"
              >
                Start a Project
              </Link>
            </motion.div>

            {/* Back link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 hover:text-[#4db9e0] transition-colors duration-200"
              >
                <ChevronLeft size={13} />
                Back to Portfolio
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={gallery}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};

export default CreativeCaseStudy;
