import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground py-16 px-6 md:px-16 lg:px-24">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-heading text-xl font-bold text-background mb-4">MEDLINE ROBOTICS</h3>
            <p className="text-background/60 font-body text-sm leading-relaxed">
              Innovative, accessible, and high-quality medical devices addressing unmet clinical needs.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-lg font-bold text-background mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About Us", "Services", "Team"].map((l) => (
                <li key={l}>
                  <a href={`#${l === "Home" ? "" : l.toLowerCase().replace(" ", "")}`} className="text-background/60 hover:text-secondary font-body text-sm transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-lg font-bold text-background mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-background/60 font-body text-sm">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                info@medlinerobotics.com
              </div>
              <div className="flex items-center gap-3 text-background/60 font-body text-sm">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                Contact us for inquiries
              </div>
              <div className="flex items-start gap-3 text-background/60 font-body text-sm">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                India
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 pt-8 text-center">
          <p className="text-background/40 font-body text-sm">
            © {new Date().getFullYear()} Medline Robotics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
