import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowRight, Users, BookOpen, BarChart3 } from "lucide-react";

import ecipleLogo from "@assets/eciple-white.png";

export default function WelcomePage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#223349] to-[#15BEE2]">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl text-center"
        >
          <img 
            src={ecipleLogo} 
            alt="eciple" 
            className="mx-auto h-20 mb-8" 
          />
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
            Welcome to eciple
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Transforming discipleship through intelligent technology. Connect mentors and mentees, 
            track spiritual growth, and build stronger faith communities.
          </p>
          
          {/* Navigation Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card 
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => setLocation("/home")}
              >
                <CardHeader>
                  <Users className="h-8 w-8 text-white mx-auto mb-2" />
                  <CardTitle className="text-white">Platform Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    Explore our comprehensive discipleship management solution
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent border-white/30 text-white hover:bg-white/10"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card 
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => setLocation("/investors")}
              >
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-white mx-auto mb-2" />
                  <CardTitle className="text-white">Investor Portal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    Access investment opportunities and financial projections
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent border-white/30 text-white hover:bg-white/10"
                  >
                    View Portal <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card 
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => setLocation("/eciplematch")}
              >
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-white mx-auto mb-2" />
                  <CardTitle className="text-white">EcipleMatch</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    AI-powered mentor-mentee matching and resources
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent border-white/30 text-white hover:bg-white/10"
                  >
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="text-center text-white/50 text-sm">
            <p>Transforming Discipleship Through Technology</p>
            <p className="mt-1">© {new Date().getFullYear()} eciple. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}