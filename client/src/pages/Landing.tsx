import { Link } from "wouter";
import { ArrowRight, Users, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">eciple</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/home" className="text-gray-600 hover:text-blue-600">Platform</Link>
              <Link href="/eciplematch" className="text-gray-600 hover:text-blue-600">EcipleMatch</Link>
              <Link href="/investors" className="text-gray-600 hover:text-blue-600">Investors</Link>
              <Link href="/admin-login" className="text-gray-600 hover:text-blue-600">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Church's
            <span className="text-blue-600 block">Discipleship Journey</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            eciple revolutionizes one-to-one discipleship with intelligent mentor-mentee matching, 
            structured pathways, and comprehensive analytics for churches and ministries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/home">
                Explore Platform <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/eciplematch">
                Try EcipleMatch
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Modern Discipleship
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides everything you need to build meaningful 
              one-to-one discipleship relationships in your community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Matching
              </h3>
              <p className="text-gray-600">
                Our EcipleMatch system intelligently pairs mentors and mentees 
                based on compatibility, experience, and spiritual goals.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Structured Pathways
              </h3>
              <p className="text-gray-600">
                Guided discipleship journeys with proven frameworks, 
                resources, and milestone tracking for sustained growth.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Analytics & Insights
              </h3>
              <p className="text-gray-600">
                Comprehensive reporting and analytics to measure impact 
                and optimize your discipleship programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Ministry?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join churches worldwide who are revolutionizing discipleship 
            with eciple's comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/home">
                Get Started Today
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
              <Link href="/investors">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">eciple</h3>
            <p className="text-gray-400">
              Transforming the future of spiritual growth through technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}