
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Share2, ThumbsUp, MessageSquare, Heart, Send, Calendar, BarChart3, Award, Smile, Frown, Meh } from "lucide-react";

// Mock testimonial data
const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "TechSolutions Inc.",
    avatar: "https://i.pravatar.cc/150?img=1",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    date: "2023-08-15",
    description: "TrustWave has transformed how we collect customer stories. The sentiment analysis helps us understand what resonates with our audience in a way we never could before. The implementation was smooth, and our team picked it up quickly.",
    category: "Technology",
    likes: 56,
    views: 427,
    comments: [
      {
        id: "c1",
        name: "Alex Chen",
        avatar: "https://i.pravatar.cc/150?img=10",
        content: "Great insights! How long did it take your team to implement this solution?",
        date: "2023-08-20",
        sentiment: "positive"
      },
      {
        id: "c2",
        name: "Maya Johnson",
        avatar: "https://i.pravatar.cc/150?img=11",
        content: "We're considering TrustWave too. Did you see any immediate ROI?",
        date: "2023-08-21",
        sentiment: "neutral"
      }
    ],
    sentiment: {
      positive: 85,
      neutral: 12,
      negative: 3
    },
    emotions: {
      joy: 52,
      trust: 30,
      anticipation: 10,
      surprise: 8
    }
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Product Manager",
    company: "Innovate Labs",
    avatar: "https://i.pravatar.cc/150?img=2",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    date: "2023-09-02",
    description: "The real-time emotion overlay feature is incredible! It's helped our testimonial contributors create more engaging content that really connects with our audience. We've seen a significant improvement in how long visitors stay on our site.",
    category: "Technology",
    likes: 42,
    views: 284,
    comments: [
      {
        id: "c3",
        name: "James Wilson",
        avatar: "https://i.pravatar.cc/150?img=12",
        content: "The emotion detection is definitely a game-changer. Have you tried using it for product demos as well?",
        date: "2023-09-10",
        sentiment: "positive"
      }
    ],
    sentiment: {
      positive: 78,
      neutral: 20,
      negative: 2
    },
    emotions: {
      joy: 45,
      trust: 25,
      anticipation: 20,
      surprise: 10
    }
  },
  // Additional testimonials would be here
];

const TestimonialView = () => {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  
  // Find the testimonial
  const testimonial = testimonials.find(t => t.id === id) || testimonials[0];
  
  const handleLike = () => {
    setHasLiked(!hasLiked);
    if (!hasLiked) {
      toast.success("You liked this testimonial!");
    }
  };
  
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      toast.success("Comment added successfully!");
      setComment("");
      // In a real app, this would add the comment to the database
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Generate sentiment score class
  const getSentimentClass = (type: string) => {
    if (type === "positive") return "text-green-500";
    if (type === "neutral") return "text-blue-500";
    return "text-red-500";
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Video Section */}
          <Card className="overflow-hidden mb-6">
            <div className="bg-black aspect-video">
              <video 
                src={testimonial.videoUrl} 
                controls 
                className="w-full h-full object-contain"
                poster={`https://i.pravatar.cc/1200?img=${testimonial.id}`}
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-xl font-bold">{testimonial.name}</h1>
                    <p className="text-gray-600">{testimonial.title} at {testimonial.company}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(testimonial.date)}</span>
                </div>
              </div>
              
              <p className="mt-4 text-gray-700">{testimonial.description}</p>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="flex space-x-4">
                  <Button 
                    variant={hasLiked ? "default" : "outline"} 
                    size="sm"
                    className={hasLiked ? "bg-primary-500 hover:bg-primary-600" : ""}
                    onClick={handleLike}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {hasLiked ? testimonial.likes + 1 : testimonial.likes}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{testimonial.views} views</span>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Comments Section */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Comments ({testimonial.comments.length})</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleComment} className="mb-8">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mb-3"
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!comment.trim()}>
                    <Send className="mr-2 h-4 w-4" />
                    Post Comment
                  </Button>
                </div>
              </form>
              
              <div className="space-y-6">
                {testimonial.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.avatar} alt={comment.name} />
                      <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{comment.name}</h4>
                        <span className="text-xs text-gray-500">{formatDate(comment.date)}</span>
                      </div>
                      <p className="mt-1 text-gray-700">{comment.content}</p>
                      <div className="mt-2 flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          <ThumbsUp className="mr-1 h-3 w-3" />
                          Like
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          Reply
                        </Button>
                        <span className={`flex items-center text-xs ${getSentimentClass(comment.sentiment)}`}>
                          {comment.sentiment === "positive" && <Smile className="h-3 w-3 mr-1" />}
                          {comment.sentiment === "neutral" && <Meh className="h-3 w-3 mr-1" />}
                          {comment.sentiment === "negative" && <Frown className="h-3 w-3 mr-1" />}
                          {comment.sentiment.charAt(0).toUpperCase() + comment.sentiment.slice(1)} sentiment
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        {/* Sidebar with Analytics */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-5 w-5 text-primary-500 mr-2" />
              <h3 className="font-semibold">Sentiment Analysis</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Positive</span>
                  </div>
                  <span className="text-sm font-medium">{testimonial.sentiment.positive}%</span>
                </div>
                <Progress value={testimonial.sentiment.positive} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                    <span className="text-sm">Neutral</span>
                  </div>
                  <span className="text-sm font-medium">{testimonial.sentiment.neutral}%</span>
                </div>
                <Progress value={testimonial.sentiment.neutral} className="h-2 bg-gray-200" indicatorClassName="bg-blue-400" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Negative</span>
                  </div>
                  <span className="text-sm font-medium">{testimonial.sentiment.negative}%</span>
                </div>
                <Progress value={testimonial.sentiment.negative} className="h-2 bg-gray-200" indicatorClassName="bg-red-500" />
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded text-sm text-gray-700">
              This testimonial has a predominantly positive sentiment, which suggests it resonates well with viewers.
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Heart className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="font-semibold">Emotion Detection</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(testimonial.emotions).map(([emotion, value]) => (
                <div key={emotion} className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-500 mb-2">
                    {emotion === "joy" && <Smile className="h-5 w-5" />}
                    {emotion === "trust" && <Award className="h-5 w-5" />}
                    {emotion === "anticipation" && <Eye className="h-5 w-5" />}
                    {emotion === "surprise" && <MessageSquare className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium capitalize">{emotion}</p>
                    <p className="text-sm text-gray-500">{value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Award className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="font-semibold">Key Highlights</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-primary-100 p-1 rounded text-primary-500 mr-3 mt-0.5">
                  <ThumbsUp className="h-4 w-4" />
                </div>
                <span className="text-sm">Strong positive sentiment indicates high satisfaction</span>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-100 p-1 rounded text-primary-500 mr-3 mt-0.5">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <span className="text-sm">Comments show interest in implementation details</span>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-100 p-1 rounded text-primary-500 mr-3 mt-0.5">
                  <Heart className="h-4 w-4" />
                </div>
                <span className="text-sm">Joy is the predominant emotion expressed</span>
              </li>
            </ul>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="font-semibold">Engagement Statistics</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-primary-500">{testimonial.views}</p>
                <p className="text-sm text-gray-600">Views</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-primary-500">{testimonial.likes}</p>
                <p className="text-sm text-gray-600">Likes</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-primary-500">{testimonial.comments.length}</p>
                <p className="text-sm text-gray-600">Comments</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-primary-500">13.1%</p>
                <p className="text-sm text-gray-600">Engagement</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Add a missing component
const Eye = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

export default TestimonialView;
