'use client'

import type { Question, Answer } from '@/types'

interface WizardProps {
  questions: Question[]
  onComplete: (answers: Answer[]) => void
}

export function Wizard(_props: WizardProps) {
  // TODO: Implement wizard logic

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Question 1</h2>
        {/* TODO: Implement question flow */}
      </div>
    </div>
  )
}