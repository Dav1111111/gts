// 🎪 Demo Router Widget - FSD Migration
// ✅ Прокси к оригинальному GTSDemoRouter

import React from 'react'

// ✅ Temporary import from legacy structure during migration
import { GTSDemoRouter as LegacyGTSDemoRouter } from '../../../components/core/GTSDemoRouter'

interface GTSDemoRouterProps {
  onNavigateToDemo: (id: string) => void
  currentDemo: string
}

// ✅ Proxy component during FSD migration
export function GTSDemoRouter(props: GTSDemoRouterProps) {
  return <LegacyGTSDemoRouter {...props} />
}