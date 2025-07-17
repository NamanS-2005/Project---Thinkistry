"use client"

import dynamic from 'next/dynamic'

// Dynamically import EditPrompt and disable SSR
const EditPrompt = dynamic(() => import('@/components/EditPrompt'), { ssr: false })

export default function UpdatePromptPage() {
  return (
    <div>
      <h1>Edit Prompt</h1>
      <EditPrompt />
    </div>
  )
}
