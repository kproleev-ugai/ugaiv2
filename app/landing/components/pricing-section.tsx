"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const plans = [
  {
    name: "Basic",
    price: "€99",
    description: "For small businesses and startups",
    features: [
      "Up to 10 users",
      "Basic analytics and dashboards",
      "Task and project management",
      "Basic integrations (GA4, Trello)",
      "Email support",
    ],
    cta: "Start for free",
    popular: false,
  },
  {
    name: "Pro",
    price: "€299",
    description: "For growing companies",
    features: [
      "Up to 50 users",
      "Advanced analytics and dashboards",
      "OKR and strategic planning",
      "CRM and lead management",
      "Extended integrations",
      "AI assistant (basic)",
      "Priority support 5/7",
    ],
    cta: "Get Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Contact us",
    description: "For large organizations",
    features: [
      "Unlimited users",
      "Full suite of analytical tools",
      "Enterprise dashboards and reports",
      "Advanced AI assistant capabilities",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 support",
    ],
    cta: "Contact us",
    popular: false,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Transparent Pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground">Choose the optimal plan for your business</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {plans.map((plan, index) => (
            <Card key={index} className={`flex flex-col h-full ${plan.popular ? "border-blue-500 shadow-md" : ""}`}>
              {plan.popular && (
                <div className="rounded-t-lg bg-blue-500 py-1 text-center text-sm font-medium text-white">
                  Popular choice
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-sm text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/register">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
