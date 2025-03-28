import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Camera, Mic, MicOff, Video, Upload, X, Heart, ThumbsUp, Smile } from "lucide-react";

const Record = () => {
  const navigate = useNavigate();
  const [recordingStep, setRecordingStep] = useState<'setup' | 'recording' | 'preview' | 'details'>('setup');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [emotionOverlay, setEmotionOverlay] = useState<'neutral' | 'positive' | 'veryhappy'>('neutral');
  const [countDown, setCountDown] = useState(3);
  const [recordingTime, setRecordingTime] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    description: ""
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const emotionTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      stopMediaTracks();
      if (timerRef.current) clearInterval(timerRef.current);
      if (emotionTimerRef.current) clearInterval(emotionTimerRef.current);
    };
  }, []);

  const stopMediaTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startCamera = async () => {
    try {
      stopMediaTracks();
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 }, 
        audio: true 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        videoRef.current.play().catch(err => console.error("Error playing video:", err));
      }
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9,opus'
      });
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
        setRecordingStep('preview');
        stopMediaTracks();
      };
      
      setRecordingStep('recording');
      startCountdown();
      
    } catch (error) {
      console.error("Error accessing media devices:", error);
      toast.error("Could not access camera or microphone. Please check permissions.");
    }
  };

  const startCountdown = () => {
    let count = 3;
    setCountDown(count);
    
    const interval = setInterval(() => {
      count -= 1;
      setCountDown(count);
      
      if (count === 0) {
        clearInterval(interval);
        startRecording();
      }
    }, 1000);
  };

  const startRecording = () => {
    setRecordedChunks([]);
    setIsRecording(true);
    
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
    }
    
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    emotionTimerRef.current = setInterval(() => {
      const emotions = ['neutral', 'positive', 'veryhappy'] as const;
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setEmotionOverlay(randomEmotion);
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (emotionTimerRef.current) {
      clearInterval(emotionTimerRef.current);
      emotionTimerRef.current = null;
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.includes('video')) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setRecordingStep('preview');
    } else {
      toast.error("Please select a valid video file");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast.success("Your testimonial has been successfully submitted!");
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const cancelRecording = () => {
    if (isRecording) {
      stopRecording();
    }
    stopMediaTracks();
    setRecordingStep('setup');
    setRecordingTime(0);
    setCountDown(3);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Record Your Testimonial</h1>
        <p className="mt-2 text-lg text-gray-600">
          Share your authentic experience with our audience
        </p>
      </div>

      {recordingStep === 'setup' && (
        <Card className="p-8 flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            <div 
              className="border-2 border-dashed border-primary-200 bg-primary-50 rounded-lg p-8 flex flex-col items-center justify-center hover:border-primary-400 transition-colors cursor-pointer"
              onClick={startCamera}
            >
              <Camera className="h-16 w-16 text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Record Now</h3>
              <p className="text-center text-gray-600 mb-4">
                Record a video testimonial directly from your browser
              </p>
              <Button className="bg-primary-500 hover:bg-primary-600">
                <Video className="mr-2 h-4 w-4" />
                Start Recording
              </Button>
            </div>
            
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center hover:border-gray-300 transition-colors">
              <Upload className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upload Video</h3>
              <p className="text-center text-gray-600 mb-4">
                Upload an existing video file from your device
              </p>
              <label htmlFor="video-upload">
                <Button variant="outline" className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />
                  Select File
                </Button>
                <input 
                  id="video-upload" 
                  type="file" 
                  accept="video/*" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                />
              </label>
            </div>
          </div>
        </Card>
      )}

      {recordingStep === 'recording' && (
        <Card className="p-6 relative">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              {isRecording ? (
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                  <span className="text-red-500 font-medium">Recording</span>
                  <span className="ml-2 text-gray-500">{formatTime(recordingTime)}</span>
                </div>
              ) : (
                <div className="flex items-center text-xl font-bold">
                  <span className="text-primary-500">Starting in: {countDown}</span>
                </div>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={cancelRecording}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="relative rounded-lg overflow-hidden bg-black aspect-video mb-6">
            <video 
              ref={videoRef}
              autoPlay 
              playsInline
              muted 
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />
            
            {isRecording && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded-full">
                {emotionOverlay === 'neutral' && <span className="flex items-center">Neutral <Smile className="ml-1 h-4 w-4" /></span>}
                {emotionOverlay === 'positive' && <span className="flex items-center">Positive <ThumbsUp className="ml-1 h-4 w-4 text-green-400" /></span>}
                {emotionOverlay === 'veryhappy' && <span className="flex items-center">Great Response! <Heart className="ml-1 h-4 w-4 text-red-400 animate-pulse" /></span>}
              </div>
            )}
            
            {countDown > 0 && !isRecording && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl font-bold text-white">{countDown}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-center">
            {isRecording ? (
              <Button 
                onClick={stopRecording}
                className="bg-red-500 hover:bg-red-600 text-white px-6"
              >
                Stop Recording
              </Button>
            ) : (
              <div className="flex items-center text-gray-600">
                <Mic className="animate-pulse h-5 w-5 mr-2" />
                <span>Preparing to record...</span>
              </div>
            )}
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Speak clearly and naturally. Our AI will analyze emotions in real-time.</p>
          </div>
        </Card>
      )}

      {recordingStep === 'preview' && videoSrc && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Preview Your Testimonial</h2>
          <div className="rounded-lg overflow-hidden bg-black aspect-video mb-6">
            <video 
              src={videoSrc} 
              controls 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={() => setRecordingStep('setup')}
            >
              Record Again
            </Button>
            <Button 
              onClick={() => setRecordingStep('details')}
              className="bg-primary-500 hover:bg-primary-600"
            >
              Continue to Details
            </Button>
          </div>
        </Card>
      )}

      {recordingStep === 'details' && videoSrc && (
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold mb-4">Your Testimonial</h2>
              <div className="rounded-lg overflow-hidden bg-black aspect-video mb-4">
                <video 
                  src={videoSrc} 
                  controls 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold mb-4">Add Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <Input 
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Marketing Director"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <Input 
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Acme Inc."
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your experience..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setRecordingStep('preview')}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-600"
                  >
                    Submit Testimonial
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Record;
