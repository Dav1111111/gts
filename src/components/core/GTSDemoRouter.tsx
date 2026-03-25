// 🎯 GTS Demo Router - AI-Friendly Navigation System
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Users, 
  Building2, 
  Crown, 
  Briefcase, 
  Bot, 
  Calendar,
  DollarSign,
  Settings,
  BarChart3,
  MessageSquare,
  FileText,
  Shield
} from "lucide-react";
// ✅ Mock AI helper to avoid import errors during build
const AINavigationHelper = {
  getActiveComponents: () => [
    { id: 'executive', name: 'Executive Panel' },
    { id: 'crm', name: 'CRM System' },
    { id: 'finance', name: 'Finance Center' }
  ],
  getTempComponents: () => [
    { id: 'temp1', name: 'Temp Component 1' }
  ]
};

// ✅ Mock data для FEATURE_ROADMAP во время миграции
const FEATURE_ROADMAP = {
  executive: ['dashboard', 'crm', 'finance'],
  portals: ['client', 'partner', 'b2b'],
  ai: ['assistant', 'content'],
  mobile: ['crew'],
  system: ['booking', 'iam']
};

interface DemoRoute {
  id: string;
  name: string;
  description: string;
  category: 'executive' | 'portals' | 'ai' | 'mobile' | 'system';
  icon: React.ComponentType<{ className?: string }>;
  status: 'ready' | 'beta' | 'coming-soon';
  aiKeywords: string[];
  demoData?: any;
}

const DEMO_ROUTES: DemoRoute[] = [
  // 🎯 EXECUTIVE FEATURES
  {
    id: 'executive-panel',
    name: 'Executive Dashboard',
    description: 'Complete executive control panel with all 19 modules',
    category: 'executive',
    icon: BarChart3,
    status: 'ready',
    aiKeywords: ['executive', 'dashboard', 'main', 'admin', 'control'],
  },
  
  {
    id: 'crm-system',
    name: 'CRM System',
    description: 'Customer relationship management with AI insights',
    category: 'executive',
    icon: Users,
    status: 'ready',
    aiKeywords: ['crm', 'customers', 'leads', 'sales', 'pipeline'],
  },

  {
    id: 'finance-system',
    name: 'Finance Center',
    description: 'Financial management and revenue analytics',
    category: 'executive',
    icon: DollarSign,
    status: 'ready',
    aiKeywords: ['finance', 'revenue', 'accounting', 'payments'],
  },

  // 🏢 PORTALS
  {
    id: 'client-club',
    name: 'Client Club Portal',
    description: 'Premium client experience with loyalty features',
    category: 'portals',
    icon: Crown,
    status: 'ready',
    aiKeywords: ['client', 'club', 'premium', 'vip', 'loyalty'],
  },

  {
    id: 'partner-portal',
    name: 'Partner Portal',
    description: 'Unified partner management system',
    category: 'portals',
    icon: Building2,
    status: 'ready',
    aiKeywords: ['partner', 'portal', 'management', 'collaboration'],
  },

  {
    id: 'b2b-portal',
    name: 'B2B Client Portal',
    description: 'Business client management interface',
    category: 'portals',
    icon: Briefcase,
    status: 'ready',
    aiKeywords: ['b2b', 'business', 'corporate', 'client'],
  },

  // 🤖 AI MODULES
  {
    id: 'ai-assistant',
    name: 'Global AI Assistant',
    description: 'AI-powered assistant for all operations',
    category: 'ai',
    icon: Bot,
    status: 'beta',
    aiKeywords: ['ai', 'assistant', 'chatbot', 'automation'],
  },

  {
    id: 'ai-content',
    name: 'AI Content Generator',
    description: 'Automated content creation system',
    category: 'ai',
    icon: FileText,
    status: 'beta',
    aiKeywords: ['ai', 'content', 'generation', 'writing'],
  },

  // 📱 MOBILE & SYSTEM
  {
    id: 'crew-app',
    name: 'Crew Mobile App',
    description: 'Mobile interface for crew management',
    category: 'mobile',
    icon: Users,
    status: 'ready',
    aiKeywords: ['crew', 'mobile', 'staff', 'operations'],
  },

  {
    id: 'booking-system',
    name: 'Booking Calendar',
    description: 'Global booking and scheduling system',
    category: 'system',
    icon: Calendar,
    status: 'ready',
    aiKeywords: ['booking', 'calendar', 'schedule', 'reservations'],
  },

  {
    id: 'iam-system',
    name: 'Access Management',
    description: 'Identity and access management system',
    category: 'system',
    icon: Shield,
    status: 'ready',
    aiKeywords: ['iam', 'access', 'security', 'roles', 'permissions'],
  }
];

interface GTSDemoRouterProps {
  onNavigateToDemo: (demoId: string) => void;
  currentDemo?: string;
}

export function GTSDemoRouter({ onNavigateToDemo, currentDemo }: GTSDemoRouterProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  // AI-powered search
  const filteredRoutes = React.useMemo(() => {
    let routes = DEMO_ROUTES;

    // Filter by search query using AI keywords
    if (searchQuery) {
      routes = routes.filter(route =>
        route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.aiKeywords.some(keyword => 
          keyword.includes(searchQuery.toLowerCase()) ||
          searchQuery.toLowerCase().includes(keyword)
        )
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      routes = routes.filter(route => route.category === selectedCategory);
    }

    return routes;
  }, [searchQuery, selectedCategory]);

  const categories = [
    { id: 'all', name: 'All Demos', count: DEMO_ROUTES.length },
    { id: 'executive', name: 'Executive', count: DEMO_ROUTES.filter(r => r.category === 'executive').length },
    { id: 'portals', name: 'Portals', count: DEMO_ROUTES.filter(r => r.category === 'portals').length },
    { id: 'ai', name: 'AI Modules', count: DEMO_ROUTES.filter(r => r.category === 'ai').length },
    { id: 'mobile', name: 'Mobile', count: DEMO_ROUTES.filter(r => r.category === 'mobile').length },
    { id: 'system', name: 'System', count: DEMO_ROUTES.filter(r => r.category === 'system').length },
  ];

  const getStatusBadgeColor = (status: DemoRoute['status']) => {
    switch (status) {
      case 'ready': return 'bg-green-500 text-white';
      case 'beta': return 'bg-yellow-500 text-black';
      case 'coming-soon': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white p-6 dark">
      <div className="max-w-7xl mx-auto">
        {/* 🎯 Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">GTS Demo Center</h1>
          <p className="text-[#A6A7AA]">
            Explore all components and features of the GTS platform
          </p>
        </div>

        {/* 🔍 Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search demos by keywords (e.g. 'crm', 'partner', 'ai')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-[#17181A] border border-[#232428] text-white placeholder-[#A6A7AA] rounded-lg focus:ring-2 focus:ring-[#91040C] focus:border-[#91040C] focus:outline-none"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.name}
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* 🎪 Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => {
            const IconComponent = route.icon;
            const isActive = currentDemo === route.id;

            return (
              <Card 
                key={route.id} 
                className={`bg-[#121214] border border-[#232428] hover:border-[#91040C] hover:shadow-lg transition-all duration-200 ${
                  isActive ? 'ring-2 ring-[#91040C] border-[#91040C]' : ''
                }`}
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#91040C]/10 rounded-lg">
                        <IconComponent className="w-5 h-5 text-[#91040C]" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{route.name}</CardTitle>
                        <Badge 
                          className={`text-xs ${getStatusBadgeColor(route.status)} mt-1`}
                        >
                          {route.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <CardDescription className="text-sm leading-relaxed text-[#A6A7AA]">
                    {route.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {/* AI Keywords */}
                    <div className="flex flex-wrap gap-1">
                      {route.aiKeywords.slice(0, 4).map((keyword) => (
                        <Badge 
                          key={keyword} 
                          variant="outline" 
                          className="text-xs"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => onNavigateToDemo(route.id)}
                      className="w-full"
                      variant={isActive ? "secondary" : "default"}
                      disabled={route.status === 'coming-soon'}
                    >
                      {isActive ? 'Currently Active' : route.status === 'coming-soon' ? 'Coming Soon' : 'Open Demo'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 📊 AI Navigation Stats */}
        <div className="mt-12 p-6 bg-[#121214] rounded-lg border border-[#232428]">
          <h3 className="text-lg font-semibold mb-4 text-white">AI Navigation Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-2xl font-bold text-[#91040C]">
                {AINavigationHelper.getActiveComponents().length}
              </div>
              <div className="text-[#A6A7AA]">Active Components</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-500">
                {AINavigationHelper.getTempComponents().length}
              </div>
              <div className="text-[#A6A7AA]">Temp Files</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {Object.keys(FEATURE_ROADMAP).length}
              </div>
              <div className="text-[#A6A7AA]">Feature Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">
                {filteredRoutes.length}
              </div>
              <div className="text-[#A6A7AA]">Available Demos</div>
            </div>
          </div>
        </div>

        {/* 🎨 Search Results Info */}
        {searchQuery && (
          <div className="mt-4 p-4 bg-[#91040C]/10 rounded-lg border border-[#91040C]/20">
            <p className="text-sm text-white">
              Found <strong>{filteredRoutes.length}</strong> demos matching "<strong>{searchQuery}</strong>"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GTSDemoRouter;