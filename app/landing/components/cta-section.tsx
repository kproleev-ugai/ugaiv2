"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UGAILogo } from "@/components/ugai-logo"

export default function CTASection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-gradient-to-br from-ugai-blue to-purple-600 p-4 sm:p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <UGAILogo variant="default" size="sm" className="invert" />
                <span className="text-white font-bold">StrategyAI</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Ready to improve your business efficiency?
              </h2>
              <p className="mt-4 text-base md:text-lg text-white/80">
                Register today and start using all the capabilities of our platform for strategy, metrics, and team
                management.
              </p>
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto bg-white text-ugai-blue hover:bg-white/90" asChild>
                  <Link href="/register">
                    Start for free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white/20"
                  asChild
                >
                  <Link href="/demo">
                    <Play className="mr-2 h-4 w-4" /> Try demo
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative flex items-center justify-center rounded-lg bg-white/10 p-4 md:p-6 mt-6 sm:mt-0">
              <img
                src="/strategic-overview-dashboard.png"
                alt="Dashboard preview"
                className="w-full h-auto rounded shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
