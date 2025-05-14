import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      description: "For smaller churches",
      features: [
        "Up to 100 active users",
        "Core matching capabilities",
        "Basic analytics dashboard",
        "Standard content library",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Growth",
      price: "$249",
      description: "For mid-sized churches",
      features: [
        "Up to 500 active users",
        "Advanced matching algorithm",
        "Comprehensive analytics",
        "Full content library + customization",
        "Priority email & phone support",
        "ChMS integration"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$499",
      description: "For large churches",
      features: [
        "Unlimited users",
        "Premium matching & assessments",
        "Advanced analytics & reporting",
        "Custom content creation",
        "Dedicated support manager",
        "API access & custom integrations",
        "Multi-campus support"
      ],
      popular: false
    }
  ];

  const businessStats = [
    {
      title: "3-Tiered Pricing",
      description: "Flexible model based on church size and needs"
    },
    {
      title: "Break-Even Point",
      description: "291 churches needed to cover estimated $575K annual costs"
    },
    {
      title: "Revenue Potential",
      description: "$2.3M projected by Year 3"
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-4">Business Model</h2>
          <p className="text-lg max-w-3xl mx-auto text-foreground text-opacity-80">
            A sustainable pricing model designed for churches of all sizes.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`${plan.popular ? 'z-10' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                plan.popular ? 'border-2 border-primary shadow-lg scale-105 relative' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                  </div>
                )}
                <CardHeader className={`text-center ${plan.popular ? 'bg-primary' : 'bg-gray-50'}`}>
                  <CardTitle className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-primary'}`}>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className={`text-3xl font-bold ${plan.popular ? 'text-white' : ''}`}>{plan.price}</span>
                    <span className={`${plan.popular ? 'text-white text-opacity-90' : 'text-foreground text-opacity-70'}`}>/month</span>
                  </div>
                  <p className={`mt-2 ${plan.popular ? 'text-white text-opacity-90' : 'text-foreground text-opacity-60'}`}>{plan.description}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-success mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="w-full justify-center">
                      <a href="#contact">Get Started</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {businessStats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-semibold font-sans text-primary mb-2">{stat.title}</h3>
              <p className="text-foreground text-opacity-80">{stat.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
