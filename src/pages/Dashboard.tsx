import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, Search, Download, Filter } from "lucide-react";

interface Testimonial {
  id: string;
  author: string;
  text: string;
  date: string;
  rating: number;
}

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    author: "Alice Johnson",
    text: "Great service! I highly recommend them.",
    date: "2023-01-15",
    rating: 5,
  },
  {
    id: "2",
    author: "Bob Smith",
    text: "The product was okay, but the support was excellent.",
    date: "2023-02-20",
    rating: 3,
  },
  {
    id: "3",
    author: "Charlie Brown",
    text: "Exceeded my expectations! Will definitely use again.",
    date: "2023-03-10",
    rating: 4,
  },
  {
    id: "4",
    author: "Diana Prince",
    text: "Could be better, but overall a positive experience.",
    date: "2023-04-05",
    rating: 3,
  },
  {
    id: "5",
    author: "Ethan Hunt",
    text: "Amazing! The best service I've ever received.",
    date: "2023-05-01",
    rating: 5,
  },
  {
    id: "6",
    author: "Alice Johnson",
    text: "Great service! I highly recommend them.",
    date: "2023-01-15",
    rating: 5,
  },
  {
    id: "7",
    author: "Bob Smith",
    text: "The product was okay, but the support was excellent.",
    date: "2023-02-20",
    rating: 3,
  },
  {
    id: "8",
    author: "Charlie Brown",
    text: "Exceeded my expectations! Will definitely use again.",
    date: "2023-03-10",
    rating: 4,
  },
  {
    id: "9",
    author: "Diana Prince",
    text: "Could be better, but overall a positive experience.",
    date: "2023-04-05",
    rating: 3,
  },
  {
    id: "10",
    author: "Ethan Hunt",
    text: "Amazing! The best service I've ever received.",
    date: "2023-05-01",
    rating: 5,
  },
];

interface CampaignData {
  name: string;
  views: number;
  clicks: number;
  conversions: number;
}

const mockCampaignData: CampaignData[] = [
  { name: "Campaign A", views: 4000, clicks: 2400, conversions: 800 },
  { name: "Campaign B", views: 3000, clicks: 1398, conversions: 600 },
  { name: "Campaign C", views: 2000, clicks: 9800, conversions: 400 },
  { name: "Campaign D", views: 2780, clicks: 3908, conversions: 700 },
  { name: "Campaign E", views: 1890, clicks: 4800, conversions: 300 },
  { name: "Campaign F", views: 2390, clicks: 3800, conversions: 550 },
  { name: "Campaign G", views: 3490, clicks: 4300, conversions: 900 },
];

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const mockCategoryData: CategoryData[] = [
  { name: "Positive", value: 35, color: "#60A5FA" },
  { name: "Neutral", value: 25, color: "#A3A3A3" },
  { name: "Negative", value: 15, color: "#F472B6" },
  { name: "Uncategorized", value: 25, color: "#E5E7EB" },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => Promise.resolve(mockTestimonials)
  });

  if (isLoading) {
    return <div>Loading testimonials...</div>;
  }

  if (isError) {
    return <div>Error loading testimonials.</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTestimonials = data
    ? data.filter((testimonial) =>
        testimonial.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalItems = filteredTestimonials.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = filteredTestimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your testimonial data is being prepared for download.",
    });
  };

  const COLORS = mockCategoryData.map(item => item.color);

  return (
    <div className="container max-w-[1440px] py-8 mx-auto px-4 md:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight glow-text">Performance Dashboard</h1>
        <p className="text-muted-foreground">Track and monitor your testimonial campaign metrics</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-gradient hover-glow">
              <div className="p-6">
                <h2 className="text-lg font-semibold">Total Testimonials</h2>
                <p className="text-4xl font-bold mt-2">{data ? data.length : 0}</p>
              </div>
            </Card>
            <Card className="card-gradient hover-glow">
              <div className="p-6">
                <h2 className="text-lg font-semibold">Average Rating</h2>
                <p className="text-4xl font-bold mt-2">
                  {data
                    ? data.reduce((acc, curr) => acc + curr.rating, 0) /
                      data.length
                    : 0}
                </p>
              </div>
            </Card>
            <Card className="card-gradient hover-glow">
              <div className="p-6">
                <h2 className="text-lg font-semibold">New Testimonials</h2>
                <p className="text-4xl font-bold mt-2">12</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
            <div className="relative w-full sm:w-[400px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search testimonials..."
                className="pl-10 py-3 pr-4 border border-input rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={handleDownload}>
                <Download className="mr-2" size={18} />
                Download
              </Button>
              <Button variant="secondary" size="lg">
                <Filter className="mr-2" size={18} />
                Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Testimonial
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                {currentItems.map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {testimonial.author}
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-500 dark:text-gray-300">
                      {testimonial.text}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {formatDate(testimonial.date)}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {testimonial.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
            </span>
            <div className="space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card className="card-gradient hover-glow">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Campaign Performance</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockCampaignData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="name" className="text-sm text-gray-500 dark:text-gray-400" />
                  <YAxis className="text-sm text-gray-500 dark:text-gray-400" />
                  <Tooltip />
                  <Bar dataKey="views" fill="#8884d8" />
                  <Bar dataKey="clicks" fill="#82ca9d" />
                  <Bar dataKey="conversions" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card className="card-gradient hover-glow">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Testimonial Categories</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={mockCategoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        label
                      >
                        {
                          mockCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))
                        }
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center">
                  <ul className="w-full space-y-3">
                    {mockCategoryData.map((category) => (
                      <li key={category.name} className="flex items-center gap-3 text-sm">
                        <span className="block w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></span>
                        <span className="text-gray-700 dark:text-gray-200 font-medium">{category.name}</span>
                        <span className="ml-auto text-lg font-semibold">{category.value}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
