"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { UGAILogo } from "@/components/ugai-logo"

type SetupCompleteProps = {
  formData: any
}

export default function SetupComplete({ formData }: SetupCompleteProps) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="text-center py-4 sm:py-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="flex justify-center mb-6"
          >
            <UGAILogo variant="vertical" size="md" />
          </motion.div>

          <h2 className="text-xl sm:text-2xl font-bold mb-3">Setup Complete!</h2>
          <p className="text-muted-foreground mb-6">
            The platform is ready to use. You can configure additional settings in the management panel.
          </p>

          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="rounded-lg border p-4 text-left">
                <div className="font-medium mb-1">Your Company</div>
                <p className="text-sm text-muted-foreground">
                  {formData.clientName} • {formData.industry}
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="rounded-lg border p-4 text-left">
                <div className="font-medium mb-1">Your Profile</div>
                <p className="text-sm text-muted-foreground">
                  {formData.name} • {formData.position}
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="rounded-lg border p-4 text-left">
                <div className="font-medium mb-1">Structure</div>
                <p className="text-sm text-muted-foreground">{formData.departments.length} departments</p>
              </div>
            </motion.div>
          </div>

          <div className="mt-8">
            <Button asChild size="lg" className="w-full sm:w-auto gap-2 bg-ugai-blue hover:bg-ugai-blue/90">
              <Link href="/dashboard">
                Go to Dashboard <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
