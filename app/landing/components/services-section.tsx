"use client"

import { motion } from "framer-motion"
import {
  Brain,
  BarChartIcon as ChartBar,
  LineChart,
  BarChart,
  Layers,
  Workflow,
  Zap,
  ArrowRight,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { WheatIcon } from "@/components/wheat-icon"

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Services & Products</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive solutions for business optimization, strategy development, and performance enhancement
          </p>
        </motion.div>

        <Tabs defaultValue="platform" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="platform">AI Platform</TabsTrigger>
              <TabsTrigger value="consulting">Consulting</TabsTrigger>
              <TabsTrigger value="whitelabel">White Label</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="platform" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-bold mb-4">UGAI AI - Business Performance Management Platform</h3>
                  <p className="text-muted-foreground mb-6">
                    An innovative software platform that helps companies integrate all data, tasks, and processes in one
                    place. It includes functionality for analytics, project management, dashboard creation, forecasting,
                    and AI assistants to support decision-making.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-ugai-blue/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-ugai-blue" />
                      </div>
                      <p>Business process transparency</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-ugai-blue/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-ugai-blue" />
                      </div>
                      <p>Cost optimization and efficiency improvement</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-ugai-blue/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-ugai-blue" />
                      </div>
                      <p>Predictability and strategic management</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-ugai-blue/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-ugai-blue" />
                      </div>
                      <p>Automation of complex decisions with AI</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <Brain className="h-8 w-8 text-ugai-blue mb-2" />
                      <CardTitle className="text-lg">Unified Interface</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        All key metrics in one dashboard with integrations to CRM, ERP, advertising platforms, and BI
                        systems
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <Workflow className="h-8 w-8 text-green-500 mb-2" />
                      <CardTitle className="text-lg">Task Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Intelligent management of tasks, goals, and KPIs with OKR strategy and AI-assisted optimization
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <ChartBar className="h-8 w-8 text-purple-500 mb-2" />
                      <CardTitle className="text-lg">Financial Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        AI-powered pricing analysis, sales cost control, and financial forecasting
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <LineChart className="h-8 w-8 text-orange-500 mb-2" />
                      <CardTitle className="text-lg">Marketing & Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Automated marketing analysis, sales optimization, and conversion tracking
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="consulting" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-bold mb-4">UGAI - Strategy Solutions</h3>
                  <p className="text-muted-foreground mb-6">
                    A consulting agency specializing in strategic planning, analytics, and business process
                    optimization. We provide companies with personalized solutions aimed at improving their efficiency
                    in key areas: marketing, finance, management, sales, and strategy.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-ugai-blue/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-ugai-blue" />
                      </div>
                      <p>
                        We analyze your business, create a map of business processes, funnels, KPIs, and growth strategy
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-ugai-blue/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-ugai-blue" />
                      </div>
                      <p>
                        We optimize processes and implement advanced strategic management methods (OKR, Balanced
                        Scorecard, end-to-end analytics)
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-ugai-blue/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-ugai-blue" />
                      </div>
                      <p>
                        We connect UGAI AI, which automates task management, data analysis, and helps make decisions
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-1">
                  <Card>
                    <CardHeader className="pb-2">
                      <Layers className="h-8 w-8 text-ugai-blue mb-2" />
                      <CardTitle>Analytics & Strategic Planning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Comprehensive business audit: finance, marketing, processes, sales</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Growth strategy development for 3, 6, 12 months</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Business model optimization and scaling roadmap creation</span>
                        </li>
                      </ul>
                      <div className="mt-4 text-sm italic">
                        Example: We helped a retail chain automate sales analytics and implement a dynamic pricing
                        strategy. Result — 23% profit growth in 6 months.
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <BarChart className="h-8 w-8 text-green-500 mb-2" />
                      <CardTitle>Business Process Optimization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Reporting and business analytics automation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Implementation of CRM, ERP, BI-analytics and digital tools</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Creation of effective processes and team work regulations</span>
                        </li>
                      </ul>
                      <div className="mt-4 text-sm italic">
                        Example: A manufacturing company reduced costs by 15% after implementing an inventory control
                        system and predictive analytics.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="whitelabel" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-bold mb-4">White Label Solutions</h3>
                  <p className="text-muted-foreground mb-6">
                    We offer customizable white label solutions that can be integrated into your existing systems or
                    branded as your own. Our flexible approach allows for adaptation to your specific business needs.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-ugai-blue/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-ugai-blue" />
                      </div>
                      <p>
                        We create comprehensive solutions that work, using digital transformation, full or partial
                        automation of operational processes and routines
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-ugai-blue/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-ugai-blue" />
                      </div>
                      <p>
                        We train and implement processes that work, integrating them into your business model, taking
                        into account all your nuances and features of corporate architecture
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-ugai-blue/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-ugai-blue" />
                      </div>
                      <p>
                        We provide support until full automation, with the possibility of integration into your ERP/CRM
                        solution, or on our UGAI platform
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-1">
                  <Card>
                    <CardHeader className="pb-2">
                      <Zap className="h-8 w-8 text-ugai-blue mb-2" />
                      <CardTitle>Customizable AI Solutions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium mb-3">Examples of customizable personalized products:</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Revenue Forecasting</h5>
                          <p className="text-xs text-muted-foreground">
                            AI agents analyze historical sales, seasonality, and macroeconomic indicators to build
                            accurate forecasts and simulate different scenarios
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Sales Funnel Margin Analysis</h5>
                          <p className="text-xs text-muted-foreground">
                            AI identifies bottlenecks in your sales funnel, calculates profitability at each stage, and
                            recommends optimization strategies
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Task Efficiency & KPI Achievement</h5>
                          <p className="text-xs text-muted-foreground">
                            AI tracks KPI progress, identifies deviations from plans, and automates routine tasks to
                            improve team productivity
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Sales Forecasting</h5>
                          <p className="text-xs text-muted-foreground">
                            AI predicts sales volumes with 90-95% accuracy, calculates optimal inventory levels, and
                            provides recommendations to avoid shortages or excess
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="bg-ugai-blue/10 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <WheatIcon className="h-8 w-8 text-ugai-blue" />
                      <h4 className="font-bold text-lg">
                        UGAI – Your Personal Board of Directors and Analytics Center
                      </h4>
                    </div>
                    <p className="text-sm">
                      By connecting UGAI, your company gains a team of top specialists, similar to hiring 20 Harvard
                      professors who instantly analyze your business and help make strategic decisions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-ugai-blue hover:bg-ugai-blue/90" asChild>
            <Link href="/register">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
