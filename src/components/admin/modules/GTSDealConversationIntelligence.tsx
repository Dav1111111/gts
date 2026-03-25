import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { ScrollArea } from "../../ui/scroll-area";
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Brain,
  Target,
  Zap,
  Play,
  Calendar,
  Phone,
  Video,
  Mail,
  Gift,
  Crown,
  Users,
  DollarSign,
  BarChart3,
  MessageSquare,
  FileVideo,
  Star,
  Shield,
  Heart,
  Activity,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Plus,
  ArrowRight,
  Lightbulb,
  Send,
  BookOpen,
  Headphones,
  Award,
  Rocket,
  ChevronRight,
  Timer,
  MapPin,
  User
} from "lucide-react";

interface GTSDealConversationIntelligenceProps {
  dealId: string;
  onNavigateToCalendar: () => void;
  onBack?: () => void;
}

// Enhanced deal data with AI conversation intelligence
const mockDeal = {
  id: "deal-001",
  title: "Корпоративный VIP пакет - TechCorp",
  client: {
    name: "Александр Петров",
    company: "TechCorp LLC",
    tier: "Enterprise",
    avatar: ""
  },
  value: 450000,
  stage: "negotiation",
  probability: 75,
  closeDate: "2024-01-25",
  daysToClose: 10,
  owner: "Анна Смирнова",
  created: "2024-01-10",
  
  // AI Conversation Intelligence
  conversationIntelligence: {
    totalInteractions: 24,
    avgResponseTime: "2.3 часа",
    lastInteraction: "2024-01-15T14:30:00Z",
    
    // Win/Loss Analysis
    winLossAnalysis: {
      winProbability: 78,
      lossProbability: 22,
      winReasons: [
        { reason: "Strong budget alignment", weight: 85, confidence: 92 },
        { reason: "Urgent business need", weight: 78, confidence: 89 },
        { reason: "Positive past experience", weight: 82, confidence: 95 },
        { reason: "Executive sponsorship", weight: 75, confidence: 87 }
      ],
      lossReasons: [
        { reason: "Budget constraints", weight: 45, confidence: 67 },
        { reason: "Competitive pressure", weight: 38, confidence: 72 },
        { reason: "Timeline mismatch", weight: 25, confidence: 58 }
      ]
    },
    
    // Risk Assessment
    riskAssessment: {
      overallRiskScore: 25, // 0-100, lower is better
      churnProbability: 15,
      riskFactors: [
        { factor: "Price sensitivity", level: "low", impact: 15 },
        { factor: "Decision timeline", level: "medium", impact: 35 },
        { factor: "Competitor activity", level: "low", impact: 20 },
        { factor: "Budget approval", level: "medium", impact: 30 }
      ],
      sentiment: {
        current: "positive",
        trend: "improving",
        score: 8.2,
        history: [6.5, 7.1, 7.8, 8.2]
      }
    },
    
    // Conversation Insights
    conversationInsights: {
      keyTopics: [
        { topic: "Pricing", mentions: 12, sentiment: "neutral" },
        { topic: "Timeline", mentions: 8, sentiment: "positive" },
        { topic: "Team building", mentions: 15, sentiment: "positive" },
        { topic: "Helicopter tours", mentions: 18, sentiment: "very_positive" },
        { topic: "VIP service", mentions: 6, sentiment: "positive" }
      ],
      decisionMakers: [
        { name: "Александр Петров", role: "CEO", influence: 95, engagement: 88 },
        { name: "Мария Воронова", role: "CFO", influence: 75, engagement: 42 },
        { name: "Дмитрий Сидоров", role: "HR Director", influence: 60, engagement: 67 }
      ],
      painPoints: [
        "Need unique team building experience",
        "Limited available dates",
        "Budget approval process"
      ],
      interests: [
        "Helicopter experiences",
        "Exclusive access", 
        "Corporate packages",
        "Weekend availability"
      ]
    }
  },
  
  // Next Best Actions (AI Recommended)
  nextBestActions: [
    {
      id: "nba-1",
      action: "Send helicopter safety training video",
      type: "content",
      priority: "high",
      confidence: 94,
      reasoning: "Client expressed safety concerns in last conversation",
      expectedImpact: "Increase confidence by 15%",
      timeToComplete: "5 minutes",
      dueDate: "2024-01-16"
    },
    {
      id: "nba-2", 
      action: "Offer Premium VIP upgrade",
      type: "upsell",
      priority: "high",
      confidence: 87,
      reasoning: "Strong budget capacity and VIP service interest detected",
      expectedImpact: "Increase deal value by ₽150K",
      timeToComplete: "15 minutes",
      dueDate: "2024-01-17"
    },
    {
      id: "nba-3",
      action: "Schedule pilot call with team",
      type: "engagement",
      priority: "medium",
      confidence: 92,
      reasoning: "Multiple stakeholders need alignment",
      expectedImpact: "Reduce decision time by 40%",
      timeToComplete: "30 minutes",
      dueDate: "2024-01-18"
    },
    {
      id: "nba-4",
      action: "Send corporate package comparison",
      type: "content",
      priority: "medium", 
      confidence: 78,
      reasoning: "Client comparing multiple options",
      expectedImpact: "Clarify value proposition",
      timeToComplete: "10 minutes",
      dueDate: "2024-01-19"
    }
  ]
};

// Available time slots for booking
const availableSlots = [
  { id: "slot-1", date: "2024-01-20", time: "10:00", duration: "4h", type: "Helicopter VIP Tour", available: true },
  { id: "slot-2", date: "2024-01-20", time: "14:00", duration: "4h", type: "Helicopter VIP Tour", available: true },
  { id: "slot-3", date: "2024-01-21", time: "09:00", duration: "6h", type: "Full Day Package", available: true },
  { id: "slot-4", date: "2024-01-21", time: "15:00", duration: "3h", type: "Team Building Special", available: false },
  { id: "slot-5", date: "2024-01-22", time: "11:00", duration: "4h", type: "Helicopter VIP Tour", available: true },
  { id: "slot-6", date: "2024-01-22", time: "16:00", duration: "2h", type: "Quick Experience", available: true }
];

export function GTSDealConversationIntelligence({ dealId, onNavigateToCalendar, onBack }: GTSDealConversationIntelligenceProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showSlotPicker, setShowSlotPicker] = useState(false);
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getRiskColor = (score: number) => {
    if (score <= 30) return "text-green-400 bg-green-500/10";
    if (score <= 60) return "text-yellow-400 bg-yellow-500/10";
    return "text-red-400 bg-red-500/10";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return "bg-red-500/20 text-red-400 border-red-500/30";
      case 'medium': return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case 'low': return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'very_positive': return "text-green-500";
      case 'positive': return "text-green-400";
      case 'neutral': return "text-yellow-400";
      case 'negative': return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'content': return <FileVideo className="w-4 h-4" />;
      case 'upsell': return <Crown className="w-4 h-4" />;
      case 'engagement': return <Phone className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const handleCompleteAction = (actionId: string) => {
    setCompletedActions([...completedActions, actionId]);
  };

  const handleCreateBooking = () => {
    if (selectedSlot) {
      const slot = availableSlots.find(s => s.id === selectedSlot);
      console.log('Creating booking for slot:', slot);
      onNavigateToCalendar();
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-[#17181A]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад
              </Button>
            )}
            <div>
              <h1 className="text-xl font-heading text-white">{mockDeal.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-[#91040C]/20 text-[#91040C] border-[#91040C]/30">
                  ₽{mockDeal.value.toLocaleString()}
                </Badge>
                <Badge variant="outline" className="border-[#232428] text-[#A6A7AA]">
                  {mockDeal.stage}
                </Badge>
                <span className="text-sm text-[#A6A7AA]">{mockDeal.daysToClose} дней до закрытия</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={onNavigateToCalendar}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Календарь
            </Button>
            <Button 
              onClick={() => setShowSlotPicker(true)}
              className="bg-[#91040C] hover:bg-[#91040C]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Booking
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Deal Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Win Probability</p>
                  <p className="text-lg font-heading text-white">{mockDeal.conversationIntelligence.winLossAnalysis.winProbability}%</p>
                  <p className="text-xs text-green-400">AI Confidence: High</p>
                </div>
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Risk Score</p>
                  <p className="text-lg font-heading text-white">{mockDeal.conversationIntelligence.riskAssessment.overallRiskScore}</p>
                  <p className={`text-xs ${getRiskColor(mockDeal.conversationIntelligence.riskAssessment.overallRiskScore).split(' ')[0]}`}>
                    Low Risk
                  </p>
                </div>
                <Shield className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Churn Probability</p>
                  <p className="text-lg font-heading text-white">{mockDeal.conversationIntelligence.riskAssessment.churnProbability}%</p>
                  <p className="text-xs text-green-400">Низкий риск</p>
                </div>
                <Heart className="h-6 w-6 text-pink-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Sentiment Score</p>
                  <p className="text-lg font-heading text-white">{mockDeal.conversationIntelligence.riskAssessment.sentiment.score}</p>
                  <p className="text-xs text-green-400">{mockDeal.conversationIntelligence.riskAssessment.sentiment.trend}</p>
                </div>
                <Activity className="h-6 w-6 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Conversation Intelligence */}
          <div className="lg:col-span-2 space-y-6">
            {/* Win/Loss Analysis */}
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <CardTitle className="text-white">AI Win/Loss Analysis</CardTitle>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                    92% Confidence
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Win Reasons */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <h4 className="font-medium text-white">Win Factors</h4>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {mockDeal.conversationIntelligence.winLossAnalysis.winProbability}% probability
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {mockDeal.conversationIntelligence.winLossAnalysis.winReasons.map((reason, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white">{reason.reason}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#A6A7AA]">{reason.confidence}% conf</span>
                            <span className="text-xs text-white">{reason.weight}%</span>
                          </div>
                        </div>
                        <Progress value={reason.weight} className="h-1" />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-[#232428]" />

                {/* Loss Reasons */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <h4 className="font-medium text-white">Risk Factors</h4>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      {mockDeal.conversationIntelligence.winLossAnalysis.lossProbability}% probability
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {mockDeal.conversationIntelligence.winLossAnalysis.lossReasons.map((reason, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white">{reason.reason}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#A6A7AA]">{reason.confidence}% conf</span>
                            <span className="text-xs text-white">{reason.weight}%</span>
                          </div>
                        </div>
                        <Progress value={reason.weight} className="h-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conversation Insights */}
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Conversation Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Topics */}
                <div>
                  <h4 className="font-medium text-white mb-3">Ключевые темы разговоров</h4>
                  <div className="space-y-2">
                    {mockDeal.conversationIntelligence.conversationInsights.keyTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-[#17181A] rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-white">{topic.topic}</span>
                          <Badge variant="outline" className="text-xs border-[#232428] text-[#A6A7AA]">
                            {topic.mentions} mentions
                          </Badge>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${getSentimentColor(topic.sentiment)}`} />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-[#232428]" />

                {/* Decision Makers */}
                <div>
                  <h4 className="font-medium text-white mb-3">Лица, принимающие решения</h4>
                  <div className="space-y-3">
                    {mockDeal.conversationIntelligence.conversationInsights.decisionMakers.map((dm, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#17181A] rounded">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-[#232428] text-white text-xs">
                              {dm.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm text-white">{dm.name}</div>
                            <div className="text-xs text-[#A6A7AA]">{dm.role}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-white">Influence: {dm.influence}%</div>
                          <div className="text-xs text-[#A6A7AA]">Engagement: {dm.engagement}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Best Actions */}
          <div className="space-y-6">
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <CardTitle className="text-white">Next Best Actions</CardTitle>
                </div>
                <CardDescription className="text-[#A6A7AA]">
                  AI-recommended actions to move deal forward
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {mockDeal.nextBestActions.map((action) => (
                      <Card 
                        key={action.id}
                        className={`bg-[#17181A] border-[#232428] transition-all ${
                          completedActions.includes(action.id) ? 'opacity-50' : 'hover:bg-[#1A1B1D]'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {/* Action Header */}
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                {getActionIcon(action.type)}
                                <Badge className={`text-xs ${getPriorityColor(action.priority)}`}>
                                  {action.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1">
                                <Timer className="w-3 h-3 text-[#A6A7AA]" />
                                <span className="text-xs text-[#A6A7AA]">{action.timeToComplete}</span>
                              </div>
                            </div>

                            {/* Action Content */}
                            <div>
                              <h5 className="font-medium text-white mb-1">{action.action}</h5>
                              <p className="text-xs text-[#A6A7AA] mb-2">{action.reasoning}</p>
                              <div className="text-xs text-green-400">{action.expectedImpact}</div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              {!completedActions.includes(action.id) ? (
                                <>
                                  {action.type === 'content' && (
                                    <Button 
                                      size="sm" 
                                      className="bg-blue-500 hover:bg-blue-600 flex-1"
                                      onClick={() => handleCompleteAction(action.id)}
                                    >
                                      <Send className="w-3 h-3 mr-1" />
                                      Send Video
                                    </Button>
                                  )}
                                  {action.type === 'upsell' && (
                                    <Button 
                                      size="sm" 
                                      className="bg-purple-500 hover:bg-purple-600 flex-1"
                                      onClick={() => handleCompleteAction(action.id)}
                                    >
                                      <Crown className="w-3 h-3 mr-1" />
                                      Offer Premium
                                    </Button>
                                  )}
                                  {action.type === 'engagement' && (
                                    <Button 
                                      size="sm" 
                                      className="bg-green-500 hover:bg-green-600 flex-1"
                                      onClick={() => handleCompleteAction(action.id)}
                                    >
                                      <Phone className="w-3 h-3 mr-1" />
                                      Schedule Call
                                    </Button>
                                  )}
                                </>
                              ) : (
                                <div className="flex items-center gap-2 text-green-400 text-sm">
                                  <CheckCircle2 className="w-4 h-4" />
                                  Completed
                                </div>
                              )}
                            </div>

                            {/* Confidence Score */}
                            <div className="flex items-center gap-2">
                              <Brain className="w-3 h-3 text-purple-400" />
                              <span className="text-xs text-purple-400">
                                AI Confidence: {action.confidence}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Create Booking CTA */}
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Create Booking</CardTitle>
                <CardDescription className="text-[#A6A7AA]">
                  Convert deal to booking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-[#91040C] hover:bg-[#91040C]/90"
                  onClick={() => setShowSlotPicker(!showSlotPicker)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {showSlotPicker ? 'Hide Slot Picker' : 'Show Available Slots'}
                </Button>

                {/* Slot Picker */}
                {showSlotPicker && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-white">Available Time Slots</h5>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {availableSlots.map((slot) => (
                        <Card 
                          key={slot.id}
                          className={`cursor-pointer transition-all ${
                            !slot.available ? 'opacity-50 cursor-not-allowed' :
                            selectedSlot === slot.id ? 'bg-[#91040C]/20 border-[#91040C]' : 'bg-[#17181A] border-[#232428] hover:bg-[#1A1B1D]'
                          }`}
                          onClick={() => slot.available && setSelectedSlot(slot.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-3 h-3 text-[#A6A7AA]" />
                                  <span className="text-sm text-white">{formatDate(slot.date)}</span>
                                  <Clock className="w-3 h-3 text-[#A6A7AA]" />
                                  <span className="text-sm text-white">{slot.time}</span>
                                </div>
                                <div className="text-xs text-[#A6A7AA] mt-1">
                                  {slot.type} • {slot.duration}
                                </div>
                              </div>
                              <div className="flex items-center">
                                {slot.available ? (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                    Available
                                  </Badge>
                                ) : (
                                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                    Booked
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {selectedSlot && (
                      <Button 
                        className="w-full bg-green-500 hover:bg-green-600"
                        onClick={handleCreateBooking}
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Create Booking & Open Calendar
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}