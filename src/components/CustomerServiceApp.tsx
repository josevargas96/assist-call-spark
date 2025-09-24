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
  TrendingUp
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
  const [inputMessage, setInputMessage] = useState("");
  const [showCallSummary, setShowCallSummary] = useState(false);
  const [callDuration, setCallDuration] = useState("2:35");
  const [transcriptOpen, setTranscriptOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
          {/* Customer Info Bar */}
          <div className="bg-cs-customer-info text-cs-customer-info-foreground px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-6">
              <div>
                <h2 className="text-lg font-semibold">Margaret Davis</h2>
                <p className="text-sm opacity-90">TX</p>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">iPhone 13</p>
                  <p className="text-xs opacity-75">Horizon 71X</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="opacity-75">Duration: {callDuration}</span>
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

            {/* AI Chat Messages */}
            <Card className="mb-6 shadow-soft flex-1 flex flex-col overflow-hidden">
              <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b bg-muted/30 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold text-xs">AI</span>
                    </div>
                    <h3 className="font-semibold">Customer Assistant</h3>
                  </div>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-4">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          msg.type === 'ai' ? 'bg-primary' : 'bg-cs-customer-info'
                        }`}>
                          <span className={`font-semibold text-xs ${
                            msg.type === 'ai' ? 'text-primary-foreground' : 'text-cs-customer-info-foreground'
                          }`}>
                            {msg.type === 'ai' ? 'AI' : 'CS'}
                          </span>
                        </div>
                        <div className={`flex-1 ${msg.type === 'user' ? 'text-right' : ''}`}>
                          <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                            msg.type === 'ai' 
                              ? 'bg-muted text-foreground' 
                              : 'bg-primary text-primary-foreground'
                          }`}>
                            <p className="text-sm leading-relaxed">{msg.message}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Questions */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Quick Questions:</h3>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <Button key={question} variant="outline" size="sm" className="text-primary">
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex gap-3 mb-6">
              <Input
                placeholder="Ask about Margaret's profile, history, or device info..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary-dark">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="bg-cs-warning text-cs-warning-foreground hover:bg-cs-warning/90">
                Create Code Red
              </Button>
              <Button 
                onClick={handleCompleteCall}
                className="bg-cs-danger text-cs-danger-foreground hover:bg-cs-danger/90"
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
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Call Summary</h3>
                <p className="text-sm bg-muted p-3 rounded-md leading-relaxed">{callSummary.summary}</p>
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
          <div className="flex justify-end gap-3">
            <Button variant="outline">Create Additional Cases</Button>
            <Button variant="outline">Create Additional Customer Activities</Button>
            <Button className="bg-cs-warning text-cs-warning-foreground hover:bg-cs-warning/90">
              Create Code Red
            </Button>
            <Button className="bg-primary hover:bg-primary-dark">
              Send Notes to Partner Provider
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}