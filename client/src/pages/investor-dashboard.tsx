import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  AreaChart,
  PieChart,
  LineChart,
  Download,
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight
} from "lucide-react";

export default function InvestorDashboard() {
  const { user, logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const metrics = [
    { name: "Total Addressable Market", value: "$227.7M", change: "+12%", icon: TrendingUp },
    { name: "Break-Even Point", value: "291 churches", change: "-8%", icon: Users },
    { name: "Annual Costs", value: "$575K", change: "-3%", icon: DollarSign },
    { name: "Year 3 Revenue", value: "$2.3M", change: "+15%", icon: TrendingUp },
  ];

  const documents = [
    { name: "Financial Projections", type: "PDF", size: "2.4 MB", date: "May 10, 2025" },
    { name: "Market Research", type: "PPTX", size: "4.7 MB", date: "April 28, 2025" },
    { name: "Product Roadmap", type: "PDF", size: "1.8 MB", date: "May 2, 2025" },
    { name: "Competitive Analysis", type: "PDF", size: "3.2 MB", date: "May 7, 2025" },
    { name: "Investment Deck", type: "PDF", size: "5.1 MB", date: "May 1, 2025" },
  ];

  const upcomingEvents = [
    { name: "Q2 Investor Update", date: "May 28, 2025", time: "2:00 PM EST" },
    { name: "Product Demo", date: "June 10, 2025", time: "11:00 AM EST" },
    { name: "Funding Round Closes", date: "July 15, 2025", time: "5:00 PM EST" },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className={`
        ${mobileMenuOpen ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" : "hidden"}
        md:flex md:flex-col md:fixed md:inset-y-0 md:z-50 md:w-64 md:border-r
        transition-all duration-200
      `}>
        <div className="h-full flex flex-col overflow-hidden md:px-2 py-4">
          <div className="px-3 py-2 flex items-center justify-between md:justify-center border-b mb-4">
            <h2 className="text-xl font-bold text-primary">
              <span className="text-secondary">e</span>ciple 
              <span className="text-xs text-muted-foreground ml-1">Portal</span>
            </h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="px-3 py-2">
            <p className="text-sm text-muted-foreground mb-1">Welcome,</p>
            <p className="font-medium">{user?.username}</p>
          </div>
          
          <nav className="flex-1 px-3 py-4">
            <div className="space-y-1">
              <Button variant="secondary" className="w-full justify-start" asChild>
                <div>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </div>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-muted-foreground" asChild>
                <div>
                  <BarChart className="mr-2 h-4 w-4" />
                  <span>Financials</span>
                </div>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-muted-foreground" asChild>
                <div>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Market Data</span>
                </div>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start text-muted-foreground" asChild>
                <div>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Timeline</span>
                </div>
              </Button>
            </div>
          </nav>
          
          <div className="mt-auto px-3 py-2 border-t">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground" asChild>
                <Link href="/">
                  <ChevronRight className="mr-2 h-4 w-4" />
                  <span>Visit Public Site</span>
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:pl-64">
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="flex h-16 items-center gap-4 px-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Investor Dashboard</h1>
            <div className="ml-auto flex items-center gap-4">
              <Button size="sm" variant="outline" asChild>
                <Link href="/">Visit Public Site</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <Card key={i} className="overflow-hidden border-2 border-primary/5">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {metric.name}
                    </CardTitle>
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className={`text-xs font-medium ${
                    metric.change.startsWith("+") ? "text-success" : "text-destructive"
                  }`}>
                    {metric.change} from previous estimates
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Snapshot</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs defaultValue="revenue">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="costs">Costs</TabsTrigger>
                    <TabsTrigger value="growth">Growth</TabsTrigger>
                  </TabsList>
                  <TabsContent value="revenue" className="space-y-4">
                    <div className="h-[250px] flex items-center justify-center p-6 border rounded-md">
                      <AreaChart className="h-40 w-40 text-muted-foreground" />
                      <div className="ml-4">
                        <h3 className="font-medium">Projected Revenue</h3>
                        <p className="text-sm text-muted-foreground">
                          Year 1: $750K | Year 2: $1.5M | Year 3: $2.3M
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average Revenue Per User (ARPU)</span>
                        <span className="font-medium">$178/month</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                  </TabsContent>
                  <TabsContent value="costs" className="space-y-4">
                    <div className="h-[250px] flex items-center justify-center p-6 border rounded-md">
                      <PieChart className="h-40 w-40 text-muted-foreground" />
                      <div className="ml-4">
                        <h3 className="font-medium">Cost Breakdown</h3>
                        <p className="text-sm text-muted-foreground">
                          Development: 45% | Marketing: 30% | Operations: 25%
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Burn Rate</span>
                        <span className="font-medium">$48K/month</span>
                      </div>
                      <Progress value={55} className="h-2" />
                    </div>
                  </TabsContent>
                  <TabsContent value="growth" className="space-y-4">
                    <div className="h-[250px] flex items-center justify-center p-6 border rounded-md">
                      <LineChart className="h-40 w-40 text-muted-foreground" />
                      <div className="ml-4">
                        <h3 className="font-medium">Church Adoption Rate</h3>
                        <p className="text-sm text-muted-foreground">
                          Year 1: 250 | Year 2: 650 | Year 3: 1,250
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Market Penetration</span>
                        <span className="font-medium">1.1% (Year 3)</span>
                      </div>
                      <Progress value={22} className="h-2" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Investment Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {documents.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/50 transition-colors group">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center text-primary mr-3">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {doc.type} • {doc.size} • {doc.date}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {upcomingEvents.map((event, i) => (
                    <div key={i} className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        <h4 className="font-medium">{event.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {event.date} at {event.time}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Investment Progress</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Fundraising Goal</h4>
                      <p className="text-sm font-medium">$145K / $200K</p>
                    </div>
                    <Progress value={72.5} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      72.5% of seed funding goal achieved
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-md">
                    <h4 className="font-medium mb-2">The Ask</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">
                          <ChevronRight className="h-3 w-3" />
                        </div>
                        <span>$200K seed funding for 20% of the cap table (pre-money value of $2M)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">
                          <ChevronRight className="h-3 w-3" />
                        </div>
                        <span>Validate product with pilot churches in Q3 2025</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2 mt-0.5">
                          <ChevronRight className="h-3 w-3" />
                        </div>
                        <span>Fund MVP development and path to profitability</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}