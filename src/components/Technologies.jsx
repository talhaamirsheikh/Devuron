import React, { useState, useRef } from "react";
import { motion, animate } from "framer-motion";
import { Sparkles } from "lucide-react";

// Technologies Data
const CATEGORIES = [
  {
    name: 'Frontend',
    items: [
      { name: 'HTML5', slug: 'html5', color: '#E34F26' },
      { name: 'CSS3', slug: 'css3', color: '#1572B6' },
      { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
      { name: 'React.js', slug: 'react', color: '#61DAFB' },
      { name: 'Next.js', slug: 'nextdotjs', color: '#000000' },
    ],
  },
  {
    name: 'Backend & CMS',
    items: [
      { name: 'Node.js', slug: 'nodedotjs', color: '#339933' },
      { name: 'Express.js', slug: 'express', color: '#000000' },
      { name: 'FastAPI', slug: 'fastapi', color: '#009688' },
      { name: 'Django', slug: 'django', color: '#092E20' },
      { name: 'WordPress', slug: 'wordpress', color: '#21759B' },
      { name: 'Shopify', slug: 'shopify', color: '#7AB55C' },
    ],
  },
  {
    name: 'Mobile',
    items: [
      { name: 'Flutter', slug: 'flutter', color: '#02569B' },
      { name: 'Dart', slug: 'dart', color: '#0175C2' },
    ],
  },
  {
    name: 'Languages',
    items: [
      { name: 'Python', slug: 'python', color: '#3776AB' },
      { name: 'C#', slug: 'csharp', color: '#239120' },
    ],
  },
  {
    name: 'Data & ML',
    items: [
      { name: 'NumPy', slug: 'numpy', color: '#013243' },
      { name: 'Pandas', slug: 'pandas', color: '#150458' },
      { name: 'Matplotlib', slug: 'matplotlib', color: '#11557C' },
      { name: 'Plotly', slug: 'plotly', color: '#3F4F75' },
      { name: 'Scikit-learn', slug: 'scikitlearn', color: '#F7931E' },
      { name: 'TensorFlow', slug: 'tensorflow', color: '#FF6F00' },
      { name: 'PyTorch', slug: 'pytorch', color: '#EE4C2C' },
      { name: 'Keras', slug: 'keras', color: '#D00000' },
      { name: 'OpenCV', slug: 'opencv', color: '#5C3EE8' },
      { name: 'LangChain', slug: 'langchain', color: '#1C3C3C' },
    ],
  },
  {
    name: 'Databases',
    items: [
      { name: 'MongoDB', slug: 'mongodb', color: '#47A248' },
      { name: 'MySQL', slug: 'mysql', color: '#4479A1' },
      { name: 'PostgreSQL', slug: 'postgresql', color: '#336791' },
      { name: 'SQLite', slug: 'sqlite', color: '#003B57' },
    ],
  },
];

// Corner Brackets Component
const CornerBrackets = ({ size = "h-3 w-3", borderColor = "border-neutral-300" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

// Monogram Fallback
const Monogram = ({ name, color }) => (
  <div
    className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full text-[11px] font-semibold font-mono"
    style={{ backgroundColor: color, color: '#fff' }}
  >
    {name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase()}
  </div>
);

// Brand Icon
const BrandIcon = ({ slug, name, color, variant }) => {
  const [failed, setFailed] = useState(false);
  
  if (failed) return <Monogram name={name} color={color} />;
  
  const src = variant === 'white'
    ? `https://cdn.simpleicons.org/${slug}/ffffff`
    : `https://cdn.simpleicons.org/${slug}`;
  
  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="h-7 w-7 sm:h-9 sm:w-9 object-contain"
      draggable={false}
    />
  );
};

// Single Tech Tile
const TechTile = ({ tech }) => {
  const { name, slug, color } = tech;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white h-24 sm:h-32 md:h-36 flex items-center justify-center border border-neutral-200 transition-all duration-300 hover:border-[#4db9e0]/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CornerBrackets size="h-2 w-2" />

      {/* Resting State */}
      <div className="flex flex-col items-center justify-center gap-2 px-2">
        <BrandIcon slug={slug} name={name} color={color} variant="colored" />
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] text-neutral-500 text-center leading-tight">
          {name}
        </span>
      </div>

      {/* Hover State - Dark Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0a0a0a] px-2"
      >
        <BrandIcon slug={slug} name={name} color={color} variant="white" />
        <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] text-white text-center">
          {name}
        </span>
        <span
          className="block h-[2px] w-6"
          style={{ backgroundColor: color === '#000000' ? '#4db9e0' : color }}
        />
      </motion.div>
    </div>
  );
};

// Category Block
const CategoryBlock = ({ category, index }) => {
  const num = String(index + 1).padStart(2, '0');

  return (
    <div className="mb-10 last:mb-0">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-[11px] font-semibold text-[#4db9e0]">{num}</span>
        <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-neutral-900">
          {category.name}
        </h3>
        <span className="flex-1 h-px bg-neutral-200" />
        <span className="font-mono text-[10px] text-neutral-400">
          {String(category.items.length).padStart(2, '0')}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {category.items.map((tech) => (
          <TechTile key={tech.slug} tech={tech} />
        ))}
      </div>
    </div>
  );
};

// Main Component
const Technologies = () => {
  return (
    <section className="bg-[#F5F6F8] py-16 sm:py-24">
      <div className="section-container max-w-5xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2.5 border-l-2 border-[#4db9e0] bg-black/[0.03] py-2 pl-4 pr-5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-[#4db9e0]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
              Capabilities
            </span>
          </div>

          <h2 className="font-mono text-[clamp(2rem,4vw,3.5rem)] font-black uppercase tracking-tight text-neutral-900 mt-3">
            Technologies We Use
          </h2>
          <p className="mt-4 max-w-md text-[15px] text-neutral-600 leading-relaxed">
            A working set of tools across the stack, grouped by where they sit in a build, from markup to models.
          </p>
        </motion.div>

        {/* Categories */}
        {CATEGORIES.map((category, i) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <CategoryBlock category={category} index={i} />
          </motion.div>
        ))}
      </div>

      <style>{`
        .section-container {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        @media (min-width: 640px) {
          .section-container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
        
        @media (min-width: 1024px) {
          .section-container {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Technologies;