// 🔐 Admin Page - FSD Structure
// ✅ Executive access page с правильной архитектурой

'use client'

import React from 'react'

// ✅ Temporary import from legacy during migration
import { GTSExecutiveAccess } from '../../../components/GTSExecutiveAccess'

interface AdminPageProps {
  navigationContext?: any
  navigateToModule?: (module: string) => void
  userRole?: string
}

// ✅ Proxy component during FSD migration
export function AdminPage({ navigationContext, navigateToModule, userRole }: AdminPageProps) {
  return (
    <GTSExecutiveAccess 
      navigationContext={navigationContext}
      navigateToModule={navigateToModule}
      userRole={userRole}
    />
  )
}