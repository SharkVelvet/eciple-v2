// Default values for all editable content across the site
// This ensures we can populate the CSV with all possible content fields

export interface ContentField {
  key: string;
  label: string;
  defaultValue: string;
  section: string;
}

export const contentDefaults: ContentField[] = [
  // Hero Section
  {
    key: "hero_heading",
    label: "Main Heading",
    defaultValue: "Discipleship Reimagined",
    section: "Hero Section"
  },
  {
    key: "hero_subheading",
    label: "Subheading",
    defaultValue: "Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships.",
    section: "Hero Section"
  },
  {
    key: "hero_cta_text",
    label: "Button Text",
    defaultValue: "Learn More",
    section: "Hero Section"
  },
  
  // Problem Section
  {
    key: "problem_text",
    label: "Problem Statement",
    defaultValue: "Despite 82% of pastors saying discipleship is a priority, only 29% think their church does it effectively.",
    section: "Problem Section"
  },
  {
    key: "bottom_line_title",
    label: "Bottom Line Title",
    defaultValue: "The Bottom Line",
    section: "Problem Section"
  },
  {
    key: "bottom_line_text",
    label: "Bottom Line Text",
    defaultValue: "Churches struggle to create meaningful relationships that lead to spiritual growth.",
    section: "Problem Section"
  },
  {
    key: "mentorship_text",
    label: "Mentorship Point",
    defaultValue: "Connected Mentorship",
    section: "Problem Section"
  },
  {
    key: "curriculum_text",
    label: "Curriculum Point",
    defaultValue: "Engaging Curriculum",
    section: "Problem Section"
  },
  {
    key: "growth_text",
    label: "Growth Point",
    defaultValue: "Spiritual Growth",
    section: "Problem Section"
  },
  {
    key: "metrics_text",
    label: "Metrics Point",
    defaultValue: "Measurable Progress",
    section: "Problem Section"
  },
  
  // Solution Section
  {
    key: "solution_heading",
    label: "Solution Heading",
    defaultValue: "The Solution",
    section: "Solution Section"
  },
  {
    key: "solution_main_text",
    label: "Solution Main Text",
    defaultValue: "eciple is a comprehensive discipleship enablement platform that empowers churches to build stronger faith communities through intentional relationships.",
    section: "Solution Section"
  },
  {
    key: "solution_point1",
    label: "Solution Point 1",
    defaultValue: "AI-powered matching helps connect mentors and mentees.",
    section: "Solution Section"
  },
  {
    key: "solution_point2",
    label: "Solution Point 2",
    defaultValue: "Progress tracking for both individuals and groups.",
    section: "Solution Section"
  },
  {
    key: "solution_point3",
    label: "Solution Point 3",
    defaultValue: "Adaptive content to meet each person's unique spiritual journey.",
    section: "Solution Section"
  },
  
  // Product Section
  {
    key: "product_main_title",
    label: "Product Main Title",
    defaultValue: "Product Features",
    section: "Product Section"
  },
  {
    key: "product_main_text",
    label: "Product Main Text",
    defaultValue: "eciple provides a comprehensive set of tools for effective discipleship management and growth.",
    section: "Product Section"
  },
  {
    key: "centralized_title",
    label: "Centralized Dashboard Title",
    defaultValue: "Centralized Dashboard",
    section: "Product Section"
  },
  {
    key: "centralized_text",
    label: "Centralized Dashboard Text",
    defaultValue: "A robust backend for pastors and leaders to track discipleship relationships and growth.",
    section: "Product Section"
  },
  {
    key: "mobile_title",
    label: "Mobile Experience Title",
    defaultValue: "Mobile Experience",
    section: "Product Section"
  },
  {
    key: "mobile_text",
    label: "Mobile Experience Text",
    defaultValue: "A seamless mobile experience that keeps discipleship accessible wherever members are.",
    section: "Product Section"
  },
  {
    key: "grow_text",
    label: "Grow Feature Text",
    defaultValue: "Curated content and resources to foster spiritual growth at every stage.",
    section: "Product Section"
  },
  
  // Competition Section
  {
    key: "competition_heading",
    label: "Competition Heading",
    defaultValue: "The Competition",
    section: "Competition Section"
  },
  {
    key: "competition_subheading",
    label: "Competition Subheading",
    defaultValue: "The competitive landscape consists of focused solutions targeting aspects of discipleship, creating an opportunity for eciple to become a category leader.",
    section: "Competition Section"
  },
  
  // Pricing Section
  {
    key: "pricing_heading",
    label: "Pricing Heading",
    defaultValue: "Simple, Transparent Pricing",
    section: "Pricing Section"
  },
  {
    key: "pricing_subheading",
    label: "Pricing Subheading",
    defaultValue: "Choose the plan that works for your church community.",
    section: "Pricing Section"
  },
  {
    key: "starter_title",
    label: "Starter Tier Title",
    defaultValue: "Starter",
    section: "Pricing Section"
  },
  {
    key: "starter_price",
    label: "Starter Price",
    defaultValue: "$49/month",
    section: "Pricing Section"
  },
  {
    key: "starter_features",
    label: "Starter Features",
    defaultValue: "Up to 100 members,Basic matching,Limited reporting,Email support",
    section: "Pricing Section"
  },
  {
    key: "pro_title",
    label: "Pro Tier Title",
    defaultValue: "Pro",
    section: "Pricing Section"
  },
  {
    key: "pro_price",
    label: "Pro Price",
    defaultValue: "$99/month",
    section: "Pricing Section"
  },
  {
    key: "pro_features",
    label: "Pro Features",
    defaultValue: "Up to 500 members,Advanced matching,Comprehensive analytics,Priority support,Custom content",
    section: "Pricing Section"
  },
  {
    key: "enterprise_title",
    label: "Enterprise Tier Title",
    defaultValue: "Enterprise",
    section: "Pricing Section"
  },
  {
    key: "enterprise_price",
    label: "Enterprise Price",
    defaultValue: "Contact us",
    section: "Pricing Section"
  },
  {
    key: "enterprise_features",
    label: "Enterprise Features",
    defaultValue: "Unlimited members,Premium features,Dedicated account manager,API access,Custom integrations",
    section: "Pricing Section"
  },
  
  // Contact Section
  {
    key: "contact_heading",
    label: "Contact Heading",
    defaultValue: "Get In Touch",
    section: "Contact Section"
  },
  {
    key: "contact_subheading",
    label: "Contact Subheading",
    defaultValue: "Ready to transform your church's discipleship? Contact us today!",
    section: "Contact Section"
  },
  {
    key: "email_text",
    label: "Email Label",
    defaultValue: "Your Email",
    section: "Contact Section"
  },
  {
    key: "phone_text",
    label: "Phone Label",
    defaultValue: "Your Phone",
    section: "Contact Section"
  },
  {
    key: "submit_text",
    label: "Submit Button Text",
    defaultValue: "Send Message",
    section: "Contact Section"
  }
];

// Helper function to get content value with fallback to default value
export function getContentValue(content: Record<string, string>, key: string): string {
  const contentField = contentDefaults.find(field => field.key === key);
  return content[key] || (contentField?.defaultValue || "");
}

// Get content fields grouped by section
export function getContentSections(): {[section: string]: ContentField[]} {
  const sections: {[section: string]: ContentField[]} = {};
  
  contentDefaults.forEach(field => {
    if (!sections[field.section]) {
      sections[field.section] = [];
    }
    sections[field.section].push(field);
  });
  
  return sections;
}