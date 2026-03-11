import { useState } from "react";
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
import { GraduationCap, Building2, ArrowLeft, Send } from "lucide-react";

type Step =
  | "welcome"
  | "student-courses"
  | "distributor-type"
  | "distributor-products"
  | "contact-form";

const COURSES = [
  "Med Tech M1 Leg Course",
  "Med Tech Warm Hug NH01 – NH02",
  "Health Care Simulation & Emergency Course",
];

const PRODUCTS = [
  "Neonatal Care",
  "Paediatric Care",
  "Products in Pipeline",
];

const WelcomePopup = () => {
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

  const handleClose = () => {
    setOpen(false);
    reset();
  };

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

    const interest = getInterestLabel();
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nType: ${userType === "student" ? "Student" : "Distributor"}\nInterest: ${interest}\nMessage: ${message}`;

    // mailto fallback
    const subject = encodeURIComponent(
      `New Enquiry from ${name} – ${interest}`
    );
    const mailBody = encodeURIComponent(body);
    window.open(
      `mailto:varane2024@indevgo.com?subject=${subject}&body=${mailBody}`,
      "_blank"
    );

    toast({ title: "Enquiry submitted!", description: "Thank you for your interest." });
    setSending(false);
    handleClose();
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

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="sm:max-w-md">
        {step !== "welcome" && (
          <button
            onClick={goBack}
            className="absolute left-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}

        {/* WELCOME */}
        {step === "welcome" && (
          <>
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                Welcome to Medline Robotics
              </DialogTitle>
              <DialogDescription>How can we help you today?</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-6 hover:border-primary hover:bg-primary/5"
                onClick={() => { setUserType("student"); setStep("student-courses"); }}
              >
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="font-semibold">Student</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-6 hover:border-primary hover:bg-primary/5"
                onClick={() => { setUserType("distributor"); setStep("distributor-type"); }}
              >
                <Building2 className="h-8 w-8 text-primary" />
                <span className="font-semibold">Distributor</span>
              </Button>
            </div>
          </>
        )}

        {/* STUDENT COURSES */}
        {step === "student-courses" && (
          <>
            <DialogHeader>
              <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>
                Select a Course
              </DialogTitle>
              <DialogDescription>Which course are you interested in?</DialogDescription>
            </DialogHeader>
            <RadioGroup
              value={selectedCourse}
              onValueChange={setSelectedCourse}
              className="mt-4 space-y-3"
            >
              {COURSES.map((course) => (
                <div key={course} className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value={course} id={course} />
                  <Label htmlFor={course} className="cursor-pointer flex-1">{course}</Label>
                </div>
              ))}
            </RadioGroup>
            <Button
              className="mt-4 w-full"
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
            <DialogHeader>
              <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>
                Distributor Enquiry
              </DialogTitle>
              <DialogDescription>What type of enquiry do you have?</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button
                variant="outline"
                className="h-auto py-6 hover:border-primary hover:bg-primary/5"
                onClick={() => { setDistributorType("products"); setStep("distributor-products"); }}
              >
                Products
              </Button>
              <Button
                variant="outline"
                className="h-auto py-6 hover:border-primary hover:bg-primary/5"
                onClick={() => { setDistributorType("individual"); setStep("contact-form"); }}
              >
                Individual Enquiry
              </Button>
            </div>
          </>
        )}

        {/* DISTRIBUTOR PRODUCTS */}
        {step === "distributor-products" && (
          <>
            <DialogHeader>
              <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>
                Select a Product Category
              </DialogTitle>
              <DialogDescription>Which product are you interested in?</DialogDescription>
            </DialogHeader>
            <RadioGroup
              value={selectedProduct}
              onValueChange={setSelectedProduct}
              className="mt-4 space-y-3"
            >
              {PRODUCTS.map((product) => (
                <div key={product} className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value={product} id={product} />
                  <Label htmlFor={product} className="cursor-pointer flex-1">{product}</Label>
                </div>
              ))}
            </RadioGroup>
            <Button
              className="mt-4 w-full"
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
            <DialogHeader>
              <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>
                Your Details
              </DialogTitle>
              <DialogDescription>
                Interested in: <strong>{getInterestLabel()}</strong>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
              </div>
              <div>
                <Label htmlFor="message">Message (optional)</Label>
                <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Any additional details..." rows={3} />
              </div>
              <Button className="w-full" onClick={handleSubmit} disabled={sending}>
                <Send className="h-4 w-4 mr-2" />
                {sending ? "Sending..." : "Submit Enquiry"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;
