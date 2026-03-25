// 🔑 Login Page - FSD Structure
// ✅ Authentication page с правильной архитектурой

'use client'

import React from 'react'

// ✅ Temporary import from legacy during migration
import { GTSLoginRolePicker } from '../../../components/auth/GTSLoginRolePicker'

interface LoginPageProps {
  onRoleSelected?: (role: any) => void
  onBackToHome?: () => void
}

// ✅ Proxy component during FSD migration
export function LoginPage({ onRoleSelected, onBackToHome }: LoginPageProps) {
  return (
    <GTSLoginRolePicker 
      onRoleSelected={onRoleSelected}
      onBackToHome={onBackToHome}
    />
  )
}