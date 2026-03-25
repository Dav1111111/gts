// 🤖 AI Navigation Map for GTS Prototype
// Центральная карта всех компонентов для упрощения AI-навигации

export interface ComponentInfo {
  path: string;
  description: string;
  category: 'feature' | 'portal' | 'module' | 'ui' | 'shell' | 'admin';
  status: 'active' | 'deprecated' | 'temp' | 'legacy';
  dependencies?: string[];
  aiPromptKeywords: string[];
}

export const AI_COMPONENT_MAP: Record<string, ComponentInfo> = {
  // 🎯 CORE FEATURES
  'executive-panel': {
    path: '/components/admin/GTSExecutivePanel.tsx',
    description: 'Main executive dashboard with all 19 modules',
    category: 'feature',
    status: 'active',
    aiPromptKeywords: ['executive', 'dashboard', 'admin', 'main panel']
  },

  'executive-dashboard': {
    path: '/components/modules/GTSExecutiveDashboard.tsx',
    description: 'Executive overview and analytics module',
    category: 'module', 
    status: 'active',
    aiPromptKeywords: ['executive', 'overview', 'analytics', 'metrics']
  },

  // 🏢 PORTALS
  'partner-portal': {
    path: '/components/admin/GTSPartnerPortalUnified.tsx',
    description: 'Unified partner management portal',
    category: 'portal',
    status: 'active',
    aiPromptKeywords: ['partner', 'portal', 'unified', 'management']
  },

  'client-club': {
    path: '/components/modules/GTSClientClub.tsx',
    description: 'Premium client club interface',
    category: 'portal',
    status: 'active',
    aiPromptKeywords: ['client', 'club', 'premium', 'loyalty']
  },

  'b2b-portal': {
    path: '/components/portal/GTSB2BClientPortal.tsx',
    description: 'B2B client management portal',
    category: 'portal',
    status: 'active',
    aiPromptKeywords: ['b2b', 'business', 'client', 'corporate']
  },

  'brand-partner': {
    path: '/components/portal/GTSBrandPartnerPortal.tsx',
    description: 'Brand partnership management interface',
    category: 'portal',
    status: 'active',
    aiPromptKeywords: ['brand', 'partner', 'marketing', 'collaboration']
  },

  'contractor-portal': {
    path: '/components/portal/GTSContractorPortal.tsx',
    description: 'Contractor and service provider portal',
    category: 'portal',
    status: 'active',
    aiPromptKeywords: ['contractor', 'service', 'provider', 'external']
  },

  // 📊 BUSINESS MODULES
  'crm-system': {
    path: '/components/modules/GTSCRMSystem.tsx',
    description: 'Customer relationship management system',
    category: 'module',
    status: 'active',
    aiPromptKeywords: ['crm', 'customers', 'leads', 'sales', 'pipeline']
  },

  'finance-system': {
    path: '/components/modules/GTSFinanceSystem.tsx',
    description: 'Financial management and reporting',
    category: 'module',
    status: 'active',
    aiPromptKeywords: ['finance', 'accounting', 'revenue', 'payments']
  },

  'booking-calendar': {
    path: '/components/modules/GTSGlobalBookingCalendar.tsx',
    description: 'Global booking and scheduling system',
    category: 'module',
    status: 'active',
    aiPromptKeywords: ['booking', 'calendar', 'schedule', 'reservations']
  },

  'partners-system': {
    path: '/components/modules/GTSPartnersSystem.tsx',
    description: 'Partner relationship management',
    category: 'module',
    status: 'active',
    aiPromptKeywords: ['partners', 'relationships', 'network', 'referrals']
  },

  // 🤖 AI MODULES
  'ai-assistant': {
    path: '/components/modules/GTSGlobalAIAssistant.tsx',
    description: 'AI-powered global assistant',
    category: 'module',
    status: 'active',
    aiPromptKeywords: ['ai', 'assistant', 'chatbot', 'automation']
  },

  'ai-content': {
    path: '/components/modules/GTSAIContentGenerator.tsx',
    description: 'AI content generation system',
    category: 'module',
    status: 'active',
    aiPromptKeywords: ['ai', 'content', 'generation', 'writing']
  },

  'ai-insights': {
    path: '/components/modules/GTSAICustomerInsights.tsx',
    description: 'AI customer analytics and insights',
    category: 'module',
    status: 'active',
    aiPromptKeywords: ['ai', 'analytics', 'insights', 'intelligence']
  },

  // 📱 MOBILE & CREW
  'crew-app': {
    path: '/components/admin/GTSCrewApp.tsx',
    description: 'Mobile crew management application',
    category: 'feature',
    status: 'active',
    aiPromptKeywords: ['crew', 'mobile', 'staff', 'operations']
  },

  'mobile-booking': {
    path: '/components/modules/GTSGlobalBookingCalendarMobile.tsx',
    description: 'Mobile booking calendar interface',
    category: 'module',
    status: 'active',
    aiPromptKeywords: ['mobile', 'booking', 'calendar', 'responsive']
  },

  // 🎨 UI SYSTEM
  'ui-kit': {
    path: '/components/ui-kit/GTSUIKit.tsx',
    description: 'Complete UI component library',
    category: 'ui',
    status: 'active',
    aiPromptKeywords: ['ui', 'components', 'design system', 'library']
  },

  'app-shell': {
    path: '/components/shell/GTSUnifiedAppShell.tsx',
    description: 'Unified application shell and layout',
    category: 'shell',
    status: 'active',
    aiPromptKeywords: ['shell', 'layout', 'wrapper', 'container']
  },

  // 🗂️ LEGACY & TEMPORARY (для очистки)
  'executive-temp': {
    path: '/components/admin/GTSExecutivePanel_temp.tsx',
    description: 'Temporary executive panel (to be removed)',
    category: 'admin',
    status: 'temp',
    aiPromptKeywords: ['temp', 'temporary', 'remove', 'cleanup']
  },

  'executive-patch': {
    path: '/components/admin/GTSExecutivePanel_patch.tsx',
    description: 'Executive panel patch (to be merged)',
    category: 'admin',
    status: 'temp',
    aiPromptKeywords: ['patch', 'fix', 'temporary', 'merge']
  }
};

// 🔍 AI SEARCH UTILITIES
export class AINavigationHelper {
  static findComponent(query: string): ComponentInfo[] {
    const normalizedQuery = query.toLowerCase();
    
    return Object.values(AI_COMPONENT_MAP).filter(component => 
      component.aiPromptKeywords.some(keyword => 
        keyword.includes(normalizedQuery) || normalizedQuery.includes(keyword)
      ) ||
      component.description.toLowerCase().includes(normalizedQuery)
    );
  }

  static getActiveComponents(): ComponentInfo[] {
    return Object.values(AI_COMPONENT_MAP).filter(comp => comp.status === 'active');
  }

  static getTempComponents(): ComponentInfo[] {
    return Object.values(AI_COMPONENT_MAP).filter(comp => comp.status === 'temp');
  }

  static getComponentsByCategory(category: ComponentInfo['category']): ComponentInfo[] {
    return Object.values(AI_COMPONENT_MAP).filter(comp => comp.category === category);
  }

  static suggestRelatedComponents(componentKey: string): ComponentInfo[] {
    const component = AI_COMPONENT_MAP[componentKey];
    if (!component) return [];

    return Object.values(AI_COMPONENT_MAP).filter(comp => 
      comp.category === component.category && comp !== component
    ).slice(0, 5);
  }
}

// 📋 FEATURE ROADMAP
export const FEATURE_ROADMAP = {
  executive: [
    'executive-panel',
    'executive-dashboard', 
    'crm-system',
    'finance-system',
    'partners-system'
  ],
  
  portals: [
    'partner-portal',
    'client-club',
    'b2b-portal',
    'brand-partner',
    'contractor-portal'
  ],
  
  ai: [
    'ai-assistant',
    'ai-content', 
    'ai-insights'
  ],
  
  mobile: [
    'crew-app',
    'mobile-booking'
  ],
  
  cleanup: [
    'executive-temp',
    'executive-patch'
  ]
};

// 🎯 AI PROMPT TEMPLATES
export const AI_PROMPT_TEMPLATES = {
  navigation: "Найди компонент для '{keyword}' в GTS системе",
  modification: "Измени {componentName} чтобы добавить {feature}",
  creation: "Создай новый {type} компонент для {purpose}",
  cleanup: "Удали временные файлы из катего��ии {category}",
  analysis: "Проанализируй зависимости компонента {componentName}"
};

export default AINavigationHelper;