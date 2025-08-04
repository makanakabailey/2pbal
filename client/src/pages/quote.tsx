import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowLeft, ArrowRight, Download, Upload, X, File, Image, Video, Mic, Play, Pause, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

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
  cloudinary_url?: string;
  cloudinary_public_id?: string;
}

export default function Quote() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
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
          <Progress value={progress} className="max-w-md mx-auto" />
          <p className="text-sm text-gray-medium mt-2">Step {currentStep} of {totalSteps}</p>
        </div>
      </section>

      {/* Multi-Step Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-dark">
                {currentStep === 1 && "What are your top business goals?"}
                {currentStep === 2 && "Where are you currently overspending?"}
                {currentStep === 3 && "Which outcomes matter most to you?"}
                {currentStep === 4 && "Tell us about your project"}
                {currentStep === 5 && "Contact information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Step 1: Business Goals */}
              {currentStep === 1 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {businessGoals.map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox
                        id={goal}
                        checked={formData.goals.includes(goal)}
                        onCheckedChange={() => handleCheckboxChange('goals', goal)}
                      />
                      <Label htmlFor={goal} className="font-medium">{goal}</Label>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2: Overspending Areas */}
              {currentStep === 2 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {overspendingAreas.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={formData.overspending.includes(area)}
                        onCheckedChange={() => handleCheckboxChange('overspending', area)}
                      />
                      <Label htmlFor={area} className="font-medium">{area}</Label>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Important Outcomes */}
              {currentStep === 3 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {importantOutcomes.map((outcome) => (
                    <div key={outcome} className="flex items-center space-x-2">
                      <Checkbox
                        id={outcome}
                        checked={formData.outcomes.includes(outcome)}
                        onCheckedChange={() => handleCheckboxChange('outcomes', outcome)}
                      />
                      <Label htmlFor={outcome} className="font-medium">{outcome}</Label>
                    </div>
                  ))}
                </div>
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
