'use client'

import { useEffect, useState } from 'react'
import { WidgetContent } from '@/app/widget/page'
import type { TelegramUser } from '@/types'

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void
        expand: () => void
        initDataUnsafe: {
          user?: TelegramUser
        }
      }
    }
  }
}

export default function TelegramMiniApp() {
  const [user, setUser] = useState<TelegramUser | null>(null)

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()
      tg.expand()

      if (tg.initDataUnsafe.user) {
        setUser(tg.initDataUnsafe.user)
      }
    }
  }, [])

  return (
    <div className="telegram-wrapper">
      <WidgetContent user={user} platform="telegram" />
    </div>
  )
}