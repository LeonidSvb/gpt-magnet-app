'use client'

import type { TelegramUser, Platform } from '@/types'

interface WidgetProps {
  user?: TelegramUser | null
  platform?: Platform
}

export function WidgetContent({ user: _user, platform = 'web' }: WidgetProps) {
  // TODO: Implement widget functionality
  console.log('Platform:', platform)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Custom GPT Lead Magnet
        </h1>
        {/* TODO: Add wizard component */}
      </div>
    </div>
  )
}

export default function WidgetPage() {
  return <WidgetContent platform="web" />
}