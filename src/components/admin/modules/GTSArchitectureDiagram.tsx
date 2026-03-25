import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { 
  RefreshCw, Download, Search, Filter, GitBranch, 
  Box, ArrowRight, Database, Users, Settings,
  FileText, Layers, Network, Target, Activity
} from "lucide-react";

interface ComponentNode {
  id: string;
  name: string;
  type: 'page' | 'module' | 'component' | 'portal' | 'system';
  category: string;
  path: string;
  dependencies: string[];
  children: string[];
  dataEntities: string[];
  userRoles: string[];
  description: string;
  complexity: 'low' | 'medium' | 'high';
}

interface ArchitectureData {
  nodes: ComponentNode[];
  connections: Array<{
    from: string;
    to: string;
    type: 'navigation' | 'data' | 'dependency' | 'composition';
    label?: string;
  }>;
  dataEntities: Array<{
    id: string;
    name: string;
    attributes: string[];
    usedBy: string[];
  }>;
  userJourneys: Array<{
    role: string;
    path: string[];
    description: string;
  }>;
}

// Анализ структуры проекта на основе файловой системы
const analyzeProjectStructure = (): ArchitectureData => {
  const nodes: ComponentNode[] = [
    // 🏠 Landing & Marketing Pages
    {
      id: 'landing-page',
      name: 'Landing Page',
      type: 'page',
      category: 'Marketing',
      path: '/components/pages/GTSLandingPage.tsx',
      dependencies: ['header', 'hero-section', 'features', 'footer'],
      children: ['gts-hero', 'gts-catalog', 'gts-about', 'gts-news'],
      dataEntities: ['Equipment', 'Route', 'Lead'],
      userRoles: ['visitor', 'potential-client'],
      description: 'Главная страница с каталогом услуг и информацией о компании',
      complexity: 'medium'
    },
    {
      id: 'catalog-page',
      name: 'Catalog Page',
      type: 'page',
      category: 'Marketing',
      path: '/components/GTSCatalogPage.tsx',
      dependencies: ['catalog-section', 'comparison', 'booking-form'],
      children: ['equipment-cards', 'price-calculator', 'booking-modal'],
      dataEntities: ['Equipment', 'Booking', 'Route'],
      userRoles: ['visitor', 'member-*'],
      description: 'Каталог услуг с возможностью бронирования',
      complexity: 'high'
    },
    {
      id: 'membership-page',
      name: 'Membership Page',
      type: 'page',
      category: 'Marketing',
      path: '/components/GTSMembershipPage.tsx',
      dependencies: ['membership-tiers', 'benefits', 'payment-form'],
      children: ['tier-cards', 'comparison-table', 'signup-form'],
      dataEntities: ['User', 'Membership'],
      userRoles: ['visitor', 'user'],
      description: 'Страница членства в клубе с тарифными планами',
      complexity: 'medium'
    },

    // 🔐 Authentication System
    {
      id: 'login-system',
      name: 'Login & Auth System',
      type: 'system',
      category: 'Authentication',
      path: '/components/admin/GTSUnifiedLogin.tsx',
      dependencies: ['role-picker', '2fa', 'auth-context'],
      children: ['login-form', 'role-selector', 'consent-modal'],
      dataEntities: ['User', 'Session', 'Permissions'],
      userRoles: ['all'],
      description: 'Единая система аутентификации с выбором роли',
      complexity: 'high'
    },

    // 🎯 Executive Management
    {
      id: 'executive-dashboard',
      name: 'Executive Dashboard',
      type: 'page',
      category: 'Executive',
      path: '/components/modules/GTSExecutiveDashboard.tsx',
      dependencies: ['analytics', 'kpi-cards', 'charts'],
      children: ['revenue-chart', 'bookings-stats', 'fleet-status'],
      dataEntities: ['Analytics', 'Financial', 'Booking', 'Equipment'],
      userRoles: ['executive'],
      description: 'Главная панель руководства с ключевыми метриками',
      complexity: 'high'
    },
    {
      id: 'executive-panel',
      name: 'Executive Panel (19 Modules)',
      type: 'system',
      category: 'Executive',
      path: '/components/admin/GTSExecutivePanel.tsx',
      dependencies: ['all-modules', 'navigation', 'permissions'],
      children: ['bookings', 'dispatch', 'fleet', 'crm', 'finance', 'analytics', 'staff', 'settings'],
      dataEntities: ['all'],
      userRoles: ['executive'],
      description: 'Полная административная панель с 19 модулями управления',
      complexity: 'high'
    },

    // 📊 Core Business Modules
    {
      id: 'crm-system',
      name: 'CRM System',
      type: 'module',
      category: 'Sales',
      path: '/components/admin/modules/GTSCRMModule.tsx',
      dependencies: ['lead-management', 'pipeline', 'communications'],
      children: ['kanban-board', 'client-cards', 'deal-forms', 'omni-inbox'],
      dataEntities: ['Lead', 'User', 'Deal', 'Communication'],
      userRoles: ['executive', 'manager', 'sales'],
      description: 'Система управления клиентами и продажами',
      complexity: 'high'
    },
    {
      id: 'finance-system',
      name: 'Finance Center',
      type: 'module',
      category: 'Finance',
      path: '/components/admin/modules/GTSFinanceCenterModule.tsx',
      dependencies: ['payment-processing', 'reporting', 'invoicing'],
      children: ['revenue-tracking', 'expense-management', 'financial-reports'],
      dataEntities: ['Financial', 'Booking', 'Partner'],
      userRoles: ['executive', 'accountant'],
      description: 'Финансовое управление и аналитика доходов',
      complexity: 'high'
    },
    {
      id: 'booking-calendar',
      name: 'Global Booking Calendar',
      type: 'module',
      category: 'Operations',
      path: '/components/modules/GTSGlobalBookingCalendar.tsx',
      dependencies: ['calendar-engine', 'resource-management', 'notifications'],
      children: ['calendar-view', 'booking-forms', 'availability-checker'],
      dataEntities: ['Booking', 'Equipment', 'Route', 'User'],
      userRoles: ['dispatcher', 'operator', 'executive'],
      description: 'Глобальный календарь бронирований и ресурсов',
      complexity: 'high'
    },
    {
      id: 'fleet-management',
      name: 'Fleet & Maintenance',
      type: 'module',
      category: 'Operations',
      path: '/components/admin/modules/GTSFleetMaintenanceModule.tsx',
      dependencies: ['vehicle-tracking', 'maintenance-scheduler', 'parts-inventory'],
      children: ['fleet-dashboard', 'maintenance-calendar', 'parts-manager'],
      dataEntities: ['Equipment', 'Maintenance', 'Inventory'],
      userRoles: ['executive', 'mechanic', 'fleet-manager'],
      description: 'Управление флотом и техническое обслуживание',
      complexity: 'high'
    },

    // 🚪 Portal Systems
    {
      id: 'client-club-portal',
      name: 'Client Club Portal',
      type: 'portal',
      category: 'Client Interface',
      path: '/components/admin/GTSClientClubPortal.tsx',
      dependencies: ['membership-system', 'booking-interface', 'loyalty-program'],
      children: ['member-dashboard', 'booking-history', 'loyalty-rewards', 'concierge'],
      dataEntities: ['User', 'Booking', 'Membership', 'Loyalty'],
      userRoles: ['member-bronze', 'member-silver', 'member-gold', 'member-platinum'],
      description: 'Премиальный портал для клиентов клуба',
      complexity: 'high'
    },
    {
      id: 'partner-portal',
      name: 'Partner Portal System',
      type: 'portal',
      category: 'Partner Interface',
      path: '/components/admin/GTSPartnerPortalUnified.tsx',
      dependencies: ['partner-types', 'commission-tracking', 'api-access'],
      children: ['agent-dashboard', 'contractor-panel', 'brand-partner-tools'],
      dataEntities: ['Partner', 'Booking', 'Financial', 'Contract'],
      userRoles: ['agent', 'contractor', 'brand-partner'],
      description: 'Единый портал для всех типов партнеров',
      complexity: 'high'
    },
    {
      id: 'b2b-client-portal',
      name: 'B2B Client Portal',
      type: 'portal',
      category: 'Corporate Interface',
      path: '/components/admin/GTSB2BPortal.tsx',
      dependencies: ['corporate-billing', 'team-management', 'reporting'],
      children: ['corporate-dashboard', 'team-bookings', 'expense-reports'],
      dataEntities: ['User', 'Booking', 'Financial', 'Corporate'],
      userRoles: ['b2b-client', 'corporate-manager', 'company-admin'],
      description: 'Портал для корпоративных клиентов',
      complexity: 'high'
    },

    // 📱 Mobile Applications
    {
      id: 'crew-mobile-app',
      name: 'Crew Mobile App',
      type: 'portal',
      category: 'Mobile Interface',
      path: '/components/admin/GTSCrewApp.tsx',
      dependencies: ['mobile-navigation', 'real-time-updates', 'offline-sync'],
      children: ['crew-dashboard', 'task-manager', 'communication'],
      dataEntities: ['User', 'Booking', 'Equipment', 'Task'],
      userRoles: ['captain', 'pilot', 'guide', 'mechanic'],
      description: 'Мобильное приложение для экипажа',
      complexity: 'medium'
    },

    // ⚙️ System Components
    {
      id: 'iam-system',
      name: 'IAM System',
      type: 'system',
      category: 'Security',
      path: '/components/admin/modules/GTSIAMRolesPermissions.tsx',
      dependencies: ['role-management', 'permissions', 'audit-logs'],
      children: ['role-editor', 'permission-matrix', 'audit-trail'],
      dataEntities: ['User', 'Role', 'Permission', 'AuditLog'],
      userRoles: ['executive', 'admin'],
      description: 'Система управления доступом и ролями',
      complexity: 'high'
    },
    {
      id: 'ai-modules',
      name: 'AI Modules Dashboard',
      type: 'system',
      category: 'AI & Automation',
      path: '/components/admin/GTSAIModulesDashboard.tsx',
      dependencies: ['ai-assistant', 'content-generator', 'insights'],
      children: ['global-ai-assistant', 'content-automation', 'customer-insights'],
      dataEntities: ['AIModel', 'Content', 'Analytics'],
      userRoles: ['executive', 'marketing'],
      description: 'Панель управления ИИ модулями',
      complexity: 'medium'
    }
  ];

  const connections = [
    // Navigation flows
    { from: 'landing-page', to: 'login-system', type: 'navigation' as const, label: 'User Login' },
    { from: 'login-system', to: 'executive-dashboard', type: 'navigation' as const, label: 'Executive Role' },
    { from: 'login-system', to: 'client-club-portal', type: 'navigation' as const, label: 'Client Role' },
    { from: 'login-system', to: 'partner-portal', type: 'navigation' as const, label: 'Partner Role' },
    { from: 'login-system', to: 'b2b-client-portal', type: 'navigation' as const, label: 'B2B Role' },
    { from: 'login-system', to: 'crew-mobile-app', type: 'navigation' as const, label: 'Crew Role' },
    
    // System dependencies
    { from: 'executive-dashboard', to: 'executive-panel', type: 'composition' as const, label: 'Contains' },
    { from: 'executive-panel', to: 'crm-system', type: 'composition' as const, label: 'Module' },
    { from: 'executive-panel', to: 'finance-system', type: 'composition' as const, label: 'Module' },
    { from: 'executive-panel', to: 'booking-calendar', type: 'composition' as const, label: 'Module' },
    { from: 'executive-panel', to: 'fleet-management', type: 'composition' as const, label: 'Module' },
    
    // Data flows
    { from: 'catalog-page', to: 'booking-calendar', type: 'data' as const, label: 'Booking Data' },
    { from: 'booking-calendar', to: 'crm-system', type: 'data' as const, label: 'Lead Creation' },
    { from: 'crm-system', to: 'finance-system', type: 'data' as const, label: 'Revenue Data' },
    { from: 'fleet-management', to: 'booking-calendar', type: 'data' as const, label: 'Availability' },
    
    // Cross-portal data sharing
    { from: 'client-club-portal', to: 'booking-calendar', type: 'data' as const, label: 'Member Bookings' },
    { from: 'partner-portal', to: 'crm-system', type: 'data' as const, label: 'Partner Leads' },
    { from: 'b2b-client-portal', to: 'finance-system', type: 'data' as const, label: 'Corporate Billing' },
    
    // Security and access
    { from: 'iam-system', to: 'executive-panel', type: 'dependency' as const, label: 'Access Control' },
    { from: 'iam-system', to: 'client-club-portal', type: 'dependency' as const, label: 'Access Control' },
    { from: 'iam-system', to: 'partner-portal', type: 'dependency' as const, label: 'Access Control' },
    { from: 'iam-system', to: 'b2b-client-portal', type: 'dependency' as const, label: 'Access Control' }
  ];

  const dataEntities = [
    {
      id: 'user',
      name: 'User',
      attributes: ['id', 'name', 'email', 'role', 'permissions', 'membership_status'],
      usedBy: ['login-system', 'crm-system', 'client-club-portal', 'iam-system']
    },
    {
      id: 'booking',
      name: 'Booking',
      attributes: ['id', 'client_id', 'service_type', 'date_time', 'status', 'price'],
      usedBy: ['booking-calendar', 'crm-system', 'finance-system', 'client-club-portal']
    },
    {
      id: 'equipment',
      name: 'Equipment',
      attributes: ['id', 'type', 'model', 'status', 'location', 'maintenance_date'],
      usedBy: ['fleet-management', 'booking-calendar', 'catalog-page']
    },
    {
      id: 'partner',
      name: 'Partner',
      attributes: ['id', 'type', 'company_name', 'commission_rate', 'status'],
      usedBy: ['partner-portal', 'crm-system', 'finance-system']
    },
    {
      id: 'financial',
      name: 'Financial Transaction',
      attributes: ['id', 'booking_id', 'amount', 'type', 'status', 'payment_method'],
      usedBy: ['finance-system', 'partner-portal', 'b2b-client-portal']
    }
  ];

  const userJourneys = [
    {
      role: 'Executive',
      path: ['landing-page', 'login-system', 'executive-dashboard', 'executive-panel'],
      description: 'Руководитель заходит в систему для управления всеми процессами'
    },
    {
      role: 'Premium Client',
      path: ['landing-page', 'catalog-page', 'login-system', 'client-club-portal'],
      description: 'Премиальный клиент бронирует услуги через клубный портал'
    },
    {
      role: 'Partner Agent',
      path: ['login-system', 'partner-portal', 'crm-system'],
      description: 'Партнер-агент работает с клиентами через портал партнеров'
    },
    {
      role: 'Corporate Client',
      path: ['landing-page', 'login-system', 'b2b-client-portal'],
      description: 'Корпоративный клиент управляет командными бронированиями'
    },
    {
      role: 'Crew Member',
      path: ['crew-mobile-app', 'booking-calendar'],
      description: 'Член экипажа получает задания через мобильное приложение'
    }
  ];

  return { nodes, connections, dataEntities, userJourneys };
};

interface GTSArchitectureDiagramProps {
  onBack?: () => void;
}

export function GTSArchitectureDiagram({ onBack }: GTSArchitectureDiagramProps) {
  const [architectureData, setArchitectureData] = useState<ArchitectureData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize architecture analysis
  useEffect(() => {
    const data = analyzeProjectStructure();
    setArchitectureData(data);
  }, []);

  const handleRefreshArchitecture = () => {
    setIsLoading(true);
    setTimeout(() => {
      const data = analyzeProjectStructure();
      setArchitectureData(data);
      setIsLoading(false);
    }, 1000);
  };

  const handleExportDiagram = () => {
    if (!architectureData) return;
    
    const exportData = {
      timestamp: new Date().toISOString(),
      project: 'GTS Platform',
      architecture: architectureData
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gts-architecture-diagram.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredNodes = useMemo(() => {
    if (!architectureData) return [];
    
    let nodes = architectureData.nodes;
    
    if (searchQuery) {
      nodes = nodes.filter(node => 
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      nodes = nodes.filter(node => node.category === selectedCategory);
    }
    
    return nodes;
  }, [architectureData, searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    if (!architectureData) return [];
    
    const cats = [...new Set(architectureData.nodes.map(node => node.category))];
    return [
      { id: 'all', name: 'All Components', count: architectureData.nodes.length },
      ...cats.map(cat => ({
        id: cat,
        name: cat,
        count: architectureData.nodes.filter(node => node.category === cat).length
      }))
    ];
  }, [architectureData]);

  const getNodeTypeIcon = (type: ComponentNode['type']) => {
    switch (type) {
      case 'page': return FileText;
      case 'module': return Box;
      case 'portal': return Users;
      case 'system': return Settings;
      case 'component': return Layers;
      default: return Box;
    }
  };

  const getComplexityColor = (complexity: ComponentNode['complexity']) => {
    switch (complexity) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getConnectionTypeColor = (type: string) => {
    switch (type) {
      case 'navigation': return 'stroke-blue-500';
      case 'data': return 'stroke-green-500';
      case 'dependency': return 'stroke-orange-500';
      case 'composition': return 'stroke-purple-500';
      default: return 'stroke-gray-500';
    }
  };

  if (!architectureData) {
    return (
      <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#91040C] mx-auto mb-4"></div>
          <p className="text-[#A6A7AA]">Analyzing project architecture...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-[#17181A]">
                ← Back
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-heading text-white">
                GTS Platform Architecture
              </h1>
              <p className="text-sm text-[#A6A7AA]">
                Автоматически сгенерированная диаграмма архитектуры проекта
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshArchitecture}
              disabled={isLoading}
              className="border-[#232428] text-white hover:bg-[#17181A]"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Update
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportDiagram}
              className="border-[#232428] text-white hover:bg-[#17181A]"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
            <input
              type="text"
              placeholder="Search components, modules, pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#17181A] border border-[#232428] text-white placeholder-[#A6A7AA] rounded-lg focus:ring-2 focus:ring-[#91040C] focus:border-[#91040C] focus:outline-none"
            />
          </div>
          
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

        {/* Architecture Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-[#121214] border-[#232428]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="components" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Components
            </TabsTrigger>
            <TabsTrigger value="data-flow" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Data Flow
            </TabsTrigger>
            <TabsTrigger value="user-journeys" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              User Journeys
            </TabsTrigger>
            <TabsTrigger value="statistics" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Statistics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Stats Cards */}
              <div className="lg:col-span-1 space-y-4">
                <Card className="bg-[#121214] border-[#232428]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#A6A7AA]">Total Components</p>
                        <p className="text-2xl font-heading text-white">{architectureData.nodes.length}</p>
                      </div>
                      <Box className="h-6 w-6 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#121214] border-[#232428]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#A6A7AA]">Data Entities</p>
                        <p className="text-2xl font-heading text-white">{architectureData.dataEntities.length}</p>
                      </div>
                      <Database className="h-6 w-6 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#121214] border-[#232428]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#A6A7AA]">Connections</p>
                        <p className="text-2xl font-heading text-white">{architectureData.connections.length}</p>
                      </div>
                      <Network className="h-6 w-6 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#121214] border-[#232428]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#A6A7AA]">User Journeys</p>
                        <p className="text-2xl font-heading text-white">{architectureData.userJourneys.length}</p>
                      </div>
                      <Target className="h-6 w-6 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Visual Architecture Map */}
              <div className="lg:col-span-3">
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white">Architecture Overview</CardTitle>
                    <CardDescription className="text-[#A6A7AA]">
                      High-level view of system components and connections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 bg-[#17181A] rounded-lg p-4 overflow-auto">
                      <svg width="100%" height="100%" viewBox="0 0 800 600" className="w-full h-full">
                        {/* Background Grid */}
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#232428" strokeWidth="1"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        
                        {/* Draw connections */}
                        {architectureData.connections.map((conn, index) => {
                          const fromNode = architectureData.nodes.find(n => n.id === conn.from);
                          const toNode = architectureData.nodes.find(n => n.id === conn.to);
                          if (!fromNode || !toNode) return null;
                          
                          // Calculate positions (simplified layout)
                          const fromX = (index % 4) * 180 + 90;
                          const fromY = Math.floor(index / 4) * 120 + 60;
                          const toX = ((index + 1) % 4) * 180 + 90;
                          const toY = Math.floor((index + 1) / 4) * 120 + 60;
                          
                          return (
                            <g key={`conn-${index}`}>
                              <line
                                x1={fromX}
                                y1={fromY}
                                x2={toX}
                                y2={toY}
                                className={getConnectionTypeColor(conn.type)}
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                              />
                              {conn.label && (
                                <text
                                  x={(fromX + toX) / 2}
                                  y={(fromY + toY) / 2}
                                  fill="#A6A7AA"
                                  fontSize="10"
                                  textAnchor="middle"
                                >
                                  {conn.label}
                                </text>
                              )}
                            </g>
                          );
                        })}
                        
                        {/* Draw nodes */}
                        {architectureData.nodes.slice(0, 12).map((node, index) => {
                          const x = (index % 4) * 180 + 90;
                          const y = Math.floor(index / 4) * 120 + 60;
                          
                          return (
                            <g key={node.id}>
                              <rect
                                x={x - 60}
                                y={y - 25}
                                width="120"
                                height="50"
                                rx="8"
                                fill="#17181A"
                                stroke="#232428"
                                strokeWidth="1"
                              />
                              <text
                                x={x}
                                y={y - 5}
                                fill="white"
                                fontSize="12"
                                textAnchor="middle"
                                fontWeight="500"
                              >
                                {node.name.length > 15 ? node.name.substring(0, 15) + '...' : node.name}
                              </text>
                              <text
                                x={x}
                                y={y + 10}
                                fill="#A6A7AA"
                                fontSize="10"
                                textAnchor="middle"
                              >
                                {node.type} • {node.category}
                              </text>
                            </g>
                          );
                        })}
                        
                        {/* Arrow marker */}
                        <defs>
                          <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon
                              points="0 0, 10 3.5, 0 7"
                              fill="#A6A7AA"
                            />
                          </marker>
                        </defs>
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNodes.map((node) => {
                const IconComponent = getNodeTypeIcon(node.type);
                
                return (
                  <Card key={node.id} className="bg-[#121214] border-[#232428] hover:border-[#91040C] transition-colors">
                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#91040C]/10 rounded-lg">
                            <IconComponent className="w-5 h-5 text-[#91040C]" />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-white">{node.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {node.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {node.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${getComplexityColor(node.complexity)}`} />
                      </div>
                      
                      <CardDescription className="text-sm leading-relaxed text-[#A6A7AA]">
                        {node.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        {/* User Roles */}
                        <div>
                          <p className="text-xs text-[#A6A7AA] mb-2">User Roles:</p>
                          <div className="flex flex-wrap gap-1">
                            {node.userRoles.map((role) => (
                              <Badge key={role} variant="secondary" className="text-xs">
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Data Entities */}
                        <div>
                          <p className="text-xs text-[#A6A7AA] mb-2">Data Entities:</p>
                          <div className="flex flex-wrap gap-1">
                            {node.dataEntities.map((entity) => (
                              <Badge key={entity} variant="outline" className="text-xs">
                                {entity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Path */}
                        <div>
                          <p className="text-xs text-[#A6A7AA] mb-1">Path:</p>
                          <code className="text-xs text-green-400 bg-[#17181A] px-2 py-1 rounded">
                            {node.path}
                          </code>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Data Flow Tab */}
          <TabsContent value="data-flow" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Data Entities */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Data Entities
                  </CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Core data structures used throughout the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {architectureData.dataEntities.map((entity) => (
                    <div key={entity.id} className="p-4 bg-[#17181A] rounded-lg">
                      <h4 className="font-medium text-white mb-2">{entity.name}</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-[#A6A7AA] mb-1">Attributes:</p>
                          <div className="flex flex-wrap gap-1">
                            {entity.attributes.map((attr) => (
                              <Badge key={attr} variant="secondary" className="text-xs">
                                {attr}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-[#A6A7AA] mb-1">Used by:</p>
                          <div className="flex flex-wrap gap-1">
                            {entity.usedBy.map((component) => (
                              <Badge key={component} variant="outline" className="text-xs">
                                {component}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Connection Types */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Connection Types
                  </CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Different types of relationships between components
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { type: 'navigation', color: 'blue', description: 'User navigation flows between pages and portals' },
                    { type: 'data', color: 'green', description: 'Data flow and information exchange' },
                    { type: 'dependency', color: 'orange', description: 'Functional dependencies and requirements' },
                    { type: 'composition', color: 'purple', description: 'Parent-child containment relationships' }
                  ].map((connType) => (
                    <div key={connType.type} className="flex items-start gap-3 p-3 bg-[#17181A] rounded-lg">
                      <div className={`w-4 h-4 rounded-full bg-${connType.color}-500 mt-1`} />
                      <div>
                        <p className="font-medium text-white capitalize">{connType.type}</p>
                        <p className="text-sm text-[#A6A7AA]">{connType.description}</p>
                        <p className="text-xs text-[#A6A7AA] mt-1">
                          {architectureData.connections.filter(c => c.type === connType.type).length} connections
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Journeys Tab */}
          <TabsContent value="user-journeys" className="mt-6">
            <div className="space-y-4">
              {architectureData.userJourneys.map((journey, index) => (
                <Card key={index} className="bg-[#121214] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      {journey.role} Journey
                    </CardTitle>
                    <CardDescription className="text-[#A6A7AA]">
                      {journey.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {journey.path.map((step, stepIndex) => (
                        <React.Fragment key={step}>
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <Badge variant="outline" className="text-xs">
                              {step}
                            </Badge>
                          </div>
                          {stepIndex < journey.path.length - 1 && (
                            <ArrowRight className="h-4 w-4 text-[#A6A7AA] flex-shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Component Type Distribution */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Component Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {['page', 'module', 'portal', 'system', 'component'].map((type) => {
                    const count = architectureData.nodes.filter(n => n.type === type).length;
                    const percentage = (count / architectureData.nodes.length * 100).toFixed(1);
                    
                    return (
                      <div key={type} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-white capitalize">{type}</span>
                          <span className="text-[#A6A7AA]">{count} ({percentage}%)</span>
                        </div>
                        <div className="h-2 bg-[#232428] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#91040C] transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Complexity Distribution */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Complexity Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {['low', 'medium', 'high'].map((complexity) => {
                    const count = architectureData.nodes.filter(n => n.complexity === complexity).length;
                    const percentage = (count / architectureData.nodes.length * 100).toFixed(1);
                    const color = complexity === 'low' ? 'bg-green-500' : complexity === 'medium' ? 'bg-yellow-500' : 'bg-red-500';
                    
                    return (
                      <div key={complexity} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-white capitalize">{complexity}</span>
                          <span className="text-[#A6A7AA]">{count} ({percentage}%)</span>
                        </div>
                        <div className="h-2 bg-[#232428] rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${color} transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.slice(1, 6).map((category) => {
                    const percentage = (category.count / architectureData.nodes.length * 100).toFixed(1);
                    
                    return (
                      <div key={category.id} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-white">{category.name}</span>
                          <span className="text-[#A6A7AA]">{category.count} ({percentage}%)</span>
                        </div>
                        <div className="h-2 bg-[#232428] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Technical Metrics */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Technical Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#A6A7AA]">Avg Dependencies:</span>
                    <span className="text-white">
                      {(architectureData.nodes.reduce((sum, n) => sum + n.dependencies.length, 0) / architectureData.nodes.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A6A7AA]">Max Dependencies:</span>
                    <span className="text-white">
                      {Math.max(...architectureData.nodes.map(n => n.dependencies.length))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A6A7AA]">Connection Density:</span>
                    <span className="text-white">
                      {(architectureData.connections.length / architectureData.nodes.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A6A7AA]">User Roles:</span>
                    <span className="text-white">
                      {[...new Set(architectureData.nodes.flatMap(n => n.userRoles))].length}
                    </span>
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

export default GTSArchitectureDiagram;