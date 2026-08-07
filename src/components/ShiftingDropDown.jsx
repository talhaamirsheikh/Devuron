import React, { useEffect, useState } from "react";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";

export const ShiftingDropDown = () => {
  return (
    <div className="flex h-96 w-full justify-start bg-[#F5F6F8] p-8 text-neutral-200 md:justify-center">
      <Tabs />
    </div>
  );
};

// Corner Brackets Component
const CornerBrackets = ({ size = "h-3 w-3", borderColor = "border-neutral-300" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

const Tabs = () => {
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(null);

  const handleSetSelected = (val) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }
    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit gap-2"
    >
      {TABS.map((t) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
          >
            {t.title}
          </Tab>
        );
      })}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} />}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({ children, tab, handleSetSelected, selected }) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1.5 border px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
        selected === tab
          ? "border-[#4db9e0] bg-[#4db9e0] text-white"
          : "border-neutral-200 bg-white text-neutral-600 hover:border-[#4db9e0]/40 hover:text-neutral-900"
      }`}
    >
      <span>{children}</span>
      <FiChevronDown
        className={`transition-transform duration-300 ${
          selected === tab ? "rotate-180" : ""
        } ${selected === tab ? "text-white" : "text-neutral-400"}`}
      />
    </button>
  );
};

const Content = ({ selected, dir }) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="absolute left-0 top-[calc(100%_+_16px)] w-96 border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <CornerBrackets size="h-3 w-3" />

      {/* Tab */}
      <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-neutral-200 bg-white px-4 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4db9e0] motion-safe:animate-pulse" />
        <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500">
          {TABS.find(t => t.id === selected)?.title.toUpperCase() || "MENU"}
        </span>
      </div>

      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => {
        return (
          <div className="overflow-hidden pt-4" key={t.id}>
            {selected === t.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <t.Component />
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[16px] left-0 right-0 h-[16px]" />
);

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    moveNub();
  }, [selected]);

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-neutral-200 bg-white"
    />
  );
};

const Products = () => {
  return (
    <div>
      <div className="flex gap-6">
        <div>
          <h3 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4db9e0]">
            Startup
          </h3>
          <a href="#" className="mb-1 block text-[13px] text-neutral-600 hover:text-[#4db9e0] transition-colors">
            Bookkeeping
          </a>
          <a href="#" className="block text-[13px] text-neutral-600 hover:text-[#4db9e0] transition-colors">
            Invoicing
          </a>
        </div>
        <div>
          <h3 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4db9e0]">
            Scaleup
          </h3>
          <a href="#" className="mb-1 block text-[13px] text-neutral-600 hover:text-[#4db9e0] transition-colors">
            Live Coaching
          </a>
          <a href="#" className="mb-1 block text-[13px] text-neutral-600 hover:text-[#4db9e0] transition-colors">
            Reviews
          </a>
          <a href="#" className="block text-[13px] text-neutral-600 hover:text-[#4db9e0] transition-colors">
            Tax/VAT
          </a>
        </div>
        <div>
          <h3 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4db9e0]">
            Enterprise
          </h3>
          <a href="#" className="mb-1 block text-[13px] text-neutral-600 hover:text-[#4db9e0] transition-colors">
            White glove
          </a>
          <a href="#" className="mb-1 block text-[13px] text-neutral-600 hover:text-[#4db9e0] transition-colors">
            SOX Compliance
          </a>
          <a href="#" className="block text-[13px] text-neutral-600 hover:text-[#4db9e0] transition-colors">
            Staffing
          </a>
          <a href="#" className="block text-[13px] text-neutral-600 hover:text-[#4db9e0] transition-colors">
            More
          </a>
        </div>
      </div>

      <button className="ml-auto mt-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4db9e0] hover:text-[#10475c] transition-colors">
        <span>View more</span>
        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className="grid grid-cols-3 gap-4 divide-x divide-neutral-200">
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-3 text-neutral-600 transition-colors hover:text-[#4db9e0]"
      >
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em]">Startup</span>
        <span className="text-[13px]">$29/mo</span>
      </a>
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-3 text-neutral-600 transition-colors hover:text-[#4db9e0]"
      >
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em]">Scaleup</span>
        <span className="text-[13px]">$99/mo</span>
      </a>
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-3 text-neutral-600 transition-colors hover:text-[#4db9e0]"
      >
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em]">Enterprise</span>
        <span className="text-[13px]">Custom</span>
      </a>
    </div>
  );
};

const Blog = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <a href="#" className="group">
          <div className="mb-2 h-14 w-full border border-neutral-200 bg-neutral-100"></div>
          <h4 className="mb-0.5 font-mono text-[12px] font-bold uppercase tracking-[0.15em] text-neutral-900 group-hover:text-[#4db9e0] transition-colors">
            Lorem ipsum dolor
          </h4>
          <p className="text-[12px] text-neutral-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </a>
        <a href="#" className="group">
          <div className="mb-2 h-14 w-full border border-neutral-200 bg-neutral-100"></div>
          <h4 className="mb-0.5 font-mono text-[12px] font-bold uppercase tracking-[0.15em] text-neutral-900 group-hover:text-[#4db9e0] transition-colors">
            Lorem ipsum dolor
          </h4>
          <p className="text-[12px] text-neutral-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </a>
      </div>
      <button className="ml-auto mt-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4db9e0] hover:text-[#10475c] transition-colors">
        <span>View more</span>
        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

const TABS = [
  {
    title: "Products",
    Component: Products,
  },
  {
    title: "Pricing",
    Component: Pricing,
  },
  {
    title: "Blog",
    Component: Blog,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));