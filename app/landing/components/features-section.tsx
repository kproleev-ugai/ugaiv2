"use client"

import { motion } from "framer-motion"
import { BarChart4, Brain, LineChart, ListTodo, Target, Users2 } from "lucide-react"

const features = [
  {
    icon: <Target className="h-10 w-10 text-blue-500" />,
    title: "Strategy Management",
    description: "Create and track company strategic goals. Cascade them across departments and teams.",
  },
  {
    icon: <BarChart4 className="h-10 w-10 text-green-500" />,
    title: "Metrics & KPIs",
    description: "Set and monitor key performance indicators. Automated dashboards for decision making.",
  },
  {
    icon: <LineChart className="h-10 w-10 text-purple-500" />,
    title: "CRM & Funnels",
    description: "Manage leads, deals, and clients in a unified system. Visualize sales funnels and conversions.",
  },
  {
    icon: <Brain className="h-10 w-10 text-orange-500" />,
    title: "AI Assistant",
    description: "Get analytical reports and recommendations based on your data using artificial intelligence.",
  },
  {
    icon: <ListTodo className="h-10 w-10 text-red-500" />,
    title: "Projects & Tasks",
    description: "Manage cross-functional projects and tasks. Track progress and resources.",
  },
  {
    icon: <Users2 className="h-10 w-10 text-indigo-500" />,
    title: "Teams & Structure",
    description: "Build your company's organizational structure. Assign roles and areas of responsibility.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Everything you need to manage your business
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A comprehensive solution for strategic and operational management
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
