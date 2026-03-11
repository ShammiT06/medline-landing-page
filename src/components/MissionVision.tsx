import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 bg-background">
      <div className="container mx-auto grid md:grid-cols-2 gap-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-6">
            <Target className="w-7 h-7 text-primary-foreground" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Mission</h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-body">
            To Improve Patient Lives by Developing Innovative, Accessible, and High-Quality Medical Devices that Address Unmet Clinical Needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary mb-6">
            <Eye className="w-7 h-7 text-secondary-foreground" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Vision</h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-body">
            To be a global leader in transformative medical technology, consistently pushing the boundaries of healthcare through cutting-edge research and development.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVision;
