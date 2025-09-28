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
      sessions: {
        Row: {
          id: string
          answers: Json
          status: string
          source: string | null
          current_step: number
          total_steps: number | null
          user_agent: string | null
          ip_address: string | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          answers?: Json
          status?: string
          source?: string | null
          current_step?: number
          total_steps?: number | null
          user_agent?: string | null
          ip_address?: string | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          answers?: Json
          status?: string
          source?: string | null
          current_step?: number
          total_steps?: number | null
          user_agent?: string | null
          ip_address?: string | null
          created_at?: string
          completed_at?: string | null
        }
      }
      leads: {
        Row: {
          id: string
          session_id: string | null
          email: string | null
          telegram_id: number | null
          name: string | null
          phone: string | null
          company: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          session_id?: string | null
          email?: string | null
          telegram_id?: number | null
          name?: string | null
          phone?: string | null
          company?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string | null
          email?: string | null
          telegram_id?: number | null
          name?: string | null
          phone?: string | null
          company?: string | null
          status?: string
          created_at?: string
        }
      }
      results: {
        Row: {
          id: string
          session_id: string | null
          markdown: string
          prompt_used: string | null
          model: string | null
          tokens_used: number | null
          generation_time_ms: number | null
          version: number
          created_at: string
        }
        Insert: {
          id?: string
          session_id?: string | null
          markdown: string
          prompt_used?: string | null
          model?: string | null
          tokens_used?: number | null
          generation_time_ms?: number | null
          version?: number
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string | null
          markdown?: string
          prompt_used?: string | null
          model?: string | null
          tokens_used?: number | null
          generation_time_ms?: number | null
          version?: number
          created_at?: string
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