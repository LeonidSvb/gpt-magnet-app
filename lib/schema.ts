import { z } from 'zod'

export const answerSchema = z.object({
  question_id: z.string(),
  question_text: z.string(),
  answer: z.union([z.string(), z.array(z.string())]),
})

export const leadSubmitSchema = z.object({
  email: z.string().email().optional(),
  telegram_id: z.number().optional(),
  telegram_username: z.string().optional(),
  name: z.string().optional(),
  platform: z.enum(['web', 'telegram']),
  session_id: z.string(),
  answers: z.array(answerSchema),
})

export const generateSchema = z.object({
  session_id: z.string(),
  answers: z.array(answerSchema),
})