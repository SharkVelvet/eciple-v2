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
    defaultValue: "Finally, there's a comprehensive tech solution that easily enables any church or ministry to build and manage one-to-one discipleship programs, regardless of audience size.",
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
    key: "solution_card_1_title",
    label: "Solution Card 1 Title",
    defaultValue: "Matches mentors and mentees",
    section: "Solution Section"
  },
  {
    key: "solution_card_1_text",
    label: "Solution Card 1 Text",
    defaultValue: "Connect people within churches and communities based on compatibility.",
    section: "Solution Section"
  },
  {
    key: "solution_card_2_title",
    label: "Solution Card 2 Title",
    defaultValue: "Provides structured pathways",
    section: "Solution Section"
  },
  {
    key: "solution_card_2_text",
    label: "Solution Card 2 Text",
    defaultValue: "Offer robust tools and clear development paths for spiritual growth.",
    section: "Solution Section"
  },
  {
    key: "solution_card_3_title",
    label: "Solution Card 3 Title",
    defaultValue: "Empowers spiritual growth",
    section: "Solution Section"
  },
  {
    key: "solution_card_3_text",
    label: "Solution Card 3 Text",
    defaultValue: "Support the journey toward spiritual maturity with measurable progress.",
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
    key: "feature_card_1_title",
    label: "Feature 1 Title",
    defaultValue: "Intelligent Assessments",
    section: "Product Section"
  },
  {
    key: "feature_card_1_text",
    label: "Feature 1 Text",
    defaultValue: "Automated matching based on spiritual gifts, personality, and growth needs for optimal mentor/mentee pairing.",
    section: "Product Section"
  },
  {
    key: "feature_card_2_title",
    label: "Feature 2 Title",
    defaultValue: "Flexible Content Pathways",
    section: "Product Section"
  },
  {
    key: "feature_card_2_text",
    label: "Feature 2 Text",
    defaultValue: "Structured yet customizable content journeys that adapt to individual spiritual growth needs.",
    section: "Product Section"
  },
  {
    key: "feature_card_3_title",
    label: "Feature 3 Title",
    defaultValue: "Integrated Communications",
    section: "Product Section"
  },
  {
    key: "feature_card_3_text",
    label: "Feature 3 Text",
    defaultValue: "Built-in messaging, reminders, and scheduling tools to maintain consistent discipleship relationships.",
    section: "Product Section"
  },
  {
    key: "feature_card_4_title",
    label: "Feature 4 Title",
    defaultValue: "Centralized Analytics",
    section: "Product Section"
  },
  {
    key: "feature_card_4_text",
    label: "Feature 4 Text",
    defaultValue: "Comprehensive dashboard for pastors with metrics on mentorship engagement, relationship duration, and content effectiveness.",
    section: "Product Section"
  },
  {
    key: "feature_card_5_title",
    label: "Feature 5 Title",
    defaultValue: "Church Management Integration",
    section: "Product Section"
  },
  {
    key: "feature_card_5_text",
    label: "Feature 5 Text",
    defaultValue: "Seamless connection with existing church management systems for unified data and streamlined operations.",
    section: "Product Section"
  },
  {
    key: "feature_card_6_title",
    label: "Feature 6 Title",
    defaultValue: "Mobile-First Experience",
    section: "Product Section"
  },
  {
    key: "feature_card_6_text",
    label: "Feature 6 Text",
    defaultValue: "Fully responsive design that works seamlessly across all devices for access anywhere, anytime.",
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
  },

  // Hero Section - Additional Elements
  {
    key: "hero_badge_text",
    label: "Hero Badge Text",
    defaultValue: "Transforming Church Communities",
    section: "Hero Section"
  },

  // Problem Section - Statistics and Sources
  {
    key: "stat_1_percentage",
    label: "Statistic 1 Percentage",
    defaultValue: "55%",
    section: "Problem Section"
  },
  {
    key: "stat_1_description",
    label: "Statistic 1 Description", 
    defaultValue: "cite lack of personal discipleship programs",
    section: "Problem Section"
  },
  {
    key: "stat_1_source",
    label: "Statistic 1 Source",
    defaultValue: "Barna, 2021",
    section: "Problem Section"
  },
  {
    key: "stat_2_percentage",
    label: "Statistic 2 Percentage",
    defaultValue: "45%",
    section: "Problem Section"
  },
  {
    key: "stat_2_description",
    label: "Statistic 2 Description",
    defaultValue: "say identifying and training mentors is a challenge",
    section: "Problem Section"
  },
  {
    key: "stat_2_source",
    label: "Statistic 2 Source",
    defaultValue: "Outreach Magazine, 2022",
    section: "Problem Section"
  },
  {
    key: "stat_3_percentage",
    label: "Statistic 3 Percentage",
    defaultValue: "38%",
    section: "Problem Section"
  },
  {
    key: "stat_3_description",
    label: "Statistic 3 Description",
    defaultValue: "want improved spiritual assessment tools",
    section: "Problem Section"
  },
  {
    key: "stat_3_source",
    label: "Statistic 3 Source",
    defaultValue: "Lifeway, 2020",
    section: "Problem Section"
  },
  {
    key: "stat_4_percentage",
    label: "Statistic 4 Percentage",
    defaultValue: "32%",
    section: "Problem Section"
  },
  {
    key: "stat_4_description",
    label: "Statistic 4 Description",
    defaultValue: "lack centralized systems and metrics for tracking",
    section: "Problem Section"
  },
  {
    key: "stat_4_source",
    label: "Statistic 4 Source",
    defaultValue: "Barna, 2021",
    section: "Problem Section"
  },
  {
    key: "stat_5_percentage",
    label: "Statistic 5 Percentage",
    defaultValue: "29%",
    section: "Problem Section"
  },
  {
    key: "stat_5_description",
    label: "Statistic 5 Description",
    defaultValue: "need more customizable curriculum",
    section: "Problem Section"
  },
  {
    key: "stat_5_source",
    label: "Statistic 5 Source",
    defaultValue: "Outreach Magazine, 2022",
    section: "Problem Section"
  },
  {
    key: "problem_section_heading",
    label: "Problem Section Heading",
    defaultValue: "The Problem",
    section: "Problem Section"
  },
  {
    key: "key_finding_badge",
    label: "Key Finding Badge Text",
    defaultValue: "Key Finding",
    section: "Problem Section"
  },
  {
    key: "issue_badge_text",
    label: "Issue Badge Text",
    defaultValue: "The Discipleship Crisis",
    section: "Problem Section"
  },
  {
    key: "see_solution_button",
    label: "See Solution Button Text",
    defaultValue: "See Our Solution",
    section: "Problem Section"
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