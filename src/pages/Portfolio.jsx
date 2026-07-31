import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronRight,
  Sparkles,
  Home,
  Target,
  Users,
  TrendingUp,
  Calendar,
  Eye,
  ArrowRight
} from "lucide-react";
import GlobalHero from "../utils/GlobalHero";
import PortfolioCard from "../components/PortfolioCard";
import PortfolioSection from "../components/PortfolioSection";
// import { portfolioProjects } from "../constants/portfolio";

// Reusable components
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
    <span className="h-1.5 w-1.5 rounded-full bg-[#4db9e0] motion-safe:animate-pulse" />
    <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500">{label}</span>
  </div>
);

const Portfolio = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    'All', 
    'Graphic Design & Video Editing', 
    'Website & Web Development', 
    'AI Solutions & Automation', 
    'Mobile App Development', 
    'SEO & Digital Marketing'
  ];

  // const filteredProjects = activeFilter === "All" 
  //   ? portfolioProjects 
  //   : portfolioProjects.filter(project => project.category === activeFilter);

  const portfolioBreadcrumbs = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Portfolio", href: "/portfolio", current: true },
  ];

  const stats = [
    { number: "200+", label: "Projects Completed", icon: Target },
    { number: "150+", label: "Happy Clients", icon: Users },
    { number: "50+", label: "Brands Yearly", icon: TrendingUp },
    { number: "10+", label: "Years Experience", icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Global Hero Section */}
      <GlobalHero
        title="Our Work"
        subtitle="Portfolio Creative Excellence"
        description="Explore our collection of successful projects and client case studies. Each project represents our commitment to delivering measurable results and exceptional creative quality."
        breadcrumbs={portfolioBreadcrumbs}
        backgroundImage="https://images.unsplash.com/photo-1460925895917-adf4e6f3b8c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        centered={true}
        titleColors={{
          first: "white",
          second: "#4db9e0"
        }}
      />

      {/* Portfolio Content */}
      <div className="section-container max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
       
{/* <PortfolioCard /> */}
<PortfolioSection />
        {/* Stats Section - Studio Monitor Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative border border-neutral-200 bg-white p-8 md:p-12 transition-colors duration-500 hover:border-[#4db9e0]/40 mb-16"
        >
          <CornerBrackets size="h-4 w-4" />
          <Tab label="STATS" />

          <div className="pt-4">
            <h2 className="font-mono text-[clamp(1.2rem,2vw,1.8rem)] font-black uppercase tracking-tight text-neutral-900 text-center mb-8">
              Our Track Record
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-[#4db9e0]/30 bg-[#4db9e0]/10 mx-auto mb-3">
                    <stat.icon className="h-5 w-5 text-[#4db9e0]" />
                  </div>
                  <div className="font-mono text-[clamp(1.8rem,2.5vw,3rem)] font-black text-neutral-900 mb-1">
                    {stat.number}
                  </div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section - Studio Monitor Style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative border border-[#4db9e0]/30 bg-white p-8 md:p-12 text-center transition-colors duration-500 hover:border-[#4db9e0]/60"
        >
          <CornerBrackets size="h-4 w-4" borderColor="border-[#4db9e0]/30" />
          
          <div className="absolute -top-px left-1/2 -translate-x-1/2 flex items-center gap-2 border-b border-x border-[#4db9e0]/30 bg-white px-6 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4db9e0] motion-safe:animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#4db9e0]">GET STARTED</span>
          </div>

          <div className="pt-6">
            <h2 className="font-mono text-[clamp(1.5rem,2.5vw,2.8rem)] font-black uppercase tracking-tight text-neutral-900 mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-[15px] text-neutral-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Let's discuss your goals and create something amazing together.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-[#4db9e0] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#4db9e0] hover:border hover:border-[#4db9e0]"
            >
              <span className="relative flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
                Get in Touch
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;