import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  Target,
  Award,
  Code,
  BarChart3,
  CheckCircle2,
  Lightbulb,
  Home,
  ChevronRight as ChevronRightIcon
} from "lucide-react";
import GlobalHero from "../utils/GlobalHero";
import { portfolioProjects } from "../constants/portfolio";

// Corner Brackets Component
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

const PortfolioDetail = () => {
  const { id } = useParams();
  const project = portfolioProjects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-[#4db9e0] mb-4 font-mono text-[11px] uppercase tracking-[0.2em]">Project Not Found</p>
          <p className="text-[14px] text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-[#4db9e0] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#4db9e0] hover:border hover:border-[#4db9e0]"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="relative flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
              Back to Portfolio
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = portfolioProjects.findIndex(p => p.id === parseInt(id));
  const nextProject = portfolioProjects[(currentIndex + 1) % portfolioProjects.length];
  const prevProject = portfolioProjects[(currentIndex - 1 + portfolioProjects.length) % portfolioProjects.length];

  const projectDetails = {
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker", "GraphQL"],
    teamSize: "6-8",
    timeline: {
      start: "Jan 2024",
      end: "Mar 2024"
    },
    deliverables: [
      "Responsive web application",
      "Admin dashboard",
      "User authentication system",
      "Payment integration",
      "Analytics dashboard",
      "Mobile-responsive design"
    ],
    metrics: {
      users: "10,000+",
      satisfaction: "98%",
      uptime: "99.9%"
    }
  };

  const portfolioBreadcrumbs = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: project.title, href: "#", current: true },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Global Hero with Navbar */}
      <GlobalHero 
        title={project.title}
        subtitle={project.category}
        description={project.fullDescription || project.description}
        breadcrumbs={portfolioBreadcrumbs}
        backgroundImage={project.image}
        centered={true}
        titleColors={{ first: "white", second: "#4db9e0" }}
      />

      {/* Main Content */}
      <div className="section-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Quick Info Cards - Studio Monitor Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-16"
        >
          {[
            { icon: Clock, label: "Duration", value: project.duration },
            { icon: Users, label: "Client", value: project.client },
            { icon: TrendingUp, label: "Impact", value: project.impact },
            { icon: Calendar, label: "Completed", value: projectDetails.timeline.end },
            { icon: Users, label: "Team Size", value: projectDetails.teamSize }
          ].map((item, idx) => (
            <div key={idx} className="relative border border-gray-200 bg-white p-4 text-center">
              <CornerBrackets size="h-2 w-2" />
              <item.icon className="h-4 w-4 text-[#4db9e0] mx-auto mb-1.5" />
              <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-500">{item.label}</div>
              <div className="font-mono text-[11px] font-medium text-gray-900">{item.value}</div>
            </div>
          ))}
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
              <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
                {project.fullDescription || project.description}
              </p>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(projectDetails.metrics).map(([key, value]) => (
                  <div key={key} className="relative border border-gray-200 bg-gray-50 p-4 text-center">
                    <CornerBrackets size="h-2 w-2" />
                    <div className="font-mono text-[18px] font-black text-gray-900">{value}</div>
                    <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Challenge & Solution */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
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
        </div>

        {/* Technologies */}
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
                {projectDetails.technologies.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-gray-700 hover:border-[#4db9e0]/40 transition-all"
                  >
                    <Sparkles className="h-3 w-3 text-[#4db9e0]" />
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Results */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative border border-gray-200 bg-white p-8 md:p-10">
            <CornerBrackets size="h-4 w-4" />
            <Tab label="RESULTS" />

            <div className="pt-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center border border-[#4db9e0]/30 bg-[#4db9e0]/10">
                  <Award className="h-5 w-5 text-[#4db9e0]" />
                </div>
                <h2 className="font-mono text-[18px] font-black uppercase tracking-tight text-gray-900">Key Results</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {project.results.map((result, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center border border-[#4db9e0]/30 bg-[#4db9e0]/10 flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-[#4db9e0]" />
                    </div>
                    <p className="text-[14px] text-gray-700 leading-relaxed">{result}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Deliverables */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative border border-gray-200 bg-white p-8 md:p-10">
            <CornerBrackets size="h-4 w-4" />
            <Tab label="DELIVERABLES" />

            <div className="pt-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center border border-emerald-500/30 bg-emerald-50">
                  <BarChart3 className="h-5 w-5 text-emerald-600" />
                </div>
                <h2 className="font-mono text-[18px] font-black uppercase tracking-tight text-gray-900">Project Deliverables</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projectDetails.deliverables.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 border border-gray-200 bg-white p-4"
                  >
                    <div className="h-2 w-2 rounded-full bg-[#4db9e0] flex-shrink-0" />
                    <span className="text-[13px] text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Highlights */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative border border-gray-200 bg-white p-8 md:p-10">
            <CornerBrackets size="h-4 w-4" />
            <Tab label="HIGHLIGHTS" />

            <div className="pt-4">
              <h3 className="font-mono text-[18px] font-black uppercase tracking-tight text-gray-900 mb-6">What We Delivered</h3>
              <div className="flex flex-wrap gap-3">
                {project.highlights.map((item, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="inline-flex items-center gap-2 border border-[#4db9e0]/30 bg-[#4db9e0]/5 px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-[#4db9e0]"
                  >
                    <Sparkles className="h-3 w-3" />
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
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
                <h3 className="font-mono text-[18px] font-black uppercase tracking-tight text-gray-900 mb-6">Project Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.gallery.map((image, idx) => (
                    <motion.div 
                      key={idx} 
                      className="relative overflow-hidden border border-gray-200 group"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img
                        src={image}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Navigation */}
        <div className="space-y-8 border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevProject && (
              <Link
                to={`/portfolio/${prevProject.id}`}
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
            )}
            
            {nextProject && (
              <Link
                to={`/portfolio/${nextProject.id}`}
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
            )}
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
                Ready to Start Your Project?
              </h3>
              <p className="text-[15px] text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                Let's discuss how we can help your brand achieve similar results and drive measurable growth.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-[#4db9e0] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#4db9e0] hover:border hover:border-[#4db9e0]"
              >
                <span className="relative flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
                  Start a Conversation
                  <ChevronRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;