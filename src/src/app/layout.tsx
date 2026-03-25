// 🏗️ GTS Platform - Simple Layout
// ✅ Basic version without external imports

'use client'

import React from 'react'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="dark">
      <body className="bg-[#0B0B0C] text-white antialiased min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}