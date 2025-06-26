import { Link } from "wouter";
import { ArrowLeft, TrendingUp, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Investors() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-blue-600">Investor Portal</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Investment Opportunity
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us in revolutionizing discipleship through technology and transforming 
            spiritual growth for churches worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Market Opportunity</h3>
            <p className="text-gray-600">
              $50B+ global Christian market with growing demand for digital 
              discipleship solutions and church management tools.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Target Audience</h3>
            <p className="text-gray-600">
              350,000+ churches in the US seeking modern solutions for 
              discipleship, member engagement, and spiritual growth tracking.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-gray-600">
              Scalable platform designed for international expansion with 
              multi-language support and cultural adaptation capabilities.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Key Investment Highlights
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Innovation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• AI-powered mentor-mentee matching algorithm</li>
                <li>• Comprehensive discipleship pathway framework</li>
                <li>• Advanced analytics and progress tracking</li>
                <li>• Integrated communication and resource sharing</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Model</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• SaaS subscription model with tiered pricing</li>
                <li>• Enterprise solutions for large ministries</li>
                <li>• Consulting and implementation services</li>
                <li>• Marketplace for discipleship resources</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Learn More?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact us to receive our complete investor deck and financial projections
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Request Investor Materials
          </Button>
        </div>
      </div>
    </div>
  );
}