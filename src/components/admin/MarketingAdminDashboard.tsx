import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Calendar } from "../ui/calendar";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  MessageSquare,
  Bell,
  Calendar as CalendarIcon,
  Plus,
  Edit,
  Send,
  Target,
  Share2,
  Heart,
  BarChart3,
  PieChart as PieChartIcon,
  Mail,
  Smartphone,
  Globe,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  type: "email" | "push" | "social" | "sms";
  status: "draft" | "scheduled" | "active" | "completed" | "paused";
  audience: number;
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  startDate: string;
  endDate?: string;
  budget: number;
  spent: number;
}

interface ContentItem {
  id: string;
  title: string;
  type: "blog" | "social" | "email" | "video";
  status: "draft" | "scheduled" | "published";
  author: string;
  publishDate: string;
  views: number;
  engagement: number;
  platform?: string;
}

interface Analytics {
  website: {
    visitors: number;
    pageViews: number;
    bounceRate: number;
    avgSession: string;
  };
  social: {
    followers: number;
    engagement: number;
    reach: number;
    impressions: number;
  };
  campaigns: {
    active: number;
    totalSent: number;
    avgOpenRate: number;
    avgCTR: number;
  };
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Adventure Sale",
    type: "email",
    status: "active",
    audience: 2500,
    sent: 2500,
    opened: 875,
    clicked: 156,
    converted: 23,
    startDate: "2024-08-20",
    endDate: "2024-09-20",
    budget: 50000,
    spent: 15000
  },
  {
    id: "2",
    name: "New Helicopter Service",
    type: "push",
    status: "scheduled",
    audience: 1800,
    sent: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    startDate: "2024-08-30",
    budget: 25000,
    spent: 0
  }
];

const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "Top 5 Yacht Destinations in Sochi",
    type: "blog",
    status: "published",
    author: "Marina Kozlova",
    publishDate: "2024-08-25",
    views: 3420,
    engagement: 87
  },
  {
    id: "2",
    title: "Helicopter Adventure Post",
    type: "social",
    status: "scheduled",
    author: "Alex Petrov",
    publishDate: "2024-08-28",
    views: 0,
    engagement: 0,
    platform: "Instagram"
  }
];

const mockAnalytics: Analytics = {
  website: {
    visitors: 12500,
    pageViews: 45600,
    bounceRate: 32,
    avgSession: "4:32"
  },
  social: {
    followers: 28400,
    engagement: 4.8,
    reach: 156000,
    impressions: 245000
  },
  campaigns: {
    active: 5,
    totalSent: 45600,
    avgOpenRate: 35,
    avgCTR: 6.2
  }
};

const trafficData = [
  { name: 'Jan', visitors: 8000, conversions: 240 },
  { name: 'Feb', visitors: 9200, conversions: 280 },
  { name: 'Mar', visitors: 8800, conversions: 265 },
  { name: 'Apr', visitors: 10500, conversions: 315 },
  { name: 'May', visitors: 11200, conversions: 340 },
  { name: 'Jun', visitors: 12000, conversions: 380 },
  { name: 'Jul', visitors: 12500, conversions: 420 },
  { name: 'Aug', visitors: 11800, conversions: 395 }
];

const channelData = [
  { name: 'Organic Search', value: 40, color: '#10B981' },
  { name: 'Social Media', value: 25, color: '#3B82F6' },
  { name: 'Direct', value: 20, color: '#8B5CF6' },
  { name: 'Email', value: 10, color: '#F59E0B' },
  { name: 'Other', value: 5, color: '#6B7280' }
];

export function MarketingAdminDashboard() {
  const [activeTab, setActiveTab] = useState<"analytics" | "campaigns" | "content" | "notifications">("analytics");
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [content, setContent] = useState(mockContent);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": case "published": return "bg-green-500 text-white";
      case "scheduled": return "bg-blue-500 text-white";
      case "draft": return "bg-yellow-500 text-white";
      case "completed": return "bg-gray-500 text-white";
      case "paused": return "bg-orange-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email": return <Mail className="w-4 h-4" />;
      case "push": return <Smartphone className="w-4 h-4" />;
      case "social": return <Share2 className="w-4 h-4" />;
      case "sms": return <MessageSquare className="w-4 h-4" />;
      case "blog": return <Globe className="w-4 h-4" />;
      case "video": return <Eye className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case "instagram": return <Instagram className="w-4 h-4" />;
      case "facebook": return <Facebook className="w-4 h-4" />;
      case "twitter": return <Twitter className="w-4 h-4" />;
      default: return <Share2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Marketing Dashboard</h1>
          <p className="text-gray-400">Analytics, campaigns, and content management</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-[#91040C] hover:bg-[#91040C]/90" onClick={() => setIsCreatingCampaign(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <nav className="flex space-x-8">
          {[
            { id: "analytics", label: "Analytics" },
            { id: "campaigns", label: "Campaigns" },
            { id: "content", label: "Content" },
            { id: "notifications", label: "Notifications" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-[#91040C] text-[#91040C]"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Website Visitors</p>
                  <p className="text-2xl font-semibold text-white">{mockAnalytics.website.visitors.toLocaleString()}</p>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+8.2%</span>
                <span className="text-gray-400 ml-1">vs last month</span>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Social Followers</p>
                  <p className="text-2xl font-semibold text-white">{mockAnalytics.social.followers.toLocaleString()}</p>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <Heart className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+12.5%</span>
                <span className="text-gray-400 ml-1">vs last month</span>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Email Open Rate</p>
                  <p className="text-2xl font-semibold text-white">{mockAnalytics.campaigns.avgOpenRate}%</p>
                </div>
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+2.1%</span>
                <span className="text-gray-400 ml-1">vs last month</span>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Conversion Rate</p>
                  <p className="text-2xl font-semibold text-white">{mockAnalytics.campaigns.avgCTR}%</p>
                </div>
                <div className="bg-orange-500/10 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-orange-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                <span className="text-red-400">-0.3%</span>
                <span className="text-gray-400 ml-1">vs last month</span>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Traffic & Conversions</h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151', 
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Line type="monotone" dataKey="visitors" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Traffic Sources</h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151', 
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-4 mt-4">
                  {channelData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-400">{item.name}</span>
                      <span className="text-sm text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === "campaigns" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-gray-900 border-gray-800">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gray-800 p-2 rounded-lg">
                        {getTypeIcon(campaign.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{campaign.name}</h3>
                        <p className="text-sm text-gray-400 capitalize">{campaign.type} campaign</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Audience</span>
                      <span className="text-sm text-white">{campaign.audience.toLocaleString()}</span>
                    </div>
                    
                    {campaign.sent > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Open Rate</span>
                          <span className="text-sm text-white">
                            {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Click Rate</span>
                          <span className="text-sm text-white">
                            {((campaign.clicked / campaign.sent) * 100).toFixed(1)}%
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Conversions</span>
                          <span className="text-sm text-white">{campaign.converted}</span>
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Budget</span>
                      <span className="text-sm text-white">
                        {campaign.spent.toLocaleString()}₽ / {campaign.budget.toLocaleString()}₽
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-[#91040C] h-2 rounded-full" 
                        style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 border-gray-700 text-gray-300">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-gray-700 text-gray-300">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Content Tab */}
      {activeTab === "content" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Content Calendar</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-gray-700"
              />
            </div>
          </Card>
          
          <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Content Library</h3>
                <Button variant="outline" className="border-gray-700 text-gray-300">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Content
                </Button>
              </div>
            </div>
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-400">Title</TableHead>
                    <TableHead className="text-gray-400">Type</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Author</TableHead>
                    <TableHead className="text-gray-400">Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {content.map((item) => (
                    <TableRow key={item.id} className="border-gray-800">
                      <TableCell className="text-white">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(item.type)}
                          <div>
                            <p className="font-medium">{item.title}</p>
                            {item.platform && (
                              <div className="flex items-center space-x-1 mt-1">
                                {getPlatformIcon(item.platform)}
                                <span className="text-xs text-gray-400">{item.platform}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-600 text-gray-300 capitalize">
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white">{item.author}</TableCell>
                      <TableCell className="text-white">
                        {item.views > 0 && (
                          <div className="text-sm">
                            <div>{item.views.toLocaleString()} views</div>
                            <div className="text-gray-400">{item.engagement}% engagement</div>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Send Push Notification</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <Label className="text-white">Title</Label>
                <Input 
                  placeholder="Notification title"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Message</Label>
                <Textarea 
                  placeholder="Notification message"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Audience</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="members">Club Members</SelectItem>
                    <SelectItem value="recent">Recent Customers</SelectItem>
                    <SelectItem value="vip">VIP Customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white">Schedule</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Send now or schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Send Now</SelectItem>
                    <SelectItem value="schedule">Schedule for Later</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-[#91040C] hover:bg-[#91040C]/90">
                <Send className="w-4 h-4 mr-2" />
                Send Notification
              </Button>
            </div>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Recent Notifications</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  {
                    title: "Summer Sale Extended",
                    message: "Don't miss out on 20% off all yacht charters",
                    sent: "2 hours ago",
                    delivered: 2400,
                    opened: 892
                  },
                  {
                    title: "New Helicopter Route",
                    message: "Explore the stunning Caucasus mountains",
                    sent: "1 day ago",
                    delivered: 1800,
                    opened: 654
                  }
                ].map((notification, index) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{notification.title}</h4>
                      <span className="text-xs text-gray-400">{notification.sent}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        Delivered: {notification.delivered.toLocaleString()}
                      </span>
                      <span className="text-gray-400">
                        Opened: {notification.opened.toLocaleString()} ({((notification.opened / notification.delivered) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* New Campaign Dialog */}
      <Dialog open={isCreatingCampaign} onOpenChange={setIsCreatingCampaign}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Campaign Name</Label>
                <Input
                  placeholder="Enter campaign name"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label>Campaign Type</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email Campaign</SelectItem>
                    <SelectItem value="push">Push Notification</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="sms">SMS Campaign</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Campaign Description</Label>
              <Textarea
                placeholder="Describe your campaign goals and content"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Target Audience</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="members">Club Members</SelectItem>
                    <SelectItem value="vip">VIP Customers</SelectItem>
                    <SelectItem value="segment">Custom Segment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Budget (₽)</Label>
                <Input
                  type="number"
                  placeholder="Enter budget"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsCreatingCampaign(false)}
                className="border-gray-700 text-gray-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setIsCreatingCampaign(false)}
                className="bg-[#91040C] hover:bg-[#91040C]/90"
              >
                Create Campaign
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}