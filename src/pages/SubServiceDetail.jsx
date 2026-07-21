import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import GlobalHero from "../utils/GlobalHero";
import { services } from "../constants/services";

const SubServiceDetail = () => {
  const { slug, subSlug } = useParams();
  const navigate = useNavigate();
  
  const parentService = services.find(s => s.slug === slug);
  const subServiceData = parentService?.subServices?.find(s => s.slug === subSlug) || null;

  const subService = subServiceData ? {
    ...subServiceData,
    parentService: parentService
  } : null;

  if (!subService) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-500 mb-6">Sub-service not found</p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold"
          >
            <ArrowLeft size={18} />
            Back to services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Global Hero Section */}
      <GlobalHero
        title={subService?.hero_heading || subService?.name || subService?.title}
        subtitle="Sub-Service Details"
        description={subService?.hero_paragraph || subService?.description || ""}
        breadcrumbs={[
          { label: "Home", icon: Home, href: "/" },
          { label: "Services", href: "/services", current: false },
          { label: "Back to Service", href: `/services/${slug}`, current: false },
          { label: subService?.name || subService?.title, href: `#`, current: true },
        ]}
        backgroundImage={subService?.hero_image ? subService.hero_image : subService?.image ? subService.image : "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
        centered={true}
        titleColors={{
          first: "white",
          second: "#f13a34",
        }}
      />

      {/* Main Content */}
      <div className="section-container max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1 hover:text-neutral-900 transition-colors duration-200"
            >
              <ArrowLeft size={14} />
              Back
            </button>
          </div>
          <h1 className="section-heading text-neutral-900 mb-4">
            {subService.title}
          </h1>
          <p className="section-subtitle mb-7">
            {subService.description}
          </p>
          <Link to="/contact" className="btn-primary">
            Get this service
          </Link>
        </div>

        {/* Content Section */}
        <div className="mb-16">
          <div className="bg-[#F6F4EF] rounded-3xl p-8 md:p-10 mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-4">
              Overview
            </h2>
            <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
              {subService.fullContent}
            </p>
          </div>

          {/* Benefits Section */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-6">
              Key benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                "Professional quality & expertise",
                "Customized solutions",
                "On-time delivery",
                "Clear, transparent pricing",
                "Dedicated support",
                "Scalable services",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 bg-white border border-neutral-200 rounded-2xl p-5"
                >
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm text-neutral-800 font-medium">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-6">
              How we’ll work together
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Discovery",
                  desc: "We clarify goals, audiences, constraints, and success metrics.",
                },
                {
                  step: 2,
                  title: "Planning",
                  desc: "We define scope, milestones, and deliverables in a clear roadmap.",
                },
                {
                  step: 3,
                  title: "Execution",
                  desc: "We ship high-quality work in tight feedback loops with your team.",
                },
                {
                  step: 4,
                  title: "Delivery",
                  desc: "We hand over assets, documentation, and provide post-launch support.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5 items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white text-xs font-semibold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-6">
              FAQ
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: "How long does this service take?",
                  a: "Timelines vary depending on scope. During discovery we identify dependencies and provide a clear schedule before we begin.",
                },
                {
                  q: "What are the pricing options?",
                  a: "We offer fixed-scope packages and retainer-based engagements. After a short intro call we’ll match you with the right option.",
                },
                {
                  q: "Do you offer revisions?",
                  a: "Yes. Each engagement includes structured feedback rounds so we can refine work together.",
                },
                {
                  q: "Can this service be customized?",
                  a: "Absolutely. Every engagement is tailored to your team, stack, and internal workflows.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group border border-neutral-200 rounded-2xl p-4 cursor-pointer hover:border-[var(--color-primary)] transition-colors duration-200"
                >
                  <summary className="flex items-center justify-between text-sm font-semibold text-neutral-900 select-none">
                    {item.q}
                    <span className="text-xs group-open:rotate-180 transition-transform duration-200">
                      ▼
                    </span>
                  </summary>
                  <p className="text-sm text-neutral-600 mt-3">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="section-container max-w-4xl mx-auto bg-black rounded-3xl p-9 md:p-12 text-white text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to explore this in more detail?
          </h2>
          <p className="text-sm md:text-base mb-6 max-w-2xl mx-auto text-white/80">
            Share a bit about your use case and we’ll come prepared with
            examples, options, and a suggested starting point.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Contact us
              <ArrowRight size={16} />
            </Link>
            <Link
              to={`/services/${slug}`}
              className="btn-secondary inline-flex items-center justify-center gap-2 border-white/40 text-white bg-transparent hover:bg-white/10"
            >
              View all services
            </Link>
          </div>
        </div>

        {/* Related Services Link */}
        <div className="text-center">
          <Link
            to={`/services/${slug}`}
            className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold text-sm transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            Back to {subService.parentService.title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubServiceDetail;
