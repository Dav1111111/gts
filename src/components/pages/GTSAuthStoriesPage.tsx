import { useState } from "react";
import { motion } from "motion/react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useGTSAuth } from "../../contexts/GTSAuthContext";
import { Route } from "../GTSRouter";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Send,
  Image as ImageIcon,
  Video,
  MapPin,
  Calendar,
  TrendingUp,
  Plus
} from "lucide-react";

interface Story {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  category: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

interface Comment {
  id: string;
  storyId: string;
  author: {
    name: string;
    avatar: string;
  };
  text: string;
  date: string;
  likes: number;
}

interface GTSAuthStoriesPageProps {
  onNavigate: (route: Route) => void;
  initialFilter?: string;
}

const mockStories: Story[] = [
  {
    id: "yacht-adventure",
    title: "Незабываемый закат на яхте",
    excerpt: "Вчера испытали невероятные эмоции на прогулке вдоль побережья. Профессиональная команда, идеальный сервис!",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHN1bnNldCUyMHNhaWxpbmd8ZW58MXx8fHwxNzYxNTA0NTY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Екатерина Волкова",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      role: "Gold Member"
    },
    date: "2024-10-25",
    category: "sea",
    likes: 247,
    comments: 38
  },
  {
    id: "buggy-mountains",
    title: "Экстрим в горах Красной Поляны",
    excerpt: "Багги-экспедиция превзошла все ожидания! Адреналин, захватывающие виды и отличная компания.",
    image: "https://images.unsplash.com/photo-1742141475441-f4bc74903776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWdneSUyMG9mZi1yb2FkJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2MTUwNDU2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Дмитрий Соколов",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      role: "Platinum Member"
    },
    date: "2024-10-24",
    category: "adventure",
    likes: 189,
    comments: 27
  },
  {
    id: "helicopter-peaks",
    title: "Полет над вершинами Кавказа",
    excerpt: "Вертолетная экскурсия - это нечто особенное! Виды, от которых захватывает дух.",
    image: "https://images.unsplash.com/photo-1630866217872-764be80838fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoZWxpY29wdGVyJTIwYXZpYXRpb24lMjBhZXJpYWx8ZW58MXx8fHwxNzYxNTAwNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Александр Петров",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      role: "Gold Member"
    },
    date: "2024-10-23",
    category: "premium",
    likes: 312,
    comments: 45
  }
];

const mockComments: Comment[] = [
  {
    id: "c1",
    storyId: "yacht-adventure",
    author: {
      name: "Анна Смирнова",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    text: "Потрясающе! Тоже хочу попробовать!",
    date: "2024-10-25",
    likes: 12
  }
];

export function GTSAuthStoriesPage({ onNavigate, initialFilter = "all" }: GTSAuthStoriesPageProps) {
  const { user } = useGTSAuth();
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", text: "" });

  const toggleLike = (storyId: string) => {
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { 
            ...story, 
            isLiked: !story.isLiked,
            likes: story.isLiked ? story.likes - 1 : story.likes + 1
          }
        : story
    ));
  };

  const toggleSave = (storyId: string) => {
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { ...story, isSaved: !story.isSaved }
        : story
    ));
  };

  const addComment = (storyId: string) => {
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      storyId,
      author: {
        name: user.name,
        avatar: user.avatar || ""
      },
      text: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };

    setComments(prev => [...prev, comment]);
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { ...story, comments: story.comments + 1 }
        : story
    ));
    setNewComment("");
  };

  const publishPost = () => {
    if (!newPost.title.trim() || !newPost.text.trim() || !user) return;

    const post: Story = {
      id: `story-${Date.now()}`,
      title: newPost.title,
      excerpt: newPost.text,
      image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1080&h=720&fit=crop",
      author: {
        name: user.name,
        avatar: user.avatar || "",
        role: user.membershipTier ? `${user.membershipTier} Member` : "Member"
      },
      date: new Date().toISOString().split('T')[0],
      category: "community",
      likes: 0,
      comments: 0
    };

    setStories(prev => [post, ...prev]);
    setNewPost({ title: "", text: "" });
    setShowNewPost(false);
  };

  const filters = [
    { id: "all", name: "Все истории" },
    { id: "sea", name: "Морские" },
    { id: "adventure", name: "Приключения" },
    { id: "premium", name: "Premium" },
    { id: "community", name: "Сообщество" }
  ];

  const filteredStories = activeFilter === "all" 
    ? stories 
    : stories.filter(s => s.category === activeFilter);

  const canPublish = user?.permissions.includes("comment") || user?.role === "member";

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      <GTSNavigationHeader onNavigate={onNavigate} />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-24 bg-gradient-to-b from-black to-[#0B0B0C]">
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#91040C] text-white border-0 mb-4">
              {user?.name}
            </Badge>
            <h1 className="text-4xl lg:text-7xl text-white mb-6 tracking-wider">
              ИСТОРИИ КЛУБА
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Делитесь впечатлениями и вдохновляйте других
            </p>
          </motion.div>
        </div>
      </section>

      <main className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          
          {/* Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter.id)}
                  className={
                    activeFilter === filter.id
                      ? "bg-[#91040C] hover:bg-[#91040C]/90 text-white border-0"
                      : "text-white border-white/20 hover:border-[#91040C] hover:text-[#91040C]"
                  }
                >
                  {filter.name}
                </Button>
              ))}
            </div>

            {canPublish && (
              <Button
                onClick={() => setShowNewPost(!showNewPost)}
                className="bg-[#91040C] hover:bg-[#91040C]/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Поделиться историей
              </Button>
            )}
          </div>

          {/* New Post Form */}
          {showNewPost && canPublish && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-12"
            >
              <Card className="bg-[#121214] border-white/10 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={user?.avatar || ""}
                      alt={user?.name || ""}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Заголовок истории..."
                      value={newPost.title}
                      onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-transparent text-white text-2xl border-none outline-none mb-4 placeholder:text-white/40"
                    />
                    <Textarea
                      placeholder="Расскажите о своих впечатлениях..."
                      value={newPost.text}
                      onChange={(e) => setNewPost(prev => ({ ...prev, text: e.target.value }))}
                      className="w-full bg-[#17181A] text-white border-white/10 min-h-[120px] resize-none"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Фото
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                      <Video className="w-4 h-4 mr-2" />
                      Видео
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                      <MapPin className="w-4 h-4 mr-2" />
                      Локация
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost"
                      onClick={() => {
                        setShowNewPost(false);
                        setNewPost({ title: "", text: "" });
                      }}
                      className="text-white/60 hover:text-white"
                    >
                      Отмена
                    </Button>
                    <Button
                      onClick={publishPost}
                      disabled={!newPost.title.trim() || !newPost.text.trim()}
                      className="bg-[#91040C] hover:bg-[#91040C]/90 text-white"
                    >
                      Опубликовать
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Stories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-[#121214] border-white/10 overflow-hidden hover:border-[#91040C]/50 transition-all duration-300">
                  {/* Image */}
                  <div 
                    className="relative aspect-[16/9] overflow-hidden cursor-pointer group"
                    onClick={() => onNavigate({ page: "story-detail", id: story.id })}
                  >
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Save Button */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`absolute top-3 right-3 backdrop-blur-sm ${
                        story.isSaved 
                          ? "bg-[#91040C] text-white hover:bg-[#91040C]/90" 
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(story.id);
                      }}
                    >
                      <Bookmark className={`w-4 h-4 ${story.isSaved ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  <div className="p-6">
                    {/* Author */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={story.author.avatar}
                          alt={story.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white">{story.author.name}</p>
                        <p className="text-white/40 text-sm">{story.author.role}</p>
                      </div>
                      <div className="ml-auto flex items-center text-white/40 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(story.date).toLocaleDateString('ru-RU')}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 
                      className="text-white text-2xl mb-3 cursor-pointer hover:text-[#91040C] transition-colors"
                      onClick={() => onNavigate({ page: "story-detail", id: story.id })}
                    >
                      {story.title}
                    </h3>
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {story.excerpt}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-6 mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(story.id)}
                        className={`${
                          story.isLiked 
                            ? "text-[#91040C] hover:text-[#91040C]/80" 
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        <Heart className={`w-5 h-5 mr-2 ${story.isLiked ? "fill-current" : ""}`} />
                        {story.likes}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedStory(selectedStory === story.id ? null : story.id)}
                        className="text-white/60 hover:text-white"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        {story.comments}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/60 hover:text-white"
                      >
                        <Share2 className="w-5 h-5 mr-2" />
                        Поделиться
                      </Button>
                    </div>

                    {/* Comments Section */}
                    {selectedStory === story.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="border-t border-white/10 pt-4"
                      >
                        {/* Existing Comments */}
                        <div className="space-y-4 mb-4">
                          {comments
                            .filter(c => c.storyId === story.id)
                            .map(comment => (
                              <div key={comment.id} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                  <ImageWithFallback
                                    src={comment.author.avatar}
                                    alt={comment.author.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="text-white text-sm mb-1">{comment.author.name}</p>
                                  <p className="text-white/70 text-sm">{comment.text}</p>
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* New Comment */}
                        {user?.permissions.includes("comment") && (
                          <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                              <ImageWithFallback
                                src={user.avatar || ""}
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 flex gap-2">
                              <input
                                type="text"
                                placeholder="Написать комментарий..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    addComment(story.id);
                                  }
                                }}
                                className="flex-1 bg-[#17181A] text-white border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-[#91040C]"
                              />
                              <Button
                                size="sm"
                                onClick={() => addComment(story.id)}
                                disabled={!newComment.trim()}
                                className="bg-[#91040C] hover:bg-[#91040C]/90 text-white"
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
