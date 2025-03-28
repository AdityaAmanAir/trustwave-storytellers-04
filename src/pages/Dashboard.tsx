
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Heart,
  MessageSquare,
  ThumbsUp,
  Video,
  Eye,
  Calendar,
  BarChart2,
  Share2,
  ChevronUp,
  ChevronDown,
  Star,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Mock data
const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "TechSolutions Inc.",
    description: "Sharing my experience using the platform for our product launch campaign.",
    date: "2023-08-15",
    thumbnail: "https://i.pravatar.cc/300?img=1",
    views: 427,
    likes: 56,
    comments: 12,
    status: "published",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Product Manager",
    company: "Innovate Labs",
    description: "How we improved our customer onboarding process with this solution.",
    date: "2023-09-02",
    thumbnail: "https://i.pravatar.cc/300?img=2",
    views: 284,
    likes: 42,
    comments: 8,
    status: "published",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    title: "Customer Success Lead",
    company: "Growth Ventures",
    description: "The impact of implementing this solution on our customer satisfaction rates.",
    date: "2023-09-17",
    thumbnail: "https://i.pravatar.cc/300?img=3",
    views: 156,
    likes: 24,
    comments: 5,
    status: "published",
  },
  {
    id: 4,
    name: "David Park",
    title: "CEO",
    company: "Startup Foundry",
    description: "Draft testimonial still waiting for approval from our legal team.",
    date: "2023-09-22",
    thumbnail: "https://i.pravatar.cc/300?img=4",
    views: 0,
    likes: 0,
    comments: 0,
    status: "draft",
  },
];

// Dashboard analytics mock data
const analytics = {
  totalTestimonials: 17,
  totalViews: 5893,
  averageRating: 4.8,
  totalComments: 127,
  recentSentiment: 92, // percentage positive
  monthlyViews: [340, 389, 425, 521, 612, 594, 687, 729, 842, 901, 824, 729],
  emotionData: [
    { name: "Joy", value: 42 },
    { name: "Trust", value: 28 },
    { name: "Excitement", value: 14 },
    { name: "Satisfaction", value: 10 },
    { name: "Neutral", value: 6 },
  ],
};

const Dashboard = () => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("overview");

  const shareTestimonial = (id: number) => {
    // This would normally copy a share link to clipboard
    toast({
      title: "Share link copied!",
      description: "The testimonial link has been copied to your clipboard.",
    });
  };

  const formatNumber = (num: number) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Manage and analyze your testimonials
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild className="bg-primary-500 hover:bg-primary-600">
            <Link to="/record">
              <Video className="mr-2 h-4 w-4" />
              Record New Testimonial
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" onChange={(value) => setCurrentTab(value)}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="testimonials">My Testimonials</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Testimonials
                  </p>
                  <h3 className="text-3xl font-bold mt-2">
                    {analytics.totalTestimonials}
                  </h3>
                </div>
                <div className="bg-primary-50 p-3 rounded-full">
                  <Video className="h-6 w-6 text-primary-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className="flex items-center text-green-500">
                  <ChevronUp className="h-4 w-4 mr-1" />
                  <span>12%</span>
                </div>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Views
                  </p>
                  <h3 className="text-3xl font-bold mt-2">
                    {formatNumber(analytics.totalViews)}
                  </h3>
                </div>
                <div className="bg-blue-50 p-3 rounded-full">
                  <Eye className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className="flex items-center text-green-500">
                  <ChevronUp className="h-4 w-4 mr-1" />
                  <span>18%</span>
                </div>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Average Rating
                  </p>
                  <h3 className="text-3xl font-bold mt-2">
                    {analytics.averageRating}
                  </h3>
                </div>
                <div className="bg-yellow-50 p-3 rounded-full">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className="flex items-center text-green-500">
                  <ChevronUp className="h-4 w-4 mr-1" />
                  <span>0.2</span>
                </div>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Sentiment Score
                  </p>
                  <h3 className="text-3xl font-bold mt-2">
                    {analytics.recentSentiment}%
                  </h3>
                </div>
                <div className="bg-green-50 p-3 rounded-full">
                  <ThumbsUp className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className="flex items-center text-red-500">
                  <ChevronDown className="h-4 w-4 mr-1" />
                  <span>3%</span>
                </div>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </Card>
          </div>

          {/* Recent Testimonials */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTestimonials
                .filter((t) => t.status === "published")
                .slice(0, 3)
                .map((testimonial) => (
                  <Card
                    key={testimonial.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video relative bg-gray-100">
                      <img
                        src={testimonial.thumbnail}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Link
                          to={`/testimonial/${testimonial.id}`}
                          className="bg-white rounded-full p-3"
                        >
                          <Eye className="h-6 w-6 text-primary-500" />
                        </Link>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600">
                            {testimonial.title}, {testimonial.company}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDate(testimonial.date)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                        {testimonial.description}
                      </p>
                      <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>{testimonial.views}</span>
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>{testimonial.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{testimonial.comments}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
            {mockTestimonials.length > 3 && (
              <div className="mt-6 text-center">
                <Button
                  variant="link"
                  onClick={() => setCurrentTab("testimonials")}
                  className="text-primary-500 hover:text-primary-600"
                >
                  View all testimonials
                </Button>
              </div>
            )}
          </div>

          {/* Simple Analytics Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Emotion Analysis</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentTab("analytics")}
                  className="text-primary-500 hover:text-primary-600 text-sm"
                >
                  View Details
                </Button>
              </div>
              <div className="space-y-4">
                {analytics.emotionData.map((emotion) => (
                  <div key={emotion.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">
                        {emotion.name}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {emotion.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${emotion.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Monthly Views</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentTab("analytics")}
                  className="text-primary-500 hover:text-primary-600 text-sm"
                >
                  View Details
                </Button>
              </div>
              <div className="h-[200px] flex items-end">
                {analytics.monthlyViews.map((views, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full max-w-[20px] bg-primary-100 rounded-t relative group"
                      style={{
                        height: `${(views / Math.max(...analytics.monthlyViews)) * 160}px`,
                      }}
                    >
                      <div className="absolute inset-0 bg-primary-500 opacity-70 rounded-t"></div>
                      <div className="hidden group-hover:block absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
                        {views}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-6">
          <Card className="overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">My Testimonials</h2>
            </div>
            <div className="divide-y">
              {mockTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4 aspect-video bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={testimonial.thumbnail}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-3/4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600">
                            {testimonial.title}, {testimonial.company}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              testimonial.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {testimonial.status === "published"
                              ? "Published"
                              : "Draft"}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">
                        {testimonial.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(testimonial.date)}</span>
                          </div>
                          {testimonial.status === "published" && (
                            <>
                              <div className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                <span>{testimonial.views}</span>
                              </div>
                              <div className="flex items-center">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                <span>{testimonial.likes}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                <span>{testimonial.comments}</span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => shareTestimonial(testimonial.id)}
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                          <Button size="sm" asChild>
                            <Link to={`/testimonial/${testimonial.id}`}>
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Emotion Analysis</h3>
              <div className="space-y-4">
                {analytics.emotionData.map((emotion) => (
                  <div key={emotion.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">
                        {emotion.name}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {emotion.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary-500 h-2.5 rounded-full"
                        style={{ width: `${emotion.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Summary</h4>
                <p className="text-sm text-gray-600">
                  Your testimonials evoke predominantly positive emotions, with Joy and Trust being the strongest reactions. This indicates your product or service creates a very positive impression on customers.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Sentiment Trends</h3>
              <div className="h-[250px] flex items-end mb-4">
                {[85, 88, 92, 90, 91, 92].map((score, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full max-w-[40px] bg-primary-100 rounded-t relative group"
                      style={{
                        height: `${score * 2}px`,
                      }}
                    >
                      <div 
                        className="absolute inset-0 rounded-t"
                        style={{
                          background: `linear-gradient(to top, #4ade80 ${score - 60}%, #6E59A5 100%)`,
                          opacity: 0.8
                        }}
                      ></div>
                      <div className="hidden group-hover:block absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
                        {score}%
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {["Apr", "May", "Jun", "Jul", "Aug", "Sep"][index]}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Analysis</h4>
                <p className="text-sm text-gray-600">
                  Sentiment has been consistently positive over the past 6 months, with a steady trend upward. June and September show the highest sentiment scores at 92%.
                </p>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold mb-6">Monthly Performance</h3>
            <div className="h-[300px] flex items-end mb-6">
              {analytics.monthlyViews.map((views, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center"
                >
                  <div
                    className="w-full max-w-[40px] bg-primary-100 rounded-t relative group"
                    style={{
                      height: `${(views / Math.max(...analytics.monthlyViews)) * 250}px`,
                    }}
                  >
                    <div className="absolute inset-0 bg-primary-500 opacity-70 rounded-t"></div>
                    <div className="hidden group-hover:block absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
                      {views} views
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <BarChart2 className="h-5 w-5 text-primary-500 mr-2" />
                  <h4 className="font-medium">Total Views</h4>
                </div>
                <p className="text-2xl font-bold">{formatNumber(analytics.totalViews)}</p>
                <p className="text-sm text-gray-600 mt-1">Last 12 months</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Heart className="h-5 w-5 text-blue-500 mr-2" />
                  <h4 className="font-medium">Engagement Rate</h4>
                </div>
                <p className="text-2xl font-bold">5.4%</p>
                <p className="text-sm text-gray-600 mt-1">Likes & comments</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                  <h4 className="font-medium">Recommendation Rate</h4>
                </div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-gray-600 mt-1">Would recommend</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Key Insights</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                <h4 className="font-medium mb-2 flex items-center text-yellow-700">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Top Performing Testimonial
                </h4>
                <p className="text-sm text-gray-700">
                  Sarah Johnson's testimonial has the highest engagement rate (13.1%) and has been viewed 427 times. Consider featuring this on your homepage.
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                <h4 className="font-medium mb-2 flex items-center text-blue-700">
                  <BarChart className="h-5 w-5 mr-2 text-blue-500" />
                  Growth Trend
                </h4>
                <p className="text-sm text-gray-700">
                  Your testimonial views have increased by 115% over the past 6 months. Continuing to add 2-3 new testimonials per month should maintain this growth.
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                <h4 className="font-medium mb-2 flex items-center text-green-700">
                  <MessageSquare className="h-5 w-5 mr-2 text-green-500" />
                  Common Themes
                </h4>
                <p className="text-sm text-gray-700">
                  AI analysis shows "ease of use" and "exceptional support" are mentioned most frequently in positive testimonials. Consider highlighting these aspects in marketing.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
