import { useState } from "react";
import { Mail, Github, Linkedin, MessageCircle } from "lucide-react";import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: string, email: string, message: string): FormErrors {
  const errors: FormErrors = {};
  if (!name) errors.name = "Name is required";
  else if (name.trim().length < 2) errors.name = "Name must be at least 2 characters";

  if (!email) errors.email = "Email is required";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address";

  if (!message) errors.message = "Message is required";
  else if (message.trim().length < 10) errors.message = "Message must be at least 10 characters";

  return errors;
}

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "eng.jaredotieno@gmail.com",
    href: "mailto:eng.jaredotieno@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@jaredotieno",
    href: "https://github.com/EngJay-Tech",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Jared Otieno",
    href: "https://ke.linkedin.com/in/jared-odhiambo-42996728b",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+254 746374778",
    href: "https://wa.me/254746374778",
  },
];

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const heading = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const form = useScrollAnimation<HTMLDivElement>({ delay: 150, threshold: 0.1 });
  const { setRef, visibleItems } = useStaggeredAnimation(CONTACT_LINKS.length, 100);

  const handleFieldChange = (
    field: "name" | "email" | "message",
    value: string
  ) => {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "message") setMessage(value);

    // Clear field error on change
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validate(name, email, message);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormState("submitting");

    try {
      /**
       * Replace this URL with your real form endpoint (e.g. Formspree, Resend, your own API).
       * Example: https://formspree.io/f/YOUR_FORM_ID
       *
       * The fetch call is fully wired; just swap the URL.
       */
      const res = await fetch("https://formspree.io/f/mgorpbea", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setFormState("success");
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});

      // Reset after 6 s
      setTimeout(() => setFormState("idle"), 6000);
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  const isSubmitting = formState === "submitting";

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div
        ref={heading.ref}
        className={`container max-w-2xl scroll-fade-up${heading.isVisible ? " is-visible" : ""}`}
      >
        <span className="text-cyan-400 text-sm font-medium">Get In Touch</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
          Let's Build Something Amazing
        </h2>
        <p className="text-lg text-slate-400 mb-8">
          Have a project in mind? I'd love to hear about it. Let's discuss how we can work together.
        </p>

        {/* Contact form */}
        <Card
          ref={form.ref as React.RefObject<HTMLDivElement>}
          className={`p-8 bg-slate-900/50 border-2 border-dashed border-cyan-500/50 scroll-fade-up${form.isVisible ? " is-visible" : ""}`}
        >
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="text-sm font-medium mb-2 block text-slate-300">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                placeholder="Alfred O"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className={`w-full px-4 py-2 rounded-lg border bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
                  errors.name ? "border-red-500" : "border-slate-700"
                }`}
              />
              {errors.name && (
                <p id="contact-name-error" className="text-xs text-red-400 mt-1" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="text-sm font-medium mb-2 block text-slate-300">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className={`w-full px-4 py-2 rounded-lg border bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
                  errors.email ? "border-red-500" : "border-slate-700"
                }`}
              />
              {errors.email && (
                <p id="contact-email-error" className="text-xs text-red-400 mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="text-sm font-medium mb-2 block text-slate-300">
                Message
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => handleFieldChange("message", e.target.value)}
                placeholder="Tell me about your project..."
                rows={4}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`w-full px-4 py-2 rounded-lg border bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors resize-none ${
                  errors.message ? "border-red-500" : "border-slate-700"
                }`}
              />
              {errors.message && (
                <p id="contact-message-error" className="text-xs text-red-400 mt-1" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-950 font-semibold button-glow-cyan disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending…" : "Send Message"}
            </Button>

            {/* Status feedback */}
            {formState === "success" && (
              <div
                className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/50"
                role="status"
                aria-live="polite"
              >
                <p className="text-sm text-emerald-300 font-medium">✓ Message sent successfully!</p>
                <p className="text-xs text-emerald-400 mt-1">
                  I'll get back to you within 24 hours.
                </p>
              </div>
            )}
            {formState === "error" && (
              <div
                className="p-4 rounded-lg bg-red-500/10 border border-red-500/50"
                role="alert"
                aria-live="assertive"
              >
                <p className="text-sm text-red-300 font-medium">✗ Something went wrong.</p>
                <p className="text-xs text-red-400 mt-1">
                  Please try again or email me directly at eng.jaredotieno@gmail.com
                </p>
              </div>
            )}
          </form>
        </Card>

        {/* Contact info links */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 text-center">
          {CONTACT_LINKS.map(({ icon: Icon, label, value, href }, i) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              ref={setRef(i) as unknown as React.RefCallback<HTMLAnchorElement>}
              className={`scroll-card group block${visibleItems[i] ? " is-visible" : ""}`}
            >
              <Icon
                className="h-6 w-6 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
              <p className="text-sm text-slate-400">{label}</p>
              <p className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                {value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
