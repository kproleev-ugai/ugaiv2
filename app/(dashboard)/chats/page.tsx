import { ChatsHeader } from "@/components/chats/chats-header"
import { ChatsList } from "@/components/chats/chats-list"

export default function ChatsPage() {
  return (
    <div className="space-y-6">
      <ChatsHeader />
      <ChatsList />
    </div>
  )
}

