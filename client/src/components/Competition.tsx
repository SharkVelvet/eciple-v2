import { motion } from "framer-motion";
import { CheckCircle, MinusCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

export default function Competition() {
  const features = [
    "Customized Pathways",
    "Effective Matching",
    "Integrated Messaging",
    "Church Data Integration",
    "Mobile Access"
  ];

  const competitors = [
    "eciple",
    "RightNow Media",
    "MinistrySmart",
    "MinistryGrid"
  ];

  // Support matrix: 2 = full support, 1 = partial, 0 = no support
  const supportMatrix = [
    [2, 0, 0, 1], // Customized Pathways
    [2, 0, 0, 0], // Effective Matching
    [2, 0, 1, 0], // Integrated Messaging
    [2, 1, 2, 1], // Church Data Integration
    [2, 2, 1, 2]  // Mobile Access
  ];

  const renderSupportIcon = (level: number) => {
    if (level === 2) return <CheckCircle className="h-5 w-5 text-[#15BEE2] mx-auto" />;
    if (level === 1) return <MinusCircle className="h-5 w-5 text-warning mx-auto" />;
    return <XCircle className="h-5 w-5 text-muted-foreground mx-auto" />;
  };

  return (
    <section id="competition" className="py-16 bg-white scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-4">The Competition</h2>
          <p className="text-lg max-w-3xl mx-auto text-foreground text-opacity-80">
            The competitive landscape consists of focused solutions targeting aspects of discipleship, creating an opportunity for eciple to become a category leader.
          </p>
        </motion.div>
        
        <motion.div 
          className="overflow-x-auto mt-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
        >
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-[#223349] hover:bg-[#223349]">
                <TableHead className="text-white">Features</TableHead>
                {competitors.map((competitor, index) => (
                  <TableHead key={index} className="text-center text-white">
                    {index === 0 ? (
                      <span className="inline-block relative px-4 py-1">
                        <span className="absolute inset-0 rounded-full bg-[#15BEE2]/40 animate-pulse"></span>
                        <span className="relative z-10 font-semibold">{competitor}</span>
                      </span>
                    ) : (
                      competitor
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, rowIndex) => (
                <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : ""}>
                  <TableCell className="font-medium">{feature}</TableCell>
                  {supportMatrix[rowIndex].map((support, colIndex) => (
                    <TableCell 
                      key={colIndex} 
                      className={`text-center ${colIndex === 0 ? 'bg-gradient-to-b from-[#15BEE2]/10 to-white' : ''}`}
                    >
                      {renderSupportIcon(support)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
        
        <motion.div 
          className="overflow-x-auto mt-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ delay: 0.15, duration: 0.35, ease: "easeOut" }}
        >
          <h3 className="text-2xl font-semibold font-sans text-primary mb-6 text-center">Current Discipleship Providers vs. eciple Discipleship Enablement Platform</h3>
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-[#223349] hover:bg-[#223349]">
                <TableHead className="text-white">Comparison Factor</TableHead>
                <TableHead className="text-center text-white">Current Providers</TableHead>
                <TableHead className="text-center text-white">
                  <span className="inline-block relative px-4 py-1">
                    <span className="absolute inset-0 rounded-full bg-[#15BEE2]/40 animate-pulse"></span>
                    <span className="relative z-10 font-semibold">eciple Platform</span>
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-gray-50">
                <TableCell className="font-medium">Model</TableCell>
                <TableCell>Group-Focused (Curriculum Driven Discipleship)</TableCell>
                <TableCell className="bg-gradient-to-b from-[#15BEE2]/10 to-white">Exclusively One-to-One Focused (Relationship Driven Discipleship)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Purpose</TableCell>
                <TableCell>Christian education and building a knowledge base in group settings</TableCell>
                <TableCell className="bg-gradient-to-b from-[#15BEE2]/10 to-white">Individualized mentoring to foster spiritual growth and change</TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell className="font-medium">Operation</TableCell>
                <TableCell>Content disjointed from church management, manual processes</TableCell>
                <TableCell className="bg-gradient-to-b from-[#15BEE2]/10 to-white">Platform integrated into church management, automated processes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Technology</TableCell>
                <TableCell>Tech for content delivery only - Zero One-to-One Functionality</TableCell>
                <TableCell className="bg-gradient-to-b from-[#15BEE2]/10 to-white">Purpose-Built, Comprehensive One-to-One Technology Platform</TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell className="font-medium">Programs</TableCell>
                <TableCell>Limited to off-the-shelf, provider-defined options</TableCell>
                <TableCell className="bg-gradient-to-b from-[#15BEE2]/10 to-white">Easy-to-use, fully custom program creation tools</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Pathways</TableCell>
                <TableCell>Predefined, Locked-Down, Inflexible Pathway Steps</TableCell>
                <TableCell className="bg-gradient-to-b from-[#15BEE2]/10 to-white">Easy pathway creation with fully custom steps and activities</TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell className="font-medium">Learning</TableCell>
                <TableCell>Content Overload: Searching and Vetting Burden</TableCell>
                <TableCell className="bg-gradient-to-b from-[#15BEE2]/10 to-white">Efficient Content: Integrated authoring for custom/existing content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Theology</TableCell>
                <TableCell>Theological Positions Defined and Dictated by Provider</TableCell>
                <TableCell className="bg-gradient-to-b from-[#15BEE2]/10 to-white">Theological Positions Defined and Personalized by Ministry</TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell className="font-medium">Control</TableCell>
                <TableCell>3rd party providers have full control</TableCell>
                <TableCell className="bg-gradient-to-b from-[#15BEE2]/10 to-white">Ministry has full control</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Measurement</TableCell>
                <TableCell>Aggregated group data (attendance, etc.)</TableCell>
                <TableCell className="bg-gradient-to-b from-[#15BEE2]/10 to-white">Individualized spiritual growth and faith journey</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </motion.div>

        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: 0.2, duration: 0.35, ease: "easeOut" }}
        >
          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold font-sans text-primary mb-4">The Opportunity</h3>
              <p className="text-foreground text-opacity-80">
                With no integrated end-to-end discipleship platforms currently available, eciple is positioned to become a category leader by combining the capabilities churches are currently cobbling together from multiple sources.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
