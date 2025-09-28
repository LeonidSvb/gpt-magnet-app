'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ResultViewProps {
  result: string
  onDownload?: () => void
}

export function ResultView({ result, onDownload }: ResultViewProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Your Personalized Result</h2>
      <div className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
      </div>
      {onDownload && (
        <button
          onClick={onDownload}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
      )}
    </div>
  )
}