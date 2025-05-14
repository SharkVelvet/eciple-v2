import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-primary bg-opacity-80"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1523803326055-13ad22852389?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay"
        }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Discipleship <span className="text-accent">Reimagined</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-white text-opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A comprehensive platform that transforms how churches create meaningful discipleship relationships.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button size="lg" variant="default" asChild className="bg-accent hover:bg-accent/90 text-white">
              <a href="#contact">Request Demo</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <a href="#product">Learn More</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
