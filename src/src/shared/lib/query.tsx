// 🔄 Query Provider - Simplified for FSD Migration
// ✅ Простая версия без external dependencies

'use client'

import React from 'react'

// ✅ Простой провайдер для миграции (без react-query зависимостей)
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // TODO: Add React Query when needed
  return <>{children}</>
}