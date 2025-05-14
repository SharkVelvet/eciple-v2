import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const links = {
    quickLinks: [
      { name: "The Problem", href: "#problem" },
      { name: "Our Solution", href: "#solution" },
      { name: "Product Features", href: "#product" },
      { name: "Competitive Analysis", href: "#competition" },
      { name: "Market Opportunity", href: "#market" },
      { name: "Pricing", href: "#pricing" }
    ],
    resources: [
      { name: "Blog", href: "#" },
      { name: "Case Studies", href: "#" },
      { name: "Discipleship Resources", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" }
    ],
    contact: [
      { icon: "envelope", text: "info@eciple.com" },
      { icon: "phone", text: "(555) 123-4567" },
      { icon: "map-marker-alt", text: "123 Discipleship Way\nNashville, TN 37203" }
    ],
    social: [
      { icon: "facebook-f", href: "#" },
      { icon: "twitter", href: "#" },
      { icon: "instagram", href: "#" },
      { icon: "linkedin-in", href: "#" }
    ]
  };

  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold font-sans mb-4">
              <span className="text-secondary">e</span>ciple
            </h3>
            <p className="text-white text-opacity-70 mb-4">
              Transforming discipleship through innovative technology and intentional relationships.
            </p>
            <div className="flex space-x-4">
              {links.social.map((item, index) => (
                <a key={index} href={item.href} className="text-white hover:text-accent transition-colors">
                  <i className={`fab fa-${item.icon}`}></i>
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h4 className="text-lg font-semibold font-sans mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white text-opacity-70 hover:text-accent transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h4 className="text-lg font-semibold font-sans mb-4">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white text-opacity-70 hover:text-accent transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h4 className="text-lg font-semibold font-sans mb-4">Contact Us</h4>
            <ul className="space-y-2">
              {links.contact.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent mr-2 mt-1">
                    <i className={`fas fa-${item.icon}`}></i>
                  </span>
                  <span className="text-white text-opacity-70">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center">
          <p className="text-white text-opacity-60">
            &copy; {currentYear} eciple. All rights reserved. Discipleship Reimagined.
          </p>
        </div>
      </div>
    </footer>
  );
}
