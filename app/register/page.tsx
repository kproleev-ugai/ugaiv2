"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Check, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import RegisterForm from "./components/register-form"
import ClientSetupForm from "./components/client-setup-form"
import AccountSetupForm from "./components/account-setup-form"
import StructureSetupForm from "./components/structure-setup-form"
import SetupComplete from "./components/setup-complete"
import { UGAILogo } from "@/components/ugai-logo"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const steps = [
  { id: "register", title: "Registration" },
  { id: "client-setup", title: "Company Setup" },
  { id: "account-setup", title: "Your Profile" },
  { id: "structure-setup", title: "Structure & Roles" },
  { id: "complete", title: "Completion" },
]

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    clientName: "",
    industry: "",
    geography: "",
    employeesCount: "",
    businessUnits: [],
    name: "",
    position: "",
    phone: "",
    departments: [],
  })

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold">
            <Link href="/landing" className="flex items-center gap-2">
              <UGAILogo variant="default" size="sm" />
              <span className="hidden sm:inline">StrategyAI</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <Button variant="ghost" size="sm" className="gap-2" onClick={goToPrevStep}>
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            <Sheet>
              <SheetTrigger asChild className="sm:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 py-6">
                  {currentStep > 0 && (
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={goToPrevStep}>
                      <ArrowLeft className="h-4 w-4" />
                      Back to previous step
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6 md:py-8 lg:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between mb-6 md:mb-8 overflow-x-auto pb-2 sm:pb-0">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <motion.div
                    className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 text-xs sm:text-sm font-medium ${
                      index < currentStep
                        ? "border-ugai-blue bg-ugai-blue text-white"
                        : index === currentStep
                          ? "border-ugai-blue text-ugai-blue"
                          : "border-muted-foreground/25 text-muted-foreground/50"
                    }`}
                    initial={{ scale: 0.9, opacity: 0.5 }}
                    animate={{
                      scale: index <= currentStep ? 1 : 0.9,
                      opacity: index <= currentStep ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {index < currentStep ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : index + 1}
                  </motion.div>

                  {index < steps.length - 1 && (
                    <div
                      className={`hidden md:block h-0.5 w-[50px] lg:w-[100px] ${
                        index < currentStep ? "bg-ugai-blue" : "bg-muted-foreground/25"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <motion.div
              key={steps[currentStep].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{steps[currentStep].title}</h1>
              <p className="text-muted-foreground">
                {currentStep === 0 && "Create an account to start using the platform"}
                {currentStep === 1 && "Tell us about your company"}
                {currentStep === 2 && "Fill in your information"}
                {currentStep === 3 && "Set up your organizational structure"}
                {currentStep === 4 && "All set to start working!"}
              </p>
            </motion.div>
          </div>

          <motion.div
            key={steps[currentStep].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && (
              <RegisterForm formData={formData} updateFormData={updateFormData} onNext={goToNextStep} />
            )}

            {currentStep === 1 && (
              <ClientSetupForm formData={formData} updateFormData={updateFormData} onNext={goToNextStep} />
            )}

            {currentStep === 2 && (
              <AccountSetupForm formData={formData} updateFormData={updateFormData} onNext={goToNextStep} />
            )}

            {currentStep === 3 && (
              <StructureSetupForm formData={formData} updateFormData={updateFormData} onNext={goToNextStep} />
            )}

            {currentStep === 4 && <SetupComplete formData={formData} />}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
