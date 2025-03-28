
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, Video, ThumbsUp, MessageSquare, Heart } from "lucide-react";

// Mock testimonial data
const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "TechSolutions Inc.",
    description: "TrustWave has transformed how we collect customer stories. The sentiment analysis helps us understand what resonates with our audience.",
    date: "2023-08-15",
    thumbnail: "https://i.pravatar.cc/300?img=1",
    videoUrl: "#",
    category: "Technology",
    sentiment: 0.92,
    likes: 56,
    comments: 12,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Product Manager",
    company: "Innovate Labs",
    description: "The real-time emotion overlay feature is incredible! It's helped our testimonial contributors create more engaging content.",
    date: "2023-09-02",
    thumbnail: "https://i.pravatar.cc/300?img=2",
    videoUrl: "#",
    category: "Technology",
    sentiment: 0.88,
    likes: 42,
    comments: 8,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    title: "Customer Success Lead",
    company: "Growth Ventures",
    description: "We've seen a 40% increase in engagement since using TrustWave's video testimonial platform. The authentication features build real trust.",
    date: "2023-09-17",
    thumbnail: "https://i.pravatar.cc/300?img=3",
    videoUrl: "#",
    category: "Marketing",
    sentiment: 0.95,
    likes: 24,
    comments: 5,
  },
  {
    id: 4,
    name: "David Park",
    title: "CEO",
    company: "Startup Foundry",
    description: "This platform has been essential for our rebrand. The video testimonials feel authentic and have helped establish credibility for our new direction.",
    date: "2023-10-05",
    thumbnail: "https://i.pravatar.cc/300?img=4",
    videoUrl: "#",
    category: "Business",
    sentiment: 0.91,
    likes: 18,
    comments: 3,
  },
  {
    id: 5,
    name: "Alex Rivera",
    title: "Digital Marketing Specialist",
    company: "MediaForge",
    description: "The analytics provided by TrustWave give us invaluable insights into how our testimonials perform and what messaging resonates.",
    date: "2023-10-12",
    thumbnail: "https://i.pravatar.cc/300?img=5",
    videoUrl: "#",
    category: "Marketing",
    sentiment: 0.87,
    likes: 31,
    comments: 7,
  },
  {
    id: 6,
    name: "Jordan Taylor",
    title: "E-commerce Director",
    company: "Urban Retail Group",
    description: "Our conversion rate increased by 25% after adding these video testimonials to our product pages. The authenticity shines through.",
    date: "2023-10-20",
    thumbnail: "https://i.pravatar.cc/300?img=6",
    videoUrl: "#",
    category: "E-commerce",
    sentiment: 0.93,
    likes: 47,
    comments: 9,
  },
];

const categories = ["All", "Technology", "Marketing", "Business", "E-commerce"];

const Testimonials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  // Filter testimonials based on search and category
  const filteredTestimonials = mockTestimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "All" || testimonial.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort testimonials
  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "popular") {
      return b.likes - a.likes;
    } else if (sortBy === "sentiment") {
      return b.sentiment - a.sentiment;
    }
    return 0;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getSentimentColor = (score: number) => {
    if (score >= 0.9) return "text-green-500";
    if (score >= 0.7) return "text-blue-500";
    return "text-yellow-500";
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="mt-1 text-gray-600">
            Discover authentic stories from our customers
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild className="bg-primary-500 hover:bg-primary-600">
            <Link to="/record">
              <Video className="mr-2 h-4 w-4" />
              Add Your Story
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Increased the search field to span more columns */}
        <div className="relative md:col-span-7">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search testimonials by name, company, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        <div className="flex space-x-2 md:col-span-3 overflow-x-auto">
          <Button
            variant="outline"
            className={selectedCategory === "All" ? "bg-primary-50 text-primary-500 border-primary-200" : ""}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </Button>
          {categories.slice(1).map((category) => (
            <Button
              key={category}
              variant="outline"
              className={selectedCategory === category ? "bg-primary-50 text-primary-500 border-primary-200" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="flex justify-end md:col-span-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Filter className="mr-2 h-4 w-4" />
                {sortBy === "latest"
                  ? "Latest"
                  : sortBy === "oldest"
                  ? "Oldest"
                  : sortBy === "popular"
                  ? "Most Popular"
                  : "Highest Sentiment"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("latest")}>
                Latest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                Oldest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("popular")}>
                Most Popular
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("sentiment")}>
                Highest Sentiment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Testimonials grid */}
      {sortedTestimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTestimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link to={`/testimonial/${testimonial.id}`} className="block">
                <div className="aspect-video relative bg-gray-100">
                  <img
                    src={testimonial.thumbnail}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <div className="flex items-center mb-1">
                        <span className={`text-xs px-2 py-1 rounded-full mr-2 bg-white/20 backdrop-blur-sm ${getSentimentColor(testimonial.sentiment)}`}>
                          {Math.round(testimonial.sentiment * 100)}% Positive
                        </span>
                        <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                          {testimonial.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center">
                    <Video className="text-white h-5 w-5" />
                  </div>
                </div>
              </Link>
              <div className="p-5">
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
                <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                  {testimonial.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-gray-500">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">{testimonial.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span className="text-sm">{testimonial.comments}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto hover:bg-transparent hover:text-primary-500"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <Search className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No testimonials found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <div className="mt-6">
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}>
              Clear filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
