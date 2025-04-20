"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronRight, Rocket, Target, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { UGAILogo } from "@/components/ugai-logo"
import { WheatIcon } from "@/components/wheat-icon"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b py-16 md:py-24 lg:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            className="flex justify-center mb-6 md:mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <UGAILogo variant="vertical" size="md" className="h-auto" />
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Platform for managing{" "}
            <span className="bg-gradient-to-r from-ugai-blue to-purple-600 bg-clip-text text-transparent">
              strategy, metrics, and teams
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A comprehensive platform with AI assistance for optimizing business management processes, strategic
            planning, and monitoring key performance indicators.
          </motion.p>

          <motion.div
            className="mt-6 md:mt-8 p-4 md:p-6 bg-muted/50 rounded-lg border border-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="text-base md:text-lg italic">
              "Imagine your business working like a perfectly tuned mechanism. Every process is transparent, every
              decision is justified, every strategy is predictable. How would your company change?"
            </p>
          </motion.div>

          <motion.div
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-ugai-blue hover:bg-ugai-blue/90">
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2 border-ugai-blue text-ugai-blue hover:bg-ugai-blue/10"
              >
                Open demo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 md:mt-12 grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-3 md:p-4">
              <Users className="h-6 w-6 md:h-8 md:w-8 text-ugai-blue" />
              <span className="text-xs md:text-sm font-medium text-center">For C-Level</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-3 md:p-4">
              <Target className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
              <span className="text-xs md:text-sm font-medium text-center">For Managers</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-3 md:p-4">
              <WheatIcon className="h-6 w-6 md:h-8 md:w-8 text-ugai-blue" />
              <span className="text-xs md:text-sm font-medium text-center">For Analysts</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-3 md:p-4">
              <Rocket className="h-6 w-6 md:h-8 md:w-8 text-orange-500" />
              <span className="text-xs md:text-sm font-medium text-center">For Teams</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-5">
        <div className="h-[600px] md:h-[800px] w-[600px] md:w-[800px] rounded-full bg-gradient-to-r from-ugai-blue to-purple-600 blur-3xl" />
      </div>
    </section>
  )
}
