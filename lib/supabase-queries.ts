import { supabase } from './supabase'
import type { Database } from '@/types/database'

type Session = Database['public']['Tables']['sessions']['Row']
type SessionUpdate = Database['public']['Tables']['sessions']['Update']

type Lead = Database['public']['Tables']['leads']['Row']

type Result = Database['public']['Tables']['results']['Row']

export async function createSession(data: {
  source?: 'web' | 'telegram' | 'iframe'
  total_steps?: number
  user_agent?: string
  ip_address?: string
}): Promise<Session> {
  const { data: session, error } = await supabase
    .from('sessions')
    .insert({
      source: data.source,
      total_steps: data.total_steps,
      user_agent: data.user_agent,
      ip_address: data.ip_address,
    })
    .select()
    .single()

  if (error) throw new Error(`Failed to create session: ${error.message}`)
  return session
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', sessionId)
    .single()

  if (error) {
    console.error('Failed to get session:', error)
    return null
  }

  return data
}

export async function updateSessionAnswers(
  sessionId: string,
  answers: Record<string, unknown>,
  currentStep?: number
): Promise<void> {
  const update: SessionUpdate = {
    answers,
  }

  if (currentStep !== undefined) {
    update.current_step = currentStep
  }

  const { error } = await supabase
    .from('sessions')
    .update(update)
    .eq('id', sessionId)

  if (error) throw new Error(`Failed to update session: ${error.message}`)
}

export async function completeSession(sessionId: string): Promise<void> {
  const { error } = await supabase
    .from('sessions')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
    })
    .eq('id', sessionId)

  if (error) throw new Error(`Failed to complete session: ${error.message}`)
}

export async function abandonSession(sessionId: string): Promise<void> {
  const { error } = await supabase
    .from('sessions')
    .update({
      status: 'abandoned',
    })
    .eq('id', sessionId)

  if (error) throw new Error(`Failed to abandon session: ${error.message}`)
}

export async function createResult(data: {
  session_id: string
  markdown: string
  prompt_used?: string
  model?: string
  tokens_used?: number
  generation_time_ms?: number
}): Promise<Result> {
  const { data: result, error } = await supabase
    .from('results')
    .insert(data)
    .select()
    .single()

  if (error) throw new Error(`Failed to create result: ${error.message}`)
  return result
}

export async function getResult(sessionId: string): Promise<Result | null> {
  const { data, error } = await supabase
    .from('results')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error('Failed to get result:', error)
    return null
  }

  return data
}

export async function createLead(data: {
  session_id: string
  email?: string
  telegram_id?: number
  name?: string
  phone?: string
  company?: string
}): Promise<Lead> {
  const { data: lead, error } = await supabase
    .from('leads')
    .insert({
      ...data,
      status: 'new',
    })
    .select()
    .single()

  if (error) throw new Error(`Failed to create lead: ${error.message}`)
  return lead
}

export async function getLead(leadId: string): Promise<Lead | null> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single()

  if (error) {
    console.error('Failed to get lead:', error)
    return null
  }

  return data
}

export async function getLeadBySession(
  sessionId: string
): Promise<Lead | null> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('session_id', sessionId)
    .single()

  if (error) {
    console.error('Failed to get lead by session:', error)
    return null
  }

  return data
}

export async function updateLeadStatus(
  leadId: string,
  status: 'new' | 'contacted' | 'converted'
): Promise<void> {
  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', leadId)

  if (error) throw new Error(`Failed to update lead status: ${error.message}`)
}

export async function getSessionWithResult(sessionId: string): Promise<{
  session: Session
  result: Result | null
  lead: Lead | null
} | null> {
  const session = await getSession(sessionId)
  if (!session) return null

  const result = await getResult(sessionId)
  const lead = await getLeadBySession(sessionId)

  return {
    session,
    result,
    lead,
  }
}

export async function getAllLeads(options?: {
  limit?: number
  offset?: number
  status?: 'new' | 'contacted' | 'converted'
}): Promise<Lead[]> {
  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (options?.status) {
    query = query.eq('status', options.status)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) throw new Error(`Failed to get leads: ${error.message}`)
  return data || []
}

export async function getSessionStats(
  startDate?: Date,
  endDate?: Date
): Promise<{
  total: number
  completed: number
  abandoned: number
  conversion_rate: number
}> {
  let query = supabase
    .from('sessions')
    .select('status')

  if (startDate) {
    query = query.gte('created_at', startDate.toISOString())
  }

  if (endDate) {
    query = query.lte('created_at', endDate.toISOString())
  }

  const { data, error } = await query

  if (error) throw new Error(`Failed to get session stats: ${error.message}`)

  const total = data?.length || 0
  const completed = data?.filter((s) => s.status === 'completed').length || 0
  const abandoned = data?.filter((s) => s.status === 'abandoned').length || 0

  const { count: leadsCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })

  const conversion_rate = total > 0 ? ((leadsCount || 0) / total) * 100 : 0

  return {
    total,
    completed,
    abandoned,
    conversion_rate,
  }
}