import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-16 lg:px-24 bg-primary">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-6"
        >
          About Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-primary-foreground/80 text-lg leading-relaxed font-body mb-8"
        >
          Dr. Shakila Kulasekaran, Pediatric Intensivist and Neonatologist, has extensive experience in simulation education spanning 11 years. She designed and developed low-cost simulators for pediatric shock and peritoneal dialysis, and pioneered a Virtual Reality simulator for pediatric peritoneal dialysis and emergency simulation modules.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            A Passion For Putting Patients First
          </h3>
          <p className="text-primary-foreground/70 text-lg font-body">
            We rebuild lives through expert care, quality service, and cutting-edge innovation. Our patients agree — we stand out from the rest.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
