export type Platform = 'web' | 'telegram'

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
}

export interface Lead {
  id?: string
  email?: string
  telegram_id?: number
  telegram_username?: string
  name?: string
  platform: Platform
  created_at?: string
}

export interface Answer {
  question_id: string
  question_text: string
  answer: string | string[]
}

export interface Session {
  id: string
  lead_id?: string
  answers: Answer[]
  result?: string
  created_at: string
  completed_at?: string
}

export interface WizardConfig {
  title: string
  description: string
  questions: Question[]
  result_prompt_template: string
}

export interface Question {
  id: string
  type: 'text' | 'select' | 'multiselect' | 'number'
  question: string
  placeholder?: string
  options?: string[]
  required?: boolean
}

export interface GenerateRequest {
  session_id: string
  answers: Answer[]
}

export interface GenerateResponse {
  result: string
  session_id: string
}

export interface LeadSubmitRequest {
  email?: string
  telegram_id?: number
  telegram_username?: string
  name?: string
  platform: Platform
  session_id: string
  answers: Answer[]
}

export interface LeadSubmitResponse {
  success: boolean
  lead_id: string
  download_url?: string
}