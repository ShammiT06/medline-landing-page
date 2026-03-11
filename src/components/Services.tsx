import { motion } from "framer-motion";
import serviceSimulation from "@/assets/service-simulation.jpg";
import serviceConsultation from "@/assets/service-consultation.jpg";
import serviceMedtech from "@/assets/service-medtech.jpg";

const services = [
  {
    image: serviceSimulation,
    title: "Healthcare Simulation Education",
    items: ["Simulation Education Modules", "Serious Games", "Virtual Reality Simulators"],
  },
  {
    image: serviceConsultation,
    title: "Healthcare Consultation",
    items: ["Virtual Reality SimLabs"],
  },
  {
    image: serviceMedtech,
    title: "Med-Tech Solutions",
    items: ["Bionic Leg", "Warm Hug NH-01", "Warm Hug HCV NH-02", "Buddy Dispenser", "Cuddle Scan", "New-Bie Cap"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 md:px-16 lg:px-24 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-4"
        >
          Our Services
        </motion.h2>
        <p className="text-muted-foreground text-center mb-16 text-lg font-body max-w-2xl mx-auto">
          Comprehensive medical technology solutions from simulation to real-world devices.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300 group"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <ul className="space-y-1.5">
                  {service.items.map((item) => (
                    <li key={item} className="text-muted-foreground font-body text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
