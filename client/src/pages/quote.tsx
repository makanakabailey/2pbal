import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowLeft, ArrowRight, Download, Upload, X, File, Image, Video, Mic, Play, Pause, Trash2, Target, DollarSign, TrendingUp, User, Phone, Mail, Building2, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  goals: string[];
  overspending: string[];
  outcomes: string[];
  projectDescription: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  attachments: File[];
  audioRecordings: AudioRecording[];
}

interface AudioRecording {
  id: string;
  blob: Blob;
  duration: number;
  name: string;
  timestamp: Date;
  cloudinary_url?: string;
  cloudinary_public_id?: string;
}

export default function Quote() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    goals: [],
    overspending: [],
    outcomes: [],
    projectDescription: '',
    timeline: '',
    name: '',
    email: '',
    company: '',
    phone: '',
    attachments: [],
    audioRecordings: []
  });

  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  // Step configuration with icons and labels
  const steps = [
    { id: 1, label: 'Goals', icon: Target, description: 'Your business objectives' },
    { id: 2, label: 'Costs', icon: DollarSign, description: 'Current spending areas' },
    { id: 3, label: 'Outcomes', icon: TrendingUp, description: 'Desired results' },
    { id: 4, label: 'Details', icon: File, description: 'Project information' },
    { id: 5, label: 'Contact', icon: User, description: 'Your information' }
  ];

  // Character count for text areas
  const getCharacterCount = (text: string) => text.length;
  const getCharacterCountColor = (count: number, max: number) => {
    if (count === 0) return 'text-gray-400';
    if (count > max * 0.9) return 'text-red-500';
    if (count > max * 0.7) return 'text-yellow-500';
    return 'text-green-500';
  };

  const businessGoals = [
    'Increase Sales',
    'Reduce Costs', 
    'Automate Tasks',
    'Improve Customer Experience',
    'Scale Operations',
    'Enter New Markets'
  ];

  const overspendingAreas = [
    'Agency Fees',
    'Freelancer Management',
    'In-House Salaries',
    'Software Licenses',
    'Marketing Costs',
    'Operational Overhead'
  ];

  const importantOutcomes = [
    'More Leads',
    'Faster Execution',
    'Predictable Budget',
    'Better ROI',
    'Reduced Management Time',
    'Scalable Solutions'
  ];

  const handleCheckboxChange = (field: keyof Pick<FormData, 'goals' | 'overspending' | 'outcomes'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
    
    // Show summary message after selection
    setTimeout(() => {
      const selections = formData[field];
      if (selections.length > 0) {
        const message = `You've selected: ${selections.join(', ')}`;
        // This creates a subtle confirmation feedback
      }
    }, 100);
  };

  // Get selection summary for current step
  const getSelectionSummary = (field: keyof Pick<FormData, 'goals' | 'overspending' | 'outcomes'>) => {
    const selections = formData[field];
    if (selections.length === 0) return null;
    if (selections.length === 1) return `You've selected "${selections[0]}".`;
    if (selections.length === 2) return `You've selected "${selections[0]}" and "${selections[1]}".`;
    return `You've selected ${selections.length} options including "${selections[0]}" and "${selections[1]}".`;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      // Mark current step as completed
      setCompletedSteps(prev => new Set([...Array.from(prev), currentStep]));
      setCurrentStep(currentStep + 1);
      
      // Smooth scroll to top of form
      const formElement = document.querySelector('.quote-form-card');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const goToStep = (stepNumber: number) => {
    if (stepNumber <= currentStep || completedSteps.has(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).filter(file => {
        // Check file size (max 10MB per file)
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} is larger than 10MB. Please choose a smaller file.`,
            variant: "destructive",
          });
          return false;
        }
        
        // Check file type
        const allowedTypes = [
          'image/jpeg', 'image/png', 'image/gif', 'image/webp',
          'video/mp4', 'video/webm', 'video/quicktime',
          'audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/m4a', 'audio/ogg', 'audio/webm',
          'application/pdf', 'application/msword', 
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain', 'application/zip'
        ];
        
        if (!allowedTypes.includes(file.type)) {
          toast({
            title: "Invalid file type",
            description: `${file.name} is not a supported file type.`,
            variant: "destructive",
          });
          return false;
        }
        
        return true;
      });
      
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type.startsWith('video/')) return Video;
    if (file.type.startsWith('audio/')) return Mic;
    return File;
  };

  const addAudioRecording = async (audioBlob: Blob) => {
    try {
      const recordingName = `Voice Recording ${formData.audioRecordings.length + 1}`;
      
      // Convert blob to base64 for upload
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64String = reader.result as string;
          
          // Upload to Cloudinary via our API
          const response = await fetch('/api/audio/upload-recording-blob', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              audioBlob: base64String,
              recordingName: recordingName,
              quoteId: null // Will be set when quote is submitted
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to upload audio recording');
          }

          const result = await response.json();

          if (result.success) {
            const newRecording: AudioRecording = {
              id: Date.now().toString(),
              blob: audioBlob, // Keep blob for immediate playback
              duration: 0,
              name: recordingName,
              timestamp: new Date(),
              cloudinary_url: result.audio.cloudinary_url,
              cloudinary_public_id: result.audio.cloudinary_public_id
            };

            setFormData(prev => ({
              ...prev,
              audioRecordings: [...prev.audioRecordings, newRecording]
            }));

            const storageMessage = result.audio.storage === 'cloudinary' 
              ? "Your voice message has been uploaded to cloud storage."
              : "Your voice message is saved locally and will be submitted with your quote.";

            toast({
              title: "Audio Recorded & Saved",
              description: storageMessage,
            });
          } else {
            throw new Error('Upload failed');
          }
        } catch (error) {
          console.error('Audio upload error:', error);
          toast({
            title: "Upload Failed",
            description: "Failed to save audio recording. You can still submit it locally.",
            variant: "destructive",
          });
          
          // Fallback: Add recording without cloud URL
          const newRecording: AudioRecording = {
            id: Date.now().toString(),
            blob: audioBlob,
            duration: 0,
            name: recordingName,
            timestamp: new Date()
          };

          setFormData(prev => ({
            ...prev,
            audioRecordings: [...prev.audioRecordings, newRecording]
          }));
        }
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error processing audio recording:', error);
      toast({
        title: "Recording Error",
        description: "Failed to process audio recording.",
        variant: "destructive",
      });
    }
  };

  const removeAudioRecording = (id: string) => {
    setFormData(prev => ({
      ...prev,
      audioRecordings: prev.audioRecordings.filter(recording => recording.id !== id)
    }));
  };

  const playAudio = (recording: AudioRecording) => {
    if (playingAudio === recording.id) {
      setPlayingAudio(null);
      return;
    }

    // Use Cloudinary URL if available, fallback to blob
    const audioUrl = recording.cloudinary_url || URL.createObjectURL(recording.blob);
    const audio = new Audio(audioUrl);
    
    setPlayingAudio(recording.id);
    
    audio.play().catch(error => {
      console.error('Audio playback error:', error);
      toast({
        title: "Playback Error",
        description: "Unable to play audio recording.",
        variant: "destructive",
      });
      setPlayingAudio(null);
    });
    
    audio.addEventListener('ended', () => {
      setPlayingAudio(null);
      if (!recording.cloudinary_url) {
        URL.revokeObjectURL(audioUrl);
      }
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async () => {
    try {
      // Convert audio recordings to include Cloudinary URLs
      const audioData = formData.audioRecordings.map(recording => ({
        id: recording.id,
        name: recording.name,
        timestamp: recording.timestamp.toISOString(),
        size: recording.blob.size,
        type: recording.blob.type,
        cloudinary_url: recording.cloudinary_url,
        cloudinary_public_id: recording.cloudinary_public_id
      }));

      // Upload files if any
      let uploadedFiles = [];
      if (formData.attachments.length > 0) {
        const fileFormData = new FormData();
        formData.attachments.forEach(file => {
          fileFormData.append('files', file);
        });

        const fileUploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: fileFormData,
        });

        if (fileUploadResponse.ok) {
          const fileResult = await fileUploadResponse.json();
          uploadedFiles = fileResult.files || [];
        }
      }

      const submissionData = {
        ...formData,
        audioRecordings: audioData,
        uploadedFiles: uploadedFiles,
        totalAudioRecordings: formData.audioRecordings.length,
        totalAttachments: formData.attachments.length,
        submittedAt: new Date().toISOString()
      };

      // Submit quote request to API
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Quote Request Submitted!",
          description: `We're preparing your personalized savings proposal now. ${formData.audioRecordings.length > 0 ? 'Your voice recordings have been saved to cloud storage.' : ''}`,
        });
      } else {
        throw new Error('Failed to submit quote request');
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-16 min-h-screen bg-gray-light flex items-center justify-center">
        <Card className="max-w-2xl mx-4">
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-16 w-16 text-lime-primary mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4 text-gray-dark">Thank You!</h1>
            <p className="text-lg text-gray-medium mb-8">
              We're building your personalized savings proposal now. You'll receive it within 24 hours.
            </p>
            <div className="bg-lime-primary p-6 rounded-lg mb-8">
              <h3 className="text-white font-bold mb-2">Immediate Value:</h3>
              <Button variant="secondary" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download "5 Strategies to Reduce Digital Costs by 40%"
              </Button>
            </div>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-teal-primary text-white hover:bg-teal-600"
            >
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-light">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-dark">
            Maximize Your ROI With a Tailored Solution
          </h1>
          <p className="text-xl text-gray-medium mb-8">
            Tell us about your goals and we'll show you exactly how to achieve them efficiently.
          </p>
          {/* Enhanced Step Indicator */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.has(step.id);
                const isCurrent = currentStep === step.id;
                const isAccessible = step.id <= currentStep || isCompleted;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      className={`relative flex flex-col items-center cursor-pointer group ${
                        isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                      }`}
                      onClick={() => isAccessible && goToStep(step.id)}
                      whileHover={isAccessible ? { scale: 1.05 } : {}}
                      whileTap={isAccessible ? { scale: 0.95 } : {}}
                    >
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCompleted
                            ? 'bg-lime-primary text-white'
                            : isCurrent
                            ? 'bg-teal-primary text-white ring-4 ring-teal-200'
                            : isAccessible
                            ? 'bg-gray-200 text-gray-600 group-hover:bg-teal-100 group-hover:text-teal-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                        animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.6, repeat: isCurrent ? Infinity : 0, repeatDelay: 2 }}
                      >
                        {isCompleted ? (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckCircle className="h-6 w-6" />
                          </motion.div>
                        ) : (
                          <step.icon className="h-6 w-6" />
                        )}
                      </motion.div>
                      
                      <div className="mt-2 text-center">
                        <div className={`text-sm font-medium ${
                          isCurrent ? 'text-teal-primary' : isCompleted ? 'text-lime-primary' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </div>
                        <div className="text-xs text-gray-400 hidden sm:block">
                          {step.description}
                        </div>
                      </div>
                    </motion.div>
                    
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-4 rounded-full transition-colors duration-300 ${
                        completedSteps.has(step.id) ? 'bg-lime-primary' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <Progress value={progress} className="max-w-md mx-auto mb-2" />
          <p className="text-sm text-gray-medium">Step {currentStep} of {totalSteps} - {steps[currentStep - 1].description}</p>
        </div>
      </section>

      {/* Multi-Step Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl quote-form-card">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-dark flex items-center">
                <motion.div 
                  className="mr-3 p-2 rounded-full bg-teal-100"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {React.createElement(steps[currentStep - 1].icon, { className: "h-6 w-6 text-teal-600" })}
                </motion.div>
                {currentStep === 1 && "What are your top business goals?"}
                {currentStep === 2 && "Where are you currently overspending?"}
                {currentStep === 3 && "Which outcomes matter most to you?"}
                {currentStep === 4 && "Tell us about your project"}
                {currentStep === 5 && "Contact information"}
              </CardTitle>
              <div className="text-gray-medium text-sm mt-2">
                {currentStep === 1 && "Select all that apply to your business objectives"}
                {currentStep === 2 && "Help us identify where you can save money"}
                {currentStep === 3 && "Choose your most important success metrics"}
                {currentStep === 4 && "Share details about your project and timeline"}
                {currentStep === 5 && "We'll use this to contact you with your personalized quote"}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Step 1: Business Goals */}
              {currentStep === 1 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      {businessGoals.map((goal, index) => (
                        <motion.div 
                          key={goal}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group"
                        >
                          <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                            formData.goals.includes(goal)
                              ? 'border-teal-300 bg-teal-50'
                              : 'border-gray-200 hover:border-teal-200'
                          }`}>
                            <Checkbox
                              id={goal}
                              checked={formData.goals.includes(goal)}
                              onCheckedChange={() => handleCheckboxChange('goals', goal)}
                            />
                            <Label 
                              htmlFor={goal} 
                              className={`font-medium cursor-pointer transition-colors ${
                                formData.goals.includes(goal) ? 'text-teal-700' : 'text-gray-700 group-hover:text-teal-600'
                              }`}
                            >
                              {goal}
                            </Label>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Selection Summary */}
                    <AnimatePresence>
                      {formData.goals.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-lime-50 border border-lime-200 rounded-lg"
                        >
                          <div className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-lime-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-lime-800 mb-1">Great choices!</p>
                              <p className="text-sm text-lime-700">{getSelectionSummary('goals')}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Step 2: Overspending Areas */}
              {currentStep === 2 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      {overspendingAreas.map((area, index) => (
                        <motion.div 
                          key={area}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group"
                        >
                          <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                            formData.overspending.includes(area)
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-200 hover:border-red-200'
                          }`}>
                            <Checkbox
                              id={area}
                              checked={formData.overspending.includes(area)}
                              onCheckedChange={() => handleCheckboxChange('overspending', area)}
                            />
                            <Label 
                              htmlFor={area} 
                              className={`font-medium cursor-pointer transition-colors ${
                                formData.overspending.includes(area) ? 'text-red-700' : 'text-gray-700 group-hover:text-red-600'
                              }`}
                            >
                              {area}
                            </Label>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <AnimatePresence>
                      {formData.overspending.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                        >
                          <div className="flex items-start space-x-2">
                            <DollarSign className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800 mb-1">Savings opportunities identified!</p>
                              <p className="text-sm text-yellow-700">{getSelectionSummary('overspending')}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Step 3: Important Outcomes */}
              {currentStep === 3 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      {importantOutcomes.map((outcome, index) => (
                        <motion.div 
                          key={outcome}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group"
                        >
                          <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                            formData.outcomes.includes(outcome)
                              ? 'border-green-300 bg-green-50'
                              : 'border-gray-200 hover:border-green-200'
                          }`}>
                            <Checkbox
                              id={outcome}
                              checked={formData.outcomes.includes(outcome)}
                              onCheckedChange={() => handleCheckboxChange('outcomes', outcome)}
                            />
                            <Label 
                              htmlFor={outcome} 
                              className={`font-medium cursor-pointer transition-colors ${
                                formData.outcomes.includes(outcome) ? 'text-green-700' : 'text-gray-700 group-hover:text-green-600'
                              }`}
                            >
                              {outcome}
                            </Label>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <AnimatePresence>
                      {formData.outcomes.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                        >
                          <div className="flex items-start space-x-2">
                            <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-blue-800 mb-1">Perfect! We'll focus on these outcomes.</p>
                              <p className="text-sm text-blue-700">{getSelectionSummary('outcomes')}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Step 4: Project Details */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project, challenges, and requirements..."
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="timeline">Desired Timeline</Label>
                    <Input
                      id="timeline"
                      placeholder="e.g., 3 months, ASAP, Q2 2025"
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                    />
                  </div>

                  {/* Voice Recording Section */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">Record Voice Message (Optional)</Label>
                    <p className="text-sm text-gray-medium mb-4">
                      Record a voice message to explain your project in detail. This helps us understand your tone, urgency, and specific requirements better.
                    </p>
                    
                    {/* Audio Recorder */}
                    <div className="border rounded-lg p-4 bg-gray-50 mb-4">
                      <div className="flex items-center justify-center">
                        <AudioRecorder
                          onRecordingComplete={addAudioRecording}
                          audioTrackConstraints={{
                            noiseSuppression: true,
                            echoCancellation: true,
                          }}
                          downloadOnSavePress={false}
                          downloadFileExtension="mp3"
                        />
                      </div>
                    </div>

                    {/* Audio Recordings List */}
                    {formData.audioRecordings.length > 0 && (
                      <div className="space-y-2 mb-6">
                        <Label className="text-sm font-medium">Voice Recordings:</Label>
                        {formData.audioRecordings.map((recording) => (
                          <div key={recording.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Mic className="h-5 w-5 text-teal-primary" />
                              <div>
                                <div className="text-sm font-medium text-gray-dark">{recording.name}</div>
                                <div className="text-xs text-gray-medium">
                                  {new Date(recording.timestamp).toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => playAudio(recording)}
                                className="text-teal-primary hover:text-teal-700 hover:bg-teal-50"
                              >
                                {playingAudio === recording.id ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAudioRecording(recording.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* File Upload Section */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">Attach Files (Optional)</Label>
                    <p className="text-sm text-gray-medium mb-4">
                      Share images, videos, documents, audio files, or other files to help us understand your project better. 
                      Max 10MB per file. Supported: Images, Videos, Audio, PDFs, Documents.
                    </p>
                    
                    {/* Upload Button */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-primary transition-colors">
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.zip"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <div className="text-lg font-medium text-gray-dark mb-2">
                          Drop files here or click to upload
                        </div>
                        <div className="text-sm text-gray-medium">
                          Images, videos, audio, documents up to 10MB each
                        </div>
                      </label>
                    </div>

                    {/* Uploaded Files List */}
                    {formData.attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <Label className="text-sm font-medium">Uploaded Files:</Label>
                        {formData.attachments.map((file, index) => {
                          const FileIcon = getFileIcon(file);
                          return (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileIcon className="h-5 w-5 text-teal-primary" />
                                <div>
                                  <div className="text-sm font-medium text-gray-dark">{file.name}</div>
                                  <div className="text-xs text-gray-medium">{formatFileSize(file.size)}</div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Contact Info */}
              {currentStep === 5 && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    className="bg-teal-primary text-white hover:bg-teal-600"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-lime-primary text-white hover:bg-green-500"
                    disabled={!formData.name || !formData.email}
                  >
                    Get Custom Proposal
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
