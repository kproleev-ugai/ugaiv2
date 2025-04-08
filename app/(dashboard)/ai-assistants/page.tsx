import { AIAssistantsHeader } from "@/components/ai-assistants/ai-assistants-header"
import { AIAssistantsList } from "@/components/ai-assistants/ai-assistants-list"

export default function AIAssistantsPage() {
  return (
    <div className="space-y-6">
      <AIAssistantsHeader />
      <AIAssistantsList />
    </div>
  )
}

