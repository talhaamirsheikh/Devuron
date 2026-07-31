import { useState, useRef, useEffect } from "react";
import { Sparkles, ChevronRight, Check } from "lucide-react";

const CornerBrackets = ({ size = "h-4 w-4", borderColor = "border-neutral-300" }) => (
  <>
    <div className={`absolute -top-px -left-px ${size} border-l border-t ${borderColor}`} />
    <div className={`absolute -top-px -right-px ${size} border-r border-t ${borderColor}`} />
    <div className={`absolute -bottom-px -left-px ${size} border-l border-b ${borderColor}`} />
    <div className={`absolute -bottom-px -right-px ${size} border-r border-b ${borderColor}`} />
  </>
);

const Tab = ({ label }) => (
  <div className="absolute -top-px left-8 flex items-center gap-2 border-b border-r border-neutral-200 bg-white px-4 py-1.5 z-10">
    <span className="h-1.5 w-1.5 rounded-full bg-[#4db9e0] motion-safe:animate-pulse" />
    <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500">{label}</span>
  </div>
);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELDS = [
  { name: "name", label: "Your name", placeholder: "John Doe" },
  { name: "email", label: "Email address", placeholder: "john@example.com", type: "email" },
  { name: "phone", label: "Phone number", placeholder: "+92 300 1234567", type: "tel" },
  { name: "company", label: "Company name", placeholder: "Your Company" },
  { name: "service", label: "Project type", placeholder: "Web, App, AI..." },
  { name: "message", label: "Message", placeholder: "Tell us about your project...", multiline: true },
];

export default function OForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  // currentStep: which field is active right now (can move backward to edit).
  // maxStepReached: the furthest field ever revealed — controls what's visible/rendered.
  const [currentStep, setCurrentStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const inputRefs = useRef([]);

  const isComplete = FIELDS.every((field) => form[field.name]?.trim());
  const emailValid = !form.email || EMAIL_PATTERN.test(form.email.trim());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const goToStep = (index) => {
    setCurrentStep(index);
    inputRefs.current[index]?.focus();
  };

  const advance = (index) => {
    if (index < FIELDS.length - 1) {
      const next = index + 1;
      setCurrentStep(next);
      setMaxStepReached((m) => Math.max(m, next));
    } else {
      handleSubmit();
    }
  };

  const handleKeyDown = (e, index) => {
    const field = FIELDS[index];
    const currentValue = form[field.name];

    if (e.key === "Enter") {
      // In the message field, let Shift+Enter insert a newline instead of advancing.
      if (field.multiline && e.shiftKey) return;
      e.preventDefault();
      if (currentValue.trim()) advance(index);
      return;
    }

    if (e.key === "Backspace" && !currentValue && index > 0) {
      goToStep(index - 1);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!isComplete || !emailValid) return;
    console.log("Form Data:", form);
    setSubmitted(true);
  };

  // Focus whichever field becomes active, whether that's from typing Enter,
  // clicking/tabbing into a past field, or the initial mount.
  useEffect(() => {
    inputRefs.current[currentStep]?.focus();
  }, [currentStep]);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F6F8] p-5">
        <div className="w-full max-w-3xl relative border border-neutral-200 bg-white shadow-sm p-10 text-center">
          <CornerBrackets size="h-4 w-4" />
          <Tab label="SENT" />
          <span className="inline-flex h-12 w-12 items-center justify-center border border-[#4db9e0] text-[#4db9e0] mb-5 mt-4">
            <Check className="h-5 w-5" />
          </span>
          <h2 className="font-mono text-[clamp(1.3rem,2vw,1.8rem)] font-black uppercase tracking-tight text-neutral-900">
            Request received
          </h2>
          <p className="text-[14px] text-neutral-500 mt-2 font-mono max-w-md mx-auto">
            Thanks, {form.name.split(" ")[0] || "there"}. We'll get back to you at {form.email} shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F6F8] p-5">
      <div className="w-full max-w-3xl min-h-[500px] relative border border-neutral-200 bg-white shadow-sm">
        <CornerBrackets size="h-4 w-4" />
        <Tab label="CONTACT" />

        <div className="p-6 sm:p-8 pt-12">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2.5 border-l-2 border-[#4db9e0] bg-black/[0.03] py-2 pl-4 pr-5 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-[#4db9e0]" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                Get in Touch
              </span>
            </div>

            <h2 className="font-mono text-[clamp(1.5rem,2.5vw,2.2rem)] font-black uppercase tracking-tight text-neutral-900">
              Let's Start a Project
            </h2>
            <p className="text-[14px] text-neutral-500 mt-2 font-mono">
              Tell us about yourself and your project
            </p>
          </div>

          {/* Screen-reader progress announcement */}
          <p className="sr-only" aria-live="polite">
            Step {currentStep + 1} of {FIELDS.length}: {FIELDS[currentStep].label}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {FIELDS.map((field, index) => {
              if (index > maxStepReached) return null;

              const isActive = index === currentStep;
              const isFilled = form[field.name]?.trim();
              const showEmailError =
                field.name === "email" && isFilled && !emailValid && !isActive;

              const InputTag = field.multiline ? "textarea" : "input";

              return (
                <div
                  key={field.name}
                  className={`flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-70"
                  }`}
                >
                  <div className="flex items-center gap-4 sm:contents">
                    <span className="font-mono text-[10px] font-semibold text-[#4db9e0] w-6 shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <label
                      htmlFor={field.name}
                      className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 whitespace-nowrap sm:min-w-[100px]"
                    >
                      {field.label}
                    </label>
                  </div>

                  <div className="relative flex-1">
                    <InputTag
                      id={field.name}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type={field.multiline ? undefined : field.type || "text"}
                      inputMode={field.type === "tel" ? "tel" : undefined}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      onFocus={() => setCurrentStep(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      placeholder={field.placeholder}
                      rows={field.multiline ? 2 : undefined}
                      className={`
                        w-full bg-transparent outline-none text-neutral-900
                        transition-colors duration-300 border-b
                        ${field.multiline ? "resize-none" : ""}
                        ${isActive ? "border-[#4db9e0]" : "border-neutral-200"}
                        ${isFilled ? "text-[#4db9e0]" : ""}
                        placeholder-neutral-400 font-mono text-[14px]
                      `}
                    />

                    {isFilled && !isActive && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#4db9e0] text-xs font-mono">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {isActive && isFilled && (
                      <span className="hidden lg:block absolute -right-28 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[#4db9e0]/50 whitespace-nowrap uppercase tracking-[0.2em]">
                        {field.multiline ? "Enter to send · Shift+Enter for new line" : "Press Enter →"}
                      </span>
                    )}
                    {showEmailError && (
                      <span className="mt-1 block font-mono text-[10px] text-red-500">
                        Doesn't look like a valid email — click to fix
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Submit Button */}
            {isComplete && (
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="font-mono text-[10px] font-semibold text-[#4db9e0] w-6 shrink-0">
                  00
                </span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 min-w-[100px]">
                  Ready
                </span>
                <button
                  type="submit"
                  disabled={!emailValid}
                  className="group inline-flex items-center gap-2 bg-[#4db9e0] px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-[#4db9e0] hover:border hover:border-[#4db9e0] disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4db9e0]/50"
                >
                  <span className="relative flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/90 motion-safe:group-hover:animate-pulse" />
                    Send Request
                  </span>
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-[0.2em]">
                  {emailValid ? "Press Enter to submit" : "Fix email above to continue"}
                </span>
              </div>
            )}

            {/* Progress Indicator */}
            <div className="mt-8 flex gap-1.5">
              {FIELDS.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index <= maxStepReached ? "bg-[#4db9e0] w-6" : "bg-neutral-200 w-3"
                  }`}
                />
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}