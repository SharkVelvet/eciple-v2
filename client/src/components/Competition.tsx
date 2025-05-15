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
    if (level === 2) return <CheckCircle className="h-5 w-5 text-success mx-auto" />;
    if (level === 1) return <MinusCircle className="h-5 w-5 text-warning mx-auto" />;
    return <XCircle className="h-5 w-5 text-muted-foreground mx-auto" />;
  };

  return (
    <section id="competition" className="py-16 bg-white scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-4">The Competition</h2>
          <p className="text-lg max-w-3xl mx-auto text-foreground text-opacity-80">
            The competitive landscape consists of focused solutions targeting aspects of discipleship, creating an opportunity for eciple to become a category leader.
          </p>
        </motion.div>
        
        <motion.div 
          className="overflow-x-auto mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-primary">
                <TableHead className="text-white">Features</TableHead>
                {competitors.map((competitor, index) => (
                  <TableHead key={index} className="text-center text-white">
                    {competitor}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, rowIndex) => (
                <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : ""}>
                  <TableCell className="font-medium">{feature}</TableCell>
                  {supportMatrix[rowIndex].map((support, colIndex) => (
                    <TableCell key={colIndex} className="text-center">
                      {renderSupportIcon(support)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
        
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
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
