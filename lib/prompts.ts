import type { Answer } from '@/types'

export function buildPrompt(
  answers: Answer[],
  template: string,
  category?: string,
  niche?: string
): string {
  // Create answers section
  const answersText = answers.map(answer => {
    const answerText = Array.isArray(answer.answer)
      ? answer.answer.join(', ')
      : answer.answer;
    return `${answer.question_text}: ${answerText}`;
  }).join('\n');

  // Replace placeholders
  const prompt = template
    .replace('{{category}}', category || 'General')
    .replace('{{niche}}', niche || 'General')
    .replace('{{answers}}', answersText);

  return prompt;
}

export const DEFAULT_RESULT_TEMPLATE = `
You are an expert lead magnet creator specializing in {{category}} - {{niche}}.

Create a high-value, actionable lead magnet based on these user responses:

{{answers}}

Generate a comprehensive lead magnet with the following structure:

# [Compelling Title] - Your Ultimate {{niche}} Guide

## Introduction
Brief introduction explaining what this guide covers and who it's for.

## The Challenge
Identify the main problem this guide solves based on the user's responses.

## The Solution Framework
Provide a clear, step-by-step framework or methodology.

## Actionable Steps
Give 5-7 specific, actionable steps the user can implement immediately.

## Pro Tips & Best Practices
Share insider knowledge and advanced tips.

## Common Mistakes to Avoid
List pitfalls and how to avoid them.

## Tools & Resources
Recommend specific tools, websites, or resources.

## Next Steps
Suggest what the user should do after implementing this guide.

## Conclusion
Motivating conclusion with a clear call to action.

Requirements:
- Make it highly specific to their {{niche}} and experience level
- Include real, actionable advice they can implement today
- Write in a conversational, expert tone
- Use their specific challenges and goals from their answers
- Make it valuable enough that they'd gladly pay for it
- Length: 1500-2000 words
- Format: Clean markdown with proper headers and lists
`