import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <Skeleton className="h-px w-full" />

      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="h-10 w-full md:w-80" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
      </div>

      <Skeleton className="h-10 w-64 mb-4" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-40 mb-1" />
                    <Skeleton className="h-4 w-56" />
                  </div>
                  <Skeleton className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center py-6">
                <Skeleton className="h-10 w-10 rounded-full" />
              </CardContent>
              <CardFooter className="flex items-center justify-between pt-2">
                <Skeleton className="h-4 w-24" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}
