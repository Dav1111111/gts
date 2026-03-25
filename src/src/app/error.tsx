// 🚨 GTS Platform - Simple Error Page
// ✅ Basic version without external imports

'use client'

import React, { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Error logging
    console.error('GTS Platform Error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0B0B0C] text-white">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
          <div className="text-red-400 text-2xl">⚠️</div>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold mb-2">Произошла ошибка</h1>
          <p className="text-gray-400">Что-то пошло не так. Мы уже работаем над исправлением.</p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="text-xs bg-gray-800 p-3 rounded-md text-left">
            <summary className="cursor-pointer font-medium mb-2">
              Детали ошибки (только для разработки)
            </summary>
            <pre className="whitespace-pre-wrap break-words text-gray-300">
              {error.message}
            </pre>
          </details>
        )}
        
        <div className="flex gap-3">
          <button 
            onClick={reset}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
          >
            Попробовать снова
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="flex-1 px-4 py-2 bg-[#91040C] text-white rounded-md hover:bg-[#91040C]/90"
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  )
}