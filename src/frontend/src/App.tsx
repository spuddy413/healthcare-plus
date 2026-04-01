import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Baby,
  Bone,
  Brain,
  CalendarDays,
  ChevronRight,
  Clock,
  Heart,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Star,
  Stethoscope,
  TrendingUp,
  UserCheck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

const SERVICES = [
  {
    icon: Stethoscope,
    title: "Primary Care",
    desc: "Comprehensive preventive care and treatment for acute and chronic conditions for patients of all ages.",
    value: "primary-care",
  },
  {
    icon: Heart,
    title: "Cardiology",
    desc: "Advanced diagnostics and treatment for heart disease, arrhythmias, and cardiovascular conditions.",
    value: "cardiology",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    desc: "Specialized healthcare for infants, children, and adolescents from birth through young adulthood.",
    value: "pediatrics",
  },
  {
    icon: Brain,
    title: "Mental Health",
    desc: "Compassionate therapy and psychiatric care to support your emotional and psychological wellbeing.",
    value: "mental-health",
  },
  {
    icon: Bone,
    title: "Orthopedics",
    desc: "Expert diagnosis and treatment of musculoskeletal disorders, sports injuries, and joint conditions.",
    value: "orthopedics",
  },
  {
    icon: Sparkles,
    title: "Dermatology",
    desc: "Medical and cosmetic skin care services for conditions ranging from acne to skin cancer screening.",
    value: "dermatology",
  },
];

const DOCTORS = [
  {
    name: "Dr. Sarah Mitchell",
    specialty: "Primary Care & Internal Medicine",
    experience: 14,
    img: "/generated/doctor-1.dim_400x400.jpg",
    initials: "SM",
  },
  {
    name: "Dr. James Chen",
    specialty: "Cardiology",
    experience: 18,
    img: "/generated/doctor-2.dim_400x400.jpg",
    initials: "JC",
  },
  {
    name: "Dr. Amara Osei",
    specialty: "Pediatrics",
    experience: 11,
    img: "/generated/doctor-3.dim_400x400.jpg",
    initials: "AO",
  },
  {
    name: "Dr. Marcus Rivera",
    specialty: "Orthopedic Surgery",
    experience: 16,
    img: "/generated/doctor-4.dim_400x400.jpg",
    initials: "MR",
  },
];

const TESTIMONIALS = [
  {
    name: "Emily Thornton",
    rating: 5,
    text: "Dr. Mitchell took the time to truly listen. After years of unexplained fatigue, she identified a thyroid condition that changed my life. The entire team is warm, professional, and genuinely caring.",
  },
  {
    name: "Robert Kwan",
    rating: 5,
    text: "My son's appointment with Dr. Osei was wonderful. She has a magical way with children — he wasn't scared at all. HealthCare Plus has become our family's trusted medical home.",
  },
  {
    name: "Patricia Saunders",
    rating: 5,
    text: "After my knee surgery with Dr. Rivera, I was back on the tennis court in four months. The recovery plan was detailed, the follow-ups were thorough, and the outcome exceeded my expectations.",
  },
];

const STEPS = [
  {
    step: "01",
    icon: CalendarDays,
    title: "Book an Appointment",
    desc: "Choose your preferred doctor, service, and date through our simple online booking form — available 24/7.",
  },
  {
    step: "02",
    icon: UserCheck,
    title: "Consult with Your Doctor",
    desc: "Meet with a board-certified specialist who will conduct a thorough evaluation and create a personalized care plan.",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Begin Your Recovery",
    desc: "Receive expert treatment, ongoing support, and follow-up care designed to get you feeling your best.",
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.1,
      ease: "easeOut" as const,
    },
  }),
};

export default function App() {
  const { actor } = useActor();
  const bookingRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSubmitting(true);
    setSubmitState("idle");
    try {
      await actor.submitBooking(
        form.name,
        form.email,
        form.phone,
        form.service,
        form.date,
        form.message,
      );
      setSubmitState("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        message: "",
      });
      toast.success(
        "Appointment requested! We'll confirm your booking shortly.",
      );
    } catch {
      setSubmitState("error");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Doctors", href: "#doctors" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
          <a
            href="#home"
            data-ocid="nav.link"
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg text-foreground">
              HealthCare <span className="text-primary">Plus</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid="nav.link"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              onClick={scrollToBooking}
              data-ocid="nav.primary_button"
              className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 text-sm"
            >
              Book Appointment
            </Button>
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.toggle"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-card"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    data-ocid="nav.link"
                    className="text-sm font-medium py-2 text-foreground border-b border-border last:border-0"
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  onClick={scrollToBooking}
                  data-ocid="nav.primary_button"
                  className="mt-2 bg-primary text-primary-foreground rounded-full"
                >
                  Book Appointment
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── HERO ── */}
        <section
          id="home"
          className="relative overflow-hidden min-h-[92vh] flex items-center"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/generated/hero-healthcare.dim_1400x800.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
          <div className="relative container mx-auto px-4 md:px-6 py-24">
            <motion.div
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <motion.div
                custom={0}
                variants={fadeUpVariants}
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-full mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Trusted by 12,000+ patients in our community
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUpVariants}
                className="font-display text-5xl md:text-7xl text-white leading-tight mb-6"
              >
                Your Health,
                <br />
                <span className="text-accent">Our Priority</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUpVariants}
                className="text-white/85 text-lg md:text-xl mb-10 max-w-lg leading-relaxed"
              >
                Compassionate, evidence-based care for every stage of life.
                Expert physicians. Modern facilities. A team that puts you
                first.
              </motion.p>

              <motion.div
                custom={3}
                variants={fadeUpVariants}
                className="flex flex-wrap gap-4"
              >
                <Button
                  onClick={scrollToBooking}
                  data-ocid="hero.primary_button"
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base shadow-lg"
                >
                  Book an Appointment
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  data-ocid="hero.secondary_button"
                  className="rounded-full px-8 text-base border-white/50 text-white hover:bg-white/10 hover:text-white bg-transparent"
                >
                  <a href="#services">Our Services</a>
                </Button>
              </motion.div>

              <motion.div
                custom={4}
                variants={fadeUpVariants}
                className="mt-12 flex items-center gap-8"
              >
                {[
                  { value: "15+", label: "Years of Excellence" },
                  { value: "40+", label: "Board-Certified Doctors" },
                  { value: "98%", label: "Patient Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-white text-2xl font-bold">
                      {stat.value}
                    </p>
                    <p className="text-white/65 text-xs mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.p
                custom={0}
                variants={fadeUpVariants}
                className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
              >
                Our Specialties
              </motion.p>
              <motion.h2
                custom={1}
                variants={fadeUpVariants}
                className="font-display text-4xl md:text-5xl text-foreground mb-4"
              >
                Comprehensive Medical Services
              </motion.h2>
              <motion.p
                custom={2}
                variants={fadeUpVariants}
                className="text-muted-foreground text-lg max-w-xl mx-auto"
              >
                From routine check-ups to advanced specialty care, we offer a
                full spectrum of services under one roof.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((svc, i) => (
                <motion.div
                  key={svc.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpVariants}
                  data-ocid={`services.item.${i + 1}`}
                  className="group bg-card border border-border rounded-2xl p-7 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <svc.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {svc.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="about" className="py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.p
                custom={0}
                variants={fadeUpVariants}
                className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
              >
                Simple & Seamless
              </motion.p>
              <motion.h2
                custom={1}
                variants={fadeUpVariants}
                className="font-display text-4xl md:text-5xl text-foreground"
              >
                How It Works
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.step}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpVariants}
                  className="relative text-center"
                >
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
                  )}
                  <div className="relative z-10 inline-flex flex-col items-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-card">
                        <step.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DOCTORS ── */}
        <section id="doctors" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.p
                custom={0}
                variants={fadeUpVariants}
                className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
              >
                Meet the Team
              </motion.p>
              <motion.h2
                custom={1}
                variants={fadeUpVariants}
                className="font-display text-4xl md:text-5xl text-foreground"
              >
                Our Expert Physicians
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DOCTORS.map((doc, i) => (
                <motion.div
                  key={doc.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpVariants}
                  data-ocid={`doctors.item.${i + 1}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <img
                      src={doc.img}
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-foreground">
                      {doc.name}
                    </h3>
                    <p className="text-primary text-sm font-medium mt-0.5">
                      {doc.specialty}
                    </p>
                    <p className="text-muted-foreground text-xs mt-2">
                      {doc.experience} years experience
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.p
                custom={0}
                variants={fadeUpVariants}
                className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
              >
                Patient Stories
              </motion.p>
              <motion.h2
                custom={1}
                variants={fadeUpVariants}
                className="font-display text-4xl md:text-5xl text-foreground"
              >
                What Our Patients Say
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpVariants}
                  data-ocid={`testimonials.item.${i + 1}`}
                  className="bg-card border border-border rounded-2xl p-7 shadow-xs"
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }, (_, j) => j).map(
                      (starIdx) => (
                        <Star
                          key={starIdx}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ),
                    )}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-5 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="font-semibold text-sm text-foreground">
                    {t.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Verified Patient
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOOKING FORM ── */}
        <section
          id="booking"
          ref={bookingRef as React.RefObject<HTMLDivElement>}
          className="py-24 bg-background"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <motion.p
                  custom={0}
                  variants={fadeUpVariants}
                  className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
                >
                  Get Started
                </motion.p>
                <motion.h2
                  custom={1}
                  variants={fadeUpVariants}
                  className="font-display text-4xl md:text-5xl text-foreground mb-3"
                >
                  Book Your Appointment
                </motion.h2>
                <motion.p
                  custom={2}
                  variants={fadeUpVariants}
                  className="text-muted-foreground"
                >
                  Fill out the form below and our team will confirm your
                  appointment within 24 hours.
                </motion.p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-2xl p-8 shadow-card space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      data-ocid="booking.input"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      data-ocid="booking.input"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      data-ocid="booking.input"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Service</Label>
                    <Select
                      value={form.service}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, service: v }))
                      }
                      required
                    >
                      <SelectTrigger
                        data-ocid="booking.select"
                        className="rounded-lg"
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICES.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium">
                    Preferred Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    data-ocid="booking.input"
                    value={form.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, date: e.target.value }))
                    }
                    required
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="message"
                    data-ocid="booking.textarea"
                    placeholder="Please describe your symptoms or reason for visit..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    rows={4}
                    className="rounded-lg resize-none"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {submitState === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      data-ocid="booking.success_state"
                      className="flex items-center gap-2 p-4 bg-accent/10 border border-accent/30 rounded-lg text-accent-foreground text-sm"
                    >
                      <Sparkles className="w-4 h-4" />
                      Your appointment request has been submitted. We&rsquo;ll
                      be in touch soon!
                    </motion.div>
                  )}
                  {submitState === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      data-ocid="booking.error_state"
                      className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm"
                    >
                      Something went wrong. Please try again or call us
                      directly.
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  data-ocid="booking.submit_button"
                  disabled={submitting || !form.service}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-base font-semibold"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Request Appointment"
                  )}
                </Button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.p
                custom={0}
                variants={fadeUpVariants}
                className="text-primary font-semibold text-sm uppercase tracking-widest mb-3"
              >
                Get in Touch
              </motion.p>
              <motion.h2
                custom={1}
                variants={fadeUpVariants}
                className="font-display text-4xl md:text-5xl text-foreground"
              >
                Contact Us
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  lines: [
                    "1240 Wellness Boulevard",
                    "Suite 300, New York, NY 10001",
                  ],
                },
                {
                  icon: Phone,
                  label: "Phone",
                  lines: ["+1 (212) 555-8200", "Emergency: +1 (212) 555-9911"],
                },
                {
                  icon: Mail,
                  label: "Email",
                  lines: [
                    "hello@healthcareplus.com",
                    "billing@healthcareplus.com",
                  ],
                },
                {
                  icon: Clock,
                  label: "Office Hours",
                  lines: ["Mon–Fri: 8am – 6pm", "Sat: 9am – 2pm"],
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpVariants}
                  data-ocid={`contact.item.${i + 1}`}
                  className="bg-card border border-border rounded-2xl p-6 text-center"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm text-foreground mb-2">
                    {item.label}
                  </h4>
                  {item.lines.map((line) => (
                    <p
                      key={line}
                      className="text-muted-foreground text-sm leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <a href="#home" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display text-lg text-background">
                  HealthCare <span className="text-accent">Plus</span>
                </span>
              </a>
              <p className="text-background/60 text-sm leading-relaxed max-w-xs">
                Delivering compassionate, world-class healthcare to individuals
                and families across the community since 2009.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-background mb-4 uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-2">
                {SERVICES.slice(0, 4).map((s) => (
                  <li key={s.title}>
                    <a
                      href="#services"
                      className="text-background/60 hover:text-background text-sm transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-background mb-4 uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-background/60 hover:text-background text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-background/15 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-background/50">
            <p>
              &copy; {new Date().getFullYear()} HealthCare Plus. All rights
              reserved.
            </p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-background transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
