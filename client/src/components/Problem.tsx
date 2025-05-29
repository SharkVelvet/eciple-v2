import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Users, LineChart, Gauge, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { AdminContext } from "@/pages/Home";
import { Textarea } from "@/components/ui/textarea";
import { getContentValue } from "@/lib/contentDefaults";

export default function Problem() {
  // Access the admin context
  const { isAdmin, editMode, editableContent, updateContent } = useContext(AdminContext);
  
  // Define editable text content keys
  const problemText = "problem_text";
  const bottomLineTitle = "bottom_line_title";
  const bottomLineText = "bottom_line_text";
  const mentorshipText = "mentorship_text";
  const curriculumText = "curriculum_text";
  const growthText = "growth_text";
  const metricsText = "metrics_text";
  
  // Get content or default values if not yet saved
  const getProblemText = () => editableContent[problemText] || 
    "Despite 82% of pastors saying discipleship is a priority, only 29% think their church does it effectively.";
  const getBottomLineTitle = () => editableContent[bottomLineTitle] || "The Bottom Line";
  const getBottomLineText = () => editableContent[bottomLineText] || "There are critical gaps in:";
  const getMentorshipText = () => editableContent[mentorshipText] || "Mentorship programs and mentor training";
  const getCurriculumText = () => editableContent[curriculumText] || "Customizable, engaging curriculum";
  const getGrowthText = () => editableContent[growthText] || "Structured growth pathways";
  const getMetricsText = () => editableContent[metricsText] || "Metrics and progress tracking";
  
  const stats = [
    { 
      percentage: getContentValue(editableContent, 'stat_1_percentage'), 
      description: getContentValue(editableContent, 'stat_1_description'), 
      source: getContentValue(editableContent, 'stat_1_source'),
      icon: Users,
      color: "bg-red-100 text-red-600"
    },
    { 
      percentage: getContentValue(editableContent, 'stat_2_percentage'), 
      description: getContentValue(editableContent, 'stat_2_description'), 
      source: getContentValue(editableContent, 'stat_2_source'),
      icon: Users,
      color: "bg-orange-100 text-orange-600"
    },
    { 
      percentage: getContentValue(editableContent, 'stat_3_percentage'), 
      description: getContentValue(editableContent, 'stat_3_description'), 
      source: getContentValue(editableContent, 'stat_3_source'),
      icon: Gauge,
      color: "bg-amber-100 text-amber-600"
    },
    { 
      percentage: getContentValue(editableContent, 'stat_4_percentage'), 
      description: getContentValue(editableContent, 'stat_4_description'), 
      source: getContentValue(editableContent, 'stat_4_source'),
      icon: LineChart,
      color: "bg-emerald-100 text-emerald-600"
    },
    { 
      percentage: getContentValue(editableContent, 'stat_5_percentage'), 
      description: getContentValue(editableContent, 'stat_5_description'), 
      source: getContentValue(editableContent, 'stat_5_source'),
      icon: FileText,
      color: "bg-blue-100 text-blue-600"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="problem" className="py-24 bg-gradient-to-b from-white to-blue-50 scroll-mt-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-[1180px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="overflow-hidden border-primary/5 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`h-2 ${stat.color.split(' ')[0]}`}></div>
                  <CardContent className="p-6 pt-5">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-2.5 ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold font-sans text-primary">{stat.percentage}</div>
                        <p className="text-foreground mt-1 font-medium">{stat.description}</p>
                        <p className="text-sm text-muted-foreground mt-2">{stat.source}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-red-100">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary problem-heading">{getContentValue(editableContent, 'problem_section_heading')}</h2>
              </div>
              
              {editMode && isAdmin ? (
                <Textarea
                  value={getProblemText()}
                  onChange={(e) => updateContent(problemText, e.target.value)}
                  className="text-xl leading-relaxed text-foreground/80 w-full min-h-[100px] resize-y"
                />
              ) : (
                <p className="text-xl leading-relaxed text-foreground/80 max-w-xl problem-subheading">
                  {getProblemText().includes("82%") ? (
                    <>
                      Despite <span className="font-semibold text-primary">82% of pastors</span> saying discipleship is a priority, only <span className="font-semibold text-secondary">29% think</span> their church does it effectively.
                    </>
                  ) : (
                    getProblemText()
                  )}
                </p>
              )}
            </motion.div>
            
            <motion.div 
              className="relative mt-12 p-8 rounded-xl bg-gradient-to-br from-white to-blue-50 border border-primary/10 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-secondary to-primary text-white text-sm font-medium px-4 py-1 rounded-full shadow-lg">
                {getContentValue(editableContent, 'key_finding_badge')}
              </div>
              <div className="absolute -top-4 -right-20 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                {getContentValue(editableContent, 'issue_badge_text')}
              </div>
              <h3 className="text-xl font-bold mb-4">
                {editMode && isAdmin ? (
                  <input
                    type="text"
                    value={getBottomLineTitle()}
                    onChange={(e) => updateContent(bottomLineTitle, e.target.value)}
                    className="w-full p-1 border border-primary/20 rounded"
                  />
                ) : (
                  getBottomLineTitle()
                )}
              </h3>
              <p className="text-foreground/80 mb-4">
                {editMode && isAdmin ? (
                  <input
                    type="text"
                    value={getBottomLineText()}
                    onChange={(e) => updateContent(bottomLineText, e.target.value)}
                    className="w-full p-1 border border-primary/20 rounded"
                  />
                ) : (
                  getBottomLineText()
                )}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-secondary" />
                  </div>
                  {editMode && isAdmin ? (
                    <input
                      type="text"
                      value={getMentorshipText()}
                      onChange={(e) => updateContent(mentorshipText, e.target.value)}
                      className="w-full p-1 border border-primary/20 rounded"
                    />
                  ) : (
                    <span>{getMentorshipText()}</span>
                  )}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-secondary" />
                  </div>
                  {editMode && isAdmin ? (
                    <input
                      type="text"
                      value={getCurriculumText()}
                      onChange={(e) => updateContent(curriculumText, e.target.value)}
                      className="w-full p-1 border border-primary/20 rounded"
                    />
                  ) : (
                    <span>{getCurriculumText()}</span>
                  )}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-secondary" />
                  </div>
                  {editMode && isAdmin ? (
                    <input
                      type="text"
                      value={getGrowthText()}
                      onChange={(e) => updateContent(growthText, e.target.value)}
                      className="w-full p-1 border border-primary/20 rounded"
                    />
                  ) : (
                    <span>{getGrowthText()}</span>
                  )}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-secondary" />
                  </div>
                  {editMode && isAdmin ? (
                    <input
                      type="text"
                      value={getMetricsText()}
                      onChange={(e) => updateContent(metricsText, e.target.value)}
                      className="w-full p-1 border border-primary/20 rounded"
                    />
                  ) : (
                    <span>{getMetricsText()}</span>
                  )}
                </li>
              </ul>
              
              <div className="mt-6">
                <Button asChild variant="outline" className="gap-1 rounded-full">
                  <a href="#solution">
                    {getContentValue(editableContent, 'see_solution_button')}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
