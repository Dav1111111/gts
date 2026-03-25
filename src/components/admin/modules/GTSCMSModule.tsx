import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Eye,
  Trash2,
  Upload,
  Image,
  FileText,
  Tag,
  Calendar,
  Users,
  ThumbsUp,
  MessageSquare,
  Share2,
  Globe,
  Settings,
  Star
} from "lucide-react";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import { Switch } from "../../ui/switch";

interface GTSCMSModuleProps {
  onBack: () => void;
  onNavigateToCRM: () => void;
}

export function GTSCMSModule({ onBack, onNavigateToCRM }: GTSCMSModuleProps) {
  const [activeTab, setActiveTab] = useState("equipment");
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const content = {
    equipment: [
      {
        id: "eq-001",
        title: "Yamaha 252S Premium Yacht",
        description: "Luxury yacht with premium amenities for up to 10 guests",
        status: "published",
        author: "Marina Kozlova",
        date: "2024-11-28",
        views: 1250,
        leads: 15,
        category: "Marine",
        tags: ["yacht", "luxury", "premium"],
        seo: { title: "Premium Yacht Rental Sochi | Yamaha 252S", meta: "Experience luxury on the Black Sea with our premium Yamaha 252S yacht rental in Sochi", keywords: "yacht rental, sochi, luxury boat" }
      },
      {
        id: "eq-002", 
        title: "Robinson R44 Helicopter",
        description: "Professional helicopter tours with certified pilots",
        status: "draft",
        author: "Alexey Petrov",
        date: "2024-11-30",
        views: 890,
        leads: 8,
        category: "Aviation",
        tags: ["helicopter", "tour", "aviation"],
        seo: { title: "Helicopter Tours Sochi | Robinson R44", meta: "Scenic helicopter flights over Sochi with professional pilots", keywords: "helicopter tour, sochi flights, aviation" }
      },
      {
        id: "eq-003",
        title: "Honda Talon Buggy Adventure",
        description: "Off-road adventure experience through mountain trails",
        status: "published",
        author: "Viktor Sokolov",
        date: "2024-11-25",
        views: 2100,
        leads: 22,
        category: "Ground Vehicles", 
        tags: ["buggy", "adventure", "off-road"],
        seo: { title: "Buggy Adventures Sochi | Honda Talon", meta: "Thrilling off-road buggy adventures in Sochi mountains", keywords: "buggy rental, off-road, sochi adventure" }
      }
    ],
    offers: [
      {
        id: "off-001",
        title: "Winter Helicopter Package",
        description: "Special winter rates for helicopter tours with champagne service",
        status: "published",
        author: "Maria Volkova",
        date: "2024-12-01",
        views: 650,
        leads: 12,
        discount: "25%",
        validUntil: "2024-12-31",
        tags: ["winter", "helicopter", "special"],
        seo: { title: "Winter Helicopter Tours Sochi | 25% Off", meta: "Special winter helicopter tour packages in Sochi with champagne service", keywords: "winter helicopter, sochi deals, aviation tours" }
      },
      {
        id: "off-002",
        title: "Yacht + Buggy Combo Deal",
        description: "Combined yacht and buggy experience for adventure seekers",
        status: "scheduled",
        author: "Elena Petrova",
        date: "2024-12-05",
        views: 0,
        leads: 0,
        discount: "30%",
        validUntil: "2024-12-25",
        tags: ["combo", "yacht", "buggy"],
        seo: { title: "Yacht Buggy Combo Sochi | Adventure Package", meta: "Ultimate adventure combo: yacht and buggy experience in Sochi", keywords: "combo deal, yacht buggy, sochi adventure" }
      }
    ],
    blog: [
      {
        id: "blog-001",
        title: "Best Helicopter Routes Over Sochi",
        description: "Discover the most scenic helicopter flight paths in the region",
        status: "published",
        author: "Travel Team",
        date: "2024-11-20",
        views: 3200,
        likes: 45,
        comments: 12,
        shares: 8,
        tags: ["helicopter", "sochi", "routes", "travel"],
        seo: { title: "Best Helicopter Routes Sochi | Scenic Flights Guide", meta: "Complete guide to the most beautiful helicopter routes over Sochi", keywords: "helicopter routes, sochi flights, scenic tours" }
      },
      {
        id: "blog-002",
        title: "Yacht Safety Guidelines for Beginners",
        description: "Essential safety tips for first-time yacht passengers",
        status: "published",
        author: "Captain Mikhailov",
        date: "2024-11-18",
        views: 1850,
        likes: 67,
        comments: 23,
        shares: 15,
        tags: ["yacht", "safety", "guidelines", "beginners"],
        seo: { title: "Yacht Safety Guide Sochi | Beginner Tips", meta: "Essential yacht safety guidelines for first-time passengers in Sochi", keywords: "yacht safety, boating tips, sochi marine" }
      }
    ],
    news: [
      {
        id: "news-001",
        title: "GTS Expands Fleet with New Slingshot Vehicles",
        description: "Three new Polaris Slingshot vehicles added to our adventure lineup",
        status: "published",
        author: "PR Team",
        date: "2024-11-30",
        views: 980,
        category: "Company News",
        tags: ["fleet", "expansion", "slingshot"],
        seo: { title: "GTS Fleet Expansion | New Slingshot Vehicles", meta: "GTS Sochi adds new Polaris Slingshot vehicles to adventure fleet", keywords: "gts fleet, slingshot rental, sochi news" }
      },
      {
        id: "news-002",
        title: "Winter Season Special Rates Announced",
        description: "Exclusive winter pricing for all helicopter and yacht services",
        status: "scheduled",
        author: "Marketing Team",
        date: "2024-12-03",
        views: 0,
        category: "Promotions",
        tags: ["winter", "rates", "promotion"],
        seo: { title: "Winter Special Rates | GTS Sochi Services", meta: "Special winter pricing for helicopter and yacht rentals in Sochi", keywords: "winter rates, sochi deals, seasonal pricing" }
      }
    ]
  };

  const ugcComments = [
    { id: "ugc-001", author: "Elena K.", content: "Amazing helicopter experience! Highly recommend GTS!", rating: 5, status: "approved", date: "2024-11-30" },
    { id: "ugc-002", author: "Dmitri P.", content: "Best yacht service in Sochi. Professional crew and luxury amenities.", rating: 5, status: "approved", date: "2024-11-29" },
    { id: "ugc-003", author: "Anonymous", content: "Overpriced for what you get. Not worth the money.", rating: 2, status: "pending", date: "2024-11-28" },
    { id: "ugc-004", author: "Marina S.", content: "Buggy adventure was incredible! Perfect for adrenaline junkies.", rating: 5, status: "approved", date: "2024-11-27" }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      published: "bg-green-500 text-white",
      draft: "bg-yellow-500 text-white",
      scheduled: "bg-blue-500 text-white",
      archived: "bg-gray-500 text-white",
      approved: "bg-green-500 text-white",
      pending: "bg-yellow-500 text-white",
      rejected: "bg-red-500 text-white"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500 text-white";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Marine": "bg-blue-500/10 text-blue-400",
      "Aviation": "bg-purple-500/10 text-purple-400",
      "Ground Vehicles": "bg-green-500/10 text-green-400",
      "Company News": "bg-orange-500/10 text-orange-400",
      "Promotions": "bg-pink-500/10 text-pink-400"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500/10 text-gray-400";
  };

  const allContent = [
    ...content.equipment,
    ...content.offers,
    ...content.blog,
    ...content.news
  ];

  const totalViews = allContent.reduce((sum, item) => sum + item.views, 0);
  const totalLeads = allContent.reduce((sum, item) => sum + (item.leads || 0), 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gts-portal-bg)' }}>
      {/* Header */}
      <div className="border-b" style={{ 
        backgroundColor: 'var(--gts-portal-surface)', 
        borderColor: 'var(--gts-portal-border)' 
      }}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} style={{ color: 'var(--gts-portal-text)' }}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portal
            </Button>
            <div>
              <h1 className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                CMS / Content Hub
              </h1>
              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                Manage equipment, offers, blog posts, and news content
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={onNavigateToCRM}
              variant="outline"
            >
              <Users className="h-4 w-4 mr-2" />
              CRM Leads
            </Button>
            <Switch 
              checked={previewMode}
              onCheckedChange={setPreviewMode}
            />
            <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>Preview</span>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="h-4 w-4 mr-2" />
              New Content
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Total Content</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>{allContent.length}</p>
                </div>
                <FileText className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Total Views</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>{totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Generated Leads</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>{totalLeads}</p>
                </div>
                <Users className="h-6 w-6 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Pending Reviews</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                    {ugcComments.filter(c => c.status === 'pending').length}
                  </p>
                </div>
                <MessageSquare className="h-6 w-6 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="equipment">Equipment ({content.equipment.length})</TabsTrigger>
            <TabsTrigger value="offers">Offers ({content.offers.length})</TabsTrigger>
            <TabsTrigger value="blog">Blog ({content.blog.length})</TabsTrigger>
            <TabsTrigger value="news">News ({content.news.length})</TabsTrigger>
            <TabsTrigger value="ugc">Comments</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          {/* Equipment Tab */}
          <TabsContent value="equipment" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Equipment Content</CardTitle>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Search equipment..." className="w-64" />
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {content.equipment.map(item => (
                        <div 
                          key={item.id}
                          className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-opacity-80 transition-colors"
                          style={{ backgroundColor: 'var(--gts-portal-card)' }}
                          onClick={() => setSelectedContent(item.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                              <Image className="h-6 w-6 text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{item.title}</h4>
                              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>{item.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getCategoryColor(item.category)}>
                                  {item.category}
                                </Badge>
                                <Badge className={getStatusColor(item.status)}>
                                  {item.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-4 mb-1">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                                <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{item.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                                <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{item.leads}</span>
                              </div>
                            </div>
                            <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                              {item.author} • {item.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Content Editor */}
              {selectedContent && (
                <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                  <CardHeader>
                    <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Edit Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const item = allContent.find(c => c.id === selectedContent)!;
                      return (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Title</label>
                            <Input value={item.title} className="mt-1" />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Description</label>
                            <Textarea value={item.description} className="mt-1" rows={3} />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Status</label>
                              <Select value={item.status}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="draft">Draft</SelectItem>
                                  <SelectItem value="published">Published</SelectItem>
                                  <SelectItem value="scheduled">Scheduled</SelectItem>
                                  <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {'category' in item && (
                              <div>
                                <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Category</label>
                                <Select value={item.category}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Marine">Marine</SelectItem>
                                    <SelectItem value="Aviation">Aviation</SelectItem>
                                    <SelectItem value="Ground Vehicles">Ground Vehicles</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Tags</label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Button className="w-full bg-blue-500 hover:bg-blue-600">
                              <Edit className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={onNavigateToCRM}
                            >
                              <Users className="h-4 w-4 mr-2" />
                              View Leads
                            </Button>
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Similar structure for other tabs... */}
          <TabsContent value="offers" className="mt-6">
            <div className="space-y-4">
              {content.offers.map(offer => (
                <Card 
                  key={offer.id}
                  style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div className="md:col-span-2">
                        <h3 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{offer.title}</h3>
                        <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>{offer.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-green-500 text-white">{offer.discount} OFF</Badge>
                          <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-heading" style={{ color: 'var(--gts-portal-text)' }}>{offer.views}</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Views</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-heading text-purple-400">{offer.leads}</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Leads</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="mt-6">
            <div className="space-y-4">
              {content.blog.map(post => (
                <Card 
                  key={post.id}
                  style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-2">
                        <h3 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{post.title}</h3>
                        <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>{post.description}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--gts-portal-muted)' }}>{post.author} • {post.date}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>{post.views}</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Views</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-red-400">{post.likes}</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Likes</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-blue-400">{post.comments}</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Comments</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* UGC Comments Tab */}
          <TabsContent value="ugc" className="mt-6">
            <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--gts-portal-text)' }}>User Comments & Reviews</CardTitle>
                <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                  Moderate user-generated content and reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ugcComments.map(comment => (
                    <div 
                      key={comment.id}
                      className="flex items-center justify-between p-4 rounded-lg"
                      style={{ backgroundColor: 'var(--gts-portal-card)' }}
                    >
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{comment.author}</h4>
                            <div className="flex items-center">
                              {Array.from({ length: comment.rating }).map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{comment.content}</p>
                          <p className="text-xs mt-1" style={{ color: 'var(--gts-portal-muted)' }}>{comment.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(comment.status)}>
                          {comment.status}
                        </Badge>
                        {comment.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-green-500 hover:bg-green-600">
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive">
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>SEO Overview</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Search engine optimization metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                        <div className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>78</div>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>SEO Score</p>
                      </div>
                      <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                        <div className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>156</div>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Keywords</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>Top Keywords</h4>
                      {["yacht rental sochi", "helicopter tours", "buggy adventures", "luxury boat rental", "aviation tours sochi"].map((keyword, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{keyword}</span>
                          <Badge variant="secondary" className="text-xs">#{index + 1}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Content Performance</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Traffic and engagement metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {allContent.slice(0, 5).map((item, index) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>{item.title}</p>
                          <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>{item.views} views</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="text-xs">
                            {item.leads || 0} leads
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}