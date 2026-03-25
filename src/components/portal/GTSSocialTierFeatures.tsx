import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { 
  Users, MessageCircle, Heart, Share2, Calendar, MapPin, Star,
  Plus, Search, Filter, Send, Bell, Settings, Crown, Award,
  Trophy, Camera, Video, Image, Gift, Sparkles, Clock,
  ThumbsUp, MessageSquareReply, Bookmark, Flag, MoreHorizontal,
  UserPlus, UserMinus, Eye, Edit, Trash2, ChevronRight
} from "lucide-react";

interface GTSSocialTierFeaturesProps {
  currentUser: {
    id: string;
    name: string;
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
    membershipId: string;
    avatar: string;
    joinDate: string;
    totalSpent: number;
  };
}

// Tier colors
const tierColors = {
  bronze: { bg: "#8C6239", text: "#FFFFFF", light: "#B8804D" },
  silver: { bg: "#C0C0C0", text: "#000000", light: "#D4D4D4" },
  gold: { bg: "#FFD700", text: "#000000", light: "#FFE55C" },
  platinum: { bg: "#E5E4E2", text: "#000000", light: "#F0EFED" }
};

interface SocialPost {
  id: string;
  author: {
    id: string;
    name: string;
    tier: string;
    avatar: string;
    membershipId: string;
  };
  content: string;
  images?: string[];
  video?: string;
  type: 'text' | 'experience' | 'review' | 'photo' | 'event';
  experienceData?: {
    service: string;
    rating: number;
    location: string;
    date: string;
    cost: number;
  };
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  tags: string[];
  visibility: 'public' | 'tier-only' | 'private';
}

interface TierMember {
  id: string;
  name: string;
  tier: string;
  avatar: string;
  membershipId: string;
  joinDate: string;
  totalSpent: number;
  lastSeen: string;
  isOnline: boolean;
  mutualConnections: number;
  commonInterests: string[];
  connectionStatus: 'none' | 'requested' | 'connected' | 'blocked';
}

interface SocialEvent {
  id: string;
  title: string;
  description: string;
  type: 'meetup' | 'exclusive' | 'experience' | 'celebration';
  organizer: {
    name: string;
    tier: string;
    avatar: string;
  };
  date: string;
  time: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  attendees: string[];
  tierRequirement: string;
  cost: number;
  tags: string[];
  images: string[];
  isAttending: boolean;
  waitingList: number;
}

// Mock social data
const mockPosts: SocialPost[] = [
  {
    id: "post-001",
    author: {
      id: "member-002",
      name: "Мария Козлова",
      tier: "gold",
      avatar: "МК",
      membershipId: "GTS-GLD-047"
    },
    content: "Потрясающий день на яхте! Команда GTS организовала все на высшем уровне. Рекомендую всем участникам Gold+ 🛥️✨",
    images: ["yacht1.jpg", "yacht2.jpg"],
    type: "experience",
    experienceData: {
      service: "Яхта Azimut 68S",
      rating: 5,
      location: "Марина Сочи",
      date: "2024-12-01",
      cost: 89000
    },
    createdAt: "2024-12-01T18:30:00Z",
    likes: 24,
    comments: 8,
    shares: 3,
    isLiked: true,
    isBookmarked: false,
    tags: ["яхта", "сочи", "отдых", "море"],
    visibility: "tier-only"
  },
  {
    id: "post-002",
    author: {
      id: "member-001",
      name: "Александр Петров",
      tier: "platinum",
      avatar: "АП",
      membershipId: "GTS-PLT-001"
    },
    content: "Хочу поделиться опытом вертолетной экскурсии над Красной Поляной. Виды невероятные! Для платиновых участников был персональный гид и шампанское на борту 🥂",
    type: "review",
    experienceData: {
      service: "Вертолетная экскурсия VIP",
      rating: 5,
      location: "Красная Поляна",
      date: "2024-11-28",
      cost: 125000
    },
    createdAt: "2024-11-28T20:15:00Z",
    likes: 42,
    comments: 15,
    shares: 7,
    isLiked: false,
    isBookmarked: true,
    tags: ["вертолет", "красная поляна", "vip", "экскурсия"],
    visibility: "public"
  },
  {
    id: "post-003",
    author: {
      id: "member-003",
      name: "Дмитрий Соколов",
      tier: "silver",
      avatar: "ДС",
      membershipId: "GTS-SLV-128"
    },
    content: "Организуем встречу участников Silver уровня! Давайте обсудим опыт и поделимся впечатлениями за бокалом хорошего вина 🍷",
    type: "event",
    createdAt: "2024-11-25T16:45:00Z",
    likes: 18,
    comments: 12,
    shares: 2,
    isLiked: false,
    isBookmarked: false,
    tags: ["встреча", "silver", "сочи", "networking"],
    visibility: "tier-only"
  }
];

const mockMembers: TierMember[] = [
  {
    id: "member-001",
    name: "Александр Петров",
    tier: "platinum",
    avatar: "АП",
    membershipId: "GTS-PLT-001",
    joinDate: "2022-03-15",
    totalSpent: 2850000,
    lastSeen: "Онлайн",
    isOnline: true,
    mutualConnections: 12,
    commonInterests: ["яхты", "вертолеты", "gourmet"],
    connectionStatus: "connected"
  },
  {
    id: "member-002",
    name: "Мария Козлова",
    tier: "gold",
    avatar: "МК",
    membershipId: "GTS-GLD-047",
    joinDate: "2022-07-20",
    totalSpent: 1250000,
    lastSeen: "2 часа назад",
    isOnline: false,
    mutualConnections: 8,
    commonInterests: ["яхты", "события", "фото"],
    connectionStatus: "connected"
  },
  {
    id: "member-004",
    name: "Елена Романова",
    tier: "bronze",
    avatar: "ЕР",
    membershipId: "GTS-BRZ-256",
    joinDate: "2023-09-05",
    totalSpent: 185000,
    lastSeen: "Вчера",
    isOnline: false,
    mutualConnections: 3,
    commonInterests: ["активный отдых", "природа"],
    connectionStatus: "none"
  }
];

const mockEvents: SocialEvent[] = [
  {
    id: "event-001",
    title: "Эксклюзивная встреча Gold+ участников",
    description: "Закрытое мероприятие для участников Gold и Platinum уровней с дегустацией премиальных вин и networking",
    type: "exclusive",
    organizer: {
      name: "GTS Events Team",
      tier: "admin",
      avatar: "GTS"
    },
    date: "2024-12-20",
    time: "19:00",
    location: "Яхт-клуб Сочи",
    maxAttendees: 30,
    currentAttendees: 18,
    attendees: ["member-001", "member-002"],
    tierRequirement: "gold",
    cost: 0,
    tags: ["networking", "wine", "exclusive"],
    images: ["event1.jpg"],
    isAttending: true,
    waitingList: 2
  },
  {
    id: "event-002",
    title: "Совместная морская прогулка",
    description: "Приглашаем всех участников на совместную прогулку на катамаране с барбекю и активностями",
    type: "experience",
    organizer: {
      name: "Дмитрий Соколов",
      tier: "silver",
      avatar: "ДС"
    },
    date: "2024-12-25",
    time: "11:00",
    location: "Марина Сочи",
    maxAttendees: 16,
    currentAttendees: 9,
    attendees: ["member-003", "member-004"],
    tierRequirement: "bronze",
    cost: 15000,
    tags: ["море", "катамаран", "барбекю", "активности"],
    images: ["catamaran.jpg"],
    isAttending: false,
    waitingList: 0
  }
];

export function GTSSocialTierFeatures({ currentUser }: GTSSocialTierFeaturesProps) {
  const [activeTab, setActiveTab] = useState("feed");
  const [posts, setPosts] = useState<SocialPost[]>(mockPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");

  const getTierName = (tier: string) => {
    const names = {
      bronze: "Бронза",
      silver: "Серебро",
      gold: "Золото", 
      platinum: "Платина"
    };
    return names[tier as keyof typeof names] || tier;
  };

  const getTierIcon = (tier: string) => {
    const icons = {
      bronze: Award,
      silver: Star,
      gold: Trophy,
      platinum: Crown
    };
    const IconComponent = icons[tier as keyof typeof icons] || Award;
    return <IconComponent className="h-4 w-4" style={{ color: tierColors[tier as keyof typeof tierColors]?.bg }} />;
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          }
        : post
    ));
  };

  const handleBookmarkPost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost: SocialPost = {
        id: `post-${Date.now()}`,
        author: {
          id: currentUser.id,
          name: currentUser.name,
          tier: currentUser.tier,
          avatar: currentUser.avatar,
          membershipId: currentUser.membershipId
        },
        content: newPostContent,
        type: "text",
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isBookmarked: false,
        tags: [],
        visibility: "tier-only"
      };
      setPosts(prev => [newPost, ...prev]);
      setNewPostContent("");
      setShowNewPostDialog(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Только что';
    if (diffInHours < 24) return `${diffInHours}ч назад`;
    return `${Math.floor(diffInHours / 24)}д назад`;
  };

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === "all" || member.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="bg-[#121214] border-[#232428] mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading text-white mb-2">
                  Социальные функции ClientClub
                </h1>
                <p className="text-[#A6A7AA]">
                  Общение и networking для участников {getTierName(currentUser.tier)} уровня
                </p>
              </div>
              <div className="flex items-center gap-3">
                {getTierIcon(currentUser.tier)}
                <Badge 
                  style={{ 
                    backgroundColor: tierColors[currentUser.tier].bg, 
                    color: tierColors[currentUser.tier].text 
                  }}
                >
                  {getTierName(currentUser.tier)} Member
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-[#121214] border-[#232428] mb-6">
            <TabsTrigger value="feed" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              Лента
            </TabsTrigger>
            <TabsTrigger value="members" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Участники
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              События
            </TabsTrigger>
            <TabsTrigger value="groups" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              <Sparkles className="h-4 w-4 mr-2" />
              Группы по интересам
            </TabsTrigger>
          </TabsList>

          {/* Social Feed Tab */}
          <TabsContent value="feed">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Create Post Card */}
                <Card className="bg-[#121214] border-[#232428]">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#232428] text-white">
                          {currentUser.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full border-[#232428] text-[#A6A7AA] hover:bg-[#17181A] justify-start"
                          onClick={() => setShowNewPostDialog(true)}
                        >
                          Поделиться опытом с {getTierName(currentUser.tier)} участниками...
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#232428]">
                      <Button size="sm" variant="ghost" className="text-[#A6A7AA] hover:text-white hover:bg-[#17181A]">
                        <Camera className="h-4 w-4 mr-2" />
                        Фото
                      </Button>
                      <Button size="sm" variant="ghost" className="text-[#A6A7AA] hover:text-white hover:bg-[#17181A]">
                        <Video className="h-4 w-4 mr-2" />
                        Видео
                      </Button>
                      <Button size="sm" variant="ghost" className="text-[#A6A7AA] hover:text-white hover:bg-[#17181A]">
                        <Star className="h-4 w-4 mr-2" />
                        Отзыв
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts Feed */}
                {posts.map(post => (
                  <Card key={post.id} className="bg-[#121214] border-[#232428]">
                    <CardContent className="p-4">
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-[#232428] text-white">
                              {post.author.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-white">{post.author.name}</h4>
                              {getTierIcon(post.author.tier)}
                              <Badge 
                                className="text-xs"
                                style={{ 
                                  backgroundColor: tierColors[post.author.tier as keyof typeof tierColors]?.bg + '20',
                                  color: tierColors[post.author.tier as keyof typeof tierColors]?.bg 
                                }}
                              >
                                {getTierName(post.author.tier)}
                              </Badge>
                            </div>
                            <p className="text-xs text-[#A6A7AA]">
                              {formatTimeAgo(post.createdAt)} • {post.author.membershipId}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-[#A6A7AA] hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <p className="text-white mb-3">{post.content}</p>
                        
                        {/* Experience Data */}
                        {post.experienceData && (
                          <Card className="bg-[#17181A] border-[#232428]">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-white">{post.experienceData.service}</h5>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${
                                        i < post.experienceData!.rating ? 'text-yellow-400 fill-current' : 'text-[#A6A7AA]'
                                      }`} 
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm text-[#A6A7AA]">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {post.experienceData.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {post.experienceData.date}
                                </div>
                              </div>
                              <div className="text-right mt-2">
                                <span className="text-green-400 font-medium">
                                  {formatCurrency(post.experienceData.cost)}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* Tags */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} className="text-xs bg-[#232428] text-[#A6A7AA] hover:bg-[#2A2B30]">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#232428]">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`${post.isLiked ? 'text-red-400' : 'text-[#A6A7AA]'} hover:text-red-400`}
                            onClick={() => handleLikePost(post.id)}
                          >
                            <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                            {post.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#A6A7AA] hover:text-white"
                            onClick={() => {
                              setSelectedPost(post);
                              setShowPostDetail(true);
                            }}
                          >
                            <MessageSquareReply className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-[#A6A7AA] hover:text-white">
                            <Share2 className="h-4 w-4 mr-1" />
                            {post.shares}
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`${post.isBookmarked ? 'text-yellow-400' : 'text-[#A6A7AA]'} hover:text-yellow-400`}
                          onClick={() => handleBookmarkPost(post.id)}
                        >
                          <Bookmark className={`h-4 w-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Tier Statistics */}
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Статистика уровня</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#A6A7AA]">Участников {getTierName(currentUser.tier)}:</span>
                      <span className="text-white">247</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#A6A7AA]">Онлайн сейчас:</span>
                      <span className="text-green-400">34</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#A6A7AA]">Постов сегодня:</span>
                      <span className="text-white">12</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#A6A7AA]">Событий на неделе:</span>
                      <span className="text-blue-400">5</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Популярные темы</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {['#яхты', '#вертолеты', '#роскошь', '#сочи', '#отдых'].map((tag, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white text-sm">{tag}</span>
                        <span className="text-xs text-[#A6A7AA]">{Math.floor(Math.random() * 50) + 10} постов</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Быстрые действия</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button size="sm" className="w-full bg-[#91040C] hover:bg-[#91040C]/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Создать событие
                    </Button>
                    <Button size="sm" variant="outline" className="w-full border-[#232428] text-white hover:bg-[#17181A]">
                      <Users className="h-4 w-4 mr-2" />
                      Найти друзей
                    </Button>
                    <Button size="sm" variant="outline" className="w-full border-[#232428] text-white hover:bg-[#17181A]">
                      <Bell className="h-4 w-4 mr-2" />
                      Настройки уведомлений
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <CardTitle className="text-white">Участники вашего уровня</CardTitle>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
                          <Input 
                            placeholder="Поиск участников..." 
                            className="pl-10 bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA] w-full sm:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredMembers.map(member => (
                        <Card key={member.id} className="bg-[#17181A] border-[#232428]">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <Avatar className="h-12 w-12">
                                    <AvatarFallback className="bg-[#232428] text-white">
                                      {member.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  {member.isOnline && (
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#17181A]"></div>
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-white">{member.name}</h4>
                                    {getTierIcon(member.tier)}
                                  </div>
                                  <p className="text-sm text-[#A6A7AA]">{member.membershipId}</p>
                                  <div className="flex items-center gap-4 text-xs text-[#A6A7AA] mt-1">
                                    <span>Участник с {new Date(member.joinDate).getFullYear()}</span>
                                    <span>{member.mutualConnections} общих знакомых</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-[#A6A7AA] mb-2">{member.lastSeen}</p>
                                {member.connectionStatus === 'none' && (
                                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                                    <UserPlus className="h-4 w-4 mr-1" />
                                    Подключиться
                                  </Button>
                                )}
                                {member.connectionStatus === 'connected' && (
                                  <Button size="sm" variant="outline" className="border-green-500 text-green-400">
                                    <Users className="h-4 w-4 mr-1" />
                                    Подключены
                                  </Button>
                                )}
                                {member.connectionStatus === 'requested' && (
                                  <Button size="sm" variant="outline" className="border-yellow-500 text-yellow-400">
                                    <Clock className="h-4 w-4 mr-1" />
                                    Запрос отправлен
                                  </Button>
                                )}
                              </div>
                            </div>
                            {member.commonInterests.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-[#232428]">
                                <p className="text-xs text-[#A6A7AA] mb-1">Общие интересы:</p>
                                <div className="flex flex-wrap gap-1">
                                  {member.commonInterests.map((interest, index) => (
                                    <Badge key={index} className="text-xs bg-[#232428] text-[#A6A7AA]">
                                      {interest}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="space-y-6">
              {mockEvents.map(event => (
                <Card key={event.id} className="bg-[#121214] border-[#232428]">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-heading text-white">{event.title}</h3>
                          <Badge 
                            className={`${
                              event.type === 'exclusive' ? 'bg-purple-500/10 text-purple-400' :
                              event.type === 'experience' ? 'bg-blue-500/10 text-blue-400' :
                              event.type === 'meetup' ? 'bg-green-500/10 text-green-400' :
                              'bg-yellow-500/10 text-yellow-400'
                            }`}
                          >
                            {event.type === 'exclusive' ? 'Эксклюзивное' :
                             event.type === 'experience' ? 'Опыт' :
                             event.type === 'meetup' ? 'Встреча' : 'Празднование'}
                          </Badge>
                        </div>
                        <p className="text-[#A6A7AA] mb-3">{event.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-[#A6A7AA]" />
                            <span className="text-white">{event.date} в {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#A6A7AA]" />
                            <span className="text-white">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-[#A6A7AA]" />
                            <span className="text-white">{event.currentAttendees}/{event.maxAttendees} участников</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTierIcon(event.tierRequirement)}
                            <span className="text-white">{getTierName(event.tierRequirement)}+</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {event.cost > 0 ? (
                          <p className="text-lg font-heading text-white mb-2">{formatCurrency(event.cost)}</p>
                        ) : (
                          <p className="text-lg font-heading text-green-400 mb-2">Бесплатно</p>
                        )}
                        {event.isAttending ? (
                          <Button className="bg-green-500 hover:bg-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Участвую
                          </Button>
                        ) : event.currentAttendees >= event.maxAttendees ? (
                          <Button variant="outline" className="border-yellow-500 text-yellow-400">
                            <Clock className="h-4 w-4 mr-2" />
                            Лист ожидания
                          </Button>
                        ) : (
                          <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                            <Plus className="h-4 w-4 mr-2" />
                            Присоединиться
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {event.tags.map((tag, index) => (
                          <Badge key={index} className="text-xs bg-[#232428] text-[#A6A7AA]">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Interest Groups Tab */}
          <TabsContent value="groups">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Любители яхт', members: 89, posts: 156, icon: '⛵', color: 'bg-blue-500' },
                { name: 'VIP автомобили', members: 67, posts: 134, icon: '🏎️', color: 'bg-red-500' },
                { name: 'Вертолетные туры', members: 45, posts: 89, icon: '🚁', color: 'bg-green-500' },
                { name: 'Гурманы', members: 123, posts: 234, icon: '🍷', color: 'bg-purple-500' },
                { name: 'Фотография', members: 78, posts: 345, icon: '📸', color: 'bg-yellow-500' },
                { name: 'Путешествия', members: 156, posts: 456, icon: '✈️', color: 'bg-indigo-500' }
              ].map((group, index) => (
                <Card key={index} className="bg-[#121214] border-[#232428]">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-full ${group.color} flex items-center justify-center mx-auto mb-3`}>
                        <span className="text-2xl">{group.icon}</span>
                      </div>
                      <h3 className="font-heading text-white mb-2">{group.name}</h3>
                      <div className="flex items-center justify-center gap-4 text-sm text-[#A6A7AA] mb-4">
                        <span>{group.members} участников</span>
                        <span>{group.posts} постов</span>
                      </div>
                      <Button size="sm" className="bg-[#91040C] hover:bg-[#91040C]/90">
                        Присоединиться
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Post Dialog */}
      <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
        <DialogContent className="bg-[#0B0B0C] border-[#232428] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">Создать пост</DialogTitle>
            <DialogDescription className="text-[#A6A7AA]">
              Поделитесь опытом с участниками {getTierName(currentUser.tier)} уровня
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Что хотите рассказать?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA] min-h-[120px]"
            />
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowNewPostDialog(false)}
                className="border-[#232428] text-white hover:bg-[#17181A]"
              >
                Отмена
              </Button>
              <Button onClick={handleCreatePost} className="bg-[#91040C] hover:bg-[#91040C]/90">
                <Send className="h-4 w-4 mr-2" />
                Опубликовать
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}