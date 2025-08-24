// /app/api/analyze-profile/route.ts
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const { profileUrl, goal } = await req.json()

  const prompt = `
You are a brand coach. Analyze this social profile: ${profileUrl}.
The user’s goal is: ${goal}.
Score the profile out of 100 and summarize what could be improved.
Respond in JSON like this:
{ "score": number, "summary": string }
`

  const chat = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4o',
  })

  const response = chat.choices[0].message.content
  return NextResponse.json(JSON.parse(response || '{}'))
}
