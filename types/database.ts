export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          email: string | null
          telegram_id: number | null
          telegram_username: string | null
          name: string | null
          platform: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email?: string | null
          telegram_id?: number | null
          telegram_username?: string | null
          name?: string | null
          platform: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          telegram_id?: number | null
          telegram_username?: string | null
          name?: string | null
          platform?: string
          created_at?: string
          updated_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          lead_id: string | null
          answers: Json
          result: string | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          lead_id?: string | null
          answers: Json
          result?: string | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          lead_id?: string | null
          answers?: Json
          result?: string | null
          created_at?: string
          completed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}