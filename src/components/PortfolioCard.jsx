import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

// Corner Brackets Component
const CornerBrackets = ({ size = "h-3 w-3", borderColor = "border-neutral-300" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

const PortfolioCard = ({ project, index }) => {
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (imgRef.current) {
      const img = imgRef.current;
      const container = containerRef.current;
      if (img && container) {
        const renderedHeight = (img.offsetWidth / (img.naturalWidth || 1280)) * (img.naturalHeight || 900);
        const scrollDistance = Math.max(renderedHeight - container.offsetHeight, 0);
        img.style.transition = `transform ${Math.max(scrollDistance / 60, 2)}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        img.style.transform = `translateY(-${scrollDistance}px)`;
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (imgRef.current) {
      imgRef.current.style.transition = "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      imgRef.current.style.transform = "translateY(0)";
    }
  };

  // Category badge color map
  const categoryColors = {
    "Healthcare Website": {
      bg: "bg-emerald-500/15",
      text: "text-emerald-400",
      dot: "bg-emerald-400",
      border: "border-emerald-500/20",
    },
    "Business Website": {
      bg: "bg-violet-500/15",
      text: "text-violet-400",
      dot: "bg-violet-400",
      border: "border-violet-500/20",
    },
    "Agency Website": {
      bg: "bg-[#4db9e0]/15",
      text: "text-[#4db9e0]",
      dot: "bg-[#4db9e0]",
      border: "border-[#4db9e0]/20",
    },
    "Web Development": {
      bg: "bg-orange-500/15",
      text: "text-orange-400",
      dot: "bg-orange-400",
      border: "border-orange-500/20",
    },
  };

  const colors = categoryColors[project.category] || categoryColors["Web Development"];
  const isMobile = project.category === "Mobile Development";
  const cardLink = isMobile ? `/portfolio/mobile/${project.slug}` : `/portfolio/${project.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative border border-neutral-200 bg-white transition-all duration-500 hover:border-[#4db9e0]/40"
      onMouseEnter={isMobile ? undefined : handleMouseEnter}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
    >
      <CornerBrackets />

      {/* Screenshot Preview */}
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-neutral-100 border-b border-neutral-200"
        style={isMobile ? { height: "300px" } : { height: "240px" }}
      >
        {/* Scroll hint bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 z-20 overflow-hidden">
          <motion.div
            className="h-full bg-[#4db9e0]"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Website Screenshot */}
        <img
          ref={imgRef}
          src={project.image}
          alt={`${project.title} ${isMobile ? "app screenshot" : "website screenshot"}`}
          className={`w-full ${isMobile ? "object-cover object-top" : "object-cover object-top"}`}
          style={{
            transform: "translateY(0)",
            minHeight: isMobile ? "300px" : "240px",
            display: "block",
            height: isMobile ? "300px" : "auto",
          }}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.style.background =
              "linear-gradient(135deg, #0f2942 0%, #1a4a6e 50%, #0f2942 100%)";
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 pointer-events-none" />

        {/* Category Badge - Studio Monitor Style */}
        <div className="absolute top-3.5 left-3.5 z-20">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 border ${colors.bg} ${colors.text} ${colors.border} bg-black/80 backdrop-blur-sm`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
              {project.category}
            </span>
          </span>
        </div>

        {/* View Project Link */}
        <Link
          to={cardLink}
          className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <div className="text-center text-white px-6">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-black/60 px-4 py-2 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4db9e0]" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                View Case Study
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
        </Link>

        {/* Scroll indicator overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title */}
        <h3 className="font-mono text-[15px] font-bold uppercase tracking-[0.15em] text-neutral-900 mb-2 group-hover:text-[#4db9e0] transition-colors duration-300 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-neutral-600 leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2.5 py-1 border border-neutral-200 bg-neutral-50 text-neutral-600 text-[9px] font-mono font-medium uppercase tracking-[0.1em] hover:border-[#4db9e0]/40 hover:text-[#4db9e0] transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3.5 border-t border-neutral-200">
          <Link
            to={cardLink}
            className="group/btn inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4db9e0] hover:text-[#10475c] transition-colors duration-200"
          >
            <span className="relative flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#4db9e0]" />
              View Case Study
            </span>
            <ArrowUpRight
              size={13}
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;