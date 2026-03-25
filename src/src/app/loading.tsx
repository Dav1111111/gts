// ⏳ GTS Platform - Simple Loading UI
// ✅ Basic version without external imports

'use client'

import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#91040C] mx-auto mb-4"></div>
        <p className="text-gray-400">Загрузка приложения...</p>
      </div>
    </div>
  )
}