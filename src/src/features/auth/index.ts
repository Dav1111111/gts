// 🔐 Auth Feature - Public API
// ✅ Полноценный auth feature в FSD архитектуре

export { AuthProvider, useAuthContext } from './ui/AuthProvider'
export { useAuth } from './hooks/useAuth'

// ✅ Server-side auth utilities
export async function getUserRole(): Promise<string | null> {
  // ✅ Mock implementation for frontend-only
  try {
    const storedUser = localStorage?.getItem('gts-user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      return user.role || null
    }
  } catch {
    // Ignore localStorage errors
  }
  return null
}