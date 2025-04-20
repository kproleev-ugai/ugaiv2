"use client"

import { motion } from "framer-motion"

export default function IntegrationsSection() {
  const integrations = [
    { name: "Google Analytics 4", logo: "/placeholder.svg?key=yh8lo" },
    { name: "Google Ads", logo: "/placeholder.svg?key=secvd" },
    { name: "Meta Ads", logo: "/placeholder.svg?key=80uga" },
    { name: "LinkedIn Ads", logo: "/placeholder.svg?key=paj91" },
    { name: "Slack", logo: "/placeholder.svg?key=jp7cg" },
    { name: "Telegram", logo: "/connected-world-telegram.png" },
    { name: "Trello", logo: "/digital-kanban-board.png" },
    { name: "Asana", logo: "/team-brainstorm-productivity.png" },
    { name: "Jira", logo: "/jira-workflow-board.png" },
    { name: "Notion", logo: "/interconnected-digital-workspace.png" },
    { name: "HubSpot", logo: "/interconnected-business-network.png" },
    { name: "Bitrix24", logo: "/interconnected-business-network.png" },
  ]

  return (
    <section id="integrations" className="py-20 border-t">
      <div className="container">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Integrations</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The platform integrates with popular services for analytics, communications, and project management
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              <img
                src={integration.logo || "/placeholder.svg"}
                alt={integration.name}
                className="h-12 w-12 object-contain"
              />
              <span className="text-xs text-center font-medium">{integration.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
