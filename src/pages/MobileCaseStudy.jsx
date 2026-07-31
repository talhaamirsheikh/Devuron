import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Code,
  CheckCircle2,
  Lightbulb,
  Target,
  Layers,
  Home,
  Smartphone,
  ExternalLink,
  X,
  ZoomIn,
  Award,
  Github,
} from "lucide-react";
import GlobalHero from "../utils/GlobalHero";
import MobileDevelopment from "../Portfolio/MobileDevelopment";

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

const platformColors = {
  Android: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/30", dot: "bg-emerald-500" },
  iOS: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/30", dot: "bg-blue-500" },
  Flutter: { bg: "bg-[#4db9e0]/10", text: "text-[#4db9e0]", border: "border-[#4db9e0]/30", dot: "bg-[#4db9e0]" },
  "React Native": { bg: "bg-violet-500/10", text: "text-violet-600", border: "border-violet-500/30", dot: "bg-violet-500" },
};

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
        {/* Counter */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[11px] text-white/50 uppercase tracking-[0.2em]">
          {current + 1} / {images.length}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 z-10"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 flex h-12 w-12 items-center justify-center border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25 }}
          className="relative max-h-[88vh] max-w-[90vw] md:max-w-[60vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[current]}
            alt={`Screenshot ${current + 1}`}
            className="max-h-[88vh] w-auto object-contain rounded shadow-2xl"
            draggable={false}
          />
        </motion.div>

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 flex h-12 w-12 items-center justify-center border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-[#4db9e0]" : "w-1.5 bg-white/30"}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

const MobileCaseStudy = () => {
  const { slug } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const project = MobileDevelopment.find((p) => p.slug === slug);

  const currentIndex = MobileDevelopment.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? MobileDevelopment[currentIndex - 1] : MobileDevelopment[MobileDevelopment.length - 1];
  const nextProject = currentIndex < MobileDevelopment.length - 1 ? MobileDevelopment[currentIndex + 1] : MobileDevelopment[0];

  const pColors = platformColors[project?.platform] || platformColors["Android"];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-[#4db9e0] mb-4 font-mono text-[11px] uppercase tracking-[0.2em]">Project Not Found</p>
          <p className="text-[14px] text-gray-600 mb-6">The mobile project you're looking for doesn't exist.</p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-[#4db9e0] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#4db9e0] border border-transparent hover:border-[#4db9e0]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: project.title, href: "#", current: true },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <GlobalHero
        title={project.title}
        subtitle={`${project.platform} App`}
        description={project.description}
        breadcrumbs={breadcrumbs}
        backgroundImage={project.image}
        centered={true}
        titleColors={{ first: "white", second: "#4db9e0" }}
      />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Quick Info Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16"
        >
          {[
            { icon: Smartphone, label: "Platform", value: project.platform },
            { icon: Code, label: "Role", value: project.role },
            { icon: Layers, label: "Category", value: "Mobile App" },
            { icon: Award, label: "Screenshots", value: `${project.gallery.length} views` },
          ].map((item, idx) => (
            <div key={idx} className="relative border border-gray-200 bg-white p-4 text-center">
              <CornerBrackets size="h-2 w-2" />
              <item.icon className="h-4 w-4 text-[#4db9e0] mx-auto mb-1.5" />
              <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-500">{item.label}</div>
              <div className="font-mono text-[11px] font-medium text-gray-900 truncate">{item.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Platform Badge + Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-3 mb-16"
        >
          <span className={`inline-flex items-center gap-2 border ${pColors.border} ${pColors.bg} px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] ${pColors.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${pColors.dot}`} />
            {project.platform}
          </span>

          {project.url && project.url !== "#" && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-700 hover:border-[#4db9e0]/40 hover:text-[#4db9e0] transition-all duration-200"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View on Store
            </a>
          )}
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative border border-gray-200 bg-white p-8 md:p-10">
            <CornerBrackets size="h-4 w-4" />
            <Tab label="OVERVIEW" />
            <div className="pt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center border border-[#4db9e0]/30 bg-[#4db9e0]/10">
                  <Layers className="h-5 w-5 text-[#4db9e0]" />
                </div>
                <h2 className="font-mono text-[18px] font-black uppercase tracking-tight text-gray-900">Project Overview</h2>
              </div>
              <p className="text-[15px] text-gray-600 leading-relaxed">{project.fullDescription}</p>
            </div>
          </div>
        </motion.div>

        {/* Challenge & Solution */}
        {(project.challenge || project.solution) && (
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {project.challenge && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative border border-gray-200 bg-white p-8"
              >
                <CornerBrackets size="h-3 w-3" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-amber-500/30 bg-amber-50">
                    <Target className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-gray-900">The Challenge</h3>
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed">{project.challenge}</p>
              </motion.div>
            )}

            {project.solution && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative border border-[#4db9e0]/30 bg-[#4db9e0]/5 p-8"
              >
                <CornerBrackets size="h-3 w-3" borderColor="border-[#4db9e0]/30" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#4db9e0]/30 bg-[#4db9e0]/10">
                    <Lightbulb className="h-5 w-5 text-[#4db9e0]" />
                  </div>
                  <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-[#4db9e0]">Our Solution</h3>
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed">{project.solution}</p>
              </motion.div>
            )}
          </div>
        )}

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="relative border border-gray-200 bg-white p-8 md:p-10">
              <CornerBrackets size="h-4 w-4" />
              <Tab label="TECHNOLOGIES" />
              <div className="pt-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center border border-indigo-500/30 bg-indigo-50">
                    <Code className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h2 className="font-mono text-[18px] font-black uppercase tracking-tight text-gray-900">Technologies Used</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.04 }}
                      className="inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-gray-700 hover:border-[#4db9e0]/40 hover:text-[#4db9e0] transition-all cursor-default"
                    >
                      <Sparkles className="h-3 w-3 text-[#4db9e0]" />
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Features */}
        {project.features?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="relative border border-gray-200 bg-white p-8 md:p-10">
              <CornerBrackets size="h-4 w-4" />
              <Tab label="FEATURES" />
              <div className="pt-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#4db9e0]/30 bg-[#4db9e0]/10">
                    <Award className="h-5 w-5 text-[#4db9e0]" />
                  </div>
                  <h2 className="font-mono text-[18px] font-black uppercase tracking-tight text-gray-900">Key Features</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.07 }}
                      className="flex items-start gap-4 border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="flex h-8 w-8 items-center justify-center border border-[#4db9e0]/30 bg-[#4db9e0]/10 flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-[#4db9e0]" />
                      </div>
                      <p className="text-[14px] text-gray-700 leading-relaxed">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Image Gallery */}
        {project.gallery?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="relative border border-gray-200 bg-white p-8 md:p-10">
              <CornerBrackets size="h-4 w-4" />
              <Tab label="GALLERY" />
              <div className="pt-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center border border-violet-500/30 bg-violet-50">
                    <Layers className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <h2 className="font-mono text-[18px] font-black uppercase tracking-tight text-gray-900">App Screenshots</h2>
                    <p className="font-mono text-[10px] text-gray-400 tracking-[0.15em]">Click any image to view fullscreen</p>
                  </div>
                </div>

                {/* Responsive gallery grid — portrait ratio for mobile screenshots */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {project.gallery.map((src, idx) => (
                    <motion.div
                      key={idx}
                      className="group relative overflow-hidden border border-gray-200 bg-gray-50 cursor-pointer"
                      style={{ aspectRatio: "9/16" }}
                      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(77,185,224,0.18)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      onClick={() => setLightboxIndex(idx)}
                    >
                      {/* Scroll hint line */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 z-20 overflow-hidden">
                        <motion.div
                          className="h-full bg-[#4db9e0]"
                          initial={{ scaleX: 0, transformOrigin: "left" }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      <img
                        src={src}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.parentElement.style.background =
                            "linear-gradient(135deg, #0f2942 0%, #1a4a6e 100%)";
                          e.target.style.display = "none";
                        }}
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                      {/* Zoom icon */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/60 backdrop-blur-sm">
                          <ZoomIn className="h-4 w-4 text-white" />
                        </div>
                      </div>

                      {/* Index badge */}
                      <div className="absolute bottom-2 right-2 z-20 font-mono text-[9px] text-white/70 bg-black/50 px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {idx + 1}/{project.gallery.length}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Prev / Next Navigation */}
        <div className="space-y-8 border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to={`/portfolio/mobile/${prevProject.slug}`}
              className="group relative border border-gray-200 bg-white p-6 transition-colors duration-300 hover:border-[#4db9e0]/40"
            >
              <CornerBrackets size="h-2 w-2" />
              <div className="flex items-center gap-4">
                <ChevronLeft className="h-5 w-5 text-gray-400 group-hover:text-[#4db9e0] transition-colors" />
                <div>
                  <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-500">Previous</div>
                  <div className="font-mono text-[11px] font-medium text-gray-900 group-hover:text-[#4db9e0] transition-colors">
                    {prevProject.title}
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to={`/portfolio/mobile/${nextProject.slug}`}
              className="group relative border border-gray-200 bg-white p-6 transition-colors duration-300 hover:border-[#4db9e0]/40"
            >
              <CornerBrackets size="h-2 w-2" />
              <div className="flex items-center justify-end gap-4">
                <div className="text-right">
                  <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-500">Next</div>
                  <div className="font-mono text-[11px] font-medium text-gray-900 group-hover:text-[#4db9e0] transition-colors">
                    {nextProject.title}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#4db9e0] transition-colors" />
              </div>
            </Link>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative border border-[#4db9e0]/30 bg-white p-8 md:p-12 text-center"
          >
            <CornerBrackets size="h-4 w-4" borderColor="border-[#4db9e0]/30" />
            <div className="absolute -top-px left-1/2 -translate-x-1/2 flex items-center gap-2 border-b border-x border-[#4db9e0]/30 bg-white px-6 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4db9e0] motion-safe:animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#4db9e0]">GET STARTED</span>
            </div>
            <div className="pt-6">
              <h3 className="font-mono text-[clamp(1.2rem,2vw,1.8rem)] font-black uppercase tracking-tight text-gray-900 mb-4">
                Need a Mobile App?
              </h3>
              <p className="text-[15px] text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                Let's build a high-quality, performant mobile application tailored to your users and business goals.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-[#4db9e0] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#4db9e0] border border-transparent hover:border-[#4db9e0]"
              >
                <span className="relative flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
                  Start a Conversation
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={project.gallery}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};

export default MobileCaseStudy;
