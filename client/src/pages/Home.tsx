import { Link } from "wouter";
import { ArrowLeft, Users, BookOpen, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
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
              <h1 className="text-2xl font-bold text-blue-600">eciple Platform</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discipleship Platform Overview
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools for building and managing one-to-one discipleship programs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mentor-Mentee Matching</h3>
            <p className="text-gray-600 mb-4">
              Intelligent algorithm pairs mentors with mentees based on personality, 
              experience, and spiritual goals.
            </p>
            <Button asChild className="w-full">
              <Link href="/eciplematch">
                Try EcipleMatch
              </Link>
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Structured Pathways</h3>
            <p className="text-gray-600 mb-4">
              Guided discipleship journeys with proven frameworks and 
              milestone tracking for sustained growth.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600 mb-4">
              Comprehensive reporting and insights to measure impact 
              and optimize discipleship programs.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-6">
            Begin your discipleship journey with our intelligent matching system
          </p>
          <Button asChild size="lg">
            <Link href="/eciplematch">
              Launch EcipleMatch
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}