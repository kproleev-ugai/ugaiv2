import Link from "next/link"

import { Button } from "@/components/ui/button"
import HeroSection from "./components/hero-section"
import FeaturesSection from "./components/features-section"
import AiSection from "./components/ai-section"
import CaseStudies from "./components/case-studies"
import PricingSection from "./components/pricing-section"
import IntegrationsSection from "./components/integrations-section"
import CTASection from "./components/cta-section"
import ServicesSection from "./components/services-section"
import MetricsSection from "./components/metrics-section"
import { UGAILogo } from "@/components/ugai-logo"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold">
            <UGAILogo variant="default" size="sm" />
            <span className="hidden sm:inline">StrategyAI</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="#ai" className="text-sm font-medium hover:underline">
              AI Module
            </Link>
            <Link href="#services" className="text-sm font-medium hover:underline">
              Services
            </Link>
            <Link href="#cases" className="text-sm font-medium hover:underline">
              Case Studies
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/demo" className="hidden sm:block">
              <Button variant="outline">Demo</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 py-6">
                  <Link href="#features" className="text-sm font-medium hover:underline">
                    Features
                  </Link>
                  <Link href="#ai" className="text-sm font-medium hover:underline">
                    AI Module
                  </Link>
                  <Link href="#services" className="text-sm font-medium hover:underline">
                    Services
                  </Link>
                  <Link href="#cases" className="text-sm font-medium hover:underline">
                    Case Studies
                  </Link>
                  <Link href="#pricing" className="text-sm font-medium hover:underline">
                    Pricing
                  </Link>
                  <Link href="#integrations" className="text-sm font-medium hover:underline">
                    Integrations
                  </Link>
                  <Link href="/demo" className="sm:hidden">
                    <Button variant="outline" className="w-full">
                      Demo
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <AiSection />
        <ServicesSection />
        <MetricsSection />
        <CaseStudies />
        <PricingSection />
        <IntegrationsSection />
        <CTASection />
      </main>

      <footer className="border-t bg-muted/50">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold mb-4">
                <UGAILogo variant="default" size="sm" />
                <span>StrategyAI</span>
              </div>
              <p className="text-sm text-muted-foreground">Platform for strategy, metrics and team management</p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} StrategyAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
