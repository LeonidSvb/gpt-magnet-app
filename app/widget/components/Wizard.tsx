'use client'

import { useState } from 'react'
import type { Question, Answer } from '@/types'

interface WizardProps {
  questions: Question[]
  onComplete: (answers: Answer[]) => void
}

export function Wizard({ questions, onComplete }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Question {currentStep + 1}</h2>
      </div>
    </div>
  )
}