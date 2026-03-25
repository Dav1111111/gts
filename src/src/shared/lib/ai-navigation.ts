// 🤖 AI Navigation Helper - FSD Migration
// ✅ Копия utils/ai-navigation-map.ts с новой архитектурой

export interface ComponentInfo {
  id: string
  name: string
  category: string
  path: string
  description: string
  isActive: boolean
}

class AINavigationHelperClass {
  private components: ComponentInfo[] = [
    {
      id: 'executive-panel',
      name: 'Executive Panel',
      category: 'portal',
      path: '/executive-access',
      description: 'Executive management dashboard',
      isActive: true
    },
    {
      id: 'crm-system',
      name: 'CRM System',
      category: 'module',
      path: '/executive-access',
      description: 'Customer relationship management',
      isActive: true
    },
    {
      id: 'finance-system',
      name: 'Finance System',
      category: 'module',
      path: '/executive-access',
      description: 'Financial management and analytics',
      isActive: true
    },
    {
      id: 'client-club',
      name: 'Client Club Portal',
      category: 'portal',
      path: '/client-club-portal',
      description: 'Premium client services',
      isActive: true
    },
    {
      id: 'partner-portal',
      name: 'Partner Portal',
      category: 'portal',
      path: '/partner-portal',
      description: 'Partner management system',
      isActive: true
    },
    {
      id: 'b2b-portal',
      name: 'B2B Client Portal',
      category: 'portal',
      path: '/b2b-client-portal',
      description: 'Corporate client portal',
      isActive: true
    },
    {
      id: 'crew-app',
      name: 'Crew Mobile App',
      category: 'mobile',
      path: '/crew-app',
      description: 'Mobile crew operations',
      isActive: true
    }
  ]

  findComponent(search: string): ComponentInfo[] {
    const searchLower = search.toLowerCase()
    
    return this.components.filter(component =>
      component.id.toLowerCase().includes(searchLower) ||
      component.name.toLowerCase().includes(searchLower) ||
      component.description.toLowerCase().includes(searchLower)
    )
  }

  getComponentsByCategory(category: string): ComponentInfo[] {
    return this.components.filter(component => 
      component.category === category && component.isActive
    )
  }

  getActiveComponents(): ComponentInfo[] {
    return this.components.filter(component => component.isActive)
  }

  getAllComponents(): ComponentInfo[] {
    return [...this.components]
  }

  getComponentById(id: string): ComponentInfo | undefined {
    return this.components.find(component => component.id === id)
  }

  getTempComponents(): ComponentInfo[] {
    // ✅ Mock temp components для совместимости
    return []
  }
}

export const AINavigationHelper = new AINavigationHelperClass()