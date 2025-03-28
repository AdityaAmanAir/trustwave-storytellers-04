
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Video, BarChart2, MessageSquare, Smile } from "lucide-react";
import Tutorial from "@/components/Tutorial";

const Home = () => {
  const features = [
    {
      icon: <Video className="h-8 w-8 text-primary-500" />,
      title: "Record & Upload",
      description: "Easily record or upload your video testimonials directly from your browser or mobile device."
    },
    {
      icon: <Smile className="h-8 w-8 text-primary-500" />,
      title: "Real-Time Emotion Analysis",
      description: "See how your testimonial resonates with viewers through live emotion detection."
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-primary-500" />,
      title: "Sentiment Analysis",
      description: "Gain insights from AI-powered sentiment analysis on comments and feedback."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary-500" />,
      title: "Interactive Feedback",
      description: "Engage with viewers through comments and reactions on your testimonials."
    }
  ];

  const testimonials = [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/150?img=1",
      name: "Sarah Johnson",
      title: "Marketing Director",
      company: "TechSolutions Inc.",
      content: "TrustWave has transformed how we collect customer stories. The sentiment analysis helps us understand what resonates with our audience."
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=2",
      name: "Michael Chen",
      title: "Product Manager",
      company: "Innovate Labs",
      content: "The real-time emotion overlay feature is incredible! It's helped our testimonial contributors create more engaging content."
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=3",
      name: "Emma Rodriguez",
      title: "Customer Success Lead",
      company: "Growth Ventures",
      content: "We've seen a 40% increase in engagement since using TrustWave's video testimonial platform. The authentication features build real trust."
    }
  ];

  return (
    <div>
      <Tutorial />
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Authentic Video Testimonials <br />
            <span className="text-primary-500">Powered by AI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Capture genuine customer stories through video. Build trust, engage your audience, and gain insights with advanced AI sentiment analysis.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-6 text-lg"
              asChild
            >
              <Link to="/record">Start Recording</Link>
            </Button>
            <Button
              variant="outline"
              className="border-primary-200 text-primary-500 hover:bg-primary-50 px-8 py-6 text-lg"
              asChild
            >
              <Link to="/testimonials">View Testimonials</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Powerful Features</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to collect, manage, and leverage authentic customer testimonials.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border border-gray-100">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-600">
              Hear from the companies already using TrustWave Storytellers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="h-12 w-12 rounded-full mr-4" 
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.title}, {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.content}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              variant="link"
              className="text-primary-500 hover:text-primary-600 text-lg flex items-center mx-auto"
              asChild
            >
              <Link to="/testimonials">
                View all testimonials
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start collecting authentic testimonials?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-3xl mx-auto">
            Join hundreds of companies using TrustWave to build trust and boost conversions.
          </p>
          <Button
            className="bg-white text-primary-500 hover:bg-primary-50 px-8 py-6 text-lg"
            asChild
          >
            <Link to="/record">Start Recording Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
