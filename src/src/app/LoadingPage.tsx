// ⏳ Loading Page Component
// ✅ Simple version without external imports

'use client'

import React from 'react'

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#91040C] mx-auto mb-4"></div>
        <p className="text-gray-400">Загрузка...</p>
      </div>
    </div>
  )
}