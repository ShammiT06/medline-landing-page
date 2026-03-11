import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  GraduationCap,
  Building2,
  ArrowLeft,
  Send,
  Stethoscope,
  BookOpen,
  HeartPulse,
  Baby,
  Package,
  FlaskConical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Step =
  | "welcome"
  | "student-courses"
  | "distributor-type"
  | "distributor-products"
  | "contact-form";

const COURSES = [
  { label: "Med Tech M1 Leg Course", icon: Stethoscope },
  { label: "Med Tech Warm Hug NH01 – NH02", icon: HeartPulse },
  { label: "Health Care Simulation & Emergency Course", icon: BookOpen },
];

const PRODUCTS = [
  { label: "Neonatal Care", icon: Baby },
  { label: "Paediatric Care", icon: HeartPulse },
  { label: "Products in Pipeline", icon: FlaskConical },
];

const slideVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

interface WelcomePopupProps {
  onUserTypeSelect?: (type: "student" | "distributor" | "") => void;
}

const WelcomePopup = ({ onUserTypeSelect }: WelcomePopupProps) => {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<Step>("welcome");
  const [userType, setUserType] = useState<"student" | "distributor" | "">("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [distributorType, setDistributorType] = useState<"products" | "individual" | "">("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const reset = () => {
    setStep("welcome");
    setUserType("");
    setSelectedCourse("");
    setDistributorType("");
    setSelectedProduct("");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    reset();
    document.dispatchEvent(new CustomEvent("welcomePopupClosed"));
  }, []);

  // Listen for Zoho bot close to re-open welcome popup
  useEffect(() => {
    const handleReopen = () => {
      reset();
      setOpen(true);
    };
    document.addEventListener("openWelcomePopup", handleReopen);
    return () => document.removeEventListener("openWelcomePopup", handleReopen);
  }, []);

  const getInterestLabel = () => {
    if (userType === "student") return `Course: ${selectedCourse}`;
    if (distributorType === "products") return `Product: ${selectedProduct}`;
    return "Individual Enquiry";
  };

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }

    setSending(true);
    setTimeout(() => {
      toast({ title: "Thank you!", description: "Our team will contact you soon." });
      setSending(false);
      handleClose();
    }, 500);
  };

  const goBack = () => {
    switch (step) {
      case "student-courses":
      case "distributor-type":
        setStep("welcome");
        break;
      case "distributor-products":
        setStep("distributor-type");
        break;
      case "contact-form":
        if (userType === "student") setStep("student-courses");
        else if (distributorType === "products") setStep("distributor-products");
        else setStep("distributor-type");
        break;
    }
  };

  const stepIndex = ["welcome", "student-courses", "distributor-type", "distributor-products", "contact-form"].indexOf(step);
  const totalSteps = userType === "student" ? 3 : distributorType === "products" ? 4 : 3;
  const currentStep = step === "welcome" ? 1 : step === "contact-form" ? totalSteps : step === "distributor-products" ? 3 : 2;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 shadow-[var(--shadow-elevated)]">
        {/* Header gradient bar */}
        <div className="bg-gradient-to-r from-primary to-secondary h-2" />

        <div className="p-6 pt-4">
          {/* Back button & Step indicator */}
          <div className="flex items-center justify-between mb-4">
            {step !== "welcome" ? (
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <div />
            )}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i < currentStep
                      ? "w-6 bg-secondary"
                      : "w-1.5 bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {/* WELCOME */}
              {step === "welcome" && (
                <>
                  <DialogHeader className="text-center mb-6">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Stethoscope className="h-8 w-8 text-primary" />
                    </div>
                    <DialogTitle
                      className="text-2xl font-bold text-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Welcome to Medline Robotics
                    </DialogTitle>
                    <DialogDescription className="text-base mt-2">
                      How can we help you today?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      className="group relative flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-card p-6 transition-all duration-200 hover:border-primary hover:shadow-md"
                      onClick={() => { setUserType("student"); setStep("student-courses"); }}
                    >
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <GraduationCap className="h-7 w-7 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-foreground">Student</p>
                        <p className="text-xs text-muted-foreground mt-1">Explore courses</p>
                      </div>
                    </button>
                    <button
                      className="group relative flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-card p-6 transition-all duration-200 hover:border-primary hover:shadow-md"
                      onClick={() => { setUserType("distributor"); setStep("distributor-type"); }}
                    >
                      <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                        <Building2 className="h-7 w-7 text-secondary" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-foreground">Distributor</p>
                        <p className="text-xs text-muted-foreground mt-1">Product enquiry</p>
                      </div>
                    </button>
                  </div>
                </>
              )}

              {/* STUDENT COURSES */}
              {step === "student-courses" && (
                <>
                  <DialogHeader className="mb-4">
                    <DialogTitle style={{ fontFamily: "var(--font-heading)" }} className="text-xl">
                      Select a Course
                    </DialogTitle>
                    <DialogDescription>Which course are you interested in?</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    {COURSES.map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        onClick={() => setSelectedCourse(label)}
                        className={`w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                          selectedCourse === label
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          selectedCourse === label ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-sm text-foreground">{label}</span>
                      </button>
                    ))}
                  </div>
                  <Button
                    className="mt-5 w-full h-11 text-base"
                    disabled={!selectedCourse}
                    onClick={() => setStep("contact-form")}
                  >
                    Continue
                  </Button>
                </>
              )}

              {/* DISTRIBUTOR TYPE */}
              {step === "distributor-type" && (
                <>
                  <DialogHeader className="mb-4">
                    <DialogTitle style={{ fontFamily: "var(--font-heading)" }} className="text-xl">
                      Distributor Enquiry
                    </DialogTitle>
                    <DialogDescription>What type of enquiry do you have?</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      className="group flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-card p-6 transition-all duration-200 hover:border-primary hover:shadow-md"
                      onClick={() => { setDistributorType("products"); setStep("distributor-products"); }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <p className="font-semibold text-foreground">Products</p>
                    </button>
                    <button
                      className="group flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-card p-6 transition-all duration-200 hover:border-primary hover:shadow-md"
                      onClick={() => { setDistributorType("individual"); setStep("contact-form"); }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                        <Send className="h-6 w-6 text-secondary" />
                      </div>
                      <p className="font-semibold text-foreground">Individual Enquiry</p>
                    </button>
                  </div>
                </>
              )}

              {/* DISTRIBUTOR PRODUCTS */}
              {step === "distributor-products" && (
                <>
                  <DialogHeader className="mb-4">
                    <DialogTitle style={{ fontFamily: "var(--font-heading)" }} className="text-xl">
                      Select a Product Category
                    </DialogTitle>
                    <DialogDescription>Which product are you interested in?</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    {PRODUCTS.map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        onClick={() => setSelectedProduct(label)}
                        className={`w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                          selectedProduct === label
                            ? "border-secondary bg-secondary/5 shadow-sm"
                            : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          selectedProduct === label ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-sm text-foreground">{label}</span>
                      </button>
                    ))}
                  </div>
                  <Button
                    className="mt-5 w-full h-11 text-base"
                    disabled={!selectedProduct}
                    onClick={() => setStep("contact-form")}
                  >
                    Continue
                  </Button>
                </>
              )}

              {/* CONTACT FORM */}
              {step === "contact-form" && (
                <>
                  <DialogHeader className="mb-4">
                    <DialogTitle style={{ fontFamily: "var(--font-heading)" }} className="text-xl">
                      Your Details
                    </DialogTitle>
                    <DialogDescription>
                      Interested in: <span className="font-semibold text-foreground">{getInterestLabel()}</span>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="h-11" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm">Email Address</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-11" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                      <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="h-11" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-sm">Message (optional)</Label>
                      <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Any additional details..." rows={3} />
                    </div>
                    <Button className="w-full h-11 text-base gap-2" onClick={handleSubmit} disabled={sending}>
                      <Send className="h-4 w-4" />
                      {sending ? "Sending..." : "Submit Enquiry"}
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;
