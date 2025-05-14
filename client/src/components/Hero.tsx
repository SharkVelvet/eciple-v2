import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Users, ArrowRight, Heart } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="pt-28 pb-20 bg-gradient-to-br from-[#FF7500] via-secondary to-[#FF7500] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 -left-20 w-60 h-60 bg-secondary/30 rounded-full blur-3xl"
          animate={{ 
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-40 h-40 bg-primary/30 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8"
              variants={itemVariants}
            >
              <Sparkles className="h-4 w-4 mr-2 text-secondary" />
              <span>Transforming Church Communities</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans mb-6 leading-tight"
              variants={itemVariants}
            >
              Discipleship <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-secondary to-accent animate-text-gradient bg-300%">
                Reimagined
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed"
              variants={itemVariants}
            >
              A comprehensive platform that transforms how churches create meaningful discipleship relationships.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                variant="default" 
                asChild 
                className="bg-accent hover:bg-accent/90 text-white px-8 rounded-full group relative overflow-hidden shadow-lg shadow-accent/20"
              >
                <a href="#contact" className="flex items-center gap-2">
                  Request Demo
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full"
              >
                <a href="#product">Learn More</a>
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-12 flex items-center gap-6"
              variants={itemVariants}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary p-0.5">
                    <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                      {i}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="text-white/80">Join <span className="font-bold text-white">1,200+ churches</span></p>
                <div className="flex items-center gap-1 text-accent">
                  <Heart className="h-3 w-3 fill-accent" />
                  <Heart className="h-3 w-3 fill-accent" />
                  <Heart className="h-3 w-3 fill-accent" />
                  <Heart className="h-3 w-3 fill-accent" />
                  <Heart className="h-3 w-3 fill-accent" />
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative bg-white/10 backdrop-blur-sm p-1 rounded-xl shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-secondary/20 opacity-50"></div>
              <img 
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="People engaged in spiritual mentorship" 
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
            
            <motion.div 
              className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-primary font-medium">Connected Mentorship</p>
                  <p className="text-sm text-gray-500">AI-powered matching</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -top-5 -right-5 bg-white p-4 rounded-lg shadow-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-primary font-medium">Spiritual Growth</p>
                  <p className="text-sm text-gray-500">Measurable progress</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
