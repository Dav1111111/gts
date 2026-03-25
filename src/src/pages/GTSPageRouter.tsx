// 📄 Page Router - FSD Migration
// ✅ Прокси к оригинальному GTSPageRouter с новыми импортами

import React from 'react'

// ✅ Temporary import from legacy structure during migration
// TODO: Migrate to proper FSD pages structure
import { GTSPageRouter as LegacyGTSPageRouter } from '../../components/pages/GTSPageRouter'

interface GTSPageRouterProps {
  currentPage: string
  navigationContext: any
  onRoleSelected: (role: any) => void
  onBackToHome: () => void
  onLogin: () => void
  onNavigateToUIKit: () => void
  onNavigateToDemo: () => void
  navigateToModule: (module: string) => void
  onNavigateToB2BPortal: () => void
  onNavigateToNewLeadDemo: () => void
  onNavigateToDemoById: (id: string) => void
}

// ✅ Proxy component during FSD migration
export function GTSPageRouter(props: GTSPageRouterProps) {
  return <LegacyGTSPageRouter {...props} />
}