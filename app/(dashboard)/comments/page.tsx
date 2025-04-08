import { CommentsHeader } from "@/components/comments/comments-header"
import { CommentsList } from "@/components/comments/comments-list"

export default function CommentsPage() {
  return (
    <div className="space-y-6">
      <CommentsHeader />
      <CommentsList />
    </div>
  )
}

