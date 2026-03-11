import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Package } from "lucide-react";

const classDetails = [
  { name: "Simulation Education Modules", description: "Hands-on medical simulation training" },
  { name: "Serious Games", description: "Gamified healthcare learning experiences" },
  { name: "Virtual Reality Simulators", description: "Immersive VR-based clinical training" },
  { name: "VR SimLabs", description: "Virtual reality simulation laboratories" },
];

const products = [
  { name: "M1 Leg (Bionic Prosthesis)", description: "Cost-effective robotic below knee prosthesis" },
  { name: "Warm Hug NH-01", description: "Portable baby warmer for neonatal care" },
  { name: "Warm Hug HCV NH-02", description: "Advanced heated baby warmer" },
  { name: "Buddy Dispenser (Med-Eaze)", description: "Automated drug dispensing system" },
  { name: "Cuddle Scan", description: "Portable diagnostic scanning device" },
  { name: "New-Bie Cap", description: "Neonatal monitoring cap" },
];

const VisitorPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState<"student" | "distributor" | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsOpen(true);
      setSelection(null);
    }, 120000); // 2 minutes

    // Show first time after 5 seconds
    const initial = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(initial);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm px-4"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-card rounded-2xl shadow-elevated w-full max-w-md overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="bg-primary p-6 text-center">
            <h3 className="font-heading text-2xl font-bold text-primary-foreground">
              Welcome to Medline Robotics
            </h3>
            <p className="text-primary-foreground/70 text-sm mt-1 font-body">
              How can we help you today?
            </p>
          </div>

          <div className="p-6">
            {!selection ? (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelection("student")}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border hover:border-secondary hover:bg-secondary/5 transition-all group"
                >
                  <GraduationCap className="w-10 h-10 text-secondary group-hover:scale-110 transition-transform" />
                  <span className="font-heading font-bold text-foreground">Student</span>
                </button>
                <button
                  onClick={() => setSelection("distributor")}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border hover:border-secondary hover:bg-secondary/5 transition-all group"
                >
                  <Package className="w-10 h-10 text-secondary group-hover:scale-110 transition-transform" />
                  <span className="font-heading font-bold text-foreground">Distributor</span>
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button
                  onClick={() => setSelection(null)}
                  className="text-sm text-secondary font-body mb-4 hover:underline"
                >
                  ← Back
                </button>
                <h4 className="font-heading text-lg font-bold text-foreground mb-3">
                  {selection === "student" ? "Available Classes" : "Our Products"}
                </h4>
                <ul className="space-y-3">
                  {(selection === "student" ? classDetails : products).map((item) => (
                    <li
                      key={item.name}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0" />
                      <div>
                        <p className="font-body font-semibold text-foreground text-sm">{item.name}</p>
                        <p className="font-body text-muted-foreground text-xs">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VisitorPopup;
