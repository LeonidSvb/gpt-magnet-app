import type { Lead, Answer } from '@/types'

export async function sendToN8N(lead: Lead, answers: Answer[], result?: string) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('N8N_WEBHOOK_URL not configured')
    return
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lead,
        answers,
        result,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`N8N webhook failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error sending to n8n:', error)
    throw error
  }
}