// /app/page.tsx
'use client'
import { useState } from 'react'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [goal, setGoal] = useState('grow')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/analyze-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileUrl: url, goal }),
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Audit Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your IG/TikTok/LinkedIn profile URL"
          className="w-full p-3 border rounded"
        />
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-3 border rounded"
        >
          <option value="grow">Grow My Audience</option>
          <option value="sales">Get Clients</option>
          <option value="brand">Build My Brand</option>
          <option value="job">Attract Job Offers</option>
        </select>
        <button type="submit" disabled={loading} className="w-full p-3 bg-black text-white rounded">
          {loading ? 'Analyzing...' : 'Analyze My Profile'}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded w-full max-w-md">
          <h2 className="font-bold text-lg mb-2">Your BrandScore: {result.score}/100</h2>
          <p>{result.summary}</p>
        </div>
      )}
    </main>
  )
}
