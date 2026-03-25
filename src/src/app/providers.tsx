// 🔧 GTS Platform - Simple Providers (No External Imports)
// ✅ Minimalist version to avoid build errors

'use client'

import React from 'react'

// ✅ Simple providers - just pass through children
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}