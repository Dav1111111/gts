// 🏠 Home Page - FSD Structure
// ✅ Landing page с правильной архитектурой

'use client'

import React from 'react'

// ✅ Temporary import from legacy during migration  
import { GTSLandingPage } from '../../../components/pages/GTSLandingPage'

interface HomePageProps {
  onNavigateToUIKit?: () => void
  onNavigateToDemo?: () => void
  onLogin?: () => void
}

// ✅ Proxy component during FSD migration
export function HomePage({ onNavigateToUIKit, onNavigateToDemo, onLogin }: HomePageProps) {
  return (
    <GTSLandingPage 
      onNavigateToUIKit={onNavigateToUIKit}
      onNavigateToDemo={onNavigateToDemo}
      onLogin={onLogin}
    />
  )
}