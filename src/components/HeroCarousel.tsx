import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroProsthesis from "@/assets/hero-prosthesis.jpg";
import heroWarmhug from "@/assets/hero-warmhug.jpg";
import heroMedeaze from "@/assets/hero-medeaze.jpg";

const slides = [
  {
    image: heroProsthesis,
    title: "Below Knee Bionic Prosthesis",
    subtitle: "Developing a cost effective, robotic below knee prosthesis.",
  },
  {
    image: heroWarmhug,
    title: "Warm Hug",
    subtitle: "The portable Baby Warmer",
  },
  {
    image: heroMedeaze,
    title: "Med-Eaze",
    subtitle: "Automated Drug Dispenser",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full items-end pb-24 px-6 md:px-16 lg:px-24">
        <motion.div
          key={`text-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl"
        >
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 leading-tight">
            {slides[current].title}
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 font-body">
            {slides[current].subtitle}
          </p>
          <a
            href="#services"
            className="inline-block bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-body font-semibold hover:opacity-90 transition-opacity"
          >
            Know more
          </a>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-secondary scale-125" : "bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
