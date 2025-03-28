
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Video, BarChart2, MessageSquare, X, ArrowRight, ArrowLeft } from "lucide-react";

const Tutorial = () => {
  const [showTutorial, setShowTutorial] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to TrustWave Storytellers!",
      description: "This quick tutorial will show you how to use our platform to record and share authentic video testimonials.",
      icon: <Video className="h-12 w-12 text-primary-500 mb-4" />
    },
    {
      title: "Record Your Testimonial",
      description: "Click 'Record' in the navigation menu or 'Start Recording' button on the homepage to record a new testimonial. You can use your webcam or upload an existing video.",
      icon: <Video className="h-12 w-12 text-primary-500 mb-4" />
    },
    {
      title: "Dashboard Analytics",
      description: "Visit the Dashboard to view analytics including sentiment analysis, engagement metrics, and insights from your testimonials.",
      icon: <BarChart2 className="h-12 w-12 text-primary-500 mb-4" />
    },
    {
      title: "Browse Testimonials",
      description: "Check out the Testimonials page to view, filter, and share existing testimonials from other users.",
      icon: <MessageSquare className="h-12 w-12 text-primary-500 mb-4" />
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTutorial(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setShowTutorial(false);
  };

  return (
    <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            {tutorialSteps[currentStep].title}
          </DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleSkip}
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-6">
          {tutorialSteps[currentStep].icon}
          <DialogDescription className="text-center text-base">
            {tutorialSteps[currentStep].description}
          </DialogDescription>
        </div>
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" onClick={handleSkip}>
              Skip Tutorial
            </Button>
            <Button onClick={handleNext}>
              {currentStep < tutorialSteps.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Get Started"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Tutorial;
