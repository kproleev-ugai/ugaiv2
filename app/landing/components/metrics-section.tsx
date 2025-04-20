"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, TrendingUp } from "lucide-react"

export default function MetricsSection() {
  return (
    <section id="metrics" className="py-20 border-t">
      <div className="container">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Key Metrics You'll Gain</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Advanced analytics and unique metrics to drive your business forward
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="channel" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="channel">Channel Efficiency</TabsTrigger>
                <TabsTrigger value="employee">Revenue per Employee</TabsTrigger>
                <TabsTrigger value="amplification">Channel Amplification</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="channel" className="mt-0">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <BarChart className="h-8 w-8 text-ugai-blue" />
                  <div>
                    <CardTitle className="text-xl">Marginal Channel Efficiency</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium mb-3">What is it:</h4>
                      <p className="text-muted-foreground mb-4">
                        The effectiveness of each channel considering its interaction with other channels. Some channels
                        may show good results individually, but when interacting with others, they can increase their
                        effectiveness.
                      </p>
                      <h4 className="font-medium mb-3">How it's measured:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-ugai-blue/10 flex items-center justify-center">
                            <span className="text-xs font-medium text-ugai-blue">1</span>
                          </div>
                          <span>
                            <span className="font-medium">ROI of each channel:</span> Calculate ROI (return on
                            investment) for each channel, both separately and in tandem with other channels.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-ugai-blue/10 flex items-center justify-center">
                            <span className="text-xs font-medium text-ugai-blue">2</span>
                          </div>
                          <span>
                            <span className="font-medium">Combined ROI:</span> Total ROI from all channels when they
                            work together. Assess how this figure changes compared to the individual ROI of each
                            channel.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h4 className="font-medium mb-3">Example:</h4>
                      <p className="mb-4">
                        ROI for search advertising is 200%, for Facebook — 150%. When they work together, the combined
                        ROI increases to 250%.
                      </p>
                      <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-muted-foreground/20"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-muted/50 px-2 text-sm text-muted-foreground">Why it matters</span>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">
                        Understanding channel synergies allows you to optimize your marketing budget allocation and
                        maximize overall campaign effectiveness rather than focusing on individual channel performance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="employee" className="mt-0">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <TrendingUp className="h-8 w-8 text-green-500" />
                  <div>
                    <CardTitle className="text-xl">Revenue per Employee (RPE)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium mb-3">What is it:</h4>
                      <p className="text-muted-foreground mb-4">
                        An indicator that determines how much revenue a company generates per employee, which allows you
                        to evaluate the efficiency of operational processes.
                      </p>
                      <h4 className="font-medium mb-3">Why it's unique:</h4>
                      <p className="text-muted-foreground mb-4">
                        Unlike standard financial indicators such as profit, RPE allows you to assess how efficient a
                        business is in using human resources, which is important when planning scaling and optimization.
                      </p>
                      <h4 className="font-medium mb-3">Benchmarks for goals:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-green-600">✓</span>
                          </div>
                          <span>
                            Increase RPE by 10% through optimization of work processes and automation implementation.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-green-600">✓</span>
                          </div>
                          <span>Improve RPE through IT solution integration.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h4 className="font-medium mb-3">Industry Comparisons:</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Technology</span>
                            <span className="text-sm font-medium">$400K+</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Financial Services</span>
                            <span className="text-sm font-medium">$300K+</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-green-500 rounded-full" style={{ width: "75%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Retail</span>
                            <span className="text-sm font-medium">$200K+</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-green-500 rounded-full" style={{ width: "50%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Manufacturing</span>
                            <span className="text-sm font-medium">$250K+</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-green-500 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-muted-foreground/20"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-muted/50 px-2 text-sm text-muted-foreground">Why it matters</span>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">
                        RPE is a critical efficiency metric that helps identify opportunities for automation, process
                        improvement, and optimal resource allocation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="amplification" className="mt-0">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <LineChart className="h-8 w-8 text-purple-500" />
                  <div>
                    <CardTitle className="text-xl">Channel Amplification Factor</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium mb-3">What is it:</h4>
                      <p className="text-muted-foreground mb-4">
                        An assessment of how one channel enhances the effectiveness of another. For example, if a
                        company launches an advertising campaign on Facebook, it may notice that conversions through
                        Google Ads increase as users see ads in multiple places and are more likely to make a purchase.
                      </p>
                      <h4 className="font-medium mb-3">How it's measured:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-purple-600">1</span>
                          </div>
                          <span>
                            <span className="font-medium">Revenue synergy:</span> Measures how revenues from one channel
                            change when a second channel is added to the system.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-purple-600">2</span>
                          </div>
                          <span>
                            <span className="font-medium">Conversion increase:</span> Measures the increase in the
                            number of conversions on a channel when there is interaction with another channel.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h4 className="font-medium mb-3">Example:</h4>
                      <p className="mb-4">
                        A Facebook campaign increases conversions through Google Ads by 15%, which indicates a positive
                        interaction effect between these channels.
                      </p>
                      <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-purple-600 font-medium">FB</span>
                          </div>
                          <div className="flex-1">
                            <div className="h-2 bg-muted rounded-full">
                              <div className="h-2 bg-purple-500 rounded-full" style={{ width: "60%" }}></div>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs">Conversion: 6%</span>
                              <span className="text-xs">Solo performance</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium">GA</span>
                          </div>
                          <div className="flex-1">
                            <div className="h-2 bg-muted rounded-full">
                              <div className="h-2 bg-blue-500 rounded-full" style={{ width: "70%" }}></div>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs">Conversion: 7%</span>
                              <span className="text-xs">Solo performance</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 font-medium">FB+GA</span>
                          </div>
                          <div className="flex-1">
                            <div className="h-2 bg-muted rounded-full">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs">Conversion: 8.5%</span>
                              <span className="text-xs">Combined performance</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-muted-foreground/20"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-muted/50 px-2 text-sm text-muted-foreground">Why it matters</span>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">
                        Understanding channel amplification helps you create more effective multi-channel marketing
                        strategies and allocate budgets more efficiently.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
