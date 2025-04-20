"use client"

import { motion } from "framer-motion"
import { Building, ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const industries = [
  {
    id: "tech",
    label: "IT & Technology",
    cases: [
      {
        company: "TechCorp Inc.",
        title: "Optimizing Product Team Management",
        description: "35% increase in development efficiency through OKR implementation and reporting automation.",
      },
      {
        company: "SaaS Platform",
        title: "Improving Customer Retention Metrics",
        description: "18% reduction in customer churn through behavioral pattern analytics and preventive measures.",
      },
    ],
  },
  {
    id: "retail",
    label: "Retail & E-commerce",
    cases: [
      {
        company: "MegaMarket",
        title: "Enhancing Marketing Campaign Effectiveness",
        description: "42% ROAS growth through channel optimization and improved targeting with AI recommendations.",
      },
      {
        company: "FashionStore",
        title: "Supply Chain Optimization",
        description: "21% reduction in logistics costs and improvement in on-time delivery rates to 97%.",
      },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    cases: [
      {
        company: "TrustBank",
        title: "Compliance Process Automation",
        description: "60% reduction in customer verification time while improving risk identification accuracy.",
      },
      {
        company: "FinTech Startup",
        title: "User Acquisition Funnel Optimization",
        description: "27% increase in conversion and 23% reduction in acquisition costs in the first 3 months.",
      },
    ],
  },
  {
    id: "service",
    label: "Services",
    cases: [
      {
        company: "ConsultingPro",
        title: "Resource Allocation Management",
        description: "15% increase in consultant utilization and 12% growth in project margins.",
      },
      {
        company: "EducationCenter",
        title: "Educational Metrics Improvement",
        description: "32% increase in course completion rates through personalized learning tracks.",
      },
    ],
  },
]

export default function CaseStudies() {
  return (
    <section id="cases" className="py-20">
      <div className="container">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Success Stories</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stories of companies already using our platform to improve business metrics
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="tech" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4">
                {industries.map((industry) => (
                  <TabsTrigger key={industry.id} value={industry.id}>
                    {industry.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {industries.map((industry) => (
              <TabsContent key={industry.id} value={industry.id} className="mt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  {industry.cases.map((caseStudy, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                          <Building className="h-4 w-4" />
                          <span className="text-sm">{caseStudy.company}</span>
                        </div>
                        <CardTitle>{caseStudy.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{caseStudy.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" size="sm" className="gap-1">
                          Learn more <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="#">
                View all case studies <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
