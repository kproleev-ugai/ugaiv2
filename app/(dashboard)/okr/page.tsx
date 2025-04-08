import { OKRHeader } from "@/components/okr/okr-header"
import { OKRCards } from "@/components/okr/okr-cards"
import { OKRTable } from "@/components/okr/okr-table"

export default function OKRPage() {
  return (
    <div className="space-y-6">
      <OKRHeader />
      <OKRCards />
      <OKRTable />
    </div>
  )
}

