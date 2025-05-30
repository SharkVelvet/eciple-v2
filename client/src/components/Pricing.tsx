import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useContext, useState } from "react";
import { AdminContext } from "@/pages/ComparisonPage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function Pricing() {
  // Access admin context
  const { isAdmin, editMode, editableContent, updateContent } = useContext(AdminContext);
  const [isAnnual, setIsAnnual] = useState(false);
  
  // Define editable text content keys
  const pricingTitle = "pricing_title";
  const pricingSubtitle = "pricing_subtitle";
  
  // Helper functions to get content or default values
  const getPricingTitle = () => editableContent[pricingTitle] || "Flexible Pricing Options";
  const getPricingSubtitle = () => editableContent[pricingSubtitle] || 
    "Simple, transparent pricing that scales with your church.";
    
  // Calculate price with annual discount
  const getPrice = (monthlyPrice: number) => {
    if (isAnnual) {
      const annualPrice = monthlyPrice * 12 * 0.85; // 15% discount
      return `$${Math.round(annualPrice)}`;
    }
    return `$${monthlyPrice}`;
  };
  
  // Get the pricing period text
  const getPricingPeriod = () => {
    return isAnnual ? "/annual" : "/month";
  };
  const plans = [
    {
      name: "Small Churches",
      monthlyPrice: 99,
      description: "Under 250 members",
      features: [
        "Complete one-to-one discipleship platform",
        "Core matching capabilities",
        "Basic analytics dashboard",
        "Standard content library",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Medium Churches",
      monthlyPrice: 299,
      description: "250-750 members",
      features: [
        "Everything in Small Churches plan",
        "Advanced matching algorithm",
        "Comprehensive analytics",
        "Full content library + customization",
        "Priority email & phone support",
        "ChMS integration"
      ],
      popular: true
    },
    {
      name: "Large Churches",
      monthlyPrice: 499,
      description: "750+ members",
      features: [
        "Everything in Medium Churches plan",
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
      title: "Church Size Based",
      description: "Pricing scales with your congregation size"
    },
    {
      title: "All-Inclusive Features",
      description: "No hidden fees or add-on costs for core features"
    },
    {
      title: "Annual Discounts",
      description: "Save up to 15% with annual payment plans"
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-white scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-4">
            {editMode && isAdmin ? (
              <Input
                type="text"
                value={getPricingTitle()}
                onChange={(e) => updateContent(pricingTitle, e.target.value)}
                className="text-center"
              />
            ) : (
              getPricingTitle()
            )}
          </h2>
          {editMode && isAdmin ? (
            <Textarea
              value={getPricingSubtitle()}
              onChange={(e) => updateContent(pricingSubtitle, e.target.value)}
              className="text-lg max-w-3xl mx-auto text-foreground text-opacity-80 resize-y"
            />
          ) : (
            <p className="text-lg max-w-3xl mx-auto text-foreground text-opacity-80">
              {getPricingSubtitle()}
            </p>
          )}
          
          <div className="flex items-center justify-center mt-6 space-x-2">
            <span className={`text-sm ${!isAnnual ? 'font-semibold text-primary' : 'text-foreground text-opacity-70'}`}>Monthly</span>
            <Switch 
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={`text-sm ${isAnnual ? 'font-semibold text-primary' : 'text-foreground text-opacity-70'}`}>
              Annual <span className="ml-1 text-xs bg-accent text-white rounded-full px-2 py-0.5">Save 15%</span>
            </span>
          </div>
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
                    <span className={`text-3xl font-bold ${plan.popular ? 'text-white' : ''}`}>{getPrice(plan.monthlyPrice)}</span>
                    <span className={`${plan.popular ? 'text-white text-opacity-90' : 'text-foreground text-opacity-70'}`}>{getPricingPeriod()}</span>
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
                    <div 
                      style={{ backgroundColor: '#223349' }}
                      className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full group relative overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl mx-auto"
                      onClick={() => {
                        const element = document.querySelector('#contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <span className="font-medium text-sm">Get Started</span>
                      <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                    </div>
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
