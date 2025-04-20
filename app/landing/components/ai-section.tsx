"use client"

import { motion } from "framer-motion"
import { Brain, MessageSquare, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { WheatIcon } from "@/components/wheat-icon"

export default function AiSection() {
  return (
    <section id="ai" className="py-16 md:py-20 border-y">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block rounded-lg bg-ugai-blue/10 p-2 mb-4">
              <Brain className="h-6 w-6 text-ugai-blue" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 md:mb-6">
              AI Assistant for Decision Making
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              Our AI module analyzes company data and provides insights for strategic and tactical decision-making at
              all management levels.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <Sparkles className="h-6 w-6 text-ugai-blue shrink-0" />
                <div>
                  <span className="font-medium">Data Analysis & Forecasting</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Identifies trends and builds forecasts based on your company's historical data
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <WheatIcon className="h-6 w-6 text-ugai-blue shrink-0" />
                <div>
                  <span className="font-medium">Recommendation Generation</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Suggests specific actions to improve business metrics
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <Sparkles className="h-6 w-6 text-ugai-blue shrink-0" />
                <div>
                  <span className="font-medium">Automated Reporting</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Generates structured reports for any data in the platform
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="relative rounded-xl border bg-card p-4 md:p-6 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col gap-4">
              <Card className="overflow-hidden">
                <CardContent className="p-3 md:p-4 bg-ugai-blue/10">
                  <div className="flex gap-3">
                    <div className="shrink-0 bg-ugai-blue text-white rounded-full p-2">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="text-xs md:text-sm text-ugai-blue">
                      <p className="font-medium">AI Assistant</p>
                      <p className="mt-1">
                        Data analysis shows a 12% decrease in conversion for the latest marketing campaign. The most
                        likely causes are:
                      </p>
                      <ul className="mt-2 list-disc pl-5 space-y-1">
                        <li>Changes in advertising platform algorithms</li>
                        <li>Seasonal demand fluctuations</li>
                        <li>Increased competitor activity</li>
                      </ul>
                      <p className="mt-2">
                        I recommend adjusting targeting and creatives, and increasing the budget for the most effective
                        channels by 15%.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-3 md:p-4">
                  <div className="flex gap-3">
                    <div className="shrink-0 bg-slate-200 text-slate-700 rounded-full p-2">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="text-xs md:text-sm">
                      <p className="font-medium">Marketing Director</p>
                      <p className="mt-1">
                        Which acquisition channels showed the best conversion in the last quarter? Compare with the
                        previous quarter.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-3 md:p-4 bg-ugai-blue/10">
                  <div className="flex gap-3">
                    <div className="shrink-0 bg-ugai-blue text-white rounded-full p-2">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="text-xs md:text-sm text-ugai-blue">
                      <p className="font-medium">AI Assistant</p>
                      <p className="mt-1">In the last quarter, the best conversion was shown by:</p>
                      <ul className="mt-2 space-y-1">
                        <li>1. Search ads — 4.2% (+0.3% compared to previous quarter)</li>
                        <li>2. Email marketing — 3.8% (+0.5%)</li>
                        <li>3. Social media ads — 2.9% (-0.2%)</li>
                      </ul>
                      <p className="mt-2">
                        Email marketing showed the highest growth. I recommend increasing investment in this channel and
                        optimizing the strategy.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="absolute -bottom-6 -left-6 -right-6 h-20 bg-gradient-to-t from-background to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
