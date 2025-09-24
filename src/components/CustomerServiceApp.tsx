import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  PhoneOff, 
  Send, 
  ChevronRight, 
  ChevronLeft,
  Smartphone,
  Clock,
  Star,
  AlertTriangle,
  FileText,
  Users,
  TrendingUp,
  ExternalLink
} from "lucide-react";

interface TranscriptMessage {
  speaker: "Customer" | "Rep";
  message: string;
  timestamp: string;
}

interface ChatMessage {
  type: "user" | "ai";
  message: string;
  timestamp: string;
}

interface RecentCall {
  id: string;
  customerName: string;
  date: string;
  duration: string;
  status: "Resolved" | "Follow-up" | "Escalated";
  issue: string;
}

interface CallSummary {
  customerName: string;
  rating: number;
  primaryReason: string;
  secondaryReasons: string[];
  summary: string;
  casesCreated: string[];
  customerActivities: string[];
  improvements: string[];
}

export default function CustomerServiceApp() {
  const { toast } = useToast();
  const [inputMessage, setInputMessage] = useState("");
  const [showCallSummary, setShowCallSummary] = useState(false);
  const [callDuration, setCallDuration] = useState("2:35");
  const [transcriptOpen, setTranscriptOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Modal states
  const [showCasesModal, setShowCasesModal] = useState(false);
  const [showActivitiesModal, setShowActivitiesModal] = useState(false);
  const [showCodeRedModal, setShowCodeRedModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  
  // Form states
  const [caseForm, setCaseForm] = useState({ type: "", details: "", assignTo: "" });
  const [activityForm, setActivityForm] = useState({ type: "", details: "", assignTo: "" });
  const [codeRedForm, setCodeRedForm] = useState({ details: "", priority: "" });
  const [notesForm, setNotesForm] = useState({ subject: "", comments: "", provider: "" });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      type: "ai",
      message: "I'm ready to help with Margaret's call. I have access to her profile, device history, and previous interactions.",
      timestamp: "10:22:45"
    }
  ]);

  const transcript: TranscriptMessage[] = [
    {
      speaker: "Customer",
      message: "Hi, I'm having trouble with my hearing aids connecting to my phone.",
      timestamp: "10:23:15"
    },
    {
      speaker: "Customer", 
      message: "I have an iPhone 14. The hearing aids are the Horizon 71X that I got last week.",
      timestamp: "10:23:28"
    },
    {
      speaker: "Rep",
      message: "Perfect, I can see your account here. Have you tried putting the hearing aids in pairing mode?",
      timestamp: "10:23:35"
    },
    {
      speaker: "Customer",
      message: "Yes, I tried that but the phone doesn't seem to detect them.",
      timestamp: "10:24:02"
    },
    {
      speaker: "Rep",
      message: "Let me walk you through the process step by step. First, can you go to Settings > Accessibility on your iPhone?",
      timestamp: "10:24:15"
    }
  ];

  const recentCalls: RecentCall[] = [
    {
      id: "1",
      customerName: "John Smith",
      date: "Today, 9:15 AM",
      duration: "4:23",
      status: "Resolved",
      issue: "Bluetooth pairing issues"
    },
    {
      id: "2", 
      customerName: "Sarah Johnson",
      date: "Yesterday, 2:30 PM",
      duration: "6:12",
      status: "Follow-up",
      issue: "Warranty replacement request"
    }
  ];

  const quickQuestions = [
    "Previous Issues",
    "Device History", 
    "Last Call Notes",
    "Warranty Status",
    "Pairing Steps"
  ];

  const callSummary: CallSummary = {
    customerName: "Margaret Davis",
    rating: 4,
    primaryReason: "Device Connectivity Issues",
    secondaryReasons: ["Bluetooth Pairing", "iPhone Compatibility"],
    summary: "Customer experiencing connectivity issues with new Horizon 71X hearing aids and iPhone 14. Resolved through step-by-step pairing process and accessibility settings configuration.",
    casesCreated: ["CASE-2024-0001: Hearing Aid Pairing"],
    customerActivities: ["Follow-up call scheduled", "User manual emailed"],
    improvements: [
      "Consider proactive pairing instructions for new devices",
      "Update knowledge base with iPhone 14 specific steps"
    ]
  };

  const resourcesSent = [
    "Link to 24/7 chat support portal",
    "Bluetooth connectivity troubleshooting agent",
    "Hearing aid cleaning and maintenance guide",
    "Device warranty information PDF",
    "User manual for Horizon 71X hearing aids"
  ];

  const getResponseForQuestion = (question: string): string => {
    switch (question) {
      case "Previous Issues":
        return "Margaret has had 3 previous calls in the last 6 months. Main issues: 1) Bluetooth connectivity (resolved), 2) Volume adjustment problems (resolved), 3) Battery life concerns (ongoing). Would you like details on any specific issue?";
      
      case "Device History":
        return "Margaret's device history: Horizon 71X hearing aids purchased January 15th, 2024. Previously had Horizon 65 models (2019-2024). No hardware replacements. Last firmware update: March 2024 (v2.1.4). Device is still under warranty until January 2026.";
      
      case "Last Call Notes":
        return "Last call (3 days ago): Duration 4:23 minutes. Issue: Intermittent audio cutting out during phone calls. Resolution: Updated iPhone accessibility settings and reset hearing aid connection. Customer satisfaction: 4/5 stars. Follow-up scheduled if issues persist.";
      
      case "Warranty Status":
        return "Warranty Status: ACTIVE. Horizon 71X purchased January 15th, 2024. 2-year comprehensive warranty expires January 15th, 2026. Covers: hardware defects, battery replacement, accidental damage (2 incidents remaining). Premium support included.";
      
      case "Pairing Steps":
        return "iPhone pairing steps for Horizon 71X: 1) Settings > Accessibility > Hearing Devices 2) Turn hearing aids off/on 3) Hold volume buttons for 3 seconds until blue light flashes 4) Select 'Margaret's Horizon 71X' when it appears 5) Tap 'Pair' for both left and right devices. Troubleshooting: Ensure iOS 15.0+ and Bluetooth enabled.";
      
      default:
        return "I can help you with information about Margaret's profile, device history, previous calls, warranty status, or troubleshooting steps. What would you like to know more about?";
    }
  };

  const handleQuickQuestionClick = (question: string) => {
    // Add user message
    setChatMessages(prev => [...prev, {
      type: "user" as const,
      message: question,
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: "ai" as const,
        message: getResponseForQuestion(question),
        timestamp: new Date().toLocaleTimeString()
      }]);
    }, 1000);
    
    setInputMessage(""); // Clear the input after sending
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Add user message
      setChatMessages(prev => [...prev, {
        type: "user" as const,
        message: inputMessage,
        timestamp: new Date().toLocaleTimeString()
      }]);
      
      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          type: "ai" as const,
          message: "Based on Margaret's profile, I can see she has had 2 previous calls about device connectivity. Her Horizon 71X hearing aids were purchased on January 15th, 2024. Would you like me to review the troubleshooting steps from her previous calls?",
          timestamp: new Date().toLocaleTimeString()
        }]);
      }, 1000);
      
      setInputMessage("");
    }
  };

  const handleCompleteCall = () => {
    setShowCallSummary(true);
  };

  const handleRecentCallClick = (call: RecentCall) => {
    setChatMessages(prev => [...prev, {
      type: "user" as const,
      message: `Load context for previous call with ${call.customerName}`,
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: "ai" as const,
        message: `Loading context for ${call.customerName}'s previous call on ${call.date}. Issue: ${call.issue}. Duration: ${call.duration}. Status: ${call.status}. I have access to the full call transcript and resolution details.`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }, 1000);
  };

  // Modal handlers
  const handleCreateCase = () => {
    toast({
      title: "Success",
      description: "Case has been successfully created",
    });
    setCaseForm({ type: "", details: "", assignTo: "" });
    setShowCasesModal(false);
  };

  const handleCreateActivity = () => {
    toast({
      title: "Success", 
      description: "Customer activity has been successfully created",
    });
    setActivityForm({ type: "", details: "", assignTo: "" });
    setShowActivitiesModal(false);
  };

  const handleCreateCodeRed = () => {
    toast({
      title: "Success",
      description: "Code Red has been successfully created",
    });
    setCodeRedForm({ details: "", priority: "" });
    setShowCodeRedModal(false);
  };

  const handleSendNotes = () => {
    toast({
      title: "Success",
      description: "Notes successfully sent to partner provider",
    });
    setNotesForm({ subject: "", comments: "", provider: "" });
    setShowNotesModal(false);
  };

  const handleFinalizeCall = () => {
    toast({
      title: "Call Completed",
      description: "Summary saved and activities created successfully",
    });
    setShowCallSummary(false);
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">{/* Customer Service App */}
      {/* Header */}
      <header className="bg-cs-header text-cs-header-foreground px-6 py-4 flex items-center justify-between shadow-medium shrink-0">
        <div className="flex items-center gap-4">
          <Phone className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Customer Care Assistant</h1>
          <Badge className="bg-cs-active text-cs-active-foreground hover:bg-cs-active">
            <Phone className="h-3 w-3 mr-1" />
            Call Active
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-cs-header-foreground hover:bg-primary-dark"
          >
            {sidebarCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" className="text-cs-header-foreground hover:bg-primary-dark">
            <PhoneOff className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Column - Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Customer Info Bar - Optimized */}
          <div className="bg-cs-customer-info text-cs-customer-info-foreground px-6 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold">Margaret Davis</h2>
                <span className="text-sm opacity-75">TX</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-3.5 w-3.5" />
                <span className="text-sm font-medium">iPhone 13</span>
                <span className="text-xs opacity-75">• Horizon 71X</span>
              </div>
              <div className="flex items-center gap-1 text-sm opacity-75">
                <Clock className="h-3.5 w-3.5" />
                <span>{callDuration}</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 bg-cs-chat-bg overflow-hidden flex flex-col">
            {/* Recent Calls */}
            <div className="mb-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-auto p-0 font-normal">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      Recent Calls (2)
                      <ChevronRight className="h-4 w-4" />
                    </h3>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80">
                  {recentCalls.map((call) => (
                    <DropdownMenuItem 
                      key={call.id} 
                      onClick={() => handleRecentCallClick(call)}
                      className="p-4 cursor-pointer"
                    >
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{call.customerName}</span>
                          <Badge variant={call.status === "Resolved" ? "default" : "secondary"} className="text-xs">
                            {call.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{call.issue}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{call.date}</span>
                          <span>Duration: {call.duration}</span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* AI Chat Messages - Expanded */}
            <Card className="mb-4 shadow-soft flex-1 flex flex-col overflow-hidden">
              <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
                <div className="p-3 border-b bg-muted/30 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold text-xs">AI</span>
                    </div>
                    <h3 className="font-medium text-sm">Customer Assistant</h3>
                  </div>
                </div>
                <ScrollArea className="flex-1 min-h-0">
                  <div className="p-3 space-y-3">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`flex gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          msg.type === 'ai' ? 'bg-primary' : 'bg-cs-customer-info'
                        }`}>
                          <span className={`font-semibold text-xs ${
                            msg.type === 'ai' ? 'text-primary-foreground' : 'text-cs-customer-info-foreground'
                          }`}>
                            {msg.type === 'ai' ? 'AI' : 'CS'}
                          </span>
                        </div>
                        <div className={`flex-1 ${msg.type === 'user' ? 'text-right' : ''}`}>
                          <div className={`inline-block p-2.5 rounded-lg max-w-[85%] ${
                            msg.type === 'ai' 
                              ? 'bg-muted text-foreground' 
                              : 'bg-primary text-primary-foreground'
                          }`}>
                            <p className="text-sm leading-relaxed">{msg.message}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Questions - Compact */}
            <div className="mb-3">
              <h3 className="text-xs font-medium mb-2 text-muted-foreground">Quick Questions:</h3>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((question) => (
                  <Button 
                    key={question} 
                    variant="outline" 
                    size="sm" 
                    className="text-primary text-xs h-7 px-2 hover:bg-primary/10 transition-colors"
                    onClick={() => handleQuickQuestionClick(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Chat Input - Compact */}
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Ask about Margaret's profile, history, or device info..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 h-9"
              />
              <Button onClick={handleSendMessage} size="sm" className="bg-primary hover:bg-primary-dark h-9 px-3">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Action Buttons - Compact */}
            <div className="flex gap-2">
              <Button size="sm" className="bg-cs-warning text-cs-warning-foreground hover:bg-cs-warning/90 h-8 text-xs">
                Create Code Red
              </Button>
              <Button 
                onClick={handleCompleteCall}
                size="sm"
                className="bg-cs-danger text-cs-danger-foreground hover:bg-cs-danger/90 h-8 text-xs"
              >
                Complete Call
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Transcript */}
        {!sidebarCollapsed && (
          <div className="w-96 border-l bg-cs-transcript flex flex-col transition-all duration-300">
            <Accordion 
              type="single" 
              collapsible 
              value={transcriptOpen ? "transcript" : ""}
              onValueChange={(value) => setTranscriptOpen(value === "transcript")}
              className="flex-1 flex flex-col"
            >
              <AccordionItem value="transcript" className="border-0 flex-1 flex flex-col">
                <AccordionTrigger className="px-6 py-4 bg-cs-transcript text-cs-transcript-foreground hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Live Call Transcript</h3>
                      <div className="flex items-center gap-2 ml-2">
                        <div className="w-2 h-2 bg-cs-active rounded-full animate-pulse"></div>
                        <span className="text-xs text-cs-active">Live</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-cs-transcript-foreground/70">
                      <Clock className="h-4 w-4" />
                      {callDuration}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0 flex-1">
                  <ScrollArea className="h-[calc(100vh-200px)] px-6 pb-4">
                    <div className="space-y-4">
                      {transcript.map((msg, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium text-sm ${
                              msg.speaker === 'Customer' ? 'text-cs-customer-text' : 'text-cs-rep-text'
                            }`}>
                              {msg.speaker}
                            </span>
                            <span className="text-xs text-cs-transcript-foreground/50">{msg.timestamp}</span>
                          </div>
                          <p className="text-sm text-cs-transcript-foreground leading-relaxed">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>

      {/* Call Summary Modal */}
      <Dialog open={showCallSummary} onOpenChange={setShowCallSummary}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">Call Summary</DialogTitle>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{callSummary.customerName}</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < callSummary.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-6 mt-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Primary Reason for Call
                </h3>
                <p className="text-sm bg-muted p-3 rounded-md">{callSummary.primaryReason}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Secondary Reasons</h3>
                <ul className="text-sm space-y-1">
                  {callSummary.secondaryReasons.map((reason, index) => (
                    <li key={index} className="bg-muted p-2 rounded-md">• {reason}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Cases Created
                </h3>
                <ul className="text-sm space-y-1">
                  {callSummary.casesCreated.map((case_item, index) => (
                    <li key={index} className="bg-muted p-2 rounded-md">{case_item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Customer Activities Created
                </h3>
                <ul className="text-sm space-y-1">
                  {callSummary.customerActivities.map((activity, index) => (
                    <li key={index} className="bg-muted p-2 rounded-md">• {activity}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Call Summary</h3>
                <p className="text-sm bg-muted p-3 rounded-md leading-relaxed">{callSummary.summary}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Resources Sent
                </h3>
                <ul className="text-sm space-y-1">
                  {resourcesSent.map((resource, index) => (
                    <li key={index} className="bg-muted p-2 rounded-md">• {resource}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Suggestions for Improvement
                </h3>
                <ul className="text-sm space-y-1">
                  {callSummary.improvements.map((improvement, index) => (
                    <li key={index} className="bg-muted p-2 rounded-md">• {improvement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Action Buttons */}
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowCasesModal(true)}>
                Create Additional Cases
              </Button>
              <Button variant="outline" onClick={() => setShowActivitiesModal(true)}>
                Create Additional Customer Activities
              </Button>
              <Button 
                className="bg-cs-warning text-cs-warning-foreground hover:bg-cs-warning/90"
                onClick={() => setShowCodeRedModal(true)}
              >
                Create Code Red
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-dark"
                onClick={() => setShowNotesModal(true)}
              >
                Send Notes to Partner Provider
              </Button>
            </div>
            <Button 
              className="bg-cs-active text-cs-active-foreground hover:bg-cs-active/90"
              onClick={handleFinalizeCall}
            >
              Finalize Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Additional Cases Modal */}
      <Dialog open={showCasesModal} onOpenChange={setShowCasesModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Case</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="case-type">Case Type</Label>
              <Select value={caseForm.type} onValueChange={(value) => setCaseForm(prev => ({...prev, type: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select case type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Issue</SelectItem>
                  <SelectItem value="billing">Billing Inquiry</SelectItem>
                  <SelectItem value="return">Product Return</SelectItem>
                  <SelectItem value="warranty">Warranty Claim</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="case-details">Details</Label>
              <Textarea 
                id="case-details"
                placeholder="Enter case description..."
                value={caseForm.details}
                onChange={(e) => setCaseForm(prev => ({...prev, details: e.target.value}))}
              />
            </div>
            <div>
              <Label htmlFor="case-assign">Assign To</Label>
              <Select value={caseForm.assignTo} onValueChange={(value) => setCaseForm(prev => ({...prev, assignTo: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="service">Customer Service</SelectItem>
                  <SelectItem value="billing">Billing Department</SelectItem>
                  <SelectItem value="warranty">Warranty Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowCasesModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCreateCase} className="flex-1">
                Save Case
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Additional Customer Activities Modal */}
      <Dialog open={showActivitiesModal} onOpenChange={setShowActivitiesModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Customer Activity</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="activity-type">Activity Type</Label>
              <Select value={activityForm.type} onValueChange={(value) => setActivityForm(prev => ({...prev, type: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="followup">Follow-up Call</SelectItem>
                  <SelectItem value="email">Email Sent</SelectItem>
                  <SelectItem value="training">Training Scheduled</SelectItem>
                  <SelectItem value="replacement">Device Replacement</SelectItem>
                  <SelectItem value="documentation">Documentation Updated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="activity-details">Details</Label>
              <Textarea 
                id="activity-details"
                placeholder="Enter activity description..."
                value={activityForm.details}
                onChange={(e) => setActivityForm(prev => ({...prev, details: e.target.value}))}
              />
            </div>
            <div>
              <Label htmlFor="activity-assign">Assign To</Label>
              <Select value={activityForm.assignTo} onValueChange={(value) => setActivityForm(prev => ({...prev, assignTo: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="account">Account Manager</SelectItem>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="success">Customer Success</SelectItem>
                  <SelectItem value="training">Training Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowActivitiesModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCreateActivity} className="flex-1">
                Save Activity
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Code Red Modal */}
      <Dialog open={showCodeRedModal} onOpenChange={setShowCodeRedModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Code Red</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="codred-type">Type</Label>
              <Input 
                id="codred-type"
                value="Code Red - Urgent Escalation"
                disabled
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="codred-details">Reason Details</Label>
              <Textarea 
                id="codred-details"
                placeholder="Enter escalation reason..."
                value={codeRedForm.details}
                onChange={(e) => setCodeRedForm(prev => ({...prev, details: e.target.value}))}
              />
            </div>
            <div>
              <Label htmlFor="codred-priority">Priority Level</Label>
              <Select value={codeRedForm.priority} onValueChange={(value) => setCodeRedForm(prev => ({...prev, priority: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowCodeRedModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCreateCodeRed} className="flex-1 bg-cs-warning text-cs-warning-foreground hover:bg-cs-warning/90">
                Create Code Red
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Notes to Partner Provider Modal */}
      <Dialog open={showNotesModal} onOpenChange={setShowNotesModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Notes to Partner Provider</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="notes-subject">Subject</Label>
              <Input 
                id="notes-subject"
                placeholder="Enter subject..."
                value={notesForm.subject}
                onChange={(e) => setNotesForm(prev => ({...prev, subject: e.target.value}))}
              />
            </div>
            <div>
              <Label htmlFor="notes-comments">Comments</Label>
              <Textarea 
                id="notes-comments"
                placeholder="Enter detailed notes..."
                value={notesForm.comments}
                onChange={(e) => setNotesForm(prev => ({...prev, comments: e.target.value}))}
              />
            </div>
            <div>
              <Label htmlFor="notes-provider">Partner Provider</Label>
              <Select value={notesForm.provider} onValueChange={(value) => setNotesForm(prev => ({...prev, provider: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select partner provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary Care Provider</SelectItem>
                  <SelectItem value="specialist">Specialist Office</SelectItem>
                  <SelectItem value="insurance">Insurance Company</SelectItem>
                  <SelectItem value="manufacturer">Device Manufacturer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowNotesModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSendNotes} className="flex-1">
                Send Notes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}