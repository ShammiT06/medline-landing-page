import { motion } from "framer-motion";

const team = [
  {
    name: "Dr. Shakila Kulasekaran",
    role: "Senior Project Lead",
    bio: "With extensive experience in pediatric and neonatal critical care, Dr. Shakila recognized critical gaps in healthcare and pioneered groundbreaking solutions to address them.",
  },
  {
    name: "Mr. Mohan Ram",
    role: "Director, Operations",
    bio: "With three decades of entrepreneurial expertise in industrial water purification, Mohan Ram oversees efficient seamless operations, ensuring the vision is successfully realized.",
  },
  {
    name: "Mr. Ravikumar",
    role: "Technical Director",
    bio: "A Robotics and Electronics Engineer with 70+ innovations including multiple patents. He is the visionary architect behind the cutting-edge technology powering our innovations.",
  },
  {
    name: "Dr. Mohamed Irfan",
    role: "Biomedical Consultant",
    bio: "As an Assistant Professor at the University of Twente, Dr. Irfan specializes in soft robotics, contributing cutting-edge research to enhance intelligent medical solutions.",
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 px-6 md:px-16 lg:px-24 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-4"
        >
          Our Team
        </motion.h2>
        <p className="text-muted-foreground text-center mb-16 text-lg font-body max-w-2xl mx-auto">
          A passionate group of experts driving innovation in medical technology.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-28 h-28 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-heading text-3xl font-bold text-primary">
                  {member.name.split(" ").slice(-1)[0][0]}
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-secondary font-body text-sm font-semibold mb-3">{member.role}</p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
