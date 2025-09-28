import type { Answer } from '@/types'

export function buildPrompt(answers: Answer[], template: string): string {
  let prompt = template

  answers.forEach((answer) => {
    const placeholder = `{{${answer.question_id}}}`
    const answerText = Array.isArray(answer.answer)
      ? answer.answer.join(', ')
      : answer.answer
    prompt = prompt.replace(placeholder, answerText)
  })

  return prompt
}

export const DEFAULT_RESULT_TEMPLATE = `
Based on the following answers, generate a personalized result:

{{answers}}

Please provide a detailed, actionable response.
`