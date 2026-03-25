// 🏠 GTS Platform - Simple Home Page
// ✅ Basic version without external imports

'use client'

import React from 'react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">GTS Platform</h1>
        <p className="text-gray-400 mb-8">Welcome to Grand Tour Sochi</p>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Simple page version without external dependencies</p>
        </div>
      </div>
    </div>
  )
}