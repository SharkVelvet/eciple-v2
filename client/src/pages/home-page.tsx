import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowRight, Users, BarChart3, BookOpen } from "lucide-react";

export default function HomePage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#223349] to-[#15BEE2]">
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl text-center"
        >
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
            eciple
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-3xl mx-auto">
            One-to-One Discipleship Platform - Transforming spiritual growth through intelligent technology
          </p>
          
          {/* Three Main Navigation Sections */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card 
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer h-full"
                onClick={() => setLocation("/home")}
              >
                <CardHeader>
                  <Users className="h-12 w-12 text-white mx-auto mb-4" />
                  <CardTitle className="text-white text-xl">Platform Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-6">
                    Explore our comprehensive discipleship management platform with mentor-mentee matching and growth tracking
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent border-white/30 text-white hover:bg-white/10"
                  >
                    View Platform <ArrowRight className="ml-2 h-4 w-4" />
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
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer h-full"
                onClick={() => setLocation("/investors")}
              >
                <CardHeader>
                  <BarChart3 className="h-12 w-12 text-white mx-auto mb-4" />
                  <CardTitle className="text-white text-xl">Investor Portal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-6">
                    Access investment opportunities, financial projections, and business development information
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
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer h-full"
                onClick={() => setLocation("/eciplematch")}
              >
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-white mx-auto mb-4" />
                  <CardTitle className="text-white text-xl">EcipleMatch</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-6">
                    AI-powered mentor-mentee matching system with discipleship resources and guidance materials
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

          <div className="mt-12 text-center text-white/60 text-sm">
            <p>Transforming the future of spiritual growth</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}