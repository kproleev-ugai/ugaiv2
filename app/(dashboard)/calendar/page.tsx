import { CalendarHeader } from "@/components/calendar/calendar-header"
import { CalendarView } from "@/components/calendar/calendar-view"
import { CalendarSidebar } from "@/components/calendar/calendar-sidebar"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <CalendarHeader />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <CalendarView />
        </div>
        <div className="w-full lg:w-80">
          <CalendarSidebar />
        </div>
      </div>
    </div>
  )
}

